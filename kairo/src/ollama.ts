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
