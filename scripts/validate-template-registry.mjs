import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const registryPath = path.join(root, "docs", "community-templates", "registry.json");
const stubsDir = path.join(root, "docs", "community-templates", "stubs");

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
}

if (!fs.existsSync(registryPath)) {
  fail(`Registry not found: ${registryPath}`);
  process.exit(1);
}

let parsed;
try {
  parsed = JSON.parse(fs.readFileSync(registryPath, "utf8"));
} catch (error) {
  fail(`Invalid JSON: ${error.message}`);
  process.exit(1);
}

if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
  fail("Registry root must be an object.");
}

if (!Number.isInteger(parsed.version) || parsed.version < 1) {
  fail("`version` must be an integer >= 1.");
}

if (!Array.isArray(parsed.entries) || parsed.entries.length === 0) {
  fail("`entries` must be a non-empty array.");
}

const ids = new Set();
for (const [index, entry] of parsed.entries.entries()) {
  const context = `entries[${index}]`;
  if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
    fail(`${context} must be an object.`);
    continue;
  }

  for (const key of ["id", "title", "path", "summary"]) {
    if (typeof entry[key] !== "string" || entry[key].trim().length === 0) {
      fail(`${context}.${key} must be a non-empty string.`);
    }
  }

  if (typeof entry.id === "string") {
    if (!/^[a-z0-9-]+$/.test(entry.id)) {
      fail(`${context}.id must be kebab-case.`);
    }
    if (ids.has(entry.id)) {
      fail(`Duplicate id: ${entry.id}`);
    }
    ids.add(entry.id);
  }

  if (typeof entry.path === "string") {
    if (!entry.path.startsWith("stubs/") || !entry.path.endsWith(".mdc")) {
      fail(`${context}.path must start with "stubs/" and end with ".mdc".`);
    } else {
      const resolved = path.join(root, "docs", "community-templates", entry.path);
      if (!fs.existsSync(resolved)) {
        fail(`${context}.path points to missing file: ${entry.path}`);
      }
    }
  }
}

const stubFiles = fs
  .readdirSync(stubsDir, { withFileTypes: true })
  .filter((item) => item.isFile() && item.name.endsWith(".mdc"))
  .map((item) => `stubs/${item.name}`)
  .sort();

const registeredPaths = parsed.entries.map((entry) => entry.path).sort();
for (const stubFile of stubFiles) {
  if (!registeredPaths.includes(stubFile)) {
    fail(`Unregistered stub file: ${stubFile}`);
  }
}

if (process.exitCode && process.exitCode !== 0) {
  console.log("Template registry validation completed with errors.");
} else {
  console.log(`Template registry validation passed (${parsed.entries.length} entries).`);
}
