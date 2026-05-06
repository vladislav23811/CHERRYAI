const stacks = [
  {
    name: "Daily Build",
    rules: ["cherryail-master.mdc", "cherryail-project-ops.mdc"]
  },
  {
    name: "Autonomous Ship",
    rules: [
      "cherryai-agi-ultra.mdc",
      "agi-genie-core.mdc",
      "agi-execution-engine.mdc"
    ]
  },
  {
    name: "Parallel Swarm (Fastest)",
    rules: [
      "cherryai-agi-ultra.mdc",
      "agi-multi-agent-orchestrator.mdc",
      "agi-execution-engine.mdc"
    ]
  },
  {
    name: "Strict Engineering",
    rules: ["cherryail-strict-coding.mdc", "agi-execution-engine.mdc"]
  },
  {
    name: "Research -> Build",
    rules: ["cherryail-compact.mdc", "agi-research-and-build.mdc"]
  }
];

console.log("CHERRYAI Recommended Rule Stacks\n");
for (const stack of stacks) {
  console.log(`- ${stack.name}`);
  for (const rule of stack.rules) {
    console.log(`  - ${rule}`);
  }
}
