# Community templates (domain overlays)

Copy-ready **rule stubs** for forks and application repos. They are **not** loaded automatically: MZ AI only validates files under `.cursor/rules/`.

## How to use

1. Pick a stub under [`stubs/README.md`](stubs/README.md).
2. Copy into **your** project at `.cursor/rules/<meaningful-name>.mdc`.
3. Replace bracketed placeholders (`[SERVICE NAME]`, `[YOUR TEAM]`, …).
4. Run `npm run validate:all` in projects that reuse MZ AI validation scripts, or match your own lint gates.

## Bundling with MZ AI stacks

| Working style | Suggested MZ AI base |
|---------------|----------------------|
| Everyday shipping | `cherryail-master.mdc` + `agi-execution-engine.mdc` |
| Autonomous batches | `cherryai-agi-ultra.mdc` + `agi-genie-core.mdc` + `agi-execution-engine.mdc` |
| Parallel specialists | add `agi-multi-agent-orchestrator.mdc` |

See [`RULE-ARCHITECTURE.md`](../RULE-ARCHITECTURE.md) for naming and frontmatter rules.

## Gallery workflow

- Curated list + registry pointers: [`GALLERY.md`](GALLERY.md)
- Contribution checklist: [`SUBMITTING.md`](SUBMITTING.md)
- Maintainer moderation flow: [`MODERATION.md`](MODERATION.md)
- Machine-readable index: [`registry.json`](registry.json)

## Stubs in this folder

| File | Intent |
|------|--------|
| [`stubs/web-api-surface.mdc`](stubs/web-api-surface.mdc) | REST/HTTP handlers, validation, errors, authz hints |
| [`stubs/data-pipeline.mdc`](stubs/data-pipeline.mdc) | ETL / batch jobs / idempotency / observability |
| [`stubs/security-sdlc.mdc`](stubs/security-sdlc.mdc) | Threat-ish mindset for changes touching auth, data, or infra |

Contribute new stubs via focused PRs (one domain per file).

---

Copyright (c) 2026 vladislav23811. Personal use only; see `LICENSE`.
