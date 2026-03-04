import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { execSync } from "node:child_process";

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

function run(command) {
  return execSync(command, { encoding: "utf8" }).trim();
}

function escapeRegExp(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function parseVersion(version) {
  const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (!match) {
    throw new Error(`Invalid semver version '${version}'. Expected format: x.y.z`);
  }
  return {
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3])
  };
}

function previousPatchVersion(version) {
  const parts = parseVersion(version);
  if (parts.patch > 0) {
    return `${parts.major}.${parts.minor}.${parts.patch - 1}`;
  }
  return null;
}

function categorizeCommit(message) {
  const lower = message.toLowerCase();
  if (/^fix(\(|:)|\bfix\b|\bbug\b/.test(lower)) return "fixed";
  if (/^feat(\(|:)|\badd\b|\bnew\b/.test(lower)) return "added";
  return "changed";
}

function toBulletLines(messages) {
  if (messages.length === 0) {
    return ["- None"];
  }
  return messages.map((message) => `- ${message}`);
}

async function main() {
  const version = process.argv[2];
  if (!version) {
    console.error("Usage: npm run release:auto-note -- <version>");
    process.exit(1);
  }

  const repoRoot = process.cwd();
  const releasesDir = path.join(repoRoot, "releases");
  const templatePath = path.join(releasesDir, "_template.md");
  const notePath = path.join(releasesDir, `${version}.md`);

  await mkdir(releasesDir, { recursive: true });
  const templateRaw = await readFile(templatePath, "utf8");

  const prevVersion = previousPatchVersion(version);
  const prevTag = prevVersion ? `v${prevVersion}` : "";
  let commitRange = "";
  let commits = [];

  if (prevTag) {
    try {
      run(`git rev-parse --verify "${prevTag}"`);
      commitRange = `${prevTag}..HEAD`;
    } catch {
      commitRange = "";
    }
  }

  const commitCommand = commitRange
    ? `git log --pretty=format:%s ${commitRange}`
    : "git log --pretty=format:%s -n 30";
  const rawCommits = run(commitCommand);
  commits = rawCommits
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) => !line.includes("[skip ci]"))
    .filter((line) => !/^chore\(release\):/i.test(line))
    .filter((line) => !/^docs\(release\):/i.test(line));

  const added = [];
  const changed = [];
  const fixed = [];
  for (const commit of commits) {
    const kind = categorizeCommit(commit);
    if (kind === "added") added.push(commit);
    if (kind === "changed") changed.push(commit);
    if (kind === "fixed") fixed.push(commit);
  }

  const highlights = commits.slice(0, 3);
  const note = templateRaw
    .replace(/^# <version> - <YYYY-MM-DD>/m, `# ${version} - ${getToday()}`)
    .replace(
      /## Summary[\s\S]*?## Highlights/m,
      `## Summary\n\nAutomated release generated from commits since ${prevTag || "repository start"}.\n\n## Highlights`
    )
    .replace(
      /## Highlights[\s\S]*?## Added/m,
      `## Highlights\n\n${toBulletLines(highlights).join("\n")}\n\n## Added`
    )
    .replace(/## Added[\s\S]*?## Changed/m, `## Added\n\n${toBulletLines(added).join("\n")}\n\n## Changed`)
    .replace(/## Changed[\s\S]*?## Fixed/m, `## Changed\n\n${toBulletLines(changed).join("\n")}\n\n## Fixed`)
    .replace(/## Fixed[\s\S]*?## Breaking Changes/m, `## Fixed\n\n${toBulletLines(fixed).join("\n")}\n\n## Breaking Changes`)
    .replace(
      /## Assets[\s\S]*$/m,
      `## Assets\n\n- VSIX: \`lumberjack-theme-${version}.vsix\`\n- Marketplace: VS Code / Cursor compatibility\n`
    );

  await writeFile(notePath, note, "utf8");
  console.log(`Created ${path.relative(repoRoot, notePath)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
