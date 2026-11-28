## Summary

Kairo **v0.4.1** on `cursor/ongoing-development-work-6657`: smoke inference backend, orbit vault (`KAIRO_VAULT_DIR`), UI archive flow, `kairo-validate` HTTP probes, and GitHub Actions **Kairo** workflow.

## Test plan

- [x] `npm run kairo:ci` (**38/38** probes on branch head, incl. Ed25519 bundle sign roundtrip; re-verified 2026-11-28 09:00 UTC)
- [x] `npm run validate:all` (local, 09:00 UTC re-verify)
- [x] GitHub Actions **Kairo** workflow green on `b27a2b0d625b1267df0269ad637aafeb0c02679d` ([run](https://github.com/vladislav23811/CHERRYAI/actions/runs/46128478566)); prior on `093bc09` ([run](https://github.com/vladislav23811/CHERRYAI/actions/runs/46123985198))
- [x] `npm run automation:open-kairo-pr` returns compare URL (exit 0) when hosted token cannot create PR

## Compare

https://github.com/vladislav23811/CHERRYAI/compare/main...cursor/ongoing-development-work-6657?expand=1