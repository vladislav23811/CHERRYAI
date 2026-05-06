# Plugin & Tool Integration Matrix (MZ AI)

Quick reference: **what to use when** inside Cursor and alongside Cherry-style tooling.

| Capability | Where it lives | When to use | Typical command / entry |
|------------|----------------|-------------|-------------------------|
| **Cursor rules (behavior)** | `.cursor/rules/*.mdc` | Steady engineering persona, autonomy, strict coding | Enable rules in Cursor; `@filename.mdc` in chat |
| **Prompt playbooks** | `.cursor/AGI-OPERATIONS.md`, `.cursor/AGI-GENIE-PLAYBOOK.md` | Copy/paste workflows, upgrades | Open file → paste block |
| **Multi-agent orchestration** | `.cursor/MULTI-AGENT-ORCHESTRATION.md` | AUTO mode + parallel tracks | Coordinator + specialist prompts |
| **Session templates** | `.cursor/templates/*.md` | Bootstrapping feature / debug / research / plugin | `@.cursor/templates/feature-session.md` |
| **Repo automation (plugins)** | `scripts/*.mjs`, `plugins/*/README.md` | Self-evolution, roadmap batches | `npm run plugins:loop` |
| **Rule quality gate** | `scripts/validate-rules.mjs` | After editing `.mdc` files | `npm run rules:validate` |
| **Rule diagnostics** | `scripts/rules-doctor.mjs` | Coverage / overlap sanity | `npm run rules:doctor` |
| **Merged rule export** | `scripts/export-rules.mjs` | Single file for Custom Instructions | `npm run rules:export` |
| **Contributing / labels** | `.github/LABELS.md`, issue templates | Open-source hygiene | Manual `gh label` or GitHub UI |
| **Examples** | `docs/examples/` | Onboarding, patterns | Read `docs/examples/*.md` |

## MCP (Model Context Protocol)

| Aspect | Guidance |
|--------|----------|
| **Purpose** | Expose tools (filesystem, APIs, DB) to the model with explicit schemas |
| **MZ AI stance** | Prefer MCP over ad-hoc scraping when building repeatable agent workflows |
| **RepoNote** | This repo focuses on **rules + scripts**; add MCP servers in consuming apps (e.g. Electron/Cherry Studio stacks) |

## Cursor AUTO mode (recommended ritual)

1. `npm run plugins:loop`
2. Open coordinator prompt from `.cursor/MULTI-AGENT-ORCHESTRATION.md` Playbook A or B  
3. Attach rule stack via `@cherryai-agi-ultra.mdc` (and peers as needed)  
4. Execute one roadmap batch; debrief with `.cursor/templates/debrief-log.md`

## Cherry Studio alignment (optional)

Same philosophical stack: local-first, multi-model, MCP-ready. MZ AI rules are portable into Cherry-assisted workflows; keep license (`LICENSE`) in any derivative documentation.

---

Copyright (c) 2026 vladislav23811. Personal use only; see `LICENSE`.
