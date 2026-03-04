import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

async function main() {
  const version = process.argv[2];
  if (!version) {
    console.error("Usage: node scripts/update-changelog.mjs <version>");
    process.exit(1);
  }

  const repoRoot = process.cwd();
  const changelogPath = path.join(repoRoot, "CHANGELOG.md");
  const notePath = path.join(repoRoot, "releases", `${version}.md`);

  // Read the release note to extract a short summary for the changelog
  const noteRaw = await readFile(notePath, "utf8");

  // Extract bullet lines from the Added / Changed / Fixed sections
  const bulletRegex = /^## (Added|Changed|Fixed)\n([\s\S]*?)(?=\n## |\n*$)/gm;
  const bullets = [];
  let match;
  while ((match = bulletRegex.exec(noteRaw)) !== null) {
    const lines = match[2]
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.startsWith("- ") && l !== "- None");
    bullets.push(...lines);
  }

  const today = new Date().toISOString().slice(0, 10);
  const newEntry = [
    `## [${version}] - ${today}`,
    "",
    ...(bullets.length > 0 ? bullets : ["- Automated patch release."]),
    "",
  ].join("\n");

  const existing = await readFile(changelogPath, "utf8");

  // Insert after the first heading line (# Changelog …)
  const insertAfter = /^# Changelog.*\n/m;
  const updated = existing.replace(insertAfter, (header) => `${header}\n${newEntry}`);

  if (updated === existing) {
    // Fallback: just prepend at the top
    await writeFile(changelogPath, `${newEntry}\n${existing}`, "utf8");
  } else {
    await writeFile(changelogPath, updated, "utf8");
  }

  console.log(`CHANGELOG.md updated with entry for v${version}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
