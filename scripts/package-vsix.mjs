import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const packagePath = path.join(repoRoot, "package.json");

function isVsixFile(name) {
  return /^lumberjack-theme-.*\.vsix$/.test(name);
}

async function run(command, args, cwd) {
  await new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
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
  const packageRaw = await fs.readFile(packagePath, "utf8");
  const packageJson = JSON.parse(packageRaw);
  const version = packageJson.version;

  if (typeof version !== "string" || version.length === 0) {
    throw new Error("package.json is missing a valid 'version' value.");
  }

  const expectedVsix = `lumberjack-theme-${version}.vsix`;

  const beforeEntries = await fs.readdir(repoRoot);
  await Promise.all(
    beforeEntries
      .filter(isVsixFile)
      .map((name) => fs.unlink(path.join(repoRoot, name)))
  );

  const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";
  await run(npxCommand, ["vsce", "package", "--out", expectedVsix], repoRoot);

  const afterEntries = await fs.readdir(repoRoot);
  const vsixFiles = afterEntries.filter(isVsixFile);

  if (vsixFiles.length !== 1 || vsixFiles[0] !== expectedVsix) {
    throw new Error(
      `Expected exactly one VSIX (${expectedVsix}), found ${vsixFiles.length}: ${vsixFiles.join(", ")}`
    );
  }

  console.log(`Created ${expectedVsix}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Failed to package VSIX: ${message}`);
  process.exit(1);
});
