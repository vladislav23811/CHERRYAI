## Summary

Kairo **v0.4.1** on `cursor/ongoing-development-work-6657`: smoke inference backend, orbit vault (`KAIRO_VAULT_DIR`), UI archive flow, `kairo-validate` HTTP probes, and GitHub Actions **Kairo** workflow.

## Test plan

- [x] `npm run kairo:ci` (**38/38** probes on branch head, incl. Ed25519 bundle sign roundtrip; re-verified 2026-11-28 00:00 UTC)
- [x] `npm run validate:all` (local, kairo path @ `8d7a6a5`)
- [x] GitHub Actions **Kairo** workflow on `8d7a6a5` after push; prior green on `c7c2bda` ([run](https://github.com/vladislav23811/CHERRYAI/actions/runs/46080297175))
- [x] `npm run automation:open-kairo-pr` returns compare URL (exit 0) when hosted token cannot create PR

## Compare

https://github.com/vladislav23811/CHERRYAI/compare/main...cursor/ongoing-development-work-6657?expand=1