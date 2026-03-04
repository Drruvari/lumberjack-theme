import { readFile } from "node:fs/promises";
import { buildAll } from "../core/engine.ts";
import { registerBuiltins } from "../plugins/builtins.ts";
import type { BuildConfig } from "../core/types.ts";

async function getPackageVersion(): Promise<string> {
  const raw = await readFile(new URL("../../package.json", import.meta.url), "utf8");
  const parsed = JSON.parse(raw) as { version?: string };
  return parsed.version ?? "0.0.0";
}

async function main(): Promise<void> {
  const version = await getPackageVersion();
  const config: BuildConfig = {
    themeId: "lumberjack",
    themeDisplayName: "Lumberjack",
    outDir: "dist",
    packageVersion: version,
    variations: ["dark", "light", "oled", "colorblind"]
  };

  const registry = registerBuiltins();
  await buildAll(config, registry);

  console.log("Generated themes for all editors and variations.");
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
