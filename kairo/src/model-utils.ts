import { ollamaListModels } from "./ollama.js";

export async function resolveModel(baseUrl: string, explicit?: string): Promise<string> {
  let model = explicit?.trim() || process.env.KAIRO_MODEL?.trim() || "";
  if (!model) {
    const tags = await ollamaListModels(baseUrl);
    model = tags[0] ?? "";
  }
  return model;
}
