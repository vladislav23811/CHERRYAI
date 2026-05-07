# MZ AI / CHERRYAI Wiki

Welcome. This wiki is a **short orientation hub**. Canonical prose, tutorials, and reliability guidance live in the repo under [`docs/`](https://github.com/vladislav23811/CHERRYAI/tree/main/docs); the browsable site is published separately—see [[Documentation-site]].

> **License:** Personal use only unless you have separate written permission. See [`LICENSE`](https://github.com/vladislav23811/CHERRYAI/blob/main/LICENSE).

## Links

| Resource | URL |
| -------- | --- |
| Repository | https://github.com/vladislav23811/CHERRYAI |
| Documentation site (GitHub Pages) | https://vladislav23811.github.io/CHERRYAI/ |
| Contributing | [`CONTRIBUTING.md`](https://github.com/vladislav23811/CHERRYAI/blob/main/CONTRIBUTING.md) |
| Roadmap | [`ROADMAP.md`](https://github.com/vladislav23811/CHERRYAI/blob/main/ROADMAP.md) |
| Docs changelog | [`docs/CHANGELOG.md`](https://github.com/vladislav23811/CHERRYAI/blob/main/docs/CHANGELOG.md) |

## What MZ AI is

MZ AI is a **Cursor-native** rule and playbook framework for autonomous “genie-style” engineering: plan → implement → validate → ship, with optional multi-agent and MCP-heavy workflows.

## Quick start

1. Clone [CHERRYAI](https://github.com/vladislav23811/CHERRYAI) and open it in Cursor.
2. Enable rules under `.cursor/rules/`.
3. Start from **`cherryai-agi-ultra.mdc`** or **`cherryail-master.mdc`**; add **`agi-genie-core.mdc`** and **`agi-execution-engine.mdc`** when you want full autonomy loops.
4. Use prompts from `.cursor/AGI-OPERATIONS.md`; parallel AUTO flows → `.cursor/MULTI-AGENT-ORCHESTRATION.md`.
5. Before shipping: **`npm run validate:all`**; review **`docs/RELIABILITY-SECURITY-HARDENING.md`**.
6. Session opener & rhythm → **`docs/MZ-AI-BOOTSTRAP-PROMPT.md`**.

## Deep dives (in-repo)

- Rule naming & stacks → [`docs/RULE-ARCHITECTURE.md`](https://github.com/vladislav23811/CHERRYAI/blob/main/docs/RULE-ARCHITECTURE.md)
- Tutorials → [`docs/TUTORIALS/`](https://github.com/vladislav23811/CHERRYAI/tree/main/docs/TUTORIALS)
- Plugin / MCP matrix → [`docs/PLUGIN-TOOL-MATRIX.md`](https://github.com/vladislav23811/CHERRYAI/blob/main/docs/PLUGIN-TOOL-MATRIX.md)
- Production rollout → [`docs/PRODUCTION-ADOPTION.md`](https://github.com/vladislav23811/CHERRYAI/blob/main/docs/PRODUCTION-ADOPTION.md)
- Community templates → [`docs/community-templates/`](https://github.com/vladislav23811/CHERRYAI/tree/main/docs/community-templates)

## Maintainer note

Wiki sources are version-controlled in the **`wiki/`** directory on `main`. To publish updates to GitHub Wiki after editing those files, maintainers run **`npm run wiki:sync`** (requires push access and authentication). See **`CONTRIBUTING.md`** → *GitHub wiki*.
