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
- [ ] Kairo changes: `npm run kairo:ci` passes locally (mirrors CI **Kairo** workflow; on GitHub you can also use **Actions → Kairo → Run workflow**)
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

## GitHub wiki

Orientation pages are tracked in **`wiki/`** on `main` and mirrored to **[github.com/vladislav23811/CHERRYAI/wiki](https://github.com/vladislav23811/CHERRYAI/wiki)**.

If `git clone https://github.com/vladislav23811/CHERRYAI.wiki.git` fails with “repository not found”, enable **Wikis** under **Settings → General → Features** for the repo (repo admins only), then create or sync the wiki.

Publish updates after editing `wiki/*.md`:

```bash
npm run wiki:sync
```

Preview commands without cloning:

```bash
npm run wiki:sync -- --dry-run
```

Use a Git credential that can push to `*.wiki.git` (HTTPS + PAT or SSH). Override remote with **`WIKI_REMOTE`** if you use a fork. The script clones into **`.wiki-sync/`** (gitignored), copies markdown from **`wiki/`**, commits when there are changes, and pushes.

## Cursor Cloud Agent pushes

Cloud Agents that commit to this repo (for example the hourly **Continue development** automation on `cursor/ongoing-development-work-6657`) need push credentials in the agent environment.

1. Open your [Cloud Agent environment](https://cursor.com/dashboard/cloud-agents/environments) and add a secret **`GITHUB_TOKEN`** or **`GH_TOKEN`**.
2. Use a GitHub personal access token with **`repo`** and **`workflows`** scopes (fine-grained: Contents read/write + Actions read/write on this repository).
3. Re-run the agent; `git push` over HTTPS should succeed without interactive login.

Pushes to `cursor/**` branches run the **Kairo** workflow when `kairo/**` (or related paths) change, same as `main`.
