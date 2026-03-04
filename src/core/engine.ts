import path from "node:path";
import type { BuildConfig, CanonicalTheme, GenerationContext, GeneratedArtifact, Variation } from "./types.ts";
import { writeArtifacts } from "./utils/fs.ts";
import { validateTheme } from "./validate.ts";
import { buildCanonicalTheme } from "../theme/compose.ts";
import { getVariationById } from "../variations/index.ts";
import { GeneratorRegistry } from "./registry.ts";

function resolveVariation(id: BuildConfig["variations"][number]): Variation {
  const variation = getVariationById(id);
  if (!variation) {
    throw new Error(`Unknown variation '${id}'.`);
  }
  return variation;
}

function createContext(config: BuildConfig): GenerationContext {
  return {
    outDir: config.outDir,
    packageVersion: config.packageVersion,
    dryRun: config.dryRun
  };
}

export async function buildAll(config: BuildConfig, registry: GeneratorRegistry): Promise<void> {
  const context = createContext(config);
  const generators = registry.list();

  if (generators.length === 0) {
    throw new Error("No generators registered. Build cannot continue.");
  }

  for (const variationId of config.variations) {
    const variation = resolveVariation(variationId);
    const theme: CanonicalTheme = buildCanonicalTheme({
      id: config.themeId,
      displayName: config.themeDisplayName,
      variation
    });

    validateTheme(theme);

    for (const generator of generators) {
      const generated = await generator.generate(theme, context);
      const resolvedArtifacts: GeneratedArtifact[] = generated.map((artifact) => ({
        ...artifact,
        path: path.resolve(artifact.path)
      }));

      if (!config.dryRun) {
        await writeArtifacts(resolvedArtifacts);
      }
    }
  }
}
