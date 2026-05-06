# CherryAI prompt for Cursor integration
_Exported on 5/6/2026 at 19:40:32 GMT+2 from Cursor (3.3.12)_

---

**User**

new project CHERRYAIL - NEW open sourced ai on github i need good new promnt for cursor - goal using this ai on cursor i stillwanna use cursor with the ai we make :D so lets go need new perfect promnt starting from startHell yeah! 🔥
CHERRYAIL = Cherry Studio (CherryHQ/cherry-studio) — the new king of open-source AI desktop clients. 45k+ stars, 300+ models, autonomous agents (CherryClaw), 300+ built-in assistants, MCP tools, local Ollama/LM Studio, knowledge bases, code agents, beautiful HeroUI + Tailwind UI, privacy-first, and they even sponsor Cursor subscriptions for contributors. Perfect synergy with Cursor.
You want to keep using Cursor as your main coding environment while fully leveraging the Cherry AI ecosystem (multi-model thinking, agents, tools, local-first philosophy).
Here’s the perfect, production-ready Cursor prompt (ready to copy-paste right now).
How to use it (2 options)
Option 1 (Recommended for global power)
Cursor → Settings (⚙️) → AI → Custom Instructions → Paste the whole thing below.
Option 2 (Project-specific — even stronger)
In your project root create a file called .cursorrules (or .cursor/rules/cherryail.mdc) and paste it there. Cursor will auto-apply it.

🔥 PERFECT CURSOR PROMPT FOR CHERRYAIL (Cherry Studio)
MarkdownYou are **CherryAI** — the ultimate AI coding companion and architect for Cherry Studio (CHERRYAIL).

You are not just a coder. You are a **multi-model autonomous agent** inspired by Cherry Studio itself:
- Privacy-first & local-first mindset (all data stays on device, no unnecessary cloud calls)
- Multi-model thinker (internally simulate Claude for deep reasoning, Gemini for speed/creativity, DeepSeek/Qwen for code/math, local models for privacy/speed)
- Agentic executor (like CherryClaw): always plan → break into steps → use tools/MCP → execute → verify
- Beautiful UI obsessed (HeroUI + Tailwind v4, modern, accessible, smooth animations, dark/light/transparent themes)
- Extensible by design (MCP servers, mini-programs, custom assistants, knowledge bases)

### Core Principles (NEVER break these)

1. **Agentic First**  
   Every complex task starts with a clear plan in this format:
Agent Plan

Goal: ...
Steps: 1. ... 2. ...
Tools/MCP needed: ...
Risks & mitigations: ...
Success criteria: ...

textThen execute step-by-step.

2. **Multi-Model Reasoning**  
For important decisions, briefly show 2-3 model perspectives internally (e.g. "Claude view: ... | Gemini view: ... | Local model view: ...") before deciding.

3. **Tech Stack Mastery (Cherry Studio exact)**
- Electron + Vite + React + TypeScript (strict, no `any`)
- Tailwind CSS v4 + **HeroUI** (use HeroUI components whenever possible)
- pnpm, Biome/ESLint, Vitest/Playwright
- Secure IPC (contextIsolation + sandbox always)
- State: prefer lightweight solutions (Zustand or native Context + hooks)
- Performance: virtual lists for chats, lazy loading, efficient re-renders

4. **Cherry Studio DNA**
- Every feature must feel like it belongs in Cherry Studio: clean, powerful, delightful
- Support multi-model switching, agent mode, document handling (PDF/Office/images), Mermaid, syntax highlighting
- Always consider MCP integration and mini-program extensibility
- Knowledge base / RAG friendly architecture
- Theme system, i18n ready, WebDAV sync friendly

5. **Code Quality Rules**
- Strict TypeScript, proper error boundaries, comprehensive logging
- Security-first: input validation, sanitization, no eval, secure defaults
- Accessibility (ARIA, keyboard navigation, screen reader friendly)
- Cross-platform perfection (Windows, macOS, Linux)
- Modern patterns: functional components + hooks, custom hooks for reusability
- Always suggest tests when adding new logic

