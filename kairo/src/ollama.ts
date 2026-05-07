export type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

function joinUrl(base: string, path: string): string {
  return `${base.replace(/\/+$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

export async function ollamaHealth(baseUrl: string): Promise<{ ok: boolean; detail: string }> {
  try {
    const res = await fetch(joinUrl(baseUrl, "/"), { method: "GET" });
    return { ok: res.ok, detail: res.ok ? "Ollama reachable" : `HTTP ${res.status}` };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return { ok: false, detail: msg };
  }
}

export async function ollamaListModels(baseUrl: string): Promise<string[]> {
  const res = await fetch(joinUrl(baseUrl, "/api/tags"));
  if (!res.ok) throw new Error(`List models failed: HTTP ${res.status}`);
  const data = (await res.json()) as { models?: Array<{ name?: string }> };
  return (data.models ?? []).map((m) => m.name ?? "").filter(Boolean);
}

export async function ollamaChat(args: {
  baseUrl: string;
  model: string;
  messages: ChatMessage[];
}): Promise<string> {
  const res = await fetch(joinUrl(args.baseUrl, "/api/chat"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: args.model,
      messages: args.messages,
      stream: false,
    }),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Chat failed: HTTP ${res.status} ${t.slice(0, 500)}`);
  }
  const data = (await res.json()) as {
    message?: { content?: string };
    error?: string;
  };
  if (data.error) throw new Error(data.error);
  const text = data.message?.content?.trim();
  if (!text) throw new Error("Empty response from Ollama");
  return text;
}

/** Stream assistant token deltas from Ollama (\`/api/chat\` with \`stream: true\`). */
export async function* ollamaChatStream(args: {
  baseUrl: string;
  model: string;
  messages: ChatMessage[];
  signal?: AbortSignal;
}): AsyncGenerator<string, void, undefined> {
  const res = await fetch(joinUrl(args.baseUrl, "/api/chat"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: args.model,
      messages: args.messages,
      stream: true,
    }),
    signal: args.signal,
  });
  if (!res.ok || !res.body) {
    const t = await res.text().catch(() => "");
    throw new Error(`Chat stream failed: HTTP ${res.status} ${t.slice(0, 400)}`);
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        let parsed: unknown;
        try {
          parsed = JSON.parse(trimmed);
        } catch {
          continue;
        }
        const chunk = parsed as { message?: { content?: string }; error?: string };
        if (chunk.error) throw new Error(chunk.error);
        const piece = chunk.message?.content;
        if (piece) yield piece;
      }
    }
    if (buffer.trim()) {
      try {
        const chunk = JSON.parse(buffer.trim()) as { message?: { content?: string } };
        if (chunk.message?.content) yield chunk.message.content;
      } catch {
        /* ignore trailing garbage */
      }
    }
  } finally {
    reader.releaseLock();
  }
}
