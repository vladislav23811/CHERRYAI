#!/usr/bin/env node
/**
 * Open PR cursor/ongoing-development-work-6657 → main (idempotent).
 * Without GH_TOKEN/GITHUB_TOKEN, prints compare URL JSON and exits 0.
 */
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = "vladislav23811/CHERRYAI";
const HEAD = "cursor/ongoing-development-work-6657";
const BASE = "main";
const COMPARE = `https://github.com/${REPO}/compare/${BASE}...${HEAD}?expand=1`;

function token() {
  return (process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "").trim();
}

function body() {
  const p = path.join(__dirname, "kairo-pr-body.md");
  return fs.readFileSync(p, "utf8");
}

function existingPrUrl() {
  const t = token();
  if (!t) return null;
  try {
    const out = execFileSync(
      "gh",
      ["pr", "list", "--head", HEAD, "--base", BASE, "--json", "url", "--jq", ".[0].url"],
      { encoding: "utf8", env: { ...process.env, GH_TOKEN: t, GITHUB_TOKEN: t } },
    ).trim();
    return out || null;
  } catch {
    return null;
  }
}

function main() {
  const found = existingPrUrl();
  if (found) {
    console.log(JSON.stringify({ ok: true, action: "exists", url: found }, null, 2));
    return;
  }

  const t = token();
  if (!t) {
    console.log(
      JSON.stringify(
        {
          ok: true,
          action: "manual",
          compare: COMPARE,
          hint: "Set GH_TOKEN or GITHUB_TOKEN with repo scope, then re-run npm run automation:open-kairo-pr",
        },
        null,
        2,
      ),
    );
    return;
  }

  try {
    const url = execFileSync(
      "gh",
      ["pr", "create", "--base", BASE, "--head", HEAD, "--title", "Kairo v0.4.1", "--body-file", path.join(__dirname, "kairo-pr-body.md")],
      {
        encoding: "utf8",
        env: { ...process.env, GH_TOKEN: t, GITHUB_TOKEN: t },
      },
    ).trim();
    console.log(JSON.stringify({ ok: true, action: "created", url }, null, 2));
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.log(
      JSON.stringify(
        { ok: false, action: "error", compare: COMPARE, error: msg, bodyPreview: body().slice(0, 120) },
        null,
        2,
      ),
    );
    process.exit(1);
  }
}

main();