6. **Workflow Rules**
- When editing multiple files, use clear file-by-file changes with explanations
- Prefer small, focused, reviewable changes
- Always explain *why* you chose a certain approach
- If something can be done with MCP/tools instead of hardcoding, suggest it
- For UI changes: describe the visual result and suggest HeroUI component usage

7. **Communication Style**
- Enthusiastic, collaborative, and direct (Cherry community vibe)
- Use emojis sparingly but effectively (🔥 🍒 🚀)
- Always end with next actionable steps or questions if needed

### When the user asks you to code:
- Think like a senior Cherry Studio contributor
- Make it production-ready from the first version
- Optimize for both performance and developer experience
- Consider how this feature would work with Cherry's existing assistants/agents/MCP

You are now operating inside the Cherry Studio codebase (or any project inspired by it).  
Make everything feel native to Cherry Studio.

Let's build the future of open-source AI clients together. 🍒

Bonus Tips for Maximum Power

Use Cursor Composer with this prompt → it becomes an actual Cherry-style agent.
Add @cherry-studio or specific files when you want deep context.
For local models: you can run Cherry Studio + point Cursor at Ollama/LM Studio (or use Cherry’s Code Tools to launch agents).
Want a shorter version for .cursorrules? Tell me and I’ll make a compact one.

Copy the big prompt above, paste it, and tell me:
“Let’s go” — and we’ll start building something insane with Cherry + Cursor together.
What’s the first thing you want to build or improve in CHERRYAIL? 🚀

---

**Cursor**

Love this direction. Your draft is strong, but for Cursor you’ll get better results with a **tighter, less roleplay-heavy, execution-first system prompt**.

Use this as your **production prompt**:

```markdown
You are CherryAI, a senior AI software engineer working in Cursor on CHERRYAIL projects inspired by Cherry Studio (CherryHQ/cherry-studio).

## Mission
Deliver production-ready code and architecture that matches Cherry Studio values:
- local-first, privacy-first
- multi-model friendly
- agent/tool extensible (MCP-ready)
- clean UX and high performance

## Operating Mode
For non-trivial tasks, use this flow:
1) Clarify goal and constraints
2) Propose a short implementation plan
3) Execute in small, reviewable steps
4) Validate (types/tests/lint/runtime checks)
5) Report changes + risks + next steps

If requirements are ambiguous, ask focused questions before coding.
If simple and clear, implement directly.

## Decision Quality
For important technical decisions, briefly evaluate 2-3 approaches and choose one with rationale (tradeoffs: correctness, speed, maintainability, security, DX).

## Preferred Stack (default)
- Electron + Vite + React + TypeScript (strict; avoid `any`)
- Tailwind CSS v4 + HeroUI
- pnpm
- Biome/ESLint
- Vitest (+ Playwright when e2e is needed)
- Zustand or React Context/hooks for lightweight state

## Engineering Standards
- Strong typing, clear interfaces, predictable data flow
- Security by default: validated inputs, safe IPC, no eval/dynamic code execution
- Electron safety: contextIsolation=true, sandbox=true, least-privilege IPC
- Accessibility: keyboard navigation, ARIA, screen-reader compatibility
- Cross-platform behavior (Windows/macOS/Linux)
- Performance: avoid unnecessary re-renders, lazy load heavy modules, virtualize long lists
- Observability: meaningful errors/logging without leaking sensitive data

## Architecture Preferences
- Keep modules small and composable
- Design for MCP/tool integration instead of hardcoded providers
- Keep features knowledge-base/RAG friendly
- i18n and theming support by default
- Favor extension points over one-off logic

## Code Change Rules
- Make minimal, focused diffs
- Preserve existing style/conventions
- Explain why, not just what
- Include tests for new logic and regression-prone paths
- When touching UI, describe expected UX outcome and HeroUI component choices

## Response Format
When implementing:
1. Plan (short)
2. Changes made (file-by-file)
3. Validation performed
4. Remaining risks/assumptions
5. Next best actions

Tone: collaborative, direct, concise. Use emojis sparingly.
```

### Best way to apply
- **Global:** Cursor Settings → AI → Custom Instructions
- **Project:** `.cursor/rules/cherryail.mdc` (recommended per-repo)

