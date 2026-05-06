import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const roadmapPath = path.join(root, "ROADMAP.md");

if (!fs.existsSync(roadmapPath)) {
  console.error(`ERROR: ROADMAP.md not found at ${roadmapPath}`);
  process.exit(1);
}

const content = fs.readFileSync(roadmapPath, "utf8");
const lines = content.split(/\r?\n/);

const phases = [];
let currentPhase = null;

for (const line of lines) {
  if (line.startsWith("## ")) {
    currentPhase = { name: line.replace("## ", "").trim(), openItems: [] };
    phases.push(currentPhase);
    continue;
  }
  if (currentPhase && line.trim().startsWith("- [ ] ")) {
    currentPhase.openItems.push(line.trim().replace("- [ ] ", ""));
  }
}

const openPhases = phases.filter((phase) => phase.openItems.length > 0);
const batchSize = 2;
const batches = [];

for (const phase of openPhases) {
  for (let i = 0; i < phase.openItems.length; i += batchSize) {
    const slice = phase.openItems.slice(i, i + batchSize);
    batches.push({
      phase: phase.name,
      items: slice,
      objective: `Complete ${slice.length} roadmap item(s) in ${phase.name}`
    });
  }
}

const output = {
  generatedAt: new Date().toISOString(),
  source: "ROADMAP.md",
  openPhases: openPhases.length,
  totalBatches: batches.length,
  batches
};

const outputDir = path.join(root, "plugins", "roadmap-executor", "reports");
fs.mkdirSync(outputDir, { recursive: true });
const outputPath = path.join(outputDir, "latest.json");
fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");

console.log("MZ AI Autonomous Roadmap Executor");
console.log(`Open phases: ${openPhases.length}`);
console.log(`Execution batches: ${batches.length}`);

if (batches.length === 0) {
  console.log("No open roadmap items found. Roadmap appears complete.");
} else {
  batches.forEach((batch, idx) => {
    console.log(`\nBatch ${idx + 1}: ${batch.phase}`);
    for (const item of batch.items) {
      console.log(`- ${item}`);
    }
  });
}

console.log(`\nBatch report written: ${outputPath}`);
