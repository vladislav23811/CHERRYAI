import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const src = path.join(root, "src", "static");
const dest = path.join(root, "dist", "static");
if (!fs.existsSync(src)) {
  console.error("Missing src/static");
  process.exit(1);
}
fs.mkdirSync(path.dirname(dest), { recursive: true });
fs.cpSync(src, dest, { recursive: true });
console.log("Copied src/static -> dist/static");
