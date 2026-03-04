import type { Palette, SemanticSyntaxTokens, VariationId } from "../../core/types.ts";

export function buildSyntaxTokens(palette: Palette, variation: VariationId): SemanticSyntaxTokens {
  const isLight = variation === "light";

  return {
    text: isLight ? palette.gray[1] : palette.gray[9],
    comment: isLight ? palette.gray[6] : palette.gray[6],
    keyword: palette.yellow[7],
    string: palette.magenta[7],
    number: palette.orange[7],
    function: palette.cyan[7],
    method: palette.cyan[7],
    type: palette.green[7],
    variable: isLight ? palette.gray[2] : palette.gray[10],
    constant: palette.orange[7],
    property: palette.blue[7],
    tag: palette.cyan[7],
    operator: palette.yellow[7]
  };
}
