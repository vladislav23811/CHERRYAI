# Contributing to CHERRYAI

Thanks for contributing.

## Development Principles

- Keep changes small and reviewable.
- Prefer clarity over cleverness.
- Preserve security and reliability by default.
- Add tests for meaningful logic changes.
- Document why a change exists, not only what changed.

## Rule-Driven Workflow

1. Select a rule stack from `README.md`; conventions in `docs/RULE-ARCHITECTURE.md`, tutorials in `docs/TUTORIALS/`, paste-ready session opener in `docs/MZ-AI-BOOTSTRAP-PROMPT.md`.
2. Use `.cursor/AGI-OPERATIONS.md` to launch execution prompts.
3. Ship one milestone at a time.
4. Validate touched paths before opening a PR.

## Pull Request Checklist

- [ ] Scope is focused and clearly described
- [ ] Relevant tests added or updated
- [ ] Lint/type checks pass for touched files
- [ ] `npm run validate:all` passes locally (mirrors CI **Validate** workflow)
- [ ] Docs changes: `pip install -r requirements-docs.txt && mkdocs build --strict` (mirrors CI **Docs** workflow)
- [ ] Review `docs/RELIABILITY-SECURITY-HARDENING.md` for security/reliability touchpoints
- [ ] Security/performance implications considered
- [ ] Docs updated when behavior changed

## Commit Style

Use imperative subject lines:

- `Add AGI execution engine rule`
- `Refine README quick-start`
- `Fix prompt workflow wording`

## Community

Be respectful, direct, and constructive.
