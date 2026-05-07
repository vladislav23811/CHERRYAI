# Community template moderation playbook

Use this when reviewing external template submissions.

## Triage levels

- **Fast-track**: typo fixes, clearer wording, no behavior expansion.
- **Standard review**: new domain stub or major behavior edits.
- **Security-sensitive review**: auth, data handling, infra permissions, secrets patterns.

## Review checklist

- Template remains domain-focused (not a mega-rule).
- Frontmatter valid (`description`, `alwaysApply`).
- No tenant/internal secrets, URLs, IDs, or private process leakage.
- Placeholders are generic (`[YOUR PROJECT]`, `[YOUR TEAM]`).
- Claims are verifiable and tool-agnostic unless explicitly scoped.
- Linked in `GALLERY.md`; optional `registry.json` entry is coherent.

## Rejection reasons (common)

- Too broad or conflicts with existing base stacks.
- Encourages unsafe operations (hardcoded secrets, broad privileges).
- Vendor-locked guidance without scope marker.
- Missing validation section or unclear intended usage.

## Approval flow

1. Reviewer labels submission as fast-track / standard / security-sensitive.
2. Request revisions if any checklist item fails.
3. Merge only after docs build passes in CI.
4. If behavior changed materially, update `GALLERY.md` summary.

## Escalation

Escalate to maintainer decision when:

- conflicting guidance appears across multiple stubs,
- legal/licensing ambiguity appears in contributed text,
- security implications are unclear.

---

Copyright (c) 2026 vladislav23811. Personal use only; see `LICENSE`.
