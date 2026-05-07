import { ollamaChat, ollamaChatStream, ollamaHealth, ollamaListModels } from "../ollama.js";
import type { ChatMsg, InferenceBackend } from "./types.js";

export class OllamaInferenceBackend implements InferenceBackend {
  readonly kind = "ollama" as const;
  readonly label: string;

  constructor(private readonly baseUrl: string) {
    this.label = baseUrl;
  }

  async health(): Promise<{ ok: boolean; detail: string }> {
    return ollamaHealth(this.baseUrl);
  }

  async listModels(): Promise<string[]> {
    return ollamaListModels(this.baseUrl);
  }

  async chat(model: string, messages: ChatMsg[]): Promise<string> {
    return ollamaChat({ baseUrl: this.baseUrl, model, messages });
  }

  async *chatStream(model: string, messages: ChatMsg[], signal?: AbortSignal): AsyncGenerator<string, void, undefined> {
    yield* ollamaChatStream({ baseUrl: this.baseUrl, model, messages, signal });
  }
}
