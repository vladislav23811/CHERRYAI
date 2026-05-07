# Kairo

**Kairo** (καιρός — the right moment) is a small **local coding copilot shell**: an MCP server that lets **Cursor** talk to **Ollama** over stdio. Think “Cursor-adjacent brain, your hardware, your weights,” without replacing the editor — it **extends** it through MCP tools.

## Why

- **Privacy / locality:** Models stay on your machine via Ollama.
- **Cursor-native:** Once configured, agents and chat can call `kairo_chat`, list models, or health-check the daemon.
- **Incremental:** This repo starts with MCP + Ollama; a fuller UI (CLI/Tauri/web) can stack on the same core later.

## Requirements

- Node.js **18+**
- [Ollama](https://ollama.com/) running (default `http://127.0.0.1:11434`)

## Install & build

```bash
cd kairo
npm install
npm run build
```

## Run (stdio MCP)

```bash
npm run start:mcp
```

Cursor spawns this process and speaks JSON-RPC over stdin/stdout — **do not** run interactively in a normal terminal for production use.

## Cursor MCP configuration

**Settings → MCP → New MCP Server** (or edit `mcp.json`), add:

```json
{
  "mcpServers": {
    "kairo": {
      "command": "node",
      "args": ["C:/MMSAI/kairo/dist/index.js"],
      "env": {
        "KAIRO_OLLAMA_URL": "http://127.0.0.1:11434",
        "KAIRO_MODEL": "llama3.2"
      }
    }
  }
}
```

Adjust paths for your checkout. If `KAIRO_MODEL` is unset, Kairo uses the **first** tag returned by Ollama.

### Tools exposed

| Tool           | Purpose                                              |
| -------------- | ---------------------------------------------------- |
| `kairo_health` | Check Ollama HTTP reachability                       |
| `kairo_models` | List local model tags                               |
| `kairo_chat`   | Single-turn chat `prompt` (+ optional `system`)      |

## Environment

| Variable             | Default                     | Meaning                    |
| -------------------- | --------------------------- | -------------------------- |
| `KAIRO_OLLAMA_URL`   | `http://127.0.0.1:11434`    | Ollama base URL            |
| `KAIRO_MODEL`        | _(first tag)_               | Default model when omitted |

## Roadmap (ideas)

- Session memory / project roots as MCP resources  
- Streaming responses  
- Optional OpenAI-compatible backends  
- Dedicated UI alongside MCP  

## License

Follows the parent **CHERRYAI** repository license unless this folder is split out later.
