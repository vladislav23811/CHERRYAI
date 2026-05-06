import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const rulesDir = path.join(root, ".cursor", "rules");

const requiredKeywords = [
  "description:",
  "alwaysApply:",
  "---"
];

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
}

if (!fs.existsSync(rulesDir)) {
  fail(`Rules directory not found: ${rulesDir}`);
  process.exit(1);
}

const files = fs
  .readdirSync(rulesDir)
  .filter((file) => file.endsWith(".mdc"))
  .sort();

if (files.length === 0) {
  fail("No .mdc files found in .cursor/rules");
  process.exit(1);
}

let validCount = 0;

for (const file of files) {
  const fullPath = path.join(rulesDir, file);
  const content = fs.readFileSync(fullPath, "utf8");

  const missing = requiredKeywords.filter((k) => !content.includes(k));
  if (missing.length > 0) {
    fail(`${file} is missing required markers: ${missing.join(", ")}`);
    continue;
  }

  const firstNonEmptyLine = content
    .split(/\r?\n/)
    .find((line) => line.trim().length > 0);

  if (firstNonEmptyLine?.trim() !== "---") {
    fail(`${file} must start with frontmatter ('---')`);
    continue;
  }

  validCount += 1;
  console.log(`OK: ${file}`);
}

console.log(`\nValidated ${validCount}/${files.length} rule files.`);
if (process.exitCode && process.exitCode !== 0) {
  console.log("Validation completed with errors.");
} else {
  console.log("Validation passed.");
}
