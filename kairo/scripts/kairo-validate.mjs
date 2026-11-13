#!/usr/bin/env node
/**
 * Kairo smoke + bundle gate (v0.4.1).
 * Spawns UI on 14746 (vault off) and 14747 (vault on) with KAIRO_BACKEND=smoke.
 */
import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const kairoRoot = path.join(__dirname, "..");
const distDir = path.join(kairoRoot, "dist");
const workDir = path.join(kairoRoot, ".kairo-validate");
const bundleDir = path.join(kairoRoot, "kairo-bundle");
const bundleTar = path.join(kairoRoot, "kairo-bundle.tar.gz");

/** Pin after intentional dist changes. */
const EXPECTED_DIST_FILE_COUNT = 46;
const EXPECTED_BUNDLE_SHA256 =
  "81ec3911a194f1fcdfd4029bd89b4bafc12af35de23a2140673fcc9f56abb26a";

const SMOKE_REPLY = process.env.KAIRO_SMOKE_REPLY?.trim() || process.env.SMOKE_REPLY?.trim() || "probe-reply-alpha";

const probes = [];
function probe(name, fn) {
  probes.push({ name, fn });
}

function listFilesRecursive(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...listFilesRecursive(p));
    else out.push(p);
  }
  return out;
}

function copyDistBundle() {
  fs.rmSync(bundleDir, { recursive: true, force: true });
  fs.mkdirSync(bundleDir, { recursive: true });
  fs.cpSync(distDir, bundleDir, { recursive: true });
}

function sha256File(file) {
  const h = createHash("sha256");
  h.update(fs.readFileSync(file));
  return h.digest("hex");
}

/** Deterministic digest of dist/ (sorted relative paths + file bytes). */
function bundleContentSha256(rootDir) {
  const files = listFilesRecursive(rootDir).sort();
  const h = createHash("sha256");
  for (const abs of files) {
    const rel = path.relative(rootDir, abs).replace(/\\/g, "/");
    h.update(rel);
    h.update("\0");
    h.update(fs.readFileSync(abs));
    h.update("\0");
  }
  return h.digest("hex");
}

async function fetchJson(url, init) {
  const r = await fetch(url, init);
  const text = await r.text();
  let body;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = text;
  }
  return { r, body, text };
}

async function waitForHealth(port, ms = 15000) {
  const start = Date.now();
  while (Date.now() - start < ms) {
    try {
      const { r } = await fetchJson(`http://127.0.0.1:${port}/health`);
      if (r.ok) return;
    } catch {
      /* retry */
    }
    await new Promise((res) => setTimeout(res, 120));
  }
  throw new Error(`server on ${port} did not become healthy`);
}

function startServer({ port, vaultDir }) {
  const env = {
    ...process.env,
    KAIRO_BACKEND: "smoke",
    KAIRO_SMOKE_REPLY: SMOKE_REPLY,
    KAIRO_UI_PORT: String(port),
  };
  if (vaultDir) env.KAIRO_VAULT_DIR = vaultDir;
  const child = spawn(process.execPath, ["dist/cli.js", "serve"], {
    cwd: kairoRoot,
    env,
    stdio: ["ignore", "pipe", "pipe"],
    detached: process.platform !== "win32",
  });
  child.stdout?.on("data", () => {});
  child.stderr?.on("data", () => {});
  return child;
}

function stopServer(child) {
  if (!child?.pid) return;
  try {
    if (process.platform !== "win32") process.kill(-child.pid, "SIGTERM");
    else child.kill("SIGTERM");
  } catch {
    try {
      child.kill("SIGKILL");
    } catch {
      /* gone */
    }
  }
}

async function readSseReply(port, message, sessionId) {
  const payload = { message, session_id: sessionId || undefined };
  const r = await fetch(`http://127.0.0.1:${port}/api/chat/stream`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!r.ok) throw new Error(`stream HTTP ${r.status}`);
  const text = await r.text();
  let acc = "";
  for (const block of text.split("\n\n")) {
    const line = block.trim();
    if (!line.startsWith("data:")) continue;
    try {
      const ev = JSON.parse(line.slice(5).trim());
      if (ev.delta) acc += ev.delta;
      if (ev.error) throw new Error(ev.error);
    } catch (e) {
      if (e instanceof SyntaxError) continue;
      throw e;
    }
  }
  return acc;
}

