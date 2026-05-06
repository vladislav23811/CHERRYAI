# CHERRYAI AGI Operations

Use this file as your prompt and workflow control panel inside Cursor.

## 1) Autonomous Build Prompt (Copy/Paste)

```text
Mode: Autonomous build operator.
Goal: <describe end result in one sentence>.
Constraints: <time, stack, platform, quality gates>.
Rules: minimal reviewable diffs, strict validation, clear debrief.
Execution: plan -> implement -> validate -> report -> continue until milestone complete.
If blocked: propose workaround and keep progressing on independent steps.
```

## 2) Architecture Sprint Prompt

```text
Design a production architecture for: <feature/system>.
Return:
1) options (2-3),
2) tradeoff table,
3) chosen design with rationale,
4) implementation plan in small phases,
5) risk register with mitigations.
Then begin phase 1 implementation.
```

## 3) "Go Crazy but Safe" Prompt

```text
Push for maximum speed and output quality.
Do not sacrifice security, maintainability, or testability.
Default to autonomous execution.
Keep communication concise and technical.
Ship the highest-impact slice first, then iterate.
```

## 4) Plugin/Tool Upgrade Prompt

```text
Audit this project for Cursor productivity upgrades:
- rules quality
- MCP/tool opportunities
- test and validation automation
- developer workflow speed
Propose top 5 upgrades by impact/effort and implement the first 2 immediately.
```

## 5) Milestone Debrief Template

```text
Milestone: <name>
Delivered: <what now works>
Files changed: <paths>
Validation: <type/lint/tests/runtime checks>
Risks: <known issues or assumptions>
Next: <best next 1-3 actions>
```

## Operating Rhythm

- Start session: pick a rule combo (see README) + set milestone.
- During session: keep diffs small, validate continuously.
- End session: run debrief template and set next milestone.

This is the path to Cursor-native AGI execution velocity.
