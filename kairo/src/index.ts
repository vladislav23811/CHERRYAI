#!/usr/bin/env node
/**
 * Kairo MCP server — exposes local coding chat (Ollama) to Cursor via Model Context Protocol (stdio).
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from "zod/v4";
import { ollamaChat, ollamaHealth, ollamaListModels } from "./ollama.js";

const baseUrl = process.env.KAIRO_OLLAMA_URL?.trim() || "http://127.0.0.1:11434";

const instructions = [
  "Kairo bridges Cursor to a local Ollama runtime for coding-oriented chat.",
  `Ollama base URL: ${baseUrl} (override with env KAIRO_OLLAMA_URL).`,
  "Tools: kairo_health (check daemon), kairo_models (list tags), kairo_chat (single-turn assistant reply).",
  "Prefer concise, actionable answers with code fences when showing edits.",
].join(" ");

const server = new McpServer({ name: "kairo", version: "0.1.0" }, { instructions });

server.registerTool(
  "kairo_health",
  {
    description: "Check whether the Ollama HTTP API is reachable (same host Cursor uses for local models).",
  },
  async () => {
    const { ok, detail } = await ollamaHealth(baseUrl);
    const text = JSON.stringify({ ok, detail, baseUrl }, null, 2);
    return { content: [{ type: "text", text }] };
  },
);

server.registerTool(
  "kairo_models",
  {
    description: "List model tags available from the local Ollama server.",
  },
  async () => {
    try {
      const models = await ollamaListModels(baseUrl);
      const text = JSON.stringify({ baseUrl, models }, null, 2);
      return { content: [{ type: "text", text }] };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return {
        content: [{ type: "text", text: JSON.stringify({ error: msg, baseUrl }, null, 2) }],
        isError: true,
      };
    }
  },
);

server.registerTool(
  "kairo_chat",
  {
    description:
      "Send a coding-focused prompt to Ollama (non-streaming). Optional system preamble steers style or repo conventions.",
    inputSchema: {
      prompt: z.string().min(1).describe("User / assistant task — keep structured for best results."),
      model: z
        .string()
        .optional()
        .describe("Ollama model tag (e.g. llama3.2). Omit to use KAIRO_MODEL or first available tag."),
      system: z
        .string()
        .optional()
        .describe("Optional system message (short). Example: You are a terse senior engineer."),
    },
  },
  async ({ prompt, model: modelArg, system }) => {
    try {
      let model =
        modelArg?.trim() ||
        process.env.KAIRO_MODEL?.trim() ||
        "";

      if (!model) {
        const tags = await ollamaListModels(baseUrl);
        model = tags[0] ?? "";
      }
      if (!model) {
        return {
          content: [
            {
              type: "text",
              text: "No model specified and Ollama returned no tags. Pull a model or set KAIRO_MODEL.",
            },
          ],
          isError: true,
        };
      }

      const messages: Array<{ role: "system" | "user"; content: string }> = [];
      if (system?.trim()) messages.push({ role: "system", content: system.trim() });
      messages.push({ role: "user", content: prompt });

      const reply = await ollamaChat({ baseUrl, model, messages });
      const header = `model: ${model}\n\n`;
      return { content: [{ type: "text", text: header + reply }] };
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      return {
        content: [{ type: "text", text: msg }],
        isError: true,
      };
    }
  },
);

async function main(): Promise<void> {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
