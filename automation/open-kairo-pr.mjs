#!/usr/bin/env node
/**
 * Open PR cursor/ongoing-development-work-6657 → main (idempotent).
 * Without a token (env or Cursor git config), prints compare URL JSON and exits 0.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveGithubToken } from "./github-token.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = "vladislav23811/CHERRYAI";
const HEAD = "cursor/ongoing-development-work-6657";
const BASE = "main";
const COMPARE = `https://github.com/${REPO}/compare/${BASE}...${HEAD}?expand=1`;

function token() {
  return resolveGithubToken();
}

async function apiJson(path, { method = "GET", body } = {}) {
  const t = token();
  if (!t) throw new Error("no_github_token");
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${t}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "User-Agent": "cherryai-automation-open-pr",
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text.slice(0, 200) };
  }
  return { ok: res.ok, status: res.status, json };
}

async function existingPrUrlApi() {
  const q = encodeURIComponent(`repo:${REPO} is:pr is:open head:${HEAD}`);
  const { ok, status, json } = await apiJson(`/search/issues?q=${q}&per_page=1`);
  if (!ok) {
    const msg = json.message ?? `http_${status}`;
    if (/Resource not accessible by integration/i.test(msg)) return { blocked: true, msg };
    return { blocked: false, error: msg };
  }
  const item = json.items?.[0];
  return { blocked: false, url: item?.html_url ?? null };
}

async function createPrApi() {
  const { ok, status, json } = await apiJson(`/repos/${REPO}/pulls`, {
    method: "POST",
    body: {
      title: "Kairo v0.4.1",
      head: HEAD,
      base: BASE,
      body: body(),
    },
  });
  if (!ok) {
    const msg = json.message ?? `http_${status}`;
    throw new Error(msg);
  }
  return json.html_url;
}

function body() {
  const p = path.join(__dirname, "kairo-pr-body.md");
  return fs.readFileSync(p, "utf8");
}

function ghEnv() {
  const t = token();
  if (!t) return process.env;
  return { ...process.env, GH_TOKEN: t, GITHUB_TOKEN: t };
}

function existingPrUrl() {
  try {
    const out = execFileSync(
      "gh",
      ["pr", "list", "--head", HEAD, "--base", BASE, "--json", "url", "--jq", ".[0].url"],
      { encoding: "utf8", env: ghEnv(), stdio: ["ignore", "pipe", "ignore"] },
    ).trim();
    return out || null;
  } catch {
    return null;
  }
}

function manualCompare(hint) {
  console.log(
    JSON.stringify(
      {
        ok: true,
        action: "manual",
        compare: COMPARE,
        hint,
      },
      null,
      2,
    ),
  );
}

async function main() {
  const found = existingPrUrl();
  if (found) {
    console.log(JSON.stringify({ ok: true, action: "exists", url: found }, null, 2));
    return;
  }

  const t = token();
  if (t) {
    const viaApi = await existingPrUrlApi();
    if (viaApi.url) {
      console.log(JSON.stringify({ ok: true, action: "exists", url: viaApi.url, via: "api" }, null, 2));
      return;
    }
    if (viaApi.blocked) {
      manualCompare(
        "Hosted token cannot search issues; open compare URL in browser or use owner PAT",
      );
      return;
    }
  }

  if (!t) {
    try {
      execFileSync("gh", ["auth", "status"], { encoding: "utf8", stdio: "pipe", env: ghEnv() });
    } catch {
      manualCompare(
        "Run gh auth login or set GH_TOKEN/GITHUB_TOKEN, then re-run npm run automation:open-kairo-pr",
      );
      return;
    }
  }

  try {
    const url = await createPrApi();
    console.log(JSON.stringify({ ok: true, action: "created", url, via: "api" }, null, 2));
    return;
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (!/Resource not accessible by integration|createPullRequest|no_github_token/i.test(msg)) {
      console.log(JSON.stringify({ ok: false, action: "error", compare: COMPARE, error: msg, via: "api" }, null, 2));
      process.exit(1);
    }
  }

  try {
    const url = execFileSync(
      "gh",
      ["pr", "create", "--base", BASE, "--head", HEAD, "--title", "Kairo v0.4.1", "--body-file", path.join(__dirname, "kairo-pr-body.md")],
      {
        encoding: "utf8",
        env: ghEnv(),
      },
    ).trim();
    console.log(JSON.stringify({ ok: true, action: "created", url }, null, 2));
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    const integration =
      /Resource not accessible by integration|createPullRequest/i.test(msg);
    console.log(
      JSON.stringify(
        integration
          ? {
              ok: true,
              action: "manual",
              compare: COMPARE,
              hint: "Hosted gh token cannot createPullRequest; open compare URL in browser or use owner PAT",
            }
          : { ok: false, action: "error", compare: COMPARE, error: msg },
        null,
        2,
      ),
    );
    process.exit(integration ? 0 : 1);
  }
}

main().catch((e) => {
  const msg = e instanceof Error ? e.message : String(e);
  if (/no_github_token/i.test(msg)) {
    manualCompare("Set GH_TOKEN/GITHUB_TOKEN or configure git url.* token, then re-run npm run automation:open-kairo-pr");
    return;
  }
  console.error(e);
  process.exit(1);
});