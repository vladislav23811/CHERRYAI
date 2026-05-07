# MZ AI

Open-source Cursor framework for building autonomous "genie" style AI engineering workflows.

MZ AI turns Cursor into a high-velocity AGI build environment through production-ready rules, execution loops, and operating playbooks.

> Copyright (c) 2026 vladislav23811. All rights reserved.
> Personal use only. Commercial use is not allowed without explicit written permission and agreement to proposed commercial terms.

## Why MZ AI

- **Autonomous execution:** plan -> implement -> validate -> ship loops
- **Quality first:** strict engineering standards and reviewable diffs
- **Tool-ready:** designed for MCP/tool integrations and multi-model workflows
- **Cursor-native:** built specifically for `.cursor/rules` and day-to-day Cursor use

## Repository Structure

```text
.cursor/
  AGI-OPERATIONS.md               # prompt kit + operating playbooks
  AGI-GENIE-PLAYBOOK.md           # advanced autonomous + swarm workflows
  MULTI-AGENT-ORCHESTRATION.md    # coordinator + specialist playbooks for AUTO mode
  rules/
    cherryail-master.mdc          # balanced default profile
    cherryail-compact.mdc         # lightweight daily profile
    cherryail-strict-coding.mdc   # maximum implementation profile
    cherryail-project-ops.mdc     # modular and project discipline
    agi-genie-core.mdc            # autonomous behavior layer
    agi-execution-engine.mdc      # delivery framework
    agi-research-and-build.mdc    # research-to-build system
    agi-multi-agent-orchestrator.mdc # parallel specialist orchestration
```

## Quick Start

1. Clone this repository and open it in Cursor.
2. Enable rule files from `.cursor/rules`.
3. Start with `cherryai-agi-ultra.mdc` (current strongest prompt) or `cherryail-master.mdc`.
4. Add AGI rule layers based on the task:
   - `agi-genie-core.mdc`
   - `agi-execution-engine.mdc`
5. Use prompts from `.cursor/AGI-OPERATIONS.md`.
6. For parallel AUTO workflows see `.cursor/MULTI-AGENT-ORCHESTRATION.md` and `docs/PLUGIN-TOOL-MATRIX.md`.
7. For reliability/security expectations before shipping changes, see `docs/RELIABILITY-SECURITY-HARDENING.md`.
8. Rule architecture and walkthroughs: `docs/RULE-ARCHITECTURE.md`, `docs/TUTORIALS/`.
9. Using another model or endpoint with Cursor: `docs/CUSTOM-MODELS.md`.
10. Session bootstrap prompt + roadmap rhythm: `docs/MZ-AI-BOOTSTRAP-PROMPT.md`.
11. Domain rule stubs for forks: `docs/community-templates/`.
12. Rolling MZ AI out on a team: `docs/PRODUCTION-ADOPTION.md`.
13. Docs evolution policy for page moves/releases: `docs/VERSIONING-HANDBOOK.md`.
14. Release snapshots: `docs/releases/`.

## Local Automation

Run local MZ AI toolkit commands:

```bash
npm run validate:all           # rules:validate + rules:doctor (use before PRs)
npm run rules:validate
npm run rules:stacks
npm run rules:doctor
npm run rules:scaffold -- my-new-rule "short description"
npm run rules:export               # merge all rules into dist/cherryai-merged-rules.md
npm run rules:export:ultra         # export the fastest parallel+autonomy stack only
npm run plugins:audit              # run Plugin 001 self-evolution health audit
npm run plugins:roadmap            # run Plugin 002 roadmap batch planner
npm run plugins:loop               # run full self-evolution loop (audit + roadmap)
```

## Self-Evolving Plugins

- `plugins/self-evolution-audit`: repository health checks + improvement suggestions
- `plugins/roadmap-executor`: converts open roadmap items into execution batches

Use these scripts each session to keep MZ AI improving itself inside Cursor.

## Current Master Prompt (May 6, 2026)

Canonical prompt file:

- `.cursor/rules/cherryai-agi-ultra.mdc`

Companion playbook:

- `.cursor/AGI-GENIE-PLAYBOOK.md`

## Recommended Rule Stacks

- **Daily Build**
  - `cherryail-master.mdc`
  - `cherryail-project-ops.mdc`
- **Autonomous Ship**
  - `cherryai-agi-ultra.mdc`
  - `agi-genie-core.mdc`
  - `agi-execution-engine.mdc`
- **Parallel Swarm (Fastest)**
  - `cherryai-agi-ultra.mdc`
  - `agi-multi-agent-orchestrator.mdc`
  - `agi-execution-engine.mdc`
- **Strict Engineering**
  - `cherryail-strict-coding.mdc`
  - `agi-execution-engine.mdc`
- **Research -> Build**
  - `cherryail-compact.mdc`
  - `agi-research-and-build.mdc`

## Project Goals

- Build a public AGI execution framework that works directly in Cursor
- Maximize implementation speed without sacrificing quality or safety
- Keep architecture modular, maintainable, and contributor-friendly
- Provide repeatable workflows teams can adopt quickly

## Contributing

Contributions are welcome. Start with:

1. `CONTRIBUTING.md`
2. `.cursor/AGI-OPERATIONS.md`
3. an issue or discussion proposing the next high-impact upgrade

## Roadmap

See `ROADMAP.md` for upcoming milestones.

## Documentation site

Markdown sources live under `docs/`. A **[MkDocs Material](https://squidfunk.github.io/mkdocs-material/)** site builds into `site/` (ignored by git):

```bash
pip install -r requirements-docs.txt
mkdocs serve
```

Publishing uses GitHub Actions (`.github/workflows/docs.yml`). In the GitHub repo, enable **Pages → GitHub Actions** once so pushes to `main` deploy to **`https://vladislav23811.github.io/CHERRYAI/`** (project Pages URL for this repository).

## Kairo (experimental)

**[Kairo](kairo/README.md)** — local coding copilot: **MCP** tools + multi-turn **sessions**, **`kairo://prompt/engineering`** resource, and a **streaming web UI** (`npm run start:ui` in `kairo/` → http://127.0.0.1:4747). Build: `cd kairo && npm install && npm run build`; Cursor MCP → `kairo/dist/index.js`.

## Wiki

Quick orientation and sidebar navigation (sources in repo [`wiki/`](https://github.com/vladislav23811/CHERRYAI/tree/main/wiki)): **[GitHub Wiki](https://github.com/vladislav23811/CHERRYAI/wiki)**.

Maintainers: enable **Wikis** under repo Settings if the wiki URL is empty; after editing `wiki/*.md`, run **`npm run wiki:sync`** with credentials that can push to `CHERRYAI.wiki.git` (see `CONTRIBUTING.md`).

## License

Personal Use Only (non-commercial) - see `LICENSE`.