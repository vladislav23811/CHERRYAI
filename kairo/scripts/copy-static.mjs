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

const vendorDest = path.join(dest, "vendor");
fs.mkdirSync(vendorDest, { recursive: true });

function cpVendor(relFromRoot, outName) {
  const from = path.join(root, relFromRoot);
  if (!fs.existsSync(from)) {
    console.error(`Missing vendor source: ${relFromRoot} — run npm install in kairo/`);
    process.exit(1);
  }
  fs.copyFileSync(from, path.join(vendorDest, outName));
}

cpVendor(path.join("node_modules", "marked", "marked.min.js"), "marked.min.js");
cpVendor(path.join("node_modules", "dompurify", "dist", "purify.min.js"), "purify.min.js");

const pkgPath = path.join(root, "package.json");
const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
const ver = String(pkg.version || "0");
const swDest = path.join(dest, "sw.js");
if (fs.existsSync(swDest)) {
  let sw = fs.readFileSync(swDest, "utf8");
  sw = sw.replace(/__KAIRO_CACHE_VERSION__/g, ver);
  fs.writeFileSync(swDest, sw, "utf8");
}

console.log("Copied src/static -> dist/static + vendor (marked, dompurify) + sw cache version");