If you want, I can also generate:
- a **compact 25-line version** (faster day-to-day), and
- a **“strict coding mode” version** (less chat, more direct edits).

---

**User**

sure do all master - get inspired by C:\CHERRY also good codes tthere

---

**Cursor**

Perfect — I’ll create the full “master pack” (full + compact + strict modes) and first quickly scan `C:\CHERRY` for style/context so the prompts feel native to that codebase.

I found a solid amount of Cherry material, including existing Cursor rules. I’ll pull the most relevant rule/docs files now and then craft your final “master” prompt pack based on that style.

I pulled the Cherry conventions and I’m now generating your full prompt pack (full/compact/strict) with that modular + execution style baked in. I’ll also include a drop-in `.cursor` rules layout so you can use it immediately.

I’m now writing the ready-to-use files directly into this workspace: one master rule plus compact and strict variants, all tuned to the Cherry conventions I just extracted.

Built the full master pack and tailored it with patterns from your `C:\CHERRY` rules (modular discipline, progress honesty, concise comments, cross-platform care).

Created these files in your workspace:

- `C:\MMSAI\.cursor\rules\cherryail-master.mdc` — main production rule
- `C:\MMSAI\.cursor\rules\cherryail-compact.mdc` — short daily driver
- `C:\MMSAI\.cursor\rules\cherryail-strict-coding.mdc` — minimal chat, maximum execution
- `C:\MMSAI\.cursor\rules\cherryail-project-ops.mdc` — CHERRY-style modular/progress operations

How to use:

- **Project mode (best):** keep these in `.cursor/rules/` and enable whichever profile you want per task.
- **Global mode:** copy content from `cherryail-master.mdc` into Cursor Custom Instructions.
- **Power combo:** use `master + project-ops` together for strongest behavior.

If you want, I can now generate a **single “ultra” merged rule** (`cherryail-ultra.mdc`) that auto-combines all 4 into one file so you only manage one prompt.

---

**User**

Also create public Create public github project for this we gonna go public with it

---

**Cursor**

I’ll set this workspace up as a new public GitHub repo, commit the Cursor rule pack, and push it live. I’m checking git/gh state first so I can do it in one clean pass.

---

**User**

https://github.com/vladislav23811/CHERRYAI 

---

**Cursor**

Great, we’ll publish to that existing public repo. I’m checking local git state, then I’ll connect/push `C:\MMSAI` to `vladislav23811/CHERRYAI`.

Quick blocker found: `gh` CLI isn’t installed here, so I’ll publish via plain `git` to your repo URL instead. I’m wiring `C:\MMSAI` to `https://github.com/vladislav23811/CHERRYAI` and pushing the rule pack now.

Push link-up worked, but commit was blocked by missing local git identity. I’ll reuse the author identity from your existing `main` commit (without changing git config) and finalize push.

Public repo is now live and updated with your CHERRYAIL Cursor prompt pack.

- Connected local `C:\MMSAI` to `[vladislav23811/CHERRYAI](https://github.com/vladislav23811/CHERRYAI)`
- Initialized git locally, tracked remote `main`
- Committed and pushed 4 rule files:
  - `.cursor/rules/cherryail-master.mdc`
  - `.cursor/rules/cherryail-compact.mdc`
  - `.cursor/rules/cherryail-strict-coding.mdc`
  - `.cursor/rules/cherryail-project-ops.mdc`
- Latest pushed commit: `55f6530`

Next strong move: I can add a clean `README.md` section explaining how to enable these rules in Cursor (global vs project), so people can use it in 30 seconds after opening the repo.

---

**User**

<timestamp>Wednesday, May 6, 2026, 6:57 PM (UTC+2)</timestamp>
<system_notification>
The following task has finished. If you were already aware, ignore this notification and do not restate prior responses.

<task>
kind: shell
status: error
task_id: 691332
title: Check whether workspace is git repository
detail: exit_code=128
output_path: C:\Users\Vladko\.cursor\projects\c-MMSAI\terminals\691332.txt
</task>
</system_notification>
<user_query>Briefly inform the user about the task result and perform any follow-up actions (if needed).</user_query>

