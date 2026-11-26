## Summary

Kairo **v0.4.1** on `cursor/ongoing-development-work-6657`: smoke inference backend, orbit vault (`KAIRO_VAULT_DIR`), UI archive flow, `kairo-validate` HTTP probes, and GitHub Actions **Kairo** workflow.

## Test plan

- [x] `npm run kairo:ci` (**38/38** probes on branch head, incl. Ed25519 bundle sign roundtrip)
- [x] `npm run validate:all` (local, branch head)
- [x] GitHub Actions **Kairo** workflow green on branch head `56b3a2e` ([run](https://github.com/vladislav23811/CHERRYAI/actions/runs/45844851237))

## Compare

https://github.com/vladislav23811/CHERRYAI/compare/main...cursor/ongoing-development-work-6657?expand=1