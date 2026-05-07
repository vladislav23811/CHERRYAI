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

- [ ] Add changelog page for docs/rule evolution milestones
- [ ] Add a lightweight docs link-check CI step for changed Markdown
