import path from "node:path";
import { fileURLToPath } from "node:url";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

export async function collectWorkspaceRoots(mcp: McpServer): Promise<string[]> {
  const extra =
    process.env.KAIRO_WORKSPACE?.split(/[,;]/)
      .map((s) => s.trim())
      .filter(Boolean) ?? [];
  const fromEnv = extra.map((p) => path.resolve(p));

  let fromClient: string[] = [];
  try {
    const caps = mcp.server.getClientCapabilities();
    if (caps && caps.roots !== undefined) {
      const r = await mcp.server.listRoots();
      fromClient = r.roots
        .map((root) => {
          try {
            if (root.uri.startsWith("file://")) return fileURLToPath(root.uri);
          } catch {
            /* ignore */
          }
          return "";
        })
        .filter(Boolean);
    }
  } catch {
    /* client without roots */
  }

  const merged = [...new Set([...fromClient, ...fromEnv])];
  if (merged.length === 0) merged.push(process.cwd());
  return merged;
}
