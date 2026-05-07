# Rule architecture and naming conventions

This document is the **source of truth** for how MZ AI organizes Cursor rules (`.mdc`), how they combine into stacks, and how changes stay safe across releases.

## Layout on disk

| Location | Role |
|----------|------|
| `.cursor/rules/*.mdc` | Executable guidance Cursor loads when you attach rules |
| `.cursor/templates/` | Session/debrief/plugin outlines agents reuse |
| `.cursor/AGI-OPERATIONS.md` | Prompt kit and rhythm |
| `.cursor/MULTI-AGENT-ORCHESTRATION.md` | Coordinator vs specialist playbooks |
| `.cursor/AGI-GENIE-PLAYBOOK.md` | Advanced autonomous workflows |
| `docs/` | Human-facing tutorials and matrices (`PLUGIN-TOOL-MATRIX.md`, etc.) |
| `scripts/validate-rules.mjs` | CI/local gate: every `.mdc` must satisfy the contract below |

## Naming conventions

Rules use **kebab-case** filenames ending in `.mdc`.

### Prefix families

| Prefix | Purpose | Examples |
|--------|---------|----------|
| `cherryail-*` | CHERRYAIL daily/engineering profiles (tone + discipline) | `cherryail-master.mdc`, `cherryail-strict-coding.mdc` |
| `cherryai-*` | Meta/orchestration bundles (“ultimate” stacks) | `cherryai-agi-ultra.mdc` |
| `agi-*` | AGI execution layers (loops, parallelism, research) | `agi-genie-core.mdc`, `agi-multi-agent-orchestrator.mdc` |
| `speed-*` | Ultra-short burst modes | `speed-burst.mdc` |

When adding a **domain-specific** rule in a fork, prefer a **project-specific prefix** (for example `acme-security-review.mdc`) so upstream MZ AI naming stays recognizable.

### Canonical bundles

Recommended stacks are duplicated for humans in `README.md` and for tooling in `scripts/print-stacks.mjs`. When you add a rule that belongs in a default stack, update **both** places plus `npm run rules:export:ultra` inputs if it ships with the ultra slice (`package.json` → `rules:export:ultra`).

## Rule file format (contract)

Every file under `.cursor/rules/` **must**:

1. Start with YAML frontmatter enclosed by `---`
2. Include `description:` (single-line summary)
3. Include `alwaysApply:` (`true` or `false`)

`scripts/validate-rules.mjs` enforces these markers in CI (`npm run validate:all`).

Template for new rules:

```bash
npm run rules:scaffold -- my-rule-name "One-line description of behavior"
```

Then edit sections (`Purpose`, `Behavior`, `Validation`) for specificity.

## How rules interact

- **Cursor** loads whichever rules you enable for the workspace/chat; MZ AI does not ship runtime merging beyond Cursor’s behavior.
- **Stacks** are a **documentation + ergonomics** convention: combine one CHERRYAIL profile with targeted `agi-*` layers instead of enabling everything at once.
- **`alwaysApply`**: keep `false` for specialty layers so operators opt in deliberately; reserve `true` only for narrow repos where every chat needs the same baseline (avoid duplication).

Higher autonomy workloads typically stack:

1. `cherryai-agi-ultra.mdc` (or `cherryail-master.mdc` for calmer defaults)
2. `agi-genie-core.mdc` + `agi-execution-engine.mdc`
3. Optionally `agi-multi-agent-orchestrator.mdc` when parallel specialist chats exist

See `.cursor/MULTI-AGENT-ORCHESTRATION.md` for coordinator/builder/validator splits.

## Bundling for reuse

- **`npm run rules:export`** — merges configured rules into `dist/cherryai-merged-rules.md` for sharing/review outside Cursor.
- **`npm run rules:export:ultra`** — exports the fast autonomy subset defined in `package.json`.

Treat exported Markdown as **generated collateral**, not the editable source of truth.

## Versioning strategy

| Surface | Strategy |
|---------|-----------|
| **Repository** | SemVer-style milestones tracked in `ROADMAP.md` (v0.x foundation → v1.0 framework). |
| **Rules** | Improve via small PRs; each merge must pass `npm run validate:all`. Prefer additive guidance over silent semantic shifts (say “replace behavior X with Y” in PR descriptions when tone changes materially). |
| **Breaking tone changes** | Call them out in the PR body and bump roadmap/checklists when adoption guides change (`README.md`, tutorials). |
| **Snapshots/dates** | When naming “current master prompt”, reflect calendar accuracy (`README.md` — audit periodically). |

A separately hosted **static docs site** (e.g. VitePress, MkDocs) is optional future packaging for these Markdown docs.

## Related documents

- Tutorials: `docs/TUTORIALS/README.md`
- Community domain stubs (copy into your repo): [`community-templates/README.md`](community-templates/README.md)
- Production rollout: [`PRODUCTION-ADOPTION.md`](PRODUCTION-ADOPTION.md)
- Session bootstrap: [`MZ-AI-BOOTSTRAP-PROMPT.md`](MZ-AI-BOOTSTRAP-PROMPT.md)
- Custom / alternate LLM backends (Cursor): [`CUSTOM-MODELS.md`](CUSTOM-MODELS.md)
- Tool integrations: `docs/PLUGIN-TOOL-MATRIX.md`
- Reliability/security checklist: `docs/RELIABILITY-SECURITY-HARDENING.md`

---

Copyright (c) 2026 vladislav23811. Personal use only; see `LICENSE`.
