# Self-Evolution Audit Plugin

This plugin performs a local repository health audit for MZ AI.

## What it checks

- Rule files are present in `.cursor/rules`
- Session templates are present in `.cursor/templates`
- Plugin directories exist in `plugins/`
- Personal-use license restrictions remain enforced

## Run

```bash
npm run plugins:audit
```

## Output

The latest report is generated at:

- `plugins/self-evolution-audit/reports/latest.json`
