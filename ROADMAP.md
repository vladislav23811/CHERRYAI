# MZ AI Roadmap

## v0.1 - Public Foundation

- [x] Base Cursor rule pack
- [x] AGI execution rule layers
- [x] Operations prompt handbook
- [x] Public examples for common use cases
- [x] Initial contributor onboarding issues

## v0.2 - Automation Layer

- [x] Session templates for feature/debug/research modes
- [x] Validation command presets (type/lint/test bundles)
- [x] Prompt snippets for repo maintenance workflows
- [x] Standardized debrief logs for milestones

## v0.3 - Agentic Scale

- [x] Multi-agent orchestration playbooks
- [x] Plugin/tool integration matrix and guidance
- [x] Reliability and security hardening checklist
- [x] CI-backed quality gates for shared contributions

## v1.0 - CHERRYAI Framework

- [x] Stable rule architecture and naming conventions (`docs/RULE-ARCHITECTURE.md`)
- [x] Full docs site and tutorials (Markdown hub: `docs/TUTORIALS/`; optional static site generator TBD)
- [x] Community templates for domain-specific variants (`docs/community-templates/`)
- [x] Production adoption playbook (`docs/PRODUCTION-ADOPTION.md`)

## Beyond v1.0

- [x] Published docs site (MkDocs Material + `.github/workflows/docs.yml`; enable GitHub Pages → Actions once)
- [x] Curated template gallery workflow (`docs/community-templates/GALLERY.md`, `SUBMITTING.md`, `registry.json`)

## Next explorations

- [x] Versioned handbook (e.g. multi-release docs / redirects) (`docs/VERSIONING-HANDBOOK.md`)
- [x] Moderation playbook for external template submissions (`docs/community-templates/MODERATION.md`)

## Next backlog

- [x] Release-tagged docs snapshots (v1, v2) with explicit nav grouping (`docs/releases/` + `mkdocs.yml` Releases nav)
- [x] Automated schema check for `docs/community-templates/registry.json` in CI (`scripts/validate-template-registry.mjs`, `.github/workflows/docs.yml`)

## Next queue

- [x] Add changelog page for docs/rule evolution milestones
- [x] Add a lightweight docs link-check CI step for changed Markdown

## Kairo (experimental local copilot)

See `kairo/README.md` and `kairo/v0.4.1-spec.md`. CI from repo root: `npm run kairo:ci`.

### v0.4.1 — smoke backend, orbit vault, CI validate

- [x] Smoke inference backend (`KAIRO_BACKEND=smoke`, `KAIRO_SMOKE_REPLY` / `SMOKE_REPLY`)
- [x] Orbit vault (`KAIRO_VAULT_DIR`, `/api/vault/orbits`, `*.orbit.json` records)
- [x] UI **Archive to vault** when vault is enabled
- [x] `kairo-validate.mjs` bundle gate + HTTP probes (ports 14746 / 14747)
- [x] GitHub Actions workflow `.github/workflows/kairo.yml` (`cursor/**`, `main`, `workflow_dispatch`)

### Kairo next

- [ ] Open PR → `main` via compare URL or owner PAT (`npm run automation:open-kairo-pr`)
- [ ] Tauri desktop shell (deferred)
- [x] v1.0.0 bundle signing scaffold (`KAIRO_SIGN_PRIVATE_KEY`, `scripts/bundle-sign.mjs`, optional `kairo:ci` probe)
- [x] CI Ed25519 bundle sign/verify roundtrip (`kairo-validate` ephemeral-key probe)
