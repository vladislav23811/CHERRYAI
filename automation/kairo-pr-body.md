## Summary

Kairo **v0.4.1** on `cursor/ongoing-development-work-6657`: smoke inference backend, orbit vault (`KAIRO_VAULT_DIR`), UI archive flow, `kairo-validate` HTTP probes, and GitHub Actions **Kairo** workflow.

## Test plan

- [x] `npm run kairo:ci` (**38/38** probes on branch head, incl. Ed25519 bundle sign roundtrip; re-verified 2026-11-27 20:00 UTC)
- [x] `npm run validate:all` (local, kairo path @ `33dad9f`)
- [x] GitHub Actions **Kairo** workflow green on `33dad9f` ([run](https://github.com/vladislav23811/CHERRYAI/actions/runs/46060863444)); automation docs commit ahead of kairo path (`kairo_path_behind_tip: true`, branch head @ `075c1f6`)
- [x] `npm run automation:open-kairo-pr` returns compare URL (exit 0) when hosted token cannot create PR

## Compare

https://github.com/vladislav23811/CHERRYAI/compare/main...cursor/ongoing-development-work-6657?expand=1