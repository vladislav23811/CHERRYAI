## Summary

Kairo **v0.4.1** on `cursor/ongoing-development-work-6657`: smoke inference backend, orbit vault (`KAIRO_VAULT_DIR`), UI archive flow, `kairo-validate` HTTP probes, and GitHub Actions **Kairo** workflow.

## Test plan

- [ ] `npm run kairo:ci` (**38/38** probes, incl. Ed25519 bundle sign roundtrip)
- [ ] `npm run validate:all`
- [x] GitHub Actions **Kairo** workflow green on `bd6b731` ([run](https://github.com/vladislav23811/CHERRYAI/actions/runs/45815912510))

## Compare

https://github.com/vladislav23811/CHERRYAI/compare/main...cursor/ongoing-development-work-6657?expand=1