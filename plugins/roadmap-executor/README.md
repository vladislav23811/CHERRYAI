# Autonomous Roadmap Executor Plugin

This plugin reads `ROADMAP.md`, extracts unchecked items, and groups them into execution batches.

## Run

```bash
npm run plugins:roadmap
```

## Output

The latest batch plan is generated at:

- `plugins/roadmap-executor/reports/latest.json`

Use each batch as the next autonomous implementation sprint.
