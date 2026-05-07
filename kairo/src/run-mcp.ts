import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { createKairoMcpServer } from "./server-builder.js";

export async function runMcpStdio(): Promise<void> {
  const server = createKairoMcpServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