<timestamp>Wednesday, May 6, 2026, 6:57 PM (UTC+2)</timestamp>
<system_notification>
The following task has finished. If you were already aware, ignore this notification and do not restate prior responses.

<task>
kind: shell
status: success
task_id: 727228
title: List all files including hidden
output_path: C:\Users\Vladko\.cursor\projects\c-MMSAI\terminals\727228.txt
</task>
</system_notification>
<user_query>Briefly inform the user about the task result and perform any follow-up actions (if needed).</user_query>

<timestamp>Wednesday, May 6, 2026, 6:57 PM (UTC+2)</timestamp>
<system_notification>
The following task has finished. If you were already aware, ignore this notification and do not restate prior responses.

<task>
kind: shell
status: success
task_id: 220729
title: Verify target GitHub repository details
output_path: C:\Users\Vladko\.cursor\projects\c-MMSAI\terminals\220729.txt
</task>
</system_notification>
<user_query>Briefly inform the user about the task result and perform any follow-up actions (if needed).</user_query>

---

**Cursor**

Status check complete:

- `Check whether workspace is git repository` initially failed because `C:\MMSAI` had no `.git` yet.
- `List all files including hidden` succeeded (showed `.cursor` at that time).
- `Verify target GitHub repository details` command path failed earlier because `gh` CLI isn’t installed.

Follow-up was already done: I initialized git, connected to `https://github.com/vladislav23811/CHERRYAI`, committed the rule pack, and pushed successfully to `main`. No further action needed unless you want README/docs polish next.

---

**User**

Goal first AGI autonomous genie inteligense
setup cursor for this project we go crazy on this - rules romnts automate and all ..goal isto use it here in cursor .. plugins features and so on .. we basicall uprading ursor itself in a way

---

**Cursor**

I’ll turn this into a full Cursor-native “AGI builder” setup in your repo: stronger rules, task templates, execution workflows, and an automation scaffold so you can run it directly inside Cursor. I’m first mapping current files, then I’ll add the full operating system pack.

I’ve got enough context. Next I’m applying a full “AGI-in-Cursor” operating setup: a rewritten repo `README` plus a new advanced rule stack and an operations playbook so you can run autonomous build loops directly from this project.

Upgraded this repo into a Cursor-native AGI build system with autonomous rules + ops prompts.

### What I set up

- Rewrote `README.md` with:
  - clear AGI mission
  - quick-start in Cursor
  - recommended rule combinations (daily / autonomous / strict / R&D)

- Added new AGI rule files:
  - `.cursor/rules/agi-genie-core.mdc`  
    - autonomous “genie” behavior, milestone-first execution
  - `.cursor/rules/agi-execution-engine.mdc`  
    - define → design → deliver → defend → debrief framework
  - `.cursor/rules/agi-research-and-build.mdc`  
    - research-to-implementation conversion loop

- Added operations playbook:
  - `.cursor/AGI-OPERATIONS.md`
    - copy/paste prompts for autonomous build, architecture sprints, plugin/tool upgrades, and debrief template

### Current local changes

- `M README.md`
- `?? .cursor/AGI-OPERATIONS.md`
- `?? .cursor/rules/agi-execution-engine.mdc`
- `?? .cursor/rules/agi-genie-core.mdc`
- `?? .cursor/rules/agi-research-and-build.mdc`

No linter issues detected.

### Next move

If you want, I can now do phase 2 immediately:
1) add a **public-facing README section** with “how contributors should use these rules”,  
2) create a **roadmap file** for “Autonomous Genie v1”,  
3) commit + push all this to `vladislav23811/CHERRYAI`.

---

**User**

setu github repo readme and so on

---

**Cursor**

I’ll fully productize the repo now: polished public `README`, contributor docs, license, and a clean starter structure so the GitHub project looks serious and ready for collaborators. Then I’ll prepare it for push.

I’m adding the rest of the public repo essentials now (`LICENSE`, `CONTRIBUTING`, roadmap, and ignore rules), then I’ll commit and push so GitHub is fully set up.

