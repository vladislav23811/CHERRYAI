#!/usr/bin/env node
/** Resolve a GitHub API token from env or Cursor-managed git url.* config (no logging). */
import { execFileSync } from "node:child_process";

export function tokenFromEnv() {
  return (process.env.GITHUB_TOKEN || process.env.GH_TOKEN || "").trim();
}

/** @returns {string} */
export function tokenFromGitConfig() {
  let lines;
  try {
    lines = execFileSync("git", ["config", "--global", "-l"], { encoding: "utf8" }).split("\n");
  } catch {
    return "";
  }
  const line = lines.find(
    (l) => l.startsWith("url.https://x-access-token:") && l.includes("@github.com/"),
  );
  if (!line) return "";
  const m = line.match(/^url\.https:\/\/x-access-token:([^@]+)@github\.com\/\.insteadof=/);
  return m?.[1]?.trim() ?? "";
}

export function resolveGithubToken() {
  return tokenFromEnv() || tokenFromGitConfig();
}