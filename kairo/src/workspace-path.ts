import path from "node:path";

/** True if \`target\` is equal to \`root\` or strictly inside it. */
export function pathContainedByRoot(root: string, target: string): boolean {
  const R = path.resolve(root);
  const T = path.resolve(target);
  const rel = path.relative(R, T);
  return rel === "" || (!rel.startsWith(`..${path.sep}`) && rel !== "..");
}

/** Resolve \`userPath\` to an absolute path confined to one of \`roots\`. */
export function resolveUnderRoots(roots: string[], userPath: string): string | null {
  const trimmed = userPath.trim();
  if (!trimmed) return null;

  const tryResolved = (abs: string): string | null => {
    const resolved = path.resolve(abs);
    for (const root of roots) {
      if (pathContainedByRoot(path.resolve(root), resolved)) return resolved;
    }
    return null;
  };

  if (path.isAbsolute(trimmed)) return tryResolved(trimmed);

  const relative = trimmed.replace(/^[/\\]+/, "");
  for (const root of roots) {
    const hit = tryResolved(path.join(path.resolve(root), relative));
    if (hit) return hit;
  }
  return null;
}
