import fs from "node:fs";
import path from "node:path";

export type OrbitRecord = {
  id: string;
  session_id: string | null;
  model: string | null;
  title: string;
  markdown: string;
  created_at: number;
};

export type OrbitSummary = {
  id: string;
  session_id: string | null;
  model: string | null;
  title: string;
  created_at: number;
  bytes: number;
};

/** JSON orbit archives under \`KAIRO_VAULT_DIR\` as \`*.orbit.json\`. */
export class OrbitVault {
  private readonly dir: string;

  constructor(dir: string) {
    this.dir = dir;
    fs.mkdirSync(this.dir, { recursive: true });
  }

  enabled(): boolean {
    return Boolean(this.dir);
  }

  list(): OrbitSummary[] {
    const names = fs.readdirSync(this.dir).filter((n) => n.endsWith(".orbit.json"));
    const out: OrbitSummary[] = [];
    for (const name of names) {
      try {
        const raw = fs.readFileSync(path.join(this.dir, name), "utf8");
        const rec = JSON.parse(raw) as OrbitRecord;
        if (!rec?.id) continue;
        out.push({
          id: rec.id,
          session_id: rec.session_id ?? null,
          model: rec.model ?? null,
          title: rec.title || rec.id.slice(0, 8),
          created_at: rec.created_at ?? 0,
          bytes: Buffer.byteLength(rec.markdown ?? "", "utf8"),
        });
      } catch {
        /* skip corrupt */
      }
    }
    out.sort((a, b) => b.created_at - a.created_at);
    return out;
  }

  get(id: string): OrbitRecord | null {
    const file = this.fileFor(id);
    if (!fs.existsSync(file)) return null;
    try {
      return JSON.parse(fs.readFileSync(file, "utf8")) as OrbitRecord;
    } catch {
      return null;
    }
  }

  save(input: {
    session_id?: string | null;
    model?: string | null;
    title?: string | null;
    markdown: string;
  }): OrbitRecord {
    const markdown = input.markdown?.trim();
    if (!markdown) throw new Error("markdown required");
    const id = crypto.randomUUID();
    const rec: OrbitRecord = {
      id,
      session_id: input.session_id?.trim() || null,
      model: input.model?.trim() || null,
      title: (input.title?.trim() || `orbit-${id.slice(0, 8)}`).slice(0, 120),
      markdown,
      created_at: Date.now(),
    };
    fs.writeFileSync(this.fileFor(id), JSON.stringify(rec, null, 2), "utf8");
    return rec;
  }

  delete(id: string): boolean {
    const file = this.fileFor(id);
    if (!fs.existsSync(file)) return false;
    fs.unlinkSync(file);
    return true;
  }

  private fileFor(id: string): string {
    const safe = id.replace(/[^a-zA-Z0-9-]/g, "");
    if (!safe || safe !== id) throw new Error("invalid orbit id");
    return path.join(this.dir, `${id}.orbit.json`);
  }
}
