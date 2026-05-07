import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import * as z from "zod/v4";
import { createInferenceBackend, resolveModelTag } from "./inference/index.js";
import { ENGINEERING_PROMPT_MARKDOWN } from "./engineering-prompt.js";
import { SessionStore } from "./sessions.js";
import { registerWorkspaceTools } from "./workspace-tools.js";

const PROMPT_URI = "kairo://prompt/engineering";

export function createKairoMcpServer(): McpServer {
  const backend = createInferenceBackend();
  const sessions = new SessionStore(process.env.KAIRO_SESSION_DIR?.trim() || null);

  const instructions = [
    "Kairo — local coding copilot: Cursor ↔ local inference over MCP.",
    `Inference: ${backend.kind} @ ${backend.label} (KAIRO_BACKEND; Ollama uses KAIRO_OLLAMA_URL; OpenAI-compat uses KAIRO_OPENAI_BASE_URL / optional KAIRO_OPENAI_API_KEY).`,
    `Default model: KAIRO_MODEL or first tag from the backend.`,
    `Sessions: optional disk via KAIRO_SESSION_DIR (persists JSON per session).`,
    "Workspace: KAIRO_WORKSPACE plus Cursor MCP roots — tools kairo_workspace_roots, kairo_read_file, kairo_list_directory, kairo_grep.",
    "Also: kairo_health, kairo_models, kairo_chat, kairo_session_* , resource kairo://prompt/engineering",
    "Prefer concise answers with fenced code; cite uncertainty.",
  ].join(" ");

  const server = new McpServer({ name: "kairo", version: "0.3.3" }, { instructions });

  server.registerResource(
    "kairo_engineering_prompt",
    PROMPT_URI,
    {
      title: "Engineering psyche",
      description:
        "Default Kairo engineering system preamble (markdown). Paste or adapt for complex codegen tasks.",
      mimeType: "text/markdown",
    },
    async () => ({
      contents: [{ uri: PROMPT_URI, mimeType: "text/markdown", text: ENGINEERING_PROMPT_MARKDOWN }],
    }),
  );

  server.registerTool(
    "kairo_health",
    {
      description: "Check whether the configured inference backend HTTP API is reachable.",
    },
    async () => {
      const { ok, detail } = await backend.health();
      const text = JSON.stringify({ ok, detail, backend: backend.kind, endpoint: backend.label }, null, 2);
      return { content: [{ type: "text", text }] };
    },
  );

  server.registerTool(
    "kairo_models",
    {
      description: "List model IDs/tags available from the configured inference backend.",
    },
    async () => {
      try {
        const models = await backend.listModels();
        const text = JSON.stringify({ backend: backend.kind, endpoint: backend.label, models }, null, 2);
        return { content: [{ type: "text", text }] };
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(
                { error: msg, backend: backend.kind, endpoint: backend.label },
                null,
                2,
              ),
            },
          ],
          isError: true,
        };
      }
    },
  );

  server.registerTool(
    "kairo_chat",
    {
      description:
        "Single-turn coding prompt (non-streaming). Optional system preamble. Uses KAIRO_BACKEND.",
      inputSchema: {
        prompt: z.string().min(1).describe("Task / question for the model."),
        model: z.string().optional().describe("Model id/tag; optional."),
        system: z.string().optional().describe("Optional system instructions."),
      },
    },
    async ({ prompt, model: modelArg, system }) => {
      try {
        const model = await resolveModelTag(backend, modelArg);
        if (!model) {
          return {
            content: [
              {
                type: "text",
                text: "No model specified and backend returned no models. Configure KAIRO_MODEL or install/pull a model.",
              },
            ],
            isError: true,
          };
        }
        const messages: Array<{ role: "system" | "user"; content: string }> = [];
        if (system?.trim()) messages.push({ role: "system", content: system.trim() });
        messages.push({ role: "user", content: prompt });
        const reply = await backend.chat(model, messages);
        return { content: [{ type: "text", text: `model: ${model}\n\n${reply}` }] };
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return { content: [{ type: "text", text: msg }], isError: true };
      }
    },
  );

  server.registerTool(
    "kairo_session_create",
    {
      description:
        "Create a multi-turn chat session (in-memory, optionally persisted under KAIRO_SESSION_DIR). Returns session_id.",
      inputSchema: {
        model: z.string().optional().describe("Model id/tag; defaults like kairo_chat."),
      },
    },
    async ({ model: modelArg }) => {
      try {
        const model = await resolveModelTag(backend, modelArg);
        if (!model) {
          return {
            content: [{ type: "text", text: "No models available from the inference backend." }],
            isError: true,
          };
        }
        const s = sessions.create(model);
        return {
          content: [{ type: "text", text: JSON.stringify({ session_id: s.id, model: s.model }, null, 2) }],
        };
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return { content: [{ type: "text", text: msg }], isError: true };
      }
    },
  );

  server.registerTool(
    "kairo_session_chat",
    {
      description:
        "Append a user message to a session, run inference with full history, store assistant reply.",
      inputSchema: {
        session_id: z.string().uuid().describe("From kairo_session_create."),
        prompt: z.string().min(1),
        system: z
          .string()
          .optional()
          .describe("Applied once if session has no system message yet."),
      },
    },
    async ({ session_id, prompt, system }) => {
      try {
        const s = sessions.get(session_id);
        if (!s) {
          return {
            content: [{ type: "text", text: `Unknown session_id: ${session_id}` }],
            isError: true,
          };
        }
        if (system?.trim()) sessions.ensureSystemMessage(session_id, system);
        const fresh = sessions.get(session_id);
        if (!fresh) {
          return {
            content: [{ type: "text", text: `Unknown session_id: ${session_id}` }],
            isError: true,
          };
        }
        const history = [...fresh.messages];
        history.push({ role: "user", content: prompt });
        const reply = await backend.chat(fresh.model, history);
        sessions.appendMessages(session_id, [
          { role: "user", content: prompt },
          { role: "assistant", content: reply },
        ]);
        return { content: [{ type: "text", text: `model: ${fresh.model}\n\n${reply}` }] };
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        return { content: [{ type: "text", text: msg }], isError: true };
      }
    },
  );

  server.registerTool(
    "kairo_session_history",
    {
      description: "Return recent messages for a session (JSON).",
      inputSchema: {
        session_id: z.string().uuid(),
        limit: z.number().int().positive().max(200).optional().describe("Last N messages (default 40)."),
      },
    },
    async ({ session_id, limit }) => {
      const s = sessions.get(session_id);
      if (!s) {
        return {
          content: [{ type: "text", text: `Unknown session_id: ${session_id}` }],
          isError: true,
        };
      }
      const lim = limit ?? 40;
      const slice = s.messages.slice(-lim);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ session_id, model: s.model, messages: slice }, null, 2),
          },
        ],
      };
    },
  );

  server.registerTool(
    "kairo_session_delete",
    {
      description: "Drop a session from memory / disk.",
      inputSchema: {
        session_id: z.string().uuid(),
      },
    },
    async ({ session_id }) => {
      sessions.delete(session_id);
      return { content: [{ type: "text", text: JSON.stringify({ ok: true, session_id }, null, 2) }] };
    },
  );

  registerWorkspaceTools(server);

  return server;
}
