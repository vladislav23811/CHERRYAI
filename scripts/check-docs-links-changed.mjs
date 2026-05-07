import { execFileSync, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const baseRef = process.env.DOCS_LINK_BASE_REF?.trim() || "origin/main";
const configPath = path.join(root, ".markdown-link-check.json");

function git(args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8" }).trim();
}

function listChangedDocsMarkdown() {
  let names;
  try {
    names = git(["diff", "--name-only", "--diff-filter=ACMRT", `${baseRef}...HEAD`]);
  } catch {
    console.error(`ERROR: git diff failed against ${baseRef}. Fetch the base branch (e.g. git fetch origin main).`);
    process.exit(1);
  }
  const files = names
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((f) => f.startsWith("docs/") && f.endsWith(".md"))
    .filter((f) => fs.existsSync(path.join(root, f)));
  return [...new Set(files)];
}

const files = listChangedDocsMarkdown();
if (files.length === 0) {
  console.log(`No changed Markdown under docs/ vs ${baseRef}; skipping link check.`);
  process.exit(0);
}

console.log(`Checking links in ${files.length} file(s) vs ${baseRef}:\n${files.join("\n")}\n`);

let failed = false;
for (const file of files) {
  const abs = path.join(root, file);
  const args = ["markdown-link-check", "--quiet", "--config", configPath, abs];
  const result = spawnSync("npx", ["--yes", ...args], {
    cwd: root,
    encoding: "utf8",
    shell: process.platform === "win32",
    stdio: ["ignore", "pipe", "pipe"],
  });
  if (result.status !== 0) {
    failed = true;
    console.error(`--- FAILED: ${file} ---`);
    if (result.stdout) console.error(result.stdout);
    if (result.stderr) console.error(result.stderr);
  }
}

if (failed) {
  process.exit(1);
}

console.log("All checked links passed.");
