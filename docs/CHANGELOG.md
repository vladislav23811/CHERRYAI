# Docs & framework changelog

Highlights for the **documentation site**, **rule architecture**, **community templates**, and related tooling. This is not a semver package changelog — see [Release snapshots](releases/README.md) for frozen doc trees by release tag.

## Unreleased

- _(append milestones here before grouping under a month heading)_

## 2026-05

- Published docs pipeline: MkDocs Material, strict builds, GitHub Actions → Pages (`mkdocs.yml`, `.github/workflows/docs.yml`).
- Community templates: gallery, submission guide, moderation playbook, stub index, and `registry.json` with CI schema validation.
- Release snapshots (`docs/releases/`) with explicit nav; versioning handbook for redirects and multi-release docs.
- Pull requests: lightweight link check on changed Markdown under `docs/` (`npm run docs:check-links`).

## 2026-04

- Stable rule architecture naming and stacks (`RULE-ARCHITECTURE.md`).
- Production adoption playbook and reliability / security hardening checklist.
- Tutorials: first custom AGI rule; autonomous multi-agent sessions.
- Plugin / tool matrix and custom models guidance.
- Session bootstrap prompt and examples for bootstrapping features and research refactors.
