import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

function run(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: repoRoot,
      stdio: options.capture ? ["ignore", "pipe", "pipe"] : "inherit",
      shell: false
    });

    let stdout = "";
    let stderr = "";

    if (options.capture) {
      child.stdout.on("data", (chunk) => {
        stdout += String(chunk);
      });
      child.stderr.on("data", (chunk) => {
        stderr += String(chunk);
      });
    }

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }
      reject(new Error(`${command} ${args.join(" ")} failed with exit code ${code ?? "unknown"}`));
    });
  });
}

async function getStdout(command, args) {
  const result = await run(command, args, { capture: true });
  return result.stdout.trim();
}

async function main() {
  const branch = await getStdout("git", ["rev-parse", "--abbrev-ref", "HEAD"]);
  if (branch !== "main") {
    console.log(`[sync-after-push] Current branch is '${branch}', skipping.`);
    return;
  }

  const status = await getStdout("git", ["status", "--porcelain"]);
  const isClean = status.length === 0;

  await run("git", ["fetch", "origin", "main"]);
  const counts = await getStdout("git", ["rev-list", "--left-right", "--count", "HEAD...origin/main"]);
  const [aheadRaw, behindRaw] = counts.split(/\s+/);
  const ahead = Number.parseInt(aheadRaw ?? "0", 10);
  const behind = Number.parseInt(behindRaw ?? "0", 10);

  if (behind > 0 && ahead === 0) {
    if (isClean) {
      await run("git", ["pull", "--ff-only", "origin", "main"]);
    } else {
      console.log("[sync-after-push] Behind origin/main but working tree is dirty, skipping auto-pull.");
    }
  } else if (behind > 0 && ahead > 0) {
    console.log("[sync-after-push] Branch diverged after push; skipping auto-pull.");
  }

  const nodeCommand = process.execPath;
  await run(nodeCommand, ["scripts/package-vsix.mjs"]);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[sync-after-push] ${message}`);
  process.exit(1);
});
