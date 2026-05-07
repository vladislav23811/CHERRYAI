import { createInferenceBackend } from "./inference/index.js";

export async function runDoctor(): Promise<void> {
  const backend = createInferenceBackend();
  const env = {
    KAIRO_BACKEND: process.env.KAIRO_BACKEND ?? "(default ollama)",
    KAIRO_OLLAMA_URL: process.env.KAIRO_OLLAMA_URL ?? "(default http://127.0.0.1:11434)",
    KAIRO_OPENAI_BASE_URL: process.env.KAIRO_OPENAI_BASE_URL ?? "(default http://127.0.0.1:1234/v1)",
    KAIRO_OPENAI_API_KEY: process.env.KAIRO_OPENAI_API_KEY?.trim() ? "(set)" : "(empty)",
    KAIRO_MODEL: process.env.KAIRO_MODEL ?? "(first tag from backend)",
    KAIRO_SESSION_DIR: process.env.KAIRO_SESSION_DIR ?? "(unset)",
    KAIRO_WORKSPACE: process.env.KAIRO_WORKSPACE ?? "(unset)",
    KAIRO_UI_PORT: process.env.KAIRO_UI_PORT ?? "4747",
  };

  console.log("Kairo doctor — configuration\n");
  for (const [k, v] of Object.entries(env)) console.log(`  ${k.padEnd(22)} ${v}`);
  console.log(`\n  Resolved backend      ${backend.kind} @ ${backend.label}`);

  const health = await backend.health();
  const okMark = health.ok ? "✓" : "✗";
  console.log(`  Health                ${okMark} ${health.detail}`);

  if (!health.ok) {
    process.exitCode = 1;
    return;
  }

  try {
    const models = await backend.listModels();
    const preview = models.slice(0, 8).join(", ") || "(none)";
    const more = models.length > 8 ? ` … +${models.length - 8} more` : "";
    console.log(`  Models (${models.length})       ${preview}${more}`);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log(`  Models                ✗ ${msg}`);
    process.exitCode = 1;
  }
}
