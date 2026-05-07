import { execFileSync, execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dryRun = process.argv.includes("--dry-run");
const srcDir = path.join(root, "wiki");
const destDir = path.join(root, ".wiki-sync");
const remote =
  process.env.WIKI_REMOTE?.trim() ||
  "https://github.com/vladislav23811/CHERRYAI.wiki.git";

function runShell(command, opts = {}) {
  console.log(`$ ${command}`);
  if (dryRun) return;
  execSync(command, {
    cwd: root,
    stdio: "inherit",
    shell: true,
    ...opts,
  });
}

if (!fs.existsSync(srcDir)) {
  console.error(`Missing wiki source directory: ${srcDir}`);
  process.exit(1);
}

const mdFiles = fs
  .readdirSync(srcDir)
  .filter((f) => f.endsWith(".md"))
  .sort();

if (mdFiles.length === 0) {
  console.error("No .md files under wiki/");
  process.exit(1);
}

if (dryRun) {
  console.log("\nDry run: would clone/pull wiki, copy:");
  for (const f of mdFiles) console.log(`  ${path.join("wiki", f)} -> .wiki-sync/${f}`);
  console.log("\nThen: git add -A, commit if changed, push.\n");
  process.exit(0);
}

fs.rmSync(destDir, { recursive: true, force: true });
runShell(`git clone "${remote}" "${destDir}"`);

for (const f of mdFiles) {
  fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
}

const porcelain = execFileSync("git", ["-C", destDir, "status", "--porcelain"], {
  encoding: "utf8",
});

if (!porcelain.trim()) {
  console.log("No wiki changes to commit.");
  process.exit(0);
}

runShell(`git -C "${destDir}" add -A`);
runShell(`git -C "${destDir}" commit -m "Sync wiki from repo wiki/"`);
runShell(`git -C "${destDir}" push`);
