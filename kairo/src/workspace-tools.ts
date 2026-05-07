import path from "node:path";
import * as z from "zod/v4";
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { type DirEntry, grepWorkspace, listDirectorySafe, readFileSafe } from "./workspace-fs.js";
import { collectWorkspaceRoots } from "./workspace-roots.js";
import { resolveUnderRoots } from "./workspace-path.js";

export function registerWorkspaceTools(mcp: McpServer): void {
  mcp.registerTool(
    "kairo_workspace_roots",
    {
      description:
        "List filesystem roots Kairo may access: Cursor MCP workspace roots, plus KAIRO_WORKSPACE env paths, else cwd.",
    },
    async () => {
      const roots = await collectWorkspaceRoots(mcp);
      const text = JSON.stringify({ roots }, null, 2);
      return { content: [{ type: "text", text }] };
    },
  );

  mcp.registerTool(
    "kairo_read_file",
    {
      description: "Read a UTF-8 text file confined to workspace roots (relative path recommended).",
      inputSchema: {
        path: z.string().min(1).describe("File path relative to workspace root or absolute within roots."),
        max_bytes: z.number().int().positive().max(2_000_000).optional().describe("Max bytes (default 256000)."),
      },
    },
    async ({ path: rel, max_bytes }) => {
      try {
        const roots = await collectWorkspaceRoots(mcp);
        const abs = resolveUnderRoots(roots, rel);
        if (!abs) {
          return {
            content: [{ type: "text", text: `Path escapes workspace roots: ${rel}` }],
            isError: true,
          };
        }
        const max = max_bytes ?? 256_000;
        const text = readFileSafe(abs, max);
        return { content: [{ type: "text", text: `--- ${abs}\n${text}` }] };
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return { content: [{ type: "text", text: msg }], isError: true };
      }
    },
  );

  mcp.registerTool(
    "kairo_list_directory",
    {
      description:
        "List immediate children of a directory inside workspace roots (skips heavy dirs like node_modules). Path '.' lists every root side-by-side.",
      inputSchema: {
        path: z.string().describe("Directory path (relative or absolute within roots). Use '.' for all workspace roots."),
        max_entries: z.number().int().positive().max(500).optional(),
      },
    },
    async ({ path: rel, max_entries }) => {
      try {
        const roots = await collectWorkspaceRoots(mcp);
        const raw = rel.trim() === "" ? "." : rel;
        const max = max_entries ?? 200;

        if (raw === ".") {
          const resolvedRoots = roots.map((r) => path.resolve(r));
          const perRoot = Math.max(24, Math.ceil(max / Math.max(1, resolvedRoots.length)));
          const listings = resolvedRoots.map((rootAbs) => {
            try {
              const entries = listDirectorySafe(rootAbs, perRoot);
              return { root: rootAbs, directory: rootAbs, entries };
            } catch (e) {
              const msg = e instanceof Error ? e.message : String(e);
              return { root: rootAbs, directory: rootAbs, error: msg, entries: [] as DirEntry[] };
            }
          });
          const text = JSON.stringify(
            { scope: "all_workspace_roots", roots: resolvedRoots, listings },
            null,
            2,
          );
          return { content: [{ type: "text", text }] };
        }

        const abs = resolveUnderRoots(roots, raw);
        if (!abs) {
          return {
            content: [{ type: "text", text: `Path escapes workspace roots: ${rel}` }],
            isError: true,
          };
        }
        const entries = listDirectorySafe(abs, max);
        const text = JSON.stringify({ directory: abs, entries }, null, 2);
        return { content: [{ type: "text", text }] };
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return { content: [{ type: "text", text: msg }], isError: true };
      }
    },
  );

  mcp.registerTool(
    "kairo_grep",
    {
      description:
        "Regex search across text files under workspace roots (bounded). Skips node_modules, .git, dist, etc.",
      inputSchema: {
        pattern: z.string().min(1).describe("JavaScript regex pattern (e.g. \\\\bparseInt\\\\b)."),
        path: z.string().optional().describe("Optional subdirectory relative to a root to narrow search."),
        max_matches: z.number().int().positive().max(200).optional(),
        extensions: z
          .string()
          .optional()
          .describe('Optional comma extensions filter e.g. ".ts,.tsx,.js"'),
      },
    },
    async ({ pattern, path: sub, max_matches, extensions }) => {
      try {
        const roots = await collectWorkspaceRoots(mcp);
        let extSet: Set<string> | undefined;
        if (extensions?.trim()) {
          extSet = new Set(
            extensions
              .split(",")
              .map((s) => s.trim().toLowerCase())
              .filter(Boolean)
              .map((e) => (e.startsWith(".") ? e : `.${e}`)),
          );
        }
        const hits = grepWorkspace({
          roots,
          pattern,
          subPath: sub,
          maxMatches: max_matches ?? 80,
          maxFiles: 4000,
          extensions: extSet,
        });
        const text = JSON.stringify({ pattern, hits }, null, 2);
        return { content: [{ type: "text", text }] };
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return { content: [{ type: "text", text: msg }], isError: true };
      }
    },
  );
}
