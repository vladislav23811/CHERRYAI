import fs from "node:fs";
import path from "node:path";
import type { ChatMessage } from "./ollama.js";

export type StoredSession = {
  id: string;
  model: string;
  messages: ChatMessage[];
  updatedAt: number;
};

/** Per-process session bag; optional JSON persistence under \`KAIRO_SESSION_DIR\`. */
export class SessionStore {
  private readonly dir: string | null;
  private readonly map = new Map<string, StoredSession>();

  constructor(dir?: string | null) {
    const d = dir?.trim();
    this.dir = d ? d : null;
    if (this.dir) fs.mkdirSync(this.dir, { recursive: true });
  }

  create(model: string): StoredSession {
    const id = crypto.randomUUID();
    const s: StoredSession = { id, model, messages: [], updatedAt: Date.now() };
    this.map.set(id, s);
    this.persist(s);
    return s;
  }

  get(id: string): StoredSession | undefined {
    let s = this.map.get(id);
    if (!s && this.dir) {
      const file = path.join(this.dir, `${id}.json`);
      if (fs.existsSync(file)) {
        try {
          const raw = fs.readFileSync(file, "utf8");
          s = JSON.parse(raw) as StoredSession;
          this.map.set(id, s);
        } catch {
          /* ignore corrupt */
        }
      }
    }
    return s;
  }

  delete(id: string): boolean {
    this.map.delete(id);
    if (this.dir) {
      const file = path.join(this.dir, `${id}.json`);
      if (fs.existsSync(file)) fs.unlinkSync(file);
    }
    return true;
  }

  appendMessages(id: string, additions: ChatMessage[]): void {
    const s = this.get(id);
    if (!s) throw new Error(`Unknown session: ${id}`);
    s.messages.push(...additions);
    s.updatedAt = Date.now();
    this.persist(s);
  }

  /** Insert a system message once at the front if missing. */
  ensureSystemMessage(id: string, system: string): void {
    const s = this.get(id);
    if (!s) throw new Error(`Unknown session: ${id}`);
    const t = system.trim();
    if (!t || s.messages.some((m) => m.role === "system")) return;
    s.messages.unshift({ role: "system", content: t });
    s.updatedAt = Date.now();
    this.persist(s);
  }

  private persist(s: StoredSession): void {
    if (!this.dir) return;
    fs.writeFileSync(path.join(this.dir, `${s.id}.json`), JSON.stringify(s, null, 2), "utf8");
  }
}
