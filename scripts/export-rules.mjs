import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const rulesDir = path.join(root, ".cursor", "rules");
const outDir = path.join(root, "dist");
const outFile = path.join(outDir, "cherryai-merged-rules.md");

const targetFiles = process.argv.slice(2);

if (!fs.existsSync(rulesDir)) {
  console.error("ERROR: .cursor/rules directory not found.");
  process.exit(1);
}

const allFiles = fs
  .readdirSync(rulesDir)
  .filter((f) => f.endsWith(".mdc"))
  .sort();

const filesToExport =
  targetFiles.length > 0
    ? targetFiles.map((f) => (f.endsWith(".mdc") ? f : `${f}.mdc`))
    : allFiles;

const missing = filesToExport.filter((f) => !allFiles.includes(f));
if (missing.length > 0) {
  console.error(`ERROR: Rule files not found: ${missing.join(", ")}`);
  process.exit(1);
}

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const timestamp = new Date().toISOString().split("T")[0];
const lines = [
  `# CHERRYAI Merged Rules`,
  ``,
  `Generated: ${timestamp}`,
  `Source rules: ${filesToExport.length}`,
  ``,
  `---`,
  ``,
  `> Paste this file into Cursor Settings → AI → Custom Instructions`,
  `> for a single merged system prompt from all selected rule files.`,
  ``,
  `---`,
  ``
];

for (const file of filesToExport) {
  const content = fs.readFileSync(path.join(rulesDir, file), "utf8");

  // Strip frontmatter
  const withoutFrontmatter = content.replace(/^---[\s\S]*?---\n?/, "").trim();

  lines.push(`<!-- Source: ${file} -->`);
  lines.push(withoutFrontmatter);
  lines.push(``);
  lines.push(`---`);
  lines.push(``);
}

fs.writeFileSync(outFile, lines.join("\n"), "utf8");
console.log(`Exported ${filesToExport.length} rules → ${outFile}`);
console.log(`\nSelected rules:`);
for (const f of filesToExport) console.log(`  - ${f}`);
