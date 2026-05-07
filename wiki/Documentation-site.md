# Documentation site

The repository ships **Markdown sources** under [`docs/`](https://github.com/vladislav23811/CHERRYAI/tree/main/docs). They build with **MkDocs Material** into `site/` (local only; not committed).

## Browse online

- **Published site (GitHub Pages):** https://vladislav23811.github.io/CHERRYAI/

Enable **Pages → GitHub Actions** once on the repo if the site is not deployed yet.

## Build locally

```bash
pip install -r requirements-docs.txt
mkdocs serve
```

Strict CI build: `mkdocs build --strict` (see `.github/workflows/docs.yml`).

## Recent tooling

- Docs changelog (milestones): [`docs/CHANGELOG.md`](https://github.com/vladislav23811/CHERRYAI/blob/main/docs/CHANGELOG.md)
- Pull requests: link checking runs on **changed** Markdown under `docs/` (`npm run docs:check-links` in CI)
- Community templates: registry validated in CI (`npm run templates:validate-registry`)

This wiki page stays short on purpose; use the site or raw `docs/` files for full navigation.
