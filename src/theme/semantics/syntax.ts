import type { Palette, SemanticSyntaxTokens, VariationId } from "../../core/types.ts";

export function buildSyntaxTokens(palette: Palette, variation: VariationId): SemanticSyntaxTokens {
  const isLight = variation === "light";
  const isColorblind = variation === "colorblind";
  const isOled = variation === "oled";

  return {
    text: isLight ? palette.gray[1] : palette.gray[9],
    comment: isLight ? palette.gray[5] : palette.gray[6],
    keyword: isColorblind ? palette.blue[9] : isLight ? palette.blue[5] : palette.yellow[7],
    string: isColorblind ? palette.cyan[9] : isLight ? palette.green[5] : palette.green[7],
    number: isLight ? palette.orange[5] : palette.orange[7],
    function: isLight ? palette.blue[7] : palette.cyan[7],
    method: isLight ? palette.blue[7] : palette.cyan[7],
    type: isColorblind ? palette.yellow[9] : isLight ? palette.blue[5] : palette.green[7],
    variable: isLight ? palette.gray[2] : palette.gray[10],
    constant: isLight ? palette.orange[5] : palette.orange[7],
    property: isLight ? palette.blue[5] : palette.blue[7],
    tag: isOled ? palette.cyan[9] : isLight ? palette.blue[7] : palette.cyan[7],
    operator: isColorblind ? palette.blue[7] : isLight ? palette.blue[5] : palette.yellow[7]
  };
}
