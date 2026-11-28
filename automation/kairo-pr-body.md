## Summary

Kairo **v0.4.1** on `cursor/ongoing-development-work-6657`: smoke inference backend, orbit vault (`KAIRO_VAULT_DIR`), UI archive flow, `kairo-validate` HTTP probes, and GitHub Actions **Kairo** workflow.

## Test plan

- [x] `npm run kairo:ci` (**38/38** probes on branch head, incl. Ed25519 bundle sign roundtrip; re-verified 2026-11-28 12:00 UTC)
- [x] `npm run validate:all` (local, 12:00 UTC re-verify)
- [x] GitHub Actions **Kairo** workflow green on `f48f975d46860a0bb871c792d12f7da52e75e5f1` ([run](https://github.com/vladislav23811/CHERRYAI/actions/runs/46142690349)); prior on `67d25b1` ([run](https://github.com/vladislav23811/CHERRYAI/actions/runs/46137916888))
- [x] `npm run automation:open-kairo-pr` returns compare URL (exit 0) when hosted token cannot create PR

## Compare

https://github.com/vladislav23811/CHERRYAI/compare/main...cursor/ongoing-development-work-6657?expand=1