# How to run autonomous multi-agent sessions

Use **parallel Cursor chats or agents** when one roadmap batch splits cleanly across design, implementation, and validation. One session coordinates; specialists execute narrow tracks.

## Prerequisites

- MZ AI repo root open in Cursor.
- Orchestration reference handy: `.cursor/MULTI-AGENT-ORCHESTRATION.md`.
- Recommended rule stack for coordinators:
  - `cherryai-agi-ultra.mdc`
  - `agi-multi-agent-orchestrator.mdc`
  - `agi-execution-engine.mdc`

Baseline alignment (once per session from repo root):

```bash
npm run plugins:loop
```

Read `plugins/*/reports/latest.json` for suggested roadmap batches (generated locally; gitignored).

## Step 1 — Declare coordinator ownership

In your **primary** chat (coordinator), paste a compact charter:

```text
MZ AI coordinator mode.
Goal: <single roadmap batch or milestone>.
Specialists: Architect | Builder | Validator (conceptual tracks).
Merge order: design approval → minimal implementation slices → validate → debrief.
Personal-use license only; respect LICENSE.
```

Keep scope **one batch**. If ambiguous, run a single research pass first (`agi-research-and-build`) instead of parallelizing.

## Step 2 — Spin up specialist tracks

Open **separate** chats/agents (names optional):

| Track | Mission | Suggested rules |
|-------|---------|-----------------|
| **Architect** | Options, tradeoffs, chosen design, file list, risks — **no large impl** | `cherryail-master.mdc`, `agi-research-and-build.mdc` |
| **Builder** | Small diffs matching approved design | `agi-genie-core.mdc`, `agi-execution-engine.mdc` |
| **Validator** | `npm run validate:all`, focused smoke checks — **no scope creep** | `cherryail-strict-coding.mdc`, `agi-execution-engine.mdc` |

Paste role-specific kickoffs from `MULTI-AGENT-ORCHESTRATION.md` (Architect / Builder / Validator blocks).

## Step 3 — Move artifacts with explicit handoffs

Between chats, copy a short block:

```text
Handoff
Goal: ...
Done: ...
Next owner: Architect | Builder | Validator
Files touched: ...
Blockers: ...
Commands run: npm run ...
```

No handoff → duplicated work or contradictory edits.

## Step 4 — Merge order

Default merge discipline:

1. Land **implementation + validation** before broad documentation sweeps (unless docs unblock coding).
2. Coordinator resolves conflicts and trims scope when specialists drift.
3. Run **`npm run validate:all`** on integrated branches before declaring done.

## Step 5 — Close the loop

- Coordinator fills `@.cursor/templates/debrief-log.md` (or equivalent summary).
- Update checkboxes in `ROADMAP.md` when deliverables match milestones.

## When **not** to parallelize

- Single-file fixes or trivial edits.
- Security-sensitive changes needing sequential human review.
- Unclear requirements — clarify first.

## Related reading

- Full playbooks: `.cursor/MULTI-AGENT-ORCHESTRATION.md`
- Advanced swarm flows: `.cursor/AGI-GENIE-PLAYBOOK.md`
- Creating rules specialists must follow: [How to create your first custom AGI rule](how-to-create-your-first-custom-agi-rule.md)

---

Copyright (c) 2026 vladislav23811. Personal use only; see `LICENSE`.
