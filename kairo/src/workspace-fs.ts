import fs from "node:fs";
import path from "node:path";
import { resolveUnderRoots } from "./workspace-path.js";

const IGNORE_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  "build",
  "site",
  ".cursor",
  "__pycache__",
  ".venv",
  "venv",
  "coverage",
]);

export function readFileSafe(abs: string, maxBytes: number): string {
  const stat = fs.statSync(abs);
  if (!stat.isFile()) throw new Error("Not a file");
  const fd = fs.openSync(abs, "r");
  try {
    const buf = Buffer.allocUnsafe(Math.min(maxBytes + 1, stat.size));
    const n = fs.readSync(fd, buf, 0, buf.length, 0);
    const slice = buf.subarray(0, n);
    const truncated = stat.size > maxBytes;
    const text = slice.toString("utf8");
    return truncated ? `${text}\n\n… truncated (${stat.size} bytes > ${maxBytes})` : text;
  } finally {
    fs.closeSync(fd);
  }
}

export type DirEntry = { name: string; path: string; type: "file" | "dir" };

export function listDirectorySafe(absDir: string, maxEntries: number): DirEntry[] {
  const stat = fs.statSync(absDir);
  if (!stat.isDirectory()) throw new Error("Not a directory");
  const names = fs.readdirSync(absDir, { withFileTypes: true });
  const out: DirEntry[] = [];
  for (const ent of names) {
    if (out.length >= maxEntries) break;
    if (IGNORE_DIRS.has(ent.name)) continue;
    const p = path.join(absDir, ent.name);
    out.push({
      name: ent.name,
      path: p,
      type: ent.isDirectory() ? "dir" : "file",
    });
  }
  return out.sort((a, b) => a.name.localeCompare(b.name));
}

export type GrepHit = { file: string; line: number; text: string };

export function grepWorkspace(args: {
  roots: string[];
  pattern: string;
  subPath?: string;
  maxMatches: number;
  maxFiles: number;
  extensions?: Set<string>;
}): GrepHit[] {
  let regex: RegExp;
  try {
    regex = new RegExp(args.pattern, "gi");
  } catch {
    throw new Error("Invalid regex pattern");
  }

  const rootsResolved = args.roots.map((r) => path.resolve(r));
  let searchRoots = rootsResolved;
  if (args.subPath?.trim()) {
    const hit = resolveUnderRoots(rootsResolved, args.subPath.trim());
    searchRoots = hit ? [hit] : [];
  }
  if (searchRoots.length === 0) return [];

  const hits: GrepHit[] = [];
  let filesVisited = 0;

  function walk(dir: string): void {
    if (hits.length >= args.maxMatches || filesVisited >= args.maxFiles) return;
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const ent of entries) {
      if (hits.length >= args.maxMatches || filesVisited >= args.maxFiles) return;
      if (IGNORE_DIRS.has(ent.name)) continue;
      const full = path.join(dir, ent.name);
      if (ent.isDirectory()) {
        walk(full);
      } else if (ent.isFile()) {
        const ext = path.extname(ent.name).toLowerCase();
        if (args.extensions && args.extensions.size > 0 && !args.extensions.has(ext)) continue;
        filesVisited++;
        let content: string;
        try {
          content = fs.readFileSync(full, "utf8");
        } catch {
          continue;
        }
        const lines = content.split(/\r?\n/);
        lines.forEach((line, i) => {
          if (hits.length >= args.maxMatches) return;
          regex.lastIndex = 0;
          if (regex.test(line)) {
            hits.push({ file: full, line: i + 1, text: line.slice(0, 400) });
          }
        });
      }
    }
  }

  for (const r of searchRoots) {
    const st = fs.statSync(r);
    if (st.isDirectory()) walk(r);
    else if (st.isFile()) {
      filesVisited++;
      const content = fs.readFileSync(r, "utf8");
      const lines = content.split(/\r?\n/);
      lines.forEach((line, i) => {
        if (hits.length >= args.maxMatches) return;
        regex.lastIndex = 0;
        if (regex.test(line)) hits.push({ file: r, line: i + 1, text: line.slice(0, 400) });
      });
    }
  }

  return hits;
}
