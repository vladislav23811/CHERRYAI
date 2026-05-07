# Submitting a community template

Use this checklist before opening a PR that adds or changes a stub under [`stubs/README.md`](stubs/README.md).

## Requirements

- [ ] **One domain per file** — avoid mega-rules; compose with MZ AI base stacks instead.
- [ ] **Valid Cursor shape** — YAML frontmatter with `description:` and `alwaysApply:` (usually `false`).
- [ ] **No secrets or tenant-specific data** in examples.
- [ ] **Placeholder naming** — use `[YOUR PROJECT]` / `[YOUR TEAM]` style markers users replace after copy.
- [ ] **Linked from** [`README.md`](README.md) and [`GALLERY.md`](GALLERY.md).
- [ ] **Optional:** add an entry to [`registry.json`](registry.json) (`id`, `title`, `path`, `summary`).

## PR hygiene

- [ ] Small, focused diff.
- [ ] If you change docs navigation, confirm **`mkdocs build --strict`** passes locally or in CI.
- [ ] Ensure registry schema check passes: `npm run templates:validate-registry`.

## After merge

Maintainers bump gallery copy if the stub’s intent shifts materially.
For triage levels and escalation rules, see [`MODERATION.md`](MODERATION.md).

---

Copyright (c) 2026 vladislav23811. Personal use only; see `LICENSE`.
