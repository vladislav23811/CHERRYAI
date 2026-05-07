# How to create your first custom AGI rule

This tutorial ships a **new Cursor rule** in MZ AI style: validated `.mdc` frontmatter, clear sections, and a smoke check before you rely on it in production chats.

## Prerequisites

- Repo cloned and opened at the root (`mz-ai`).
- Node.js available for npm scripts (same major version CI uses — see `.github/workflows/rules-validation.yml`).

## Step 1 — Pick a name and audience

Answer briefly:

1. **When should this rule apply?** (e.g., “only when touching Convex backends”.)
2. **What failure mode does it prevent?** (e.g., missing auth checks.)
3. **Is it always-on or opt-in?** Default MZ AI rules keep `alwaysApply: false` unless you intend global enforcement.

Choose a **kebab-case** filename (see [`RULE-ARCHITECTURE.md`](../RULE-ARCHITECTURE.md)).

## Step 2 — Scaffold the file

From the repository root:

```bash
npm run rules:scaffold -- my-domain-rule "Short description for Cursor UI"
```

This creates `.cursor/rules/my-domain-rule.mdc` with valid frontmatter (`description`, `alwaysApply`).

## Step 3 — Fill in behavior

Edit the scaffold sections:

- **Purpose** — One paragraph on intent and scope boundaries.
- **Behavior** — Bullet list of non-negotiables (what the agent must/must not do).
- **Validation** — How a human confirms the rule worked (commands, files to inspect).

Keep guidance **specific**. Long essays dilute signal; cross-link external docs instead.

## Step 4 — Validate locally

```bash
npm run validate:all
```

Fix any validator errors (`rules:validate`) before continuing.

Use `npm run rules:doctor` output as optional overlap/coverage hints — tighten wording if multiple rules duplicate the same mandate.

## Step 5 — Attach in Cursor

1. Open Cursor rule settings for this workspace.
2. Enable `my-domain-rule.mdc` alongside a baseline stack from `README.md` (for example `cherryail-master.mdc` + `agi-execution-engine.mdc`).
3. Run a **small** task and confirm the assistant follows the new constraints.

## Step 6 — Share or export (optional)

- **`npm run rules:export`** — produce merged Markdown under `dist/` for reviewers who do not use Cursor.
- Update **`README.md` stacks** only if this rule should become a **recommended default** for all contributors.

## Common pitfalls

- Missing frontmatter keys → CI fails.
- `alwaysApply: true` everywhere → conflicting mandates; prefer stacks.
- Renaming files → update stacks (`README.md`, `scripts/print-stacks.mjs`, export scripts if applicable).

## Next steps

- Multi-chat autonomy: [How to run autonomous multi-agent sessions](how-to-run-autonomous-multi-agent-sessions.md)
- Naming deep dive: [`RULE-ARCHITECTURE.md`](../RULE-ARCHITECTURE.md)

---

Copyright (c) 2026 vladislav23811. Personal use only; see `LICENSE`.
