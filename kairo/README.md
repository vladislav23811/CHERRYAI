# Kairo

**Kairo** (καιρός — *the right moment*) is a **local coding copilot**: MCP tools plus an optional **web halo** so Cursor agents—and your browser—can converse with **Ollama** on your silicon. Nothing ships off-machine unless you wire it.

## What ships today

| Surface | What it does |
| ------- | ------------- |
| **MCP (stdio)** | Cursor invokes tools / reads prompts against your local Ollama |
| **Sessions** | Multi-turn memory (`kairo_session_*`), optionally persisted as JSON |
| **Resource** | `kairo://prompt/engineering` — distilled engineering psyche markdown |
| **Web UI** | Obsidian-glass cockpit · SSE streaming · runs at `127.0.0.1:4747` |

## Requirements

- Node.js **18+**
- [Ollama](https://ollama.com/) (default `http://127.0.0.1:11434`)

## Install & build

```bash
cd kairo
npm install
npm run build
```

## MCP server (Cursor)

```bash
npm run start:mcp
# or globally after linking: kairo-mcp
```

Cursor owns stdin/stdout for JSON-RPC — do **not** attach a TTY debugger there during normal use.

### Cursor `mcp.json`

```json
{
  "mcpServers": {
    "kairo": {
      "command": "node",
      "args": ["C:/MMSAI/kairo/dist/index.js"],
      "env": {
        "KAIRO_OLLAMA_URL": "http://127.0.0.1:11434",
        "KAIRO_MODEL": "llama3.2",
        "KAIRO_SESSION_DIR": ""
      }
    }
  }
}
```

Leave `KAIRO_SESSION_DIR` empty for RAM-only sessions, or set a folder path to persist `.json` session files across MCP restarts. Use the **same directory** in MCP env and when launching the UI if you want Cursor agents and the browser halo to **share** session IDs.

### MCP tools (v0.2)

| Tool | Purpose |
| ---- | ------- |
| `kairo_health` | Probe Ollama |
| `kairo_models` | List tags |
| `kairo_chat` | Single-turn completion |
| `kairo_session_create` | New session UUID |
| `kairo_session_chat` | Append user + assistant turn |
| `kairo_session_history` | Inspect transcript tail |
| `kairo_session_delete` | Drop session |

### MCP resource

| URI | Role |
| --- | ---- |
| `kairo://prompt/engineering` | Paste-ready **engineering psyche** block for heavier codegen prompts |

## Web UI

Stream deltas straight from Ollama (SSE):

```bash
npm run start:ui
# or: node dist/cli.js serve
# after npm link in this folder: kairo serve
```

Open **http://127.0.0.1:4747** · click **New orbit** to mint a session, choose a model, write prompts.

Environment:

| Variable | Default | Meaning |
| -------- | ------- | ------- |
| `KAIRO_UI_PORT` | `4747` | HTTP port |

## CLI commands

```text
kairo mcp       # stdio MCP (default)
kairo serve     # web halo + SSE
kairo --help
```

## Environment (global)

| Variable | Default | Meaning |
| -------- | ------- | ------- |
| `KAIRO_OLLAMA_URL` | `http://127.0.0.1:11434` | Ollama base |
| `KAIRO_MODEL` | _(first tag)_ | Fallback tag |
| `KAIRO_SESSION_DIR` | _(unset)_ | Optional persistence dir |

## Next explosions

- OpenAI-compatible backends · workspace-aware tools · Tauri shell · voice orb-weaver mode *(half joking)*  

## License

Follows the parent **CHERRYAI** repository license unless this folder is split out later.
