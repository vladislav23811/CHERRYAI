import { OllamaInferenceBackend } from "./ollama-backend.js";
import { OpenAICompatInferenceBackend } from "./openai-compat-backend.js";
import type { InferenceBackend } from "./types.js";

export type { ChatMsg, ChatRole, InferenceBackend } from "./types.js";
export { resolveModelTag } from "./types.js";

export function createInferenceBackend(): InferenceBackend {
  const mode = (process.env.KAIRO_BACKEND ?? "ollama").trim().toLowerCase();
  if (mode === "openai" || mode === "openai-compat" || mode === "lmstudio") {
    return new OpenAICompatInferenceBackend();
  }
  const baseUrl = process.env.KAIRO_OLLAMA_URL?.trim() || "http://127.0.0.1:11434";
  return new OllamaInferenceBackend(baseUrl);
}
