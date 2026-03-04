import { readFile } from 'node:fs/promises';
import path from 'node:path';

const args = process.argv.slice(2);

const sourcePath = path.resolve(args[0] || 'src/themes/lumberjack-color-theme.json');
const generatedPath = path.resolve(args[1] || 'tmp/generated-theme.json');

function sortedKeys(obj) {
  return Object.keys(obj || {}).sort((a, b) => a.localeCompare(b));
}

function printList(title, items) {
  console.log(`\n${title} (${items.length})`);
  if (items.length === 0) {
    console.log('  - none');
    return;
  }
  for (const item of items) {
    console.log(`  - ${item}`);
  }
}

try {
  const [sourceRaw, generatedRaw] = await Promise.all([
    readFile(sourcePath, 'utf8'),
    readFile(generatedPath, 'utf8')
  ]);

  const source = JSON.parse(sourceRaw);
  const generated = JSON.parse(generatedRaw);

  const sourceColors = new Set(sortedKeys(source.colors));
  const generatedColors = new Set(sortedKeys(generated.colors));

  const missingInSource = [...generatedColors].filter((k) => !sourceColors.has(k)).sort();
  const onlyInSource = [...sourceColors].filter((k) => !generatedColors.has(k)).sort();
  const common = [...sourceColors].filter((k) => generatedColors.has(k)).sort();

  console.log('Theme Token Diff');
  console.log(`Source:    ${sourcePath}`);
  console.log(`Generated: ${generatedPath}`);
  console.log(`Source keys: ${sourceColors.size}`);
  console.log(`Generated keys: ${generatedColors.size}`);
  console.log(`Common keys: ${common.length}`);

  printList('Missing in source theme (add these)', missingInSource);
  printList('Only in source theme (not in generated snapshot)', onlyInSource);

  if (missingInSource.length > 0) {
    process.exitCode = 2;
  }
} catch (error) {
  console.error('Failed to diff theme keys.');
  console.error(error instanceof Error ? error.message : String(error));
  console.error('\nUsage: node scripts/diff-theme-keys.mjs [sourceThemePath] [generatedThemePath]');
  console.error('Example: node scripts/diff-theme-keys.mjs src/themes/lumberjack-color-theme.json tmp/generated-theme.json');
  process.exit(1);
}
