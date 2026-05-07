#!/usr/bin/env node
async function main(): Promise<void> {
  const argv = process.argv.slice(2);
  const cmd = argv[0] ?? "mcp";

  if (cmd === "doctor" || cmd === "check") {
    const { runDoctor } = await import("./doctor.js");
    await runDoctor();
    return;
  }
  if (cmd === "serve" || cmd === "ui") {
    const { runServe } = await import("./serve.js");
    await runServe();
    return;
  }
  if (cmd === "mcp" || cmd === "--stdio") {
    const { runMcpStdio } = await import("./run-mcp.js");
    await runMcpStdio();
    return;
  }
  if (cmd === "-h" || cmd === "--help") {
    console.log(`Kairo — local coding copilot

  kairo mcp          MCP server over stdio (default)
  kairo serve        Web UI + SSE streaming (port ${process.env.KAIRO_UI_PORT ?? "4747"})
  kairo doctor       Print env + probe inference backend (health + models)
  kairo --help

Environment:
  KAIRO_BACKEND      ollama | openai-compat | lmstudio (default ollama)
  KAIRO_OLLAMA_URL   Ollama base (default http://127.0.0.1:11434)
  KAIRO_OPENAI_BASE_URL   OpenAI-compatible /v1 base
  KAIRO_OPENAI_API_KEY    Optional Bearer token
  KAIRO_MODEL        Default model id/tag
  KAIRO_SESSION_DIR  Persist MCP/UI sessions as JSON
  KAIRO_UI_PORT      UI port (default 4747)
`);
    return;
  }
  console.error(`Unknown command: ${cmd}\nRun: kairo --help`);
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
