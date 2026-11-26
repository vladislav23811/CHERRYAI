#!/usr/bin/env node
/** Idempotent: ensure PR helper scripts and npm hooks exist (safe to re-run each cron). */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const pkgPath = path.join(root, "package.json");

const required = [
  "automation/open-kairo-pr.mjs",
  "automation/kairo-pr-body.md",
  "automation/materialize-pr-helper.mjs",
];

let changed = 0;
for (const rel of required) {
  const abs = path.join(root, rel);
  if (!fs.existsSync(abs)) {
    console.error(`missing ${rel} — run full automation materialize or restore from branch`);
    process.exit(1);
  }
}

const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
pkg.scripts ??= {};
const want = {
  "automation:open-kairo-pr": "node automation/open-kairo-pr.mjs",
  "automation:materialize-pr": "node automation/materialize-pr-helper.mjs",
};
for (const [key, val] of Object.entries(want)) {
  if (pkg.scripts[key] !== val) {
    pkg.scripts[key] = val;
    changed++;
  }
}
if (changed) {
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}
console.log(JSON.stringify({ ok: true, packageJsonUpdates: changed, files: required.length }, null, 2));