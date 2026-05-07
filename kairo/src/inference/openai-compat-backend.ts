import type { ChatMsg, InferenceBackend } from "./types.js";

function normalizeBase(raw: string): string {
  let u = raw.trim().replace(/\/+$/, "");
  if (!u.endsWith("/v1")) u += "/v1";
  return u;
}

export class OpenAICompatInferenceBackend implements InferenceBackend {
  readonly kind = "openai-compat" as const;
  readonly label: string;
  private readonly base: string;
  private readonly apiKey: string;

  constructor() {
    const raw = process.env.KAIRO_OPENAI_BASE_URL?.trim() || "http://127.0.0.1:1234/v1";
    this.base = normalizeBase(raw);
    this.apiKey = process.env.KAIRO_OPENAI_API_KEY?.trim() || "";
    this.label = this.base;
  }

  private headers(json = true): Record<string, string> {
    const h: Record<string, string> = {};
    if (json) h["Content-Type"] = "application/json";
    if (this.apiKey) h.Authorization = `Bearer ${this.apiKey}`;
    return h;
  }

  async health(): Promise<{ ok: boolean; detail: string }> {
    try {
      const res = await fetch(`${this.base}/models`, { headers: this.headers(false) });
      if (res.ok) return { ok: true, detail: "OpenAI-compatible endpoint reachable" };
      return { ok: false, detail: `HTTP ${res.status}` };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return { ok: false, detail: msg };
    }
  }

  async listModels(): Promise<string[]> {
    const res = await fetch(`${this.base}/models`, { headers: this.headers(false) });
    if (!res.ok) throw new Error(`List models failed: HTTP ${res.status}`);
    const data = (await res.json()) as { data?: Array<{ id?: string }> };
    return (data.data ?? []).map((x) => x.id ?? "").filter(Boolean);
  }

  async chat(model: string, messages: ChatMsg[]): Promise<string> {
    const res = await fetch(`${this.base}/chat/completions`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify({
        model,
        messages,
        stream: false,
      }),
    });
    if (!res.ok) {
      const t = await res.text();
      throw new Error(`Chat failed: HTTP ${res.status} ${t.slice(0, 400)}`);
    }
    const data = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
      error?: { message?: string };
    };
    if (data.error?.message) throw new Error(data.error.message);
    const text = data.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error("Empty completion");
    return text;
  }

  async *chatStream(
    model: string,
    messages: ChatMsg[],
    signal?: AbortSignal,
  ): AsyncGenerator<string, void, undefined> {
    const res = await fetch(`${this.base}/chat/completions`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify({ model, messages, stream: true }),
      signal,
    });
    if (!res.ok || !res.body) {
      const t = await res.text().catch(() => "");
      throw new Error(`Stream failed: HTTP ${res.status} ${t.slice(0, 300)}`);
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const blocks = buffer.split("\n\n");
        buffer = blocks.pop() ?? "";
        for (const block of blocks) {
          for (const line of block.split("\n")) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const payload = trimmed.slice(5).trim();
            if (payload === "[DONE]") return;
            let parsed: unknown;
            try {
              parsed = JSON.parse(payload);
            } catch {
              continue;
            }
            const chunk = parsed as { choices?: Array<{ delta?: { content?: string } }> };
            const delta = chunk.choices?.[0]?.delta?.content;
            if (delta) yield delta;
          }
        }
      }
    } finally {
      reader.releaseLock();
    }
  }
}