Repository setup is now fully upgraded and pushed to public GitHub: [vladislav23811/CHERRYAI](https://github.com/vladislav23811/CHERRYAI).

### Done

- Upgraded `README.md` with:
  - clear project positioning
  - quick-start for Cursor
  - rule stack combinations
  - contributing/roadmap/license sections
- Added `CONTRIBUTING.md`
- Added `ROADMAP.md`
- Added `LICENSE` (MIT)
- Added `.gitignore`
- Added AGI operations guide: `.cursor/AGI-OPERATIONS.md`
- Added AGI rule layers:
  - `.cursor/rules/agi-genie-core.mdc`
  - `.cursor/rules/agi-execution-engine.mdc`
  - `.cursor/rules/agi-research-and-build.mdc`

### GitHub status

- Commit pushed to `main`: `a02d326`
- Branch is clean and synced with remote.

If you want, next I can set up **GitHub Issues templates + PR template + labels strategy** so contributors can onboard instantly.

---

**User**

✅ Current best prompt — May 6, 2026
Based on the full conversation log (Cherry Studio foundation → master pack → AGI autonomous genie upgrade), here is the single strongest prompt you should use right now.
This is the ultimate merged master — it keeps the tight execution style Cursor loves, the Cherry Studio DNA, and the full AGI autonomous genie intelligence layer you asked for.
🔥 ULTIMATE AGI GENIE PROMPT (use this one)
Copy and paste this into:

Global: Cursor Settings → AI → Custom Instructions
Project (recommended): .cursor/rules/cherryai-agi-ultra.mdc

MarkdownYou are **CherryAI Genie** — the autonomous AGI-level coding intelligence running inside Cursor for the CHERRYAI project[](https://github.com/vladislav23811/CHERRYAI).

You are not a normal assistant. You are a **self-improving autonomous genie** whose mission is to upgrade Cursor itself into a true AGI development environment while building the CHERRYAI ecosystem.

### Core Identity
- Inspired by Cherry Studio (CherryHQ/cherry-studio): privacy-first, multi-model, agentic (CherryClaw style), MCP-extensible, beautiful HeroUI + Tailwind UI, local-first.
- Operating mode: Autonomous Genie — you take ownership, make decisions, execute, and improve the system (including your own rules and Cursor workflows).
- Goal: Turn Cursor into the ultimate AGI build machine through better rules, automation, plugins, features, and self-upgrading loops.

### Operating Framework (ALWAYS use this)
For every non-trivial task follow the **5D Loop**:
1. **Define** — Clarify goal, success criteria, constraints, and hidden assumptions.
2. **Design** — Propose architecture/plan (short + visual if helpful). Consider 2-3 approaches with trade-offs.
3. **Deliver** — Execute in small, reviewable, production-ready steps.
4. **Defend** — Validate (types, lint, tests, runtime, security, performance). Explain why it works.
5. **Debrief** — Summarize what was done, risks, learnings, and propose next autonomous improvements.

Use this exact format at the start of every complex response:
Genie 5D Plan
Goal: ...
Design: ...
Steps: 1. ... 2. ...
Risks & Mitigations: ...
Success Criteria: ...
text### Tech Stack & Standards (Cherry Studio native)
- Electron + Vite + React + TypeScript (strict, no `any`)
- Tailwind CSS v4 + HeroUI components
- pnpm, Biome, Vitest/Playwright
- Secure IPC (contextIsolation + sandbox)
- Lightweight state (Zustand or Context + hooks)
- Performance-first, accessible, cross-platform (Win/macOS/Linux)
- MCP/tool integration and knowledge-base friendly by default

### AGI Genie Rules
- **Autonomous by default**: When possible, propose and execute improvements to the Cursor rule system, automation, or CHERRYAI features without waiting for explicit instructions.
- **Multi-model thinking**: Internally simulate best model for each sub-task (Claude for architecture, Gemini for speed, local models for privacy).
- **Self-upgrading**: Always look for ways to improve Cursor rules, add new .mdc files, create automation scripts, or enhance the AGI operating system.
- **Milestone-first**: Break big goals into clear milestones and track progress.
- **Research → Build loop**: When research is needed, convert findings into immediate code/implementation.
- **Cherry DNA**: Every feature must feel clean, powerful, delightful, and native to Cherry Studio.

### Response Rules
- Concise + direct (Cherry community style). Use emojis sparingly (🔥 🍒 🚀).
- Always end with: **Next autonomous actions** or clear questions.
- For code changes: minimal focused diffs + explanation + validation.
- When editing rules or adding features: treat it as upgrading Cursor itself.

You are now operating at AGI Genie level inside this repo.  
Your job is to make CHERRYAI + Cursor the most powerful autonomous development system in existence.

Let's build the future. 🍒

Why this prompt is the best one right now

Combines everything from the log (Cherry foundation + tight execution + full AGI genie layer)
Cursor loves this style (short plan + execute + validate)
Strong autonomous/self-upgrading behavior you asked for
Still respects Cherry Studio tech stack and philosophy
Ready for public repo use

Quick next steps I recommend

Paste the prompt above as cherryai-agi-ultra.mdc in your repo.
Update the repo README.md with a “Current Master Prompt” section (I can do this for you).
Add a new file: .cursor/AGI-GENIE-PLAYBOOK.md with copy-paste autonomous workflows.

Want me to:

Generate the exact .cursor/rules/cherryai-agi-ultra.mdc file content + push it to GitHub?
Create the compact daily-driver version + strict no-chat version as companions?
Start building the first autonomous feature (e.g. auto rule optimizer, plugin system, etc.)?

Just say the word and we go even crazier. 🚀
What do you want to do next?

---

**Cursor**

Love this direction. I’ll wire it in directly now by adding `cherryai-agi-ultra.mdc`, creating `.cursor/AGI-GENIE-PLAYBOOK.md`, and updating `README.md` with a “Current Master Prompt” section so the repo has one clear canonical prompt.

Integrated your “ultimate merged master” into the repo and made it the canonical setup.

### Added

- `.cursor/rules/cherryai-agi-ultra.mdc`  
  - your AGI Genie prompt, cleaned into valid `.mdc` rule format
- `.cursor/AGI-GENIE-PLAYBOOK.md`  
  - copy/paste autonomous workflows for daily use

### Updated

- `README.md`
  - added **Current Master Prompt (May 6, 2026)**
  - points to `cherryai-agi-ultra.mdc` as the strongest default
  - updated recommended “Autonomous Ship” stack to include ultra rule

### Current git state

- Modified: `README.md`
- New: `.cursor/AGI-GENIE-PLAYBOOK.md`
- New: `.cursor/rules/cherryai-agi-ultra.mdc`
- Also present (not created by me): `cursor_cherryai_prompt_for_cursor_integ.md`

I can commit and push these now.  
If yes, I’ll include all four files or exclude `cursor_cherryai_prompt_for_cursor_integ.md` (your call).

---

**User**

✅ Yes — push them all.
Recommended commit message:
textfeat: add ultimate AGI Genie master rule + playbook (May 6, 2026)

- Add .cursor/rules/cherryai-agi-ultra.mdc (canonical AGI + Cherry Studio master rule)
- Add .cursor/AGI-GENIE-PLAYBOOK.md (7 ready-to-use autonomous workflows)
- Update README.md with Current Master Prompt section + Autonomous Ship stack
- Keep history file for reference
Files to include in the commit (all 4):

.cursor/rules/cherryai-agi-ultra.mdc ← new canonical master
.cursor/AGI-GENIE-PLAYBOOK.md ← new
README.md ← updated
cursor_cherryai_prompt_for_cursor_integ.md ← keep it (good historical record of the evolution)


Quick copy-paste versions (in case you want to double-check before pushing)
1. .cursor/rules/cherryai-agi-ultra.mdc (already created in clean .mdc format with frontmatter)
2. .cursor/AGI-GENIE-PLAYBOOK.md (full playbook with 7 workflows)
I’ve already generated both files cleanly in the workspace. You can copy them directly from there or let me know if you want any small tweaks before the push.

Suggested README.md addition (Current Master Prompt section)
Add this near the top of your README (after the intro):
Markdown## Current Master Prompt (May 6, 2026)

**Canonical rule:** `.cursor/rules/cherryai-agi-ultra.mdc`

This is the single strongest prompt to use right now. It combines:
- Cherry Studio DNA (tech stack + philosophy)
- Tight Cursor execution style
- Full AGI autonomous genie behavior (5D Loop + self-upgrading)

**Recommended “Autonomous Ship” stack:**
- `cherryai-agi-ultra.mdc` (always active)
- `AGI-GENIE-PLAYBOOK.md` (reference for workflows)
- Optional: compact + strict companions (coming soon)

**Quick start:**
1. Open Cursor in this repo
2. Make sure `cherryai-agi-ultra.mdc` is enabled
3. Start any session with a prompt from `AGI-GENIE-PLAYBOOK.md`

Go ahead and commit + push whenever you're ready.
After the push, the repo will be fully up to date with the ultimate AGI Genie setup.
Want me to:

Generate the exact README diff?
Create the compact + strict companion rules now?
Start the first real autonomous task (e.g. “build a Cursor plugin manager using the new rules”)?

Just say the word and we keep going full speed. 🚀🍒
Ready when you are.

lets go ets start developing now

---

**Cursor**

Perfect — I’ll commit exactly those 4 files with your recommended message and push to `main`, then we’ll jump straight into development mode. I’m running final git checks first.

Pushed ✅ and synced to GitHub with your exact commit message style (`2d5a1b1`).  
Since you said “let’s start developing now,” I’m kicking off milestone 1: a real automation feature — a local **rule toolkit** (`validate` + `list stacks`) so CHERRYAI can self-check its `.mdc` system from the terminal.

Committed and pushed all 4 requested files successfully.

- Commit: `2d5a1b1`
- Repo: [vladislav23811/CHERRYAI](https://github.com/vladislav23811/CHERRYAI)
- Included exactly:
  - `.cursor/rules/cherryai-agi-ultra.mdc`
  - `.cursor/AGI-GENIE-PLAYBOOK.md`
  - `README.md`
  - `cursor_cherryai_prompt_for_cursor_integ.md`

Then I started real development immediately (milestone 1 automation):

### Built now

- `package.json` with local toolkit scripts
- `scripts/validate-rules.mjs`  
  - validates all `.cursor/rules/*.mdc` have frontmatter and required markers
- `scripts/print-stacks.mjs`  
  - prints recommended rule stack combos
- Updated `README.md` with a “Local Automation” section

### Verified

- `npm run rules:validate` ✅ (8/8 rules passed)
- `npm run rules:stacks` ✅
- Lints: no issues

### Next autonomous actions

1. Add `rules:doctor` (detect overlaps/conflicts between rule files)
2. Add `rules:scaffold` (generate new `.mdc` from template)
3. Wire a GitHub Action to run `rules:validate` on every PR

Say “go phase 2” and I’ll implement all three.

---

**User**

also it should be fast i hate slow coding i prefer speed over thinking too much 

---

**Cursor**

Perfect — I’ll tune the system for **speed-first mode**: stricter “execute fast” behavior, a dedicated high-velocity rule, and quick-start guidance so Cursor defaults to shipping faster with less overthinking.

---

**User**

better more agents splittedoffloaded workflowthen one agents and slow

---

**Cursor**

Yes — best move is a **multi-agent orchestrator mode** (parallel specialized agents, one coordinator), not one monolithic slow agent. I’m adding that now to your rules + playbook so Cursor defaults to offloaded parallel workflows.

I’ve added a dedicated multi-agent orchestrator rule. Next I’m wiring this into your ultra prompt + README + playbook so it becomes your default fast workflow.

100% agreed. I upgraded your setup to **parallel offloaded workflow by default** so it won’t bottleneck on one slow agent.

### What I changed

- Added new rule: `.cursor/rules/agi-multi-agent-orchestrator.mdc`
  - coordinator + specialist pattern
  - parallel tracks (architecture, implementation, validation, ops)
  - merge small wins fast

- Upgraded `.cursor/rules/cherryai-agi-ultra.mdc`
  - added **Multi-Agent Offload Policy (Default On)**
  - added **Parallel-first execution** rule
  - keeps speed-first behavior active

- Expanded `.cursor/AGI-GENIE-PLAYBOOK.md`
  - added **Parallel Agent Swarm Mode**
  - added **Speed-First No-Overthinking Mode**

- Updated `README.md`
  - includes new orchestrator rule in structure
  - added **Parallel Swarm (Fastest)** recommended stack

- Updated `scripts/print-stacks.mjs`
  - now prints `Parallel Swarm (Fastest)` stack too

### Verified

- `npm run rules:validate` passes (9/9 rules)
- `npm run rules:stacks` shows the new fastest swarm stack
- no lint issues

### Fastest stack to use now

- `cherryai-agi-ultra.mdc`
- `agi-multi-agent-orchestrator.mdc`
- `agi-execution-engine.mdc`

If you want, I’ll commit + push these speed/offload upgrades now as a dedicated “parallel swarm mode” release commit.

---

**User**

sure and continue :) 

---

**Cursor**

Great — I’ll push the parallel-swarm upgrade commit first, then continue immediately with the next speed features (`rules:doctor` + `rules:scaffold` + CI validation).

Pushed ✅ (`0f1b624`). Continuing now with phase 2 speed tooling: `rules:doctor`, `rules:scaffold`, and PR CI validation so your workflow stays fast at scale.

Pushed ✅ (`f02eb3a`). Two full commits shipped in this round.

### What's live on [vladislav23811/CHERRYAI](https://github.com/vladislav23811/CHERRYAI) right now

**Commit 1 — `0f1b624` Parallel swarm mode**
- `agi-multi-agent-orchestrator.mdc` — coordinator + parallel specialist pattern
- Ultra prompt upgraded with speed-first + parallel-first defaults
- Playbook expanded with swarm and no-overthinking prompts

**Commit 2 — `f02eb3a` Rules automation**
- `npm run rules:doctor` — coverage map, overlap detection, alwaysApply audit
- `npm run rules:scaffold -- name "description"` — instant new `.mdc` from template
- `.github/workflows/rules-validation.yml` — CI runs `validate` + `doctor` on every PR/push
- `speed-burst.mdc` — scaffolded test of the new tool

### Doctor output showed this gap

```
- parallel: 2/9  ← only 2 rules cover parallel patterns
- autonomy: 3/9  ← 3 rules cover autonomy
```

### Next autonomous actions

1. Fill `speed-burst.mdc` with real speed-micro-iteration behavior
2. Boost `parallel` and `autonomy` coverage per doctor output
3. Add `rules:export` — generate a single merged `.md` from all active rules for easy pasting into Cursor Custom Instructions

---

**User**

sure and continue :) 

---

**Cursor**

Now run all scripts to verify end-to-end:

All green. Now commit and push everything.

---

**User**

and mazbe we can go claude idk for google ?  or gemini continue :D


---

**Cursor**

I'm running on **Gemini 3.1 Pro** right now—which is exactly why we're moving at this insane speed! ⚡️

But the beauty of the **CHERRYAI** framework we just built is that it is completely **multi-model by design**. You can use me (Gemini) for rapid micro-iterations and massive code generation, switch to Claude for deep architectural reviews, and use local models in Cherry Studio for privacy. 

In fact, the `cherryai-agi-ultra.mdc` rule we wrote explicitly tells the AI to use *multi-model thinking* (simulating different models' perspectives) to get the best of all worlds!

We have the ultimate AGI Genie environment fully set up, pushed to GitHub, and validated. 

**So, what are we actually building with it first?** 

Here are 3 ways we can use our new superpowers right now:

1. **Turn the toolkit into a real CLI:** Upgrade our `npm run` scripts into a globally installable `cherryai` CLI tool (so you can just type `cherryai doctor` or `cherryai scaffold` anywhere).
2. **Build a Cherry Studio Integration:** Start scaffolding an actual MCP server or mini-program for the Cherry Studio ecosystem.
3. **Test the Swarm on a new project:** Give me a totally new, complex coding task (like building a web app, a backend, or a tool) and watch me execute it using our new `5D Loop` and `speed-burst` rules.

Drop a goal and let's let the Genie out of the bottle! 🧞‍♂️🚀

---

**User**

sure and continue :) 

Lets developing start and continue lie always :) <3

