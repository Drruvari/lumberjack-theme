import fs from "node:fs/promises";
import path from "node:path";
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const hookPath = path.join(repoRoot, ".githooks", "post-push");

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: repoRoot,
      stdio: "inherit",
      shell: false
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`${command} ${args.join(" ")} failed with exit code ${code ?? "unknown"}`));
    });
  });
}

async function main() {
  try {
    await fs.access(path.join(repoRoot, ".git"));
  } catch {
    console.log("Skipping hook install (no .git directory).");
    return;
  }

  await fs.chmod(hookPath, 0o755);
  await run("git", ["config", "core.hooksPath", ".githooks"]);
  console.log("Installed git hooks from .githooks/");
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Failed to install git hooks: ${message}`);
  process.exit(1);
});
