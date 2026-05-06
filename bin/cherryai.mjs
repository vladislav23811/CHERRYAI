#!/usr/bin/env node
import { fork } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const command = process.argv[2];
const args = process.argv.slice(3);

// Handle special case for export:ultra
let scriptKey = command;
if (command === "export:ultra") {
  scriptKey = "export";
  args.unshift("cherryai-agi-ultra", "agi-multi-agent-orchestrator", "agi-parallel-tracks", "agi-autonomy-loop", "agi-execution-engine", "speed-burst");
}

const commands = {
  validate: "scripts/validate-rules.mjs",
  doctor: "scripts/rules-doctor.mjs",
  scaffold: "scripts/scaffold-rule.mjs",
  export: "scripts/export-rules.mjs",
  stacks: "scripts/print-stacks.mjs"
};

if (!command || !commands[scriptKey]) {
  console.log(`🍒 CHERRYAI CLI
Usage: cherryai <command> [args]

Commands:
  validate       Validate all .mdc rules have required frontmatter
  doctor         Check rule coverage, overlaps, and alwaysApply status
  scaffold       Create a new rule (e.g., cherryai scaffold my-rule "desc")
  export         Merge all rules into a single file
  export:ultra   Export only the fastest parallel+autonomy stack
  stacks         Print recommended rule stacks
  `);
  process.exit(1);
}

const scriptPath = path.join(root, commands[scriptKey]);
const child = fork(scriptPath, args, { stdio: "inherit" });

child.on("exit", (code) => {
  process.exit(code || 0);
});
