#!/usr/bin/env node

import { execFile } from "node:child_process";
import process from "node:process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function parseJson(input, context) {
  try {
    return JSON.parse(input);
  } catch (error) {
    throw new Error(`Failed to parse JSON from ${context}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function getMarketplaceVersions(extensionId) {
  const { stdout } = await execFileAsync("npx", ["vsce", "show", extensionId, "--json"], { maxBuffer: 1024 * 1024 * 8 });
  const payload = parseJson(stdout, "vsce show");
  const rawVersions = Array.isArray(payload.versions) ? payload.versions : [];
  const unique = new Set(rawVersions.map((version) => version?.version).filter((version) => typeof version === "string"));
  return [...unique];
}

async function getOpenVsxVersion(extensionId, expectedVersion) {
  const { stdout } = await execFileAsync("npx", ["ovsx", "get", extensionId, "--metadata", "--versionRange", expectedVersion], {
    maxBuffer: 1024 * 1024 * 8
  });
  const payload = parseJson(stdout, "ovsx get --metadata");
  if (typeof payload.version !== "string") {
    throw new Error("Open VSX metadata does not include a version field.");
  }
  return payload.version;
}

async function verify(extensionId, expectedVersion) {
  const marketplaceVersions = await getMarketplaceVersions(extensionId);
  if (!marketplaceVersions.includes(expectedVersion)) {
    throw new Error(`Marketplace does not list version ${expectedVersion}. Found: ${marketplaceVersions.slice(0, 8).join(", ") || "none"}`);
  }

  const openVsxVersion = await getOpenVsxVersion(extensionId, expectedVersion);
  if (openVsxVersion !== expectedVersion) {
    throw new Error(`Open VSX returned version ${openVsxVersion}, expected ${expectedVersion}.`);
  }
}

async function main() {
  const extensionId = process.argv[2];
  const expectedVersion = process.argv[3];
  const attempts = Number.parseInt(process.env.VERIFY_ATTEMPTS ?? "12", 10);
  const delayMs = Number.parseInt(process.env.VERIFY_DELAY_MS ?? "10000", 10);

  if (!extensionId || !expectedVersion) {
    console.error("Usage: node scripts/verify-publish.mjs <publisher.extension> <version>");
    process.exit(1);
  }

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await verify(extensionId, expectedVersion);
      console.log(`Verified ${extensionId}@${expectedVersion} on Marketplace and Open VSX.`);
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.warn(`Verification attempt ${attempt}/${attempts} failed: ${message}`);
      if (attempt === attempts) {
        throw error;
      }
      await sleep(delayMs);
    }
  }
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Publish verification failed: ${message}`);
  process.exit(1);
});
