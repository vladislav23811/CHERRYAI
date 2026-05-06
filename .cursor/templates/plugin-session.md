# MZ AI Plugin / Feature Session Template

Use this template when starting a new plugin or feature to ensure MZ AI follows the correct execution loop and integrates seamlessly into the architecture.

**Instructions:** Copy the block below and paste it into Cursor Composer or Chat.

---

```text
@agi-genie-core.mdc @agi-execution-engine.mdc

## Session: MZ AI Plugin / Feature Development
**Plugin/Feature Name:** <Insert Name>
**Goal:** <Describe what this plugin/feature should accomplish>
**Context/Constraints:** <Dependencies, API endpoints, existing systems to integrate with>

## Execution Plan Request
Please begin the AGI Execution Engine process for this Plugin:
1. **Define Phase**: Summarize the plugin's goals, identify extension points, and list tools required.
2. **Design Phase**: Propose the architecture, directory structure (e.g., inside `plugins/`), and how it interacts with the rest of the system.

Pause for my review after the Design Phase. Once approved, we will proceed to the Deliver Phase, and then you will generate any necessary `.mdc` rules to help maintain this plugin in the future!
```