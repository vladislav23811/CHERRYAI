# MZ AI — session bootstrap (paste into Cursor)

## Quick start (one line)

Repo root → `npm run plugins:loop` → attach **`cherryai-agi-ultra.mdc`** + **`agi-execution-engine.mdc`** → paste the **Session block** below with your goal filled in.

## Current framework snapshot

- **v0.3 shipped:** reliability checklist [`RELIABILITY-SECURITY-HARDENING.md`](RELIABILITY-SECURITY-HARDENING.md), CI runs **`npm run validate:all`** (`.github/workflows/rules-validation.yml`).
- **v1.0 docs hub:** [`RULE-ARCHITECTURE.md`](RULE-ARCHITECTURE.md), [`TUTORIALS/`](TUTORIALS/README.md), [`CUSTOM-MODELS.md`](CUSTOM-MODELS.md), [`community-templates/`](community-templates/README.md), [`PRODUCTION-ADOPTION.md`](PRODUCTION-ADOPTION.md).
- **Versioning + moderation:** [`VERSIONING-HANDBOOK.md`](VERSIONING-HANDBOOK.md), [`community-templates/MODERATION.md`](community-templates/MODERATION.md).
- **Published docs (MkDocs):** enable GitHub Pages from Actions once per repo, then browse **`https://vladislav23811.github.io/CHERRYAI/`** (built by `.github/workflows/docs.yml`).

## Roadmap phase → next batch

1. Run **`npm run plugins:loop`** (audit + roadmap executor).
2. Read **`plugins/roadmap-executor/reports/latest.json`** for suggested batches (generated locally).
3. Cross-check **`ROADMAP.md`** — unchecked lines are the human source of truth.

Highest-impact work tends to be the **first unchecked batch** in the earliest open phase.

## Session block (copy everything inside the fence)

```text
MZ AI — autonomous engineering genie.
CONTEXT: mz-ai / CHERRYAI framework; personal-use LICENSE — respect README + LICENSE.
SESSION START DONE IF APPLICABLE: npm run plugins:loop

ROLE: Coordinator | Builder | Validator (pick one; Coordinator splits tracks).

5D LOOP (short):
- Goal / Design / Steps / Risks / Success criteria
- Minimal reviewable diffs; explain WHY on non-obvious edits
- After substantive edits: npm run validate:all
- End with: summary, files touched, validation results, risks, next 1–3 actions

USER GOAL THIS RUN:
<paste single milestone — one roadmap batch item or one concrete deliverable>

RULE STACK HINT:
- Fast autonomy: cherryai-agi-ultra + agi-genie-core + agi-execution-engine
- Parallel swarm: cherryai-agi-ultra + agi-multi-agent-orchestrator + agi-execution-engine
- Playbooks: .cursor/MULTI-AGENT-ORCHESTRATION.md, .cursor/AGI-OPERATIONS.md

SPECIALIST RULE:
Do not expand scope beyond handoff unless Coordinator.
```

## Optional stacks file

`npm run rules:stacks` prints canonical combos from `scripts/print-stacks.mjs`.

---

Copyright (c) 2026 vladislav23811. Personal use only; see `LICENSE`.
