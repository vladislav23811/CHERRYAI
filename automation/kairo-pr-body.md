## Summary

Kairo **v0.4.1** on `cursor/ongoing-development-work-6657`: smoke inference backend, orbit vault (`KAIRO_VAULT_DIR`), UI archive flow, `kairo-validate` HTTP probes, and GitHub Actions **Kairo** workflow.

## Test plan

- [ ] `npm run kairo:ci` (**38/38** probes, incl. Ed25519 bundle sign roundtrip)
- [ ] `npm run validate:all`
- [ ] GitHub Actions **Kairo** workflow green on this branch (head `7272cf7`+)

## Compare

https://github.com/vladislav23811/CHERRYAI/compare/main...cursor/ongoing-development-work-6657?expand=1