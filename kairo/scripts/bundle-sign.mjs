#!/usr/bin/env node
/**
 * Optional Ed25519 release signing for kairo-bundle.tar.gz (v1.0.0 prep).
 * CI skips when keys are unset; local release sets KAIRO_SIGN_PRIVATE_KEY.
 */
import { createHash, createPrivateKey, createPublicKey, sign, verify } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const SIG_ALGO = "ed25519";

/** @param {string} pemOrB64 */
export function loadPrivateKey(pemOrB64) {
  const raw = pemOrB64.trim();
  if (raw.includes("BEGIN")) {
    return createPrivateKey(raw);
  }
  const der = Buffer.from(raw, "base64");
  return createPrivateKey({ key: der, format: "der", type: "pkcs8" });
}

/** @param {string} pemOrB64 */
export function loadPublicKey(pemOrB64) {
  const raw = pemOrB64.trim();
  if (raw.includes("BEGIN")) {
    return createPublicKey(raw);
  }
  const der = Buffer.from(raw, "base64");
  return createPublicKey({ key: der, format: "der", type: "spki" });
}

/**
 * @param {string} tarPath
 * @param {import("node:crypto").KeyObject} privateKey
 * @param {string} [sigPath]
 */
export function writeBundleSignature(tarPath, privateKey, sigPath = `${tarPath}.sig.json`) {
  const digest = fs.readFileSync(tarPath);
  const signature = sign(null, digest, privateKey);
  const publicKey = createPublicKey(privateKey);
  const record = {
    algorithm: SIG_ALGO,
    bundle: path.basename(tarPath),
    digest_sha256: createHash("sha256").update(digest).digest("hex"),
    signature: signature.toString("base64"),
    public_key_spki: publicKey.export({ type: "spki", format: "der" }).toString("base64"),
  };
  fs.writeFileSync(sigPath, `${JSON.stringify(record, null, 2)}\n`, "utf8");
  return { sigPath, record };
}

/**
 * @param {string} tarPath
 * @param {import("node:crypto").KeyObject} publicKey
 * @param {string} [sigPath]
 */
export function verifyBundleSignature(tarPath, publicKey, sigPath = `${tarPath}.sig.json`) {
  if (!fs.existsSync(sigPath)) {
    throw new Error(`missing signature ${sigPath}`);
  }
  const record = JSON.parse(fs.readFileSync(sigPath, "utf8"));
  if (record.algorithm !== SIG_ALGO) {
    throw new Error(`unsupported sig algorithm ${record.algorithm}`);
  }
  const digest = fs.readFileSync(tarPath);
  const sha = createHash("sha256").update(digest).digest("hex");
  if (record.digest_sha256 && record.digest_sha256 !== sha) {
    throw new Error("bundle sha256 does not match signature record");
  }
  const ok = verify(
    null,
    digest,
    publicKey,
    Buffer.from(record.signature, "base64"),
  );
  if (!ok) throw new Error("ed25519 verify failed");
  return record;
}

export function signBundleFromEnv(tarPath, sigPath) {
  const pem = process.env.KAIRO_SIGN_PRIVATE_KEY?.trim();
  if (!pem) throw new Error("KAIRO_SIGN_PRIVATE_KEY unset");
  return writeBundleSignature(tarPath, loadPrivateKey(pem), sigPath);
}

export function verifyBundleFromEnv(tarPath, sigPath) {
  const pem = process.env.KAIRO_SIGN_PUBLIC_KEY?.trim();
  if (!pem) throw new Error("KAIRO_SIGN_PUBLIC_KEY unset");
  return verifyBundleSignature(tarPath, loadPublicKey(pem), sigPath);
}

async function main() {
  const args = process.argv.slice(2);
  const here = path.dirname(fileURLToPath(import.meta.url));
  const defaultTar = path.join(here, "..", "kairo-bundle.tar.gz");
  let tar = defaultTar;
  let mode = "sign";
  if (args[0] === "sign" || args[0] === "verify") {
    mode = args[0];
  } else if (args[0]) {
    tar = args[0];
    mode = args[1] === "verify" ? "verify" : "sign";
  }
  const resolved = path.resolve(tar);
  if (!fs.existsSync(resolved)) {
    console.error(`missing bundle ${resolved}`);
    process.exit(1);
  }
  if (mode === "sign") {
    const { sigPath } = signBundleFromEnv(resolved);
    console.log(JSON.stringify({ ok: true, action: "signed", sigPath }, null, 2));
    return;
  }
  if (mode === "verify") {
    verifyBundleFromEnv(resolved);
    console.log(JSON.stringify({ ok: true, action: "verified", bundle: resolved }, null, 2));
    return;
  }
  console.error("usage: bundle-sign.mjs [tar.gz] [sign|verify]");
  process.exit(1);
}

const isDirect = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (isDirect) {
  main().catch((e) => {
    console.error(e instanceof Error ? e.message : String(e));
    process.exit(1);
  });
}