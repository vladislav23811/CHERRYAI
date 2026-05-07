# Custom models and MZ AI

MZ AI rules (`.cursor/rules/*.mdc`) are **model-agnostic**: they describe behavior, not a vendor. Any model Cursor uses for **Chat** or **Agent** receives the same instructions once you attach the rules.

## What “custom model” usually means

| Approach | Notes |
|----------|--------|
| **Built-in Cursor model list** | Pick the model in Cursor’s UI / settings for each chat or workspace. Rules still apply. |
| **BYOK / API keys** | When Cursor lets you bring your own provider key, the backing endpoint changes; rules unchanged. |
| **Custom or OpenAI-compatible URL** | Some setups route Cursor (or a proxy) to a **local** stack (Ollama, LM Studio, vLLM, etc.). If Cursor accepts that endpoint, MZ AI rules work the same — quality and tool-use reliability depend on the model + runtime. |

Exact menus and plan limits live in **Cursor’s own documentation** and change between releases; this repo does not configure Cursor’s model registry.

## Practical pairing with MZ AI workflows

- **Coordinator / Architect** — Prefer models that handle long context, planning, and careful tradeoffs.
- **Builder** — Often a faster/cheaper model is fine for small, well-specified diffs.
- **Validator** — Same as Builder plus strict adherence to checklists; picking a “careful” model can reduce lazy skips.

In **multi-agent orchestration**, use **different Cursor chats** (each can use a different selected model) rather than expecting one rule file to switch APIs.

## “Multi-model thinking” inside rules

Rules such as `cherryai-agi-ultra.mdc` ask for **multi-model-style reasoning** from a **single** model (e.g., contrast architecture-first vs speed-first views). That is **not** the same as literally calling multiple backends — it’s prompting discipline inside one session.

## Cherry Studio and local models

Cherry Studio is a strong fit for **desktop multi-model** and local inference; MZ AI still targets **Cursor** as the coding surface. Many teams use Cursor for the repo + Cherry (or local servers) for other workflows. Keep `LICENSE` constraints in any derivative docs.

## Related

- Rule stacks and naming: [`RULE-ARCHITECTURE.md`](RULE-ARCHITECTURE.md)
- Tools exposed to the model: [`PLUGIN-TOOL-MATRIX.md`](PLUGIN-TOOL-MATRIX.md)

---

Copyright (c) 2026 vladislav23811. Personal use only; see `LICENSE`.
