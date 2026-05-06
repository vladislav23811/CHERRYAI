import fs from "node:fs";
import path from "node:path";

const inputName = process.argv[2];
const descriptionArg = process.argv.slice(3).join(" ").trim();

if (!inputName) {
  console.error("Usage: npm run rules:scaffold -- <rule-name> [description]");
  process.exit(1);
}

const normalized = inputName
  .toLowerCase()
  .replace(/[^a-z0-9-]/g, "-")
  .replace(/-+/g, "-")
  .replace(/^-|-$/g, "");

if (!normalized) {
  console.error("ERROR: rule-name must include letters or numbers.");
  process.exit(1);
}

const fileName = normalized.endsWith(".mdc") ? normalized : `${normalized}.mdc`;
const targetPath = path.join(process.cwd(), ".cursor", "rules", fileName);

if (fs.existsSync(targetPath)) {
  console.error(`ERROR: Rule already exists: ${targetPath}`);
  process.exit(1);
}

const fallbackDescription = `CHERRYAI rule: ${normalized}`;
const description = descriptionArg.length > 0 ? descriptionArg : fallbackDescription;

const template = `---
description: ${description}
alwaysApply: false
---

# ${normalized}

## Purpose

Describe what this rule controls and when it should be enabled.

## Behavior

- Add focused guidance.
- Keep it specific and actionable.

## Validation

- Explain how to verify this rule's impact.
`;

fs.writeFileSync(targetPath, template, "utf8");
console.log(`Created ${targetPath}`);
