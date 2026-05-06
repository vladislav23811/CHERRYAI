import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const checks = [
  {
    id: "rules-count",
    description: "Rule files exist in .cursor/rules",
    run: () => {
      const dir = path.join(root, ".cursor", "rules");
      if (!fs.existsSync(dir)) return { ok: false, detail: "Missing .cursor/rules directory" };
      const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdc"));
      return files.length > 0
        ? { ok: true, detail: `${files.length} rule files found` }
        : { ok: false, detail: "No .mdc rule files found" };
    }
  },
  {
    id: "templates-count",
    description: "Session templates exist in .cursor/templates",
    run: () => {
      const dir = path.join(root, ".cursor", "templates");
      if (!fs.existsSync(dir)) return { ok: false, detail: "Missing .cursor/templates directory" };
      const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
      return files.length >= 4
        ? { ok: true, detail: `${files.length} template files found` }
        : { ok: false, detail: `Only ${files.length} template files found` };
    }
  },
  {
    id: "plugins-count",
    description: "Plugin folders exist under plugins/",
    run: () => {
      const dir = path.join(root, "plugins");
      if (!fs.existsSync(dir)) return { ok: false, detail: "Missing plugins directory" };
      const entries = fs.readdirSync(dir, { withFileTypes: true }).filter((e) => e.isDirectory());
      return entries.length >= 2
        ? { ok: true, detail: `${entries.length} plugin directories found` }
        : { ok: false, detail: `Only ${entries.length} plugin directories found` };
    }
  },
  {
    id: "license-restriction",
    description: "Personal-use license restrictions are present",
    run: () => {
      const file = path.join(root, "LICENSE");
      if (!fs.existsSync(file)) return { ok: false, detail: "Missing LICENSE file" };
      const content = fs.readFileSync(file, "utf8");
      const hasPersonal = content.includes("Personal Use");
      const hasCommercialBlocked = content.includes("Commercial use is strictly prohibited");
      return hasPersonal && hasCommercialBlocked
        ? { ok: true, detail: "Personal-use and commercial restriction clauses found" }
        : { ok: false, detail: "License restriction clauses are incomplete" };
    }
  }
];

function buildSuggestions(results) {
  const suggestions = [];
  if (!results.find((r) => r.id === "rules-count")?.ok) {
    suggestions.push("Create or restore missing rule files in .cursor/rules.");
  }
  if (!results.find((r) => r.id === "templates-count")?.ok) {
    suggestions.push("Add missing session templates in .cursor/templates.");
  }
  if (!results.find((r) => r.id === "plugins-count")?.ok) {
    suggestions.push("Create plugin directories under plugins/ for new automation modules.");
  }
  if (!results.find((r) => r.id === "license-restriction")?.ok) {
    suggestions.push("Reinstate personal-use license terms and non-commercial restriction clauses.");
  }
  if (suggestions.length === 0) {
    suggestions.push("Run roadmap executor and implement the highest-impact unchecked roadmap batch.");
  }
  return suggestions;
}

const results = checks.map((check) => {
  const outcome = check.run();
  return { id: check.id, description: check.description, ...outcome };
});

const passCount = results.filter((r) => r.ok).length;
const status = passCount === results.length ? "healthy" : "needs-attention";
const suggestions = buildSuggestions(results);

const report = {
  generatedAt: new Date().toISOString(),
  status,
  passCount,
  totalChecks: results.length,
  results,
  suggestions
};

const outputDir = path.join(root, "plugins", "self-evolution-audit", "reports");
fs.mkdirSync(outputDir, { recursive: true });
const outputPath = path.join(outputDir, "latest.json");
fs.writeFileSync(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");

console.log("MZ AI Self-Evolution Audit");
console.log(`Status: ${status} (${passCount}/${results.length} checks passed)`);
for (const result of results) {
  const icon = result.ok ? "OK" : "WARN";
  console.log(`- [${icon}] ${result.description}: ${result.detail}`);
}
console.log("\nNext suggested actions:");
for (const suggestion of suggestions) {
  console.log(`- ${suggestion}`);
}
console.log(`\nReport written: ${outputPath}`);
