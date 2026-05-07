export type ChatRole = "system" | "user" | "assistant";

export type ChatMsg = { role: ChatRole; content: string };

export interface InferenceBackend {
  readonly kind: "ollama" | "openai-compat";
  readonly label: string;
  health(): Promise<{ ok: boolean; detail: string }>;
  listModels(): Promise<string[]>;
  chat(model: string, messages: ChatMsg[]): Promise<string>;
  chatStream(model: string, messages: ChatMsg[], signal?: AbortSignal): AsyncGenerator<string, void, undefined>;
}

export async function resolveModelTag(backend: InferenceBackend, explicit?: string): Promise<string> {
  let model = explicit?.trim() || process.env.KAIRO_MODEL?.trim() || "";
  if (!model) {
    const tags = await backend.listModels();
    model = tags[0] ?? "";
  }
  return model;
}
