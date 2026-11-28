## Summary

Kairo **v0.4.1** on `cursor/ongoing-development-work-6657`: smoke inference backend, orbit vault (`KAIRO_VAULT_DIR`), UI archive flow, `kairo-validate` HTTP probes, and GitHub Actions **Kairo** workflow.

## Test plan

- [x] `npm run kairo:ci` (**38/38** probes on branch head, incl. Ed25519 bundle sign roundtrip; re-verified 2026-11-28 08:00 UTC)
- [x] `npm run validate:all` (local, 08:00 UTC re-verify)
- [x] GitHub Actions **Kairo** workflow green on `ca5e41679478df1787fae5f40546d6e7484c45e3` ([run](https://github.com/vladislav23811/CHERRYAI/actions/runs/46119385105)); prior on `55dc47e` ([run](https://github.com/vladislav23811/CHERRYAI/actions/runs/46114870112))
- [x] `npm run automation:open-kairo-pr` returns compare URL (exit 0) when hosted token cannot create PR

## Compare

https://github.com/vladislav23811/CHERRYAI/compare/main...cursor/ongoing-development-work-6657?expand=1