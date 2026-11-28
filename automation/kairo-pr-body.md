## Summary

Kairo **v0.4.1** on `cursor/ongoing-development-work-6657`: smoke inference backend, orbit vault (`KAIRO_VAULT_DIR`), UI archive flow, `kairo-validate` HTTP probes, and GitHub Actions **Kairo** workflow.

## Test plan

- [x] `npm run kairo:ci` (**38/38** probes on branch head, incl. Ed25519 bundle sign roundtrip; re-verified 2026-11-28 01:00 UTC)
- [x] `npm run validate:all` (local, kairo path @ `84ba762697c9024ead7f8c090c8aaae28934300c`)
- [x] GitHub Actions **Kairo** workflow green on `84ba762697c9024ead7f8c090c8aaae28934300c` ([run](https://github.com/vladislav23811/CHERRYAI/actions/runs/46091213222)); branch tip and kairo path aligned on commit 1 (`kairo_path_behind_tip: false` until automation-only commit; use `npm run automation:open-kairo-pr` after push for final shas)
- [x] `npm run automation:open-kairo-pr` returns compare URL (exit 0) when hosted token cannot create PR

## Compare

https://github.com/vladislav23811/CHERRYAI/compare/main...cursor/ongoing-development-work-6657?expand=1