import { createInferenceBackend } from "./inference/index.js";

type EnvSnapshot = {
  KAIRO_BACKEND: string | null;
  KAIRO_OLLAMA_URL: string | null;
  KAIRO_OPENAI_BASE_URL: string | null;
  KAIRO_OPENAI_API_KEY_SET: boolean;
  KAIRO_MODEL: string | null;
  KAIRO_SESSION_DIR: string | null;
  KAIRO_WORKSPACE: string | null;
  KAIRO_UI_PORT: string | null;
};

function envSnapshot(): EnvSnapshot {
  return {
    KAIRO_BACKEND: process.env.KAIRO_BACKEND ?? null,
    KAIRO_OLLAMA_URL: process.env.KAIRO_OLLAMA_URL ?? null,
    KAIRO_OPENAI_BASE_URL: process.env.KAIRO_OPENAI_BASE_URL ?? null,
    KAIRO_OPENAI_API_KEY_SET: Boolean(process.env.KAIRO_OPENAI_API_KEY?.trim()),
    KAIRO_MODEL: process.env.KAIRO_MODEL ?? null,
    KAIRO_SESSION_DIR: process.env.KAIRO_SESSION_DIR ?? null,
    KAIRO_WORKSPACE: process.env.KAIRO_WORKSPACE ?? null,
    KAIRO_UI_PORT: process.env.KAIRO_UI_PORT ?? null,
  };
}

function envDisplay(): Record<string, string> {
  const snap = envSnapshot();
  return {
    KAIRO_BACKEND: snap.KAIRO_BACKEND ?? "(default ollama)",
    KAIRO_OLLAMA_URL: snap.KAIRO_OLLAMA_URL ?? "(default http://127.0.0.1:11434)",
    KAIRO_OPENAI_BASE_URL: snap.KAIRO_OPENAI_BASE_URL ?? "(default http://127.0.0.1:1234/v1)",
    KAIRO_OPENAI_API_KEY: snap.KAIRO_OPENAI_API_KEY_SET ? "(set)" : "(empty)",
    KAIRO_MODEL: snap.KAIRO_MODEL ?? "(first tag from backend)",
    KAIRO_SESSION_DIR: snap.KAIRO_SESSION_DIR ?? "(unset)",
    KAIRO_WORKSPACE: snap.KAIRO_WORKSPACE ?? "(unset)",
    KAIRO_UI_PORT: snap.KAIRO_UI_PORT ?? "4747",
  };
}

export async function runDoctor(args: string[] = []): Promise<void> {
  const jsonOut = args.includes("--json") || args.includes("-j");
  const backend = createInferenceBackend();
  const health = await backend.health();

  let models: string[] = [];
  let modelsError: string | null = null;
  if (health.ok) {
    try {
      models = await backend.listModels();
    } catch (e) {
      modelsError = e instanceof Error ? e.message : String(e);
    }
  }

  if (jsonOut) {
    const payload = {
      env: envSnapshot(),
      resolved: { kind: backend.kind, endpoint: backend.label },
      health,
      models,
      models_error: modelsError,
    };
    console.log(JSON.stringify(payload, null, 2));
    if (!health.ok || modelsError) process.exitCode = 1;
    return;
  }

  const env = envDisplay();
  console.log("Kairo doctor — configuration\n");
  for (const [k, v] of Object.entries(env)) console.log(`  ${k.padEnd(22)} ${v}`);
  console.log(`\n  Resolved backend      ${backend.kind} @ ${backend.label}`);

  const okMark = health.ok ? "✓" : "✗";
  console.log(`  Health                ${okMark} ${health.detail}`);

  if (!health.ok) {
    process.exitCode = 1;
    return;
  }

  if (modelsError) {
    console.log(`  Models                ✗ ${modelsError}`);
    process.exitCode = 1;
    return;
  }

  const preview = models.slice(0, 8).join(", ") || "(none)";
  const more = models.length > 8 ? ` … +${models.length - 8} more` : "";
  console.log(`  Models (${models.length})       ${preview}${more}`);
}
