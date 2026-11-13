import type { ChatMsg, InferenceBackend } from "./types.js";

function smokeReplyText(): string {
  const fromEnv =
    process.env.KAIRO_SMOKE_REPLY?.trim() || process.env.SMOKE_REPLY?.trim() || "";
  return fromEnv || "probe-reply-alpha";
}

/** Deterministic backend for CI — no external inference required. */
export class SmokeInferenceBackend implements InferenceBackend {
  readonly kind = "smoke" as const;
  readonly label = "smoke://local";

  async health(): Promise<{ ok: boolean; detail: string }> {
    return { ok: true, detail: "smoke backend ready" };
  }

  async listModels(): Promise<string[]> {
    return ["smoke-probe"];
  }

  async chat(_model: string, _messages: ChatMsg[]): Promise<string> {
    return smokeReplyText();
  }

  async *chatStream(
    _model: string,
    _messages: ChatMsg[],
    signal?: AbortSignal,
  ): AsyncGenerator<string, void, undefined> {
    const text = smokeReplyText();
    const step = Math.max(1, Math.ceil(text.length / 4));
    for (let i = 0; i < text.length; i += step) {
      if (signal?.aborted) return;
      yield text.slice(i, i + step);
    }
  }
}
