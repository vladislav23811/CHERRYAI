# CHERRYAI

Open-source Cursor framework for building autonomous "genie" style AI engineering workflows.

CHERRYAI turns Cursor into a high-velocity AGI build environment through production-ready rules, execution loops, and operating playbooks.

## Why CHERRYAI

- **Autonomous execution:** plan -> implement -> validate -> ship loops
- **Quality first:** strict engineering standards and reviewable diffs
- **Tool-ready:** designed for MCP/tool integrations and multi-model workflows
- **Cursor-native:** built specifically for `.cursor/rules` and day-to-day Cursor use

## Repository Structure

```text
.cursor/
  AGI-OPERATIONS.md               # prompt kit + operating playbooks
  AGI-GENIE-PLAYBOOK.md           # advanced autonomous + swarm workflows
  rules/
    cherryail-master.mdc          # balanced default profile
    cherryail-compact.mdc         # lightweight daily profile
    cherryail-strict-coding.mdc   # maximum implementation profile
    cherryail-project-ops.mdc     # modular and project discipline
    agi-genie-core.mdc            # autonomous behavior layer
    agi-execution-engine.mdc      # delivery framework
    agi-research-and-build.mdc    # research-to-build system
    agi-multi-agent-orchestrator.mdc # parallel specialist orchestration
```

## Quick Start

1. Clone this repository and open it in Cursor.
2. Enable rule files from `.cursor/rules`.
3. Start with `cherryai-agi-ultra.mdc` (current strongest prompt) or `cherryail-master.mdc`.
4. Add AGI rule layers based on the task:
   - `agi-genie-core.mdc`
   - `agi-execution-engine.mdc`
5. Use prompts from `.cursor/AGI-OPERATIONS.md`.

## Local Automation

Run local CHERRYAI toolkit commands:

```bash
npm run rules:validate
npm run rules:stacks
```

## Current Master Prompt (May 6, 2026)

Canonical prompt file:

- `.cursor/rules/cherryai-agi-ultra.mdc`

Companion playbook:

- `.cursor/AGI-GENIE-PLAYBOOK.md`

## Recommended Rule Stacks

- **Daily Build**
  - `cherryail-master.mdc`
  - `cherryail-project-ops.mdc`
- **Autonomous Ship**
  - `cherryai-agi-ultra.mdc`
  - `agi-genie-core.mdc`
  - `agi-execution-engine.mdc`
- **Parallel Swarm (Fastest)**
  - `cherryai-agi-ultra.mdc`
  - `agi-multi-agent-orchestrator.mdc`
  - `agi-execution-engine.mdc`
- **Strict Engineering**
  - `cherryail-strict-coding.mdc`
  - `agi-execution-engine.mdc`
- **Research -> Build**
  - `cherryail-compact.mdc`
  - `agi-research-and-build.mdc`

## Project Goals

- Build a public AGI execution framework that works directly in Cursor
- Maximize implementation speed without sacrificing quality or safety
- Keep architecture modular, maintainable, and contributor-friendly
- Provide repeatable workflows teams can adopt quickly

## Contributing

Contributions are welcome. Start with:

1. `CONTRIBUTING.md`
2. `.cursor/AGI-OPERATIONS.md`
3. an issue or discussion proposing the next high-impact upgrade

## Roadmap

See `ROADMAP.md` for upcoming milestones.

## License

MIT - see `LICENSE`.