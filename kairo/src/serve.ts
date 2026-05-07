import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createInferenceBackend, resolveModelTag } from "./inference/index.js";
import { SessionStore } from "./sessions.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

function cors(res: ServerResponse): void {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

async function readJsonBody(req: IncomingMessage): Promise<unknown> {
  const chunks: Buffer[] = [];
  for await (const ch of req) chunks.push(ch as Buffer);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw.trim()) return {};
  return JSON.parse(raw) as unknown;
}

export async function runServe(): Promise<void> {
  const backend = createInferenceBackend();
  const port = Number(process.env.KAIRO_UI_PORT ?? "4747") || 4747;
  const sessions = new SessionStore(process.env.KAIRO_SESSION_DIR?.trim() || null);

  let indexHtml: string;
  try {
    indexHtml = readFileSync(join(__dirname, "static", "index.html"), "utf8");
  } catch {
    console.error("Missing dist/static/index.html — run npm run build");
    process.exit(1);
  }

  const server = createServer(async (req, res) => {
    cors(res);
    const url = req.url ?? "/";

    if (req.method === "OPTIONS") {
      res.writeHead(204);
      res.end();
      return;
    }

    try {
      if (req.method === "GET" && (url === "/" || url.startsWith("/?"))) {
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(indexHtml);
        return;
      }

      if (req.method === "GET" && url === "/api/health") {
        const h = await backend.health();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ ...h, backend: backend.kind, endpoint: backend.label }));
        return;
      }

      if (req.method === "GET" && url === "/api/models") {
        const models = await backend.listModels();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ models, backend: backend.kind, endpoint: backend.label }));
        return;
      }

      if (req.method === "POST" && url === "/api/session") {
        const body = (await readJsonBody(req)) as { model?: string };
        const model = await resolveModelTag(backend, body.model);
        if (!model) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "No models available" }));
          return;
        }
        const s = sessions.create(model);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ session_id: s.id, model: s.model }));
        return;
      }

      if (req.method === "POST" && url === "/api/chat/stream") {
        const body = (await readJsonBody(req)) as {
          message?: string;
          session_id?: string;
          model?: string;
          system?: string;
        };
        const message = body.message?.trim();
        if (!message) {
          res.writeHead(400, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ error: "message required" }));
          return;
        }

        let model: string;
        let chatMessages: Array<{ role: "system" | "user" | "assistant"; content: string }>;

        if (body.session_id) {
          const s = sessions.get(body.session_id);
          if (!s) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "unknown session" }));
            return;
          }
          if (body.system?.trim()) sessions.ensureSystemMessage(body.session_id, body.system);
          const fresh = sessions.get(body.session_id)!;
          model = fresh.model;
          chatMessages = [...fresh.messages, { role: "user" as const, content: message }];
        } else {
          model = await resolveModelTag(backend, body.model);
          if (!model) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ error: "no model" }));
            return;
          }
          chatMessages = [];
          if (body.system?.trim()) chatMessages.push({ role: "system", content: body.system.trim() });
          chatMessages.push({ role: "user", content: message });
        }

        res.writeHead(200, {
          "Content-Type": "text/event-stream; charset=utf-8",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        });

        const ac = new AbortController();
        const onAbort = (): void => ac.abort();
        req.on("close", onAbort);

        let full = "";
        try {
          for await (const delta of backend.chatStream(model, chatMessages, ac.signal)) {
            full += delta;
            res.write(`data: ${JSON.stringify({ delta })}\n\n`);
          }
          if (body.session_id && !ac.signal.aborted) {
            sessions.appendMessages(body.session_id, [
              { role: "user", content: message },
              { role: "assistant", content: full },
            ]);
          }
          res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          const aborted = ac.signal.aborted;
          res.write(`data: ${JSON.stringify({ error: msg, cancelled: aborted })}\n\n`);
        } finally {
          req.off("close", onAbort);
        }
        res.end();
        return;
      }

      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "not found" }));
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: msg }));
    }
  });

  await new Promise<void>((resolve) => {
    server.listen(port, () => {
      console.error(`\n  Kairo UI   ~  http://127.0.0.1:${port}`);
      console.error(`  Inference  ~  ${backend.kind} @ ${backend.label}\n`);
      resolve();
    });
  });
}
