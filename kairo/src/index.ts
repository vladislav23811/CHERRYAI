#!/usr/bin/env node
import { runMcpStdio } from "./run-mcp.js";

runMcpStdio().catch((err) => {
  console.error(err);
  process.exit(1);
});