async function runUiProbes(label, port, expectVault) {
  const base = `http://127.0.0.1:${port}`;

  probe(`${label} GET /`, async () => {
    const { r, text } = await fetchJson(`${base}/`);
    if (!r.ok) throw new Error(`status ${r.status}`);
    if (!text.includes("Kairo")) throw new Error("missing title");
    if (!text.includes("Archive to vault")) throw new Error("missing archive control");
  });

  probe(`${label} GET /health`, async () => {
    const { r, body } = await fetchJson(`${base}/health`);
    if (!r.ok || !body?.ok) throw new Error("health not ok");
    if (Boolean(body.vault_enabled) !== expectVault) throw new Error("vault_enabled mismatch");
  });

  probe(`${label} GET /api/meta`, async () => {
    const { r, body } = await fetchJson(`${base}/api/meta`);
    if (!r.ok) throw new Error(`status ${r.status}`);
    if (body.kairo_version !== "0.4.1") throw new Error(`version ${body.kairo_version}`);
    if (Boolean(body.vault_enabled) !== expectVault) throw new Error("vault flag");
    if (body.backend !== "smoke") throw new Error(`backend ${body.backend}`);
  });

  probe(`${label} GET /api/health`, async () => {
    const { r, body } = await fetchJson(`${base}/api/health`);
    if (!r.ok || !body?.ok) throw new Error("inference health failed");
  });

  probe(`${label} GET /api/models`, async () => {
    const { r, body } = await fetchJson(`${base}/api/models`);
    if (!r.ok) throw new Error(`status ${r.status}`);
    if (!Array.isArray(body.models) || !body.models.includes("smoke-probe")) {
      throw new Error("smoke-probe missing");
    }
  });

  for (const asset of [
    "/manifest.webmanifest",
    "/favicon.svg",
    "/sw.js",
    "/vendor/marked.min.js",
    "/vendor/purify.min.js",
  ]) {
    probe(`${label} GET ${asset}`, async () => {
      const { r } = await fetchJson(`${base}${asset}`);
      if (!r.ok) throw new Error(`status ${r.status}`);
    });
  }

  probe(`${label} OPTIONS /`, async () => {
    const r = await fetch(`${base}/`, { method: "OPTIONS" });
    if (r.status !== 204) throw new Error(`status ${r.status}`);
  });

  probe(`${label} vault list gate`, async () => {
    const { r, body } = await fetchJson(`${base}/api/vault/orbits`);
    if (expectVault) {
      if (!r.ok || !body?.vault_enabled) throw new Error("expected vault on");
      if (!Array.isArray(body.orbits)) throw new Error("orbits array");
    } else if (r.status !== 503) {
      throw new Error(`expected 503 got ${r.status}`);
    }
  });

  probe(`${label} POST /api/session`, async () => {
    const { r, body } = await fetchJson(`${base}/api/session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ model: "smoke-probe" }),
    });
    if (!r.ok || !body.session_id) throw new Error("session create failed");
    globalThis[`__kairo_sid_${port}`] = body.session_id;
  });

  probe(`${label} stream stateless`, async () => {
    const reply = await readSseReply(port, "probe-stateless");
    if (reply !== SMOKE_REPLY) throw new Error(`reply mismatch: ${reply}`);
  });

  probe(`${label} stream session`, async () => {
    const sid = globalThis[`__kairo_sid_${port}`];
    const reply = await readSseReply(port, "probe-session", sid);
    if (reply !== SMOKE_REPLY) throw new Error(`reply mismatch: ${reply}`);
  });

  if (expectVault) {
    probe(`${label} vault archive cycle`, async () => {
      const { r, body } = await fetchJson(`${base}/api/vault/orbits`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          markdown: "### YOU\n\nvault-probe\n",
          title: "ci-probe",
          model: "smoke-probe",
        }),
      });
      if (r.status !== 201 || !body?.id) throw new Error("archive failed");
      const id = body.id;
      const one = await fetchJson(`${base}/api/vault/orbits/${id}`);
      if (!one.r.ok || !String(one.body?.markdown || "").includes("vault-probe")) {
        throw new Error("fetch orbit failed");
      }
      const del = await fetch(`${base}/api/vault/orbits/${id}`, { method: "DELETE" });
      if (del.status !== 204) throw new Error(`delete ${del.status}`);
      const gone = await fetchJson(`${base}/api/vault/orbits/${id}`);
      if (gone.r.status !== 404) throw new Error("expected 404 after delete");
    });
  }
}

probe("dist file count", async () => {
  if (!fs.existsSync(distDir)) throw new Error("dist missing — run npm run build");
  const files = listFilesRecursive(distDir);
  if (files.length !== EXPECTED_DIST_FILE_COUNT) {
    throw new Error(`expected ${EXPECTED_DIST_FILE_COUNT} files, got ${files.length}`);
  }
});

probe("bundle sha256", async () => {
  const sum = bundleContentSha256(distDir);
  if (sum !== EXPECTED_BUNDLE_SHA256) {
    throw new Error(`sha256 mismatch (pin ${EXPECTED_BUNDLE_SHA256}, got ${sum})`);
  }
  copyDistBundle();
  fs.rmSync(bundleTar, { force: true });
  await new Promise((resolve, reject) => {
    const tar = spawn(
      "tar",
      ["--sort=name", "--mtime=@0", "-czf", bundleTar, "-C", bundleDir, "."],
      { stdio: "inherit", env: { ...process.env, GZIP: "-n" } },
    );
    tar.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`tar exit ${code}`))));
  });
  if (!fs.existsSync(bundleTar) || sha256File(bundleTar).length !== 64) {
    throw new Error("release tarball missing or invalid after tar");
  }
});

probe("kairo version cli", async () => {
  const require = createRequire(import.meta.url);
  const pkg = require("../package.json");
  if (pkg.version !== "0.4.1") throw new Error(pkg.version);
});

probe("index shell offline hint", async () => {
  const html = fs.readFileSync(path.join(distDir, "static", "index.html"), "utf8");
  if (!html.includes("serviceWorker")) throw new Error("missing SW bootstrap");
  if (!html.includes("archiveVault")) throw new Error("missing archive control id");
});

probe("doctor smoke json", async () => {
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ["dist/cli.js", "doctor", "--json"], {
      cwd: kairoRoot,
      env: { ...process.env, KAIRO_BACKEND: "smoke", KAIRO_SMOKE_REPLY: SMOKE_REPLY },
      stdio: ["ignore", "pipe", "pipe"],
    });
    let out = "";
    child.stdout.on("data", (c) => {
      out += c;
    });
    child.on("exit", (code) => {
      if (code !== 0) return reject(new Error(`doctor exit ${code}`));
      try {
        const j = JSON.parse(out);
        if (!j.health?.ok) throw new Error("doctor health");
        if (!j.models?.includes("smoke-probe")) throw new Error("doctor models");
        resolve();
      } catch (e) {
        reject(e);
      }
    });
  });
});

runUiProbes("off", 14746, false);
runUiProbes("on", 14747, true);

async function main() {
  fs.mkdirSync(workDir, { recursive: true });
  const vaultDir = path.join(workDir, "vault");
  fs.rmSync(vaultDir, { recursive: true, force: true });
  fs.mkdirSync(vaultDir, { recursive: true });

  const offChild = startServer({ port: 14746, vaultDir: null });
  const onChild = startServer({ port: 14747, vaultDir });

  try {
    await Promise.all([waitForHealth(14746), waitForHealth(14747)]);

    let passed = 0;
    for (const p of probes) {
      try {
        await p.fn();
        passed += 1;
        console.log(`  ✓ ${p.name}`);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        console.error(`  ✗ ${p.name}: ${msg}`);
        process.exitCode = 1;
        break;
      }
    }
    if (!process.exitCode) {
      console.log(`\nkairo-validate: ${passed}/${probes.length} probes passed`);
    } else {
      console.error(`\nkairo-validate: failed after ${passed}/${probes.length}`);
    }
  } finally {
    stopServer(offChild);
    stopServer(onChild);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
