# CherryAI prompt for Cursor integration
_Exported on 5/6/2026 at 19:01:51 GMT+2 from Cursor (3.3.12)_

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

