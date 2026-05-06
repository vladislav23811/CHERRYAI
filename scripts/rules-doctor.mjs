import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const rulesDir = path.join(root, ".cursor", "rules");

function warn(message) {
  console.log(`WARN: ${message}`);
}

function info(message) {
  console.log(`INFO: ${message}`);
}

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
  fail("No .mdc rule files were found.");
  process.exit(1);
}

const categories = new Map([
  ["speed", ["speed", "fast", "quick"]],
  ["parallel", ["parallel", "swarm", "orchestrator", "offload"]],
  ["security", ["security", "sandbox", "contextisolation", "ipc"]],
  ["validation", ["lint", "test", "validate", "verification"]],
  ["research", ["research", "design", "tradeoff"]],
  ["autonomy", ["autonomous", "self-upgrading", "milestone"]]
]);

const coverage = new Map(Array.from(categories.keys(), (k) => [k, []]));
const descriptions = [];
const alwaysApplyMap = new Map();

for (const file of files) {
  const fullPath = path.join(rulesDir, file);
  const content = fs.readFileSync(fullPath, "utf8");
  const lowered = content.toLowerCase();

  const descMatch = content.match(/^description:\s*(.+)$/m);
  descriptions.push({
    file,
    description: descMatch ? descMatch[1].trim() : ""
  });

  const alwaysApplyMatch = content.match(/^alwaysApply:\s*(.+)$/m);
  alwaysApplyMap.set(file, alwaysApplyMatch ? alwaysApplyMatch[1].trim() : "");

  for (const [category, words] of categories.entries()) {
    if (words.some((w) => lowered.includes(w))) {
      coverage.get(category).push(file);
    }
  }
}

console.log("CHERRYAI Rules Doctor\n");
console.log(`Rule files: ${files.length}`);

for (const { file, description } of descriptions) {
  if (!description) {
    warn(`${file} has no description value.`);
    continue;
  }
  info(`${file}: ${description}`);
}

console.log("\nCoverage summary:");
for (const [category, matchedFiles] of coverage.entries()) {
  const count = matchedFiles.length;
  console.log(`- ${category}: ${count}/${files.length}`);
  if (count === 0) {
    warn(`No rule currently covers "${category}".`);
  }
}

console.log("\nalwaysApply check:");
for (const [file, value] of alwaysApplyMap.entries()) {
  if (value !== "true" && value !== "false") {
    warn(`${file} has invalid alwaysApply value: "${value}"`);
  } else {
    info(`${file}: alwaysApply=${value}`);
  }
}

const duplicateDescriptions = new Map();
for (const { file, description } of descriptions) {
  if (!description) continue;
  const key = description.toLowerCase();
  const arr = duplicateDescriptions.get(key) || [];
  arr.push(file);
  duplicateDescriptions.set(key, arr);
}

console.log("\nPotential overlap signals:");
let overlapCount = 0;
for (const [description, filesWithDescription] of duplicateDescriptions.entries()) {
  if (filesWithDescription.length < 2) continue;
  overlapCount += 1;
  warn(`Duplicate description "${description}" in: ${filesWithDescription.join(", ")}`);
}
if (overlapCount === 0) {
  info("No duplicate descriptions detected.");
}

if (process.exitCode && process.exitCode !== 0) {
  console.log("\nDoctor run completed with warnings/errors.");
} else {
  console.log("\nDoctor run completed.");
}
