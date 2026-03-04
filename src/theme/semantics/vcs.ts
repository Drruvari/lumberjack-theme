import type { Palette, SemanticVcsTokens } from "../../core/types.ts";

export function buildVcsTokens(palette: Palette): SemanticVcsTokens {
  return {
    added: palette.green[7],
    modified: palette.yellow[7],
    removed: palette.red[7],
    ignored: palette.gray[6]
  };
}
