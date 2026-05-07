# Reliability and security hardening checklist

Use this before merging substantive changes and when onboarding new tooling (MCP, plugins, CI).

## Repository integrity

- [ ] No secrets, tokens, or private URLs committed (scan staged diff).
- [ ] `LICENSE` and personal-use notices stay intact where required (`README`, audit scripts expectations).
- [ ] Changes align with `ROADMAP.md`; plugin reports regenerated when roadmap-facing scripts change (`npm run plugins:loop`).

## Rules and automation

- [ ] `npm run validate:all` passes locally (rules validator + rules doctor).
- [ ] New or renamed `.cursor/rules/*.mdc` files follow existing frontmatter and naming patterns (`npm run rules:doctor`).
- [ ] Session templates and orchestration docs updated only when workflow contracts actually change.

## Tools and MCP surface

- [ ] New MCP servers or tools are intentional; scope documented or referenced in [`PLUGIN-TOOL-MATRIX.md`](PLUGIN-TOOL-MATRIX.md).
- [ ] Untrusted inputs (webhooks, user payloads, scraped content) are not executed blindly in CI or repo scripts.

## CI and contributions

- [ ] PRs targeting `main` rely on GitHub Actions **Validate** workflow (`npm run validate:all`).
- [ ] If adding npm dependencies later: pin versions (`package-lock.json` or equivalent) and keep install reproducible.

## Agent and human review

- [ ] Coordinator merged specialist outputs without scope bleed (multi-agent work).
- [ ] Rollback story exists for risky edits (revert commit, feature flag N/A for this repo).

---

Maintain this list as the framework evolves; keep items observable (binary checks where possible).
