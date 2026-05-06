# Multi-Agent Orchestration Playbooks (MZ AI + Cursor)

Use these patterns when **AUTO mode** or multiple Cursor chats/agents can run in parallel. One session acts as **coordinator**; others are **specialists**. Always merge in **small, validated increments**.

## Prerequisites

- Repo root open in Cursor (`mz-ai` project).
- Rule stack (recommended for autonomous work):
  - `cherryai-agi-ultra.mdc`
  - `agi-multi-agent-orchestrator.mdc`
  - `agi-execution-engine.mdc`
- Baseline loop: `npm run plugins:loop` → read batches from `plugins/*/reports/latest.json` (generated locally; gitignored).

## Playbook A — Coordinator + three specialists

**Goal:** Ship one roadmap batch end-to-end with parallel tracks.

| Role | Responsibility | Suggested rules |
|------|----------------|-----------------|
| **Coordinator** | Goal, scope, merge order, debrief | `cherryai-agi-ultra` + `agi-multi-agent-orchestrator` |
| **Architect** | Design + file boundaries + risks | `cherryail-master` + `agi-research-and-build` |
| **Builder** | Implementation slices | `agi-genie-core` + `agi-execution-engine` |
| **Validator** | `npm run validate:all`, plugin smoke tests | `cherryail-strict-coding` + `agi-execution-engine` |

**Coordinator kickoff (paste in AUTO / primary chat):**

```text
MZ AI coordinator mode.
Goal: <roadmap batch objective>.
Specialists: Architect | Builder | Validator (conceptual tracks).
Merge order: design approval → minimal impl PR-sized slices → validate → debrief.
Run npm run plugins:loop once; align work with latest roadmap batch output.
Personal-use license only; no commercial redistribution.
```

**Architect prompt (parallel chat / agent):**

```text
MZ AI architect track only.
Produce: options (2-3), tradeoffs, chosen design, file list, risks.
No large implementation—hand off to Builder.
```

**Builder prompt:**

```text
MZ AI builder track only.
Implement the approved design in smallest reviewable diffs.
Reference @agi-execution-engine patterns.
```

**Validator prompt:**

```text
MZ AI validator track only.
Run npm run validate:all and npm run plugins:audit.
Report failures with concrete fixes; do not expand scope.
```

## Playbook B — Parallel swarm (four tracks)

Aligns with `.cursor/AGI-GENIE-PLAYBOOK.md` §6. Use when the milestone splits cleanly:

1. **Architecture** — interfaces, module boundaries  
2. **Implementation** — core behavior  
3. **Validation** — scripts, checks, regression notes  
4. **Automation / docs** — README, templates, npm scripts  

**Merge rule:** land **implementation + validation** before docs sweep unless docs unblock coding.

## Playbook C — Plugin-oriented swarm

When adding `plugins/<name>/`:

1. **Audit track:** `npm run plugins:audit` → fix gaps  
2. **Spec track:** README + npm script contract  
3. **Code track:** `scripts/*.mjs` implementation  
4. **Integration track:** `README.md` + `package.json` scripts  

Use template `@.cursor/templates/plugin-session.md` in the coordinator chat.

## Handoff artifact (copy between specialists)

```text
Handoff
Goal: ...
Done: ...
Next owner: Architect | Builder | Validator
Files touched: ...
Blockers: ...
Commands run: npm run ...
```

## When *not* to parallelize

- Single-file fix or one lint rule change  
- High ambiguity: run **one** research pass first (`agi-research-and-build`)  
- Security-sensitive change: sequential review preferred  

## After each batch

Run `@.cursor/templates/debrief-log.md` in coordinator chat and update `ROADMAP.md` checkboxes.

---

Copyright (c) 2026 vladislav23811. Personal use only; see `LICENSE`.
