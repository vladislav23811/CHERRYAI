## Summary

Kairo **v0.4.1** on `cursor/ongoing-development-work-6657`: smoke inference backend, orbit vault (`KAIRO_VAULT_DIR`), UI archive flow, `kairo-validate` HTTP probes, and GitHub Actions **Kairo** workflow.

## Test plan

- [x] `npm run kairo:ci` (**38/38** probes on branch head, incl. Ed25519 bundle sign roundtrip; re-verified 2026-11-28 06:00 UTC)
- [x] `npm run validate:all` (local, 06:00 UTC re-verify)
- [x] GitHub Actions **Kairo** workflow green on `55dc47e6e247dbaac54af348ec88d434bc561810` ([run](https://github.com/vladislav23811/CHERRYAI/actions/runs/46114870112)); branch tip `55dc47e`, kairo path @ `55dc47e` (`kairo_path_behind_tip: false`; prior on `ae73997` [run](https://github.com/vladislav23811/CHERRYAI/actions/runs/46110153221))
- [x] `npm run automation:open-kairo-pr` returns compare URL (exit 0) when hosted token cannot create PR

## Compare

https://github.com/vladislav23811/CHERRYAI/compare/main...cursor/ongoing-development-work-6657?expand=1