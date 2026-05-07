# Kairo

**Kairo** (καιρός — *the right moment*) is a **local coding copilot**: MCP tools plus an optional **web halo** so Cursor agents—and your browser—can converse with **local inference** on your silicon. Nothing ships off-machine unless you wire it.

## What ships today

| Surface | What it does |
| ------- | ------------- |
| **MCP (stdio)** | Cursor invokes tools / reads prompts against **Ollama** or an **OpenAI-compatible** server |
| **Sessions** | Multi-turn memory (`kairo_session_*`), optionally persisted as JSON |
| **Workspace tools** | Roots from Cursor MCP `roots/list` + `KAIRO_WORKSPACE`; confined read/list/grep |
| **Resource** | `kairo://prompt/engineering` — distilled engineering psyche markdown |
| **Web UI** | Obsidian-glass cockpit · SSE streaming · runs at `127.0.0.1:4747` |

## Requirements

- Node.js **18+**
- One of:
  - [Ollama](https://ollama.com/) (default `http://127.0.0.1:11434`), or
  - Any **OpenAI-compatible** HTTP API (LM Studio, vLLM, etc.)

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

**Ollama (default)**

```json
{
  "mcpServers": {
    "kairo": {
      "command": "node",
      "args": ["C:/MMSAI/kairo/dist/index.js"],
      "env": {
        "KAIRO_BACKEND": "ollama",
        "KAIRO_OLLAMA_URL": "http://127.0.0.1:11434",
        "KAIRO_MODEL": "llama3.2",
        "KAIRO_SESSION_DIR": "",
        "KAIRO_WORKSPACE": ""
      }
    }
  }
}
```

**LM Studio / OpenAI-compatible**

```json
{
  "mcpServers": {
    "kairo": {
      "command": "node",
      "args": ["C:/MMSAI/kairo/dist/index.js"],
      "env": {
        "KAIRO_BACKEND": "lmstudio",
        "KAIRO_OPENAI_BASE_URL": "http://127.0.0.1:1234/v1",
        "KAIRO_OPENAI_API_KEY": "",
        "KAIRO_MODEL": "",
        "KAIRO_SESSION_DIR": "",
        "KAIRO_WORKSPACE": ""
      }
    }
  }
}
```

Leave `KAIRO_SESSION_DIR` empty for RAM-only sessions, or set a folder path to persist `.json` session files across MCP restarts. Use the **same directory** in MCP env and when launching the UI if you want Cursor agents and the browser halo to **share** session IDs.

`KAIRO_WORKSPACE` may list extra roots (comma or semicolon separated). If unset and the client does not advertise MCP roots, tools fall back to `process.cwd()`.

### MCP tools (v0.3)

| Tool | Purpose |
| ---- | ------- |
| `kairo_health` | Probe inference backend |
| `kairo_models` | List model ids/tags |
| `kairo_chat` | Single-turn completion |
| `kairo_session_create` | New session UUID |
| `kairo_session_chat` | Append user + assistant turn |
| `kairo_session_history` | Inspect transcript tail |
| `kairo_session_delete` | Drop session |
| `kairo_workspace_roots` | Effective filesystem roots |
| `kairo_read_file` | Read UTF-8 file inside roots |
| `kairo_list_directory` | List directory inside roots; path `.` returns **all** roots with entries each |
| `kairo_grep` | Bounded regex search under roots |

### MCP resource

| URI | Role |
| --- | ---- |
| `kairo://prompt/engineering` | Paste-ready **engineering psyche** block for heavier codegen prompts |

## Web UI

Stream deltas over SSE:

```bash
npm run start:ui
# or: node dist/cli.js serve
# after npm link in this folder: kairo serve
```

Open **http://127.0.0.1:4747** · **New orbit** mints a session · optional **system preamble** · **Halt** or **Escape** cancels streaming · models **Rescan** after loading weights elsewhere.

Quick sanity check without Cursor:

```bash
node dist/cli.js doctor
# or: kairo doctor
```

Environment:

| Variable | Default | Meaning |
| -------- | ------- | ------- |
| `KAIRO_UI_PORT` | `4747` | HTTP port |

The UI uses the **same** `KAIRO_BACKEND` / `KAIRO_OLLAMA_*` / `KAIRO_OPENAI_*` / `KAIRO_MODEL` env as MCP.

## CLI commands

```text
kairo mcp       # stdio MCP (default)
kairo serve     # web halo + SSE
kairo doctor    # env dump + health + model count
kairo --help
```

## Environment (global)

| Variable | Default | Meaning |
| -------- | ------- | ------- |
| `KAIRO_BACKEND` | `ollama` | `ollama` · `openai` · `openai-compat` · `lmstudio` |
| `KAIRO_OLLAMA_URL` | `http://127.0.0.1:11434` | Ollama base (when backend is Ollama) |
| `KAIRO_OPENAI_BASE_URL` | `http://127.0.0.1:1234/v1` | OpenAI-compat base; `/v1` appended if missing |
| `KAIRO_OPENAI_API_KEY` | _(empty)_ | Optional `Authorization: Bearer …` |
| `KAIRO_MODEL` | _(first tag)_ | Fallback model id |
| `KAIRO_SESSION_DIR` | _(unset)_ | Optional persistence dir |
| `KAIRO_WORKSPACE` | _(unset)_ | Extra workspace roots for MCP file tools |

## Next explosions

- Tauri shell · voice orb-weaver mode *(half joking)*  

## License

Follows the parent **CHERRYAI** repository license unless this folder is split out later.
