import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

async function main() {
  const version = process.argv[2];
  if (!version) {
    console.error("Usage: npm run release:note -- <version>");
    process.exit(1);
  }

  const repoRoot = process.cwd();
  const releasesDir = path.join(repoRoot, "releases");
  const templatePath = path.join(releasesDir, "_template.md");
  const notePath = path.join(releasesDir, `${version}.md`);

  await mkdir(releasesDir, { recursive: true });

  const templateRaw = await readFile(templatePath, "utf8");
  const note = templateRaw
    .replace(/<version>/g, version)
    .replace(/<YYYY-MM-DD>/g, getToday());

  await writeFile(notePath, note, "utf8");
  console.log(`Created ${notePath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
