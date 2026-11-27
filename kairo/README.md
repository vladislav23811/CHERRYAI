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

Open **http://127.0.0.1:4747** · **New orbit** mints a session · optional **system preamble** · **Halt** / **Escape** stops streaming · **Copy orbit** / **Download orbit** · **Archive to vault** (when `KAIRO_VAULT_DIR` is set) · assistant replies **render as Markdown** (fenced code, lists, links) after each stream completes via vendored **marked** + **DOMPurify**. **Rescan** models after loading weights elsewhere.

Quick sanity check without Cursor:

```bash
node dist/cli.js doctor
node dist/cli.js doctor --json   # CI / scripts
node dist/cli.js version
# or: kairo doctor | kairo doctor --json | kairo version
```

Environment:

| Variable | Default | Meaning |
| -------- | ------- | ------- |
| `KAIRO_UI_PORT` | `4747` | HTTP port |
| `KAIRO_VAULT_DIR` | _(unset)_ | Server-side orbit archive dir (`*.orbit.json`) |
| `KAIRO_SMOKE_REPLY` | `probe-reply-alpha` | Fixed reply when `KAIRO_BACKEND=smoke` (CI) |

The UI uses the **same** `KAIRO_BACKEND` / `KAIRO_OLLAMA_*` / `KAIRO_OPENAI_*` / `KAIRO_MODEL` env as MCP. Set `KAIRO_BACKEND=smoke` for deterministic probes without a local LLM.

**CI:** from repo root, `npm run kairo:ci` (build + `scripts/kairo-validate.mjs`). See `v0.4.1-spec.md`. Expect **38/38** HTTP probes (vault off/on, stream + vault archive cycle, Ed25519 bundle sign roundtrip); last local gate on dev branch **2026-11-27 23:00 UTC**. **GHA** runs on pushes that touch `kairo/**` (or **workflow_dispatch** on the Kairo workflow); automation-only commits on the dev branch should still run `kairo:ci` locally before merge. For PR readiness, use the latest green **Kairo** workflow on the newest `kairo/**` commit — not necessarily the branch tip when the tip is docs-only under `automation/`. `npm run automation:open-kairo-pr` JSON includes `head_sha` (branch tip), `kairo_path_head_sha` (latest commit touching `kairo/`), and `kairo_path_behind_tip` when those SHAs differ.

**Release bundle:** `kairo:ci` builds a pinned-content tarball and runs an ephemeral Ed25519 sign/verify roundtrip (no secrets). Set `KAIRO_SIGN_PRIVATE_KEY` to also sign `kairo-bundle.tar.gz` for distribution; `npm run bundle:sign` / `bundle:verify` in this folder. Details in `v0.4.1-spec.md`.

### Orbit vault HTTP API

When `KAIRO_VAULT_DIR` is set, archived orbits are stored as JSON files (`*.orbit.json`) on disk. `GET /health` and `GET /api/meta` expose `vault_enabled: boolean`.

| Route | Vault off | Vault on |
| ----- | --------- | -------- |
| `GET /api/vault/orbits` | 503 | `{ vault_enabled, orbits[] }` |
| `POST /api/vault/orbits` | 503 | 201 + orbit record |
| `GET /api/vault/orbits/:id` | 503 | 200 / 404 |
| `DELETE /api/vault/orbits/:id` | 503 | 204 / 404 |

Markdown rendering uses **vendored** `marked` + `dompurify` copied into `dist/static/vendor/` on `npm run build` — no CDN required. The server exposes **`GET /vendor/*`** (allowlisted), **`GET /api/meta`**, **`GET /health`**, **`GET /manifest.webmanifest`**, **`GET /favicon.svg`**, and **`GET /sw.js`**. A **service worker** caches the shell (`/`, `/vendor/*`, manifest, icon) for offline reloads (API/streaming still needs the server). The UI persists **model**, **system preamble**, and **session id** in **`localStorage`** (Forget orbit clears the stored session link).

## CLI commands

```text
kairo mcp       # stdio MCP (default)
kairo serve     # web halo + SSE
kairo doctor       # env dump + health + model count
kairo doctor --json   # machine-readable
kairo version      # package semver
kairo --help
```

## Environment (global)

| Variable | Default | Meaning |
| -------- | ------- | ------- |
| `KAIRO_BACKEND` | `ollama` | `ollama` · `openai` · `openai-compat` · `lmstudio` · `smoke` |
| `KAIRO_SMOKE_REPLY` | `probe-reply-alpha` | Fixed reply when `KAIRO_BACKEND=smoke` (CI) |
| `KAIRO_OLLAMA_URL` | `http://127.0.0.1:11434` | Ollama base (when backend is Ollama) |
| `KAIRO_OPENAI_BASE_URL` | `http://127.0.0.1:1234/v1` | OpenAI-compat base; `/v1` appended if missing |
| `KAIRO_OPENAI_API_KEY` | _(empty)_ | Optional `Authorization: Bearer …` |
| `KAIRO_MODEL` | _(first tag)_ | Fallback model id |
| `KAIRO_SESSION_DIR` | _(unset)_ | Optional persistence dir |
| `KAIRO_WORKSPACE` | _(unset)_ | Extra workspace roots for MCP file tools |
| `KAIRO_SIGN_PRIVATE_KEY` | _(unset)_ | Optional PKCS#8 PEM or base64 Ed25519 key — signs `kairo-bundle.tar.gz` during `kairo:ci` / `npm run bundle:sign` |
| `KAIRO_SIGN_PUBLIC_KEY` | _(unset)_ | Optional verify key; with private key set, CI self-verifies the release signature |

## Next explosions

- Tauri shell · voice orb-weaver mode *(half joking)*  

## License

Follows the parent **CHERRYAI** repository license unless this folder is split out later.
