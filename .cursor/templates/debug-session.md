# Debug Session Template

Use this template when investigating and resolving a bug. It forces the AGI Genie to adopt a systematic, evidence-based approach to debugging.

**Instructions:** Copy the block below and paste it into Cursor Composer or Chat.

---

```text
@agi-genie-core.mdc @agi-execution-engine.mdc

## Session: Debug & Resolve
**Bug Description:** <Describe what is broken>
**Expected Behavior:** <Describe what should happen>
**Steps to Reproduce:** <How to trigger the bug>
**Error Logs/Context:** <Paste any relevant logs or error messages>

## Execution Plan Request
Please begin the AGI Execution Engine process with a focus on debugging:
1. **Define Phase**: Analyze the bug description, identify potential root causes, and list the files that need investigation.
2. **Design Phase**: Propose a fix, explaining the rationale and any potential side effects.

Pause for my review after the Design Phase. Once approved, we will proceed to the Deliver Phase to implement the fix and add regression tests.
```
