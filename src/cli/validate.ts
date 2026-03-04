import { buildCanonicalTheme } from "../theme/compose.ts";
import { allVariations } from "../variations/index.ts";
import { validateTheme } from "../core/validate.ts";

function main(): void {
  for (const variation of allVariations) {
    const theme = buildCanonicalTheme({
      id: "lumberjack",
      displayName: "Lumberjack",
      variation
    });
    validateTheme(theme);
  }

  console.log(`Validated ${allVariations.length} variations.`);
}

main();
