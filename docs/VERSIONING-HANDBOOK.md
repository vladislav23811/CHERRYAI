# Versioned handbook strategy

This guide explains how to evolve MZ AI docs without breaking old links or workflows.

## Objectives

- Keep one stable URL for latest docs (`/CHERRYAI/`).
- Preserve references from old chats/tutorials when docs move.
- Make version milestones explicit (`v0.x`, `v1.x`, etc.).

## Version policy

- **Current docs in `docs/` are latest.**
- Major shifts (terminology, structure, onboarding flow) should:
  1. land in latest docs,
  2. add redirect notes for moved pages,
  3. update bootstrap links.

## Lightweight approach (current)

1. Keep canonical pages in `docs/`.
2. When a page moves, leave a short “moved” note in the old path for one cycle.
3. Record major doc moves in changelog bullets inside PR descriptions.

## Optional multi-release expansion

If docs diverge per release, use:

- `docs/releases/v1/`
- `docs/releases/v2/`

And expose them in `mkdocs.yml` nav as “Releases”.

Current scaffold is in:

- [`releases/README.md`](releases/README.md)
- [`releases/v1/index.md`](releases/v1/index.md)
- [`releases/v2/index.md`](releases/v2/index.md)

## Redirect hygiene

- Avoid deleting high-traffic pages abruptly.
- Prefer “soft redirect” Markdown page with:
  - one-line reason,
  - link to new canonical page,
  - retirement date.

## Validation

- `mkdocs build --strict`
- spot-check top links in:
  - `docs/index.md`
  - `docs/MZ-AI-BOOTSTRAP-PROMPT.md`
  - `README.md`

---

Copyright (c) 2026 vladislav23811. Personal use only; see `LICENSE`.
