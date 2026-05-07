# Production adoption playbook (MZ AI)

Guide for taking MZ AI from **personal experiment** to **repeatable team practice** in Cursor. Tune steps to your org size; keep licensing (`LICENSE`) visible.

## 1) Preconditions

- [ ] Repo owners accept **personal-use** terms or secure separate permission for commercial contexts.
- [ ] Cursor available with stable Agent/Chat experience for contributors.
- [ ] Baseline branch protections (e.g. PR reviews) if multiple humans ship code.

## 2) Pilot (single repo, 1–2 weeks)

1. Add MZ AI (clone/subtree/copy `.cursor/rules` + docs as agreed).
2. Pick **one default stack** from `README.md` (start conservative: **Daily Build** or **Autonomous Ship**).
3. Require **`npm run validate:all`** before merge when MZ AI scripts exist in that repo.
4. Run **`npm run plugins:loop`** once per milestone for roadmap hygiene (`plugins/*/reports/` is local-only).

Success = merged PRs with smaller diffs and fewer validation regressions.

## 3) Expand surfaces

| Surface | Action |
|---------|--------|
| **Rules** | Add domain overlays from [`community-templates/`](community-templates/README.md); document stacks in repo README. |
| **CI** | Ensure GitHub Actions (or equivalent) runs `npm run validate:all` on default branch + PRs. |
| **MCP / tools** | Inventory servers per [`PLUGIN-TOOL-MATRIX.md`](PLUGIN-TOOL-MATRIX.md); governance for new MCP installs. |
| **Models** | Align coordinator vs builder chats with model strengths — [`CUSTOM-MODELS.md`](CUSTOM-MODELS.md). |

## 4) Multi-agent operating agreement

When using parallel chats:

- Name roles: **Coordinator**, **Architect**, **Builder**, **Validator**.
- Follow merge order in `.cursor/MULTI-AGENT-ORCHESTRATION.md` (implementation + validation before doc-only sweeps unless docs unblock code).
- Handoffs must list **files touched** and **commands run**.

## 5) Security and reliability cadence

- Review [`RELIABILITY-SECURITY-HARDENING.md`](RELIABILITY-SECURITY-HARDENING.md) before releases touching auth, data, or infra.
- Rotate prompts/rules via PR like code; avoid “floating” instructions only in chat.

## 6) Measurement (lightweight)

Track qualitative signals: time-to-first-merge, rework after validation, incident themes. Adjust stacks or templates when one failure mode repeats.

## 7) Escalation paths

- **Ambiguous specs:** single research pass (`agi-research-and-build`) before swarm execution.
- **Large migrations:** sequential Architect → Builder; Validator last.

## Published handbook

After Pages is enabled, the browsable handbook mirrors `docs/` at **`https://vladislav23811.github.io/CHERRYAI/`** (MkDocs build from `main`).

## Related docs

- Bootstrap prompt: [`MZ-AI-BOOTSTRAP-PROMPT.md`](MZ-AI-BOOTSTRAP-PROMPT.md)
- Rule conventions: [`RULE-ARCHITECTURE.md`](RULE-ARCHITECTURE.md)
- Tutorials: [`TUTORIALS/README.md`](TUTORIALS/README.md)

---

Copyright (c) 2026 vladislav23811. Personal use only; see `LICENSE`.
