import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/** Package version from adjacent `package.json` (works from `dist/` at runtime). */
export function readPackageVersion(): string {
  const root = dirname(fileURLToPath(import.meta.url));
  const pkgPath = join(root, "..", "package.json");
  const raw = readFileSync(pkgPath, "utf8");
  const pkg = JSON.parse(raw) as { version?: string };
  return pkg.version ?? "0.0.0";
}
