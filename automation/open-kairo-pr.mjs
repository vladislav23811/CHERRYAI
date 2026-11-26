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
      { encoding: "utf8", env: ghEnv() },
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

  if (!token()) {
    try {
      execFileSync("gh", ["auth", "status"], { encoding: "utf8", stdio: "pipe", env: ghEnv() });
    } catch {
      console.log(
        JSON.stringify(
          {
            ok: true,
            action: "manual",
            compare: COMPARE,
            hint: "Run gh auth login or set GH_TOKEN/GITHUB_TOKEN, then re-run npm run automation:open-kairo-pr",
          },
          null,
          2,
        ),
      );
      return;
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

main();