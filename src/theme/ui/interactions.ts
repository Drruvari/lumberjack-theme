import type { Palette, UiTokens, VariationId } from "../../core/types.ts";
import { withAlpha } from "../../core/utils/color.ts";

export function buildEditorUiTokens(palette: Palette, variation: VariationId): UiTokens["editor"] {
  const isLight = variation === "light";
  const isColorblind = variation === "colorblind";
  const isDefault = variation === "default";

  return {
    lineNumber: isLight ? palette.gray[6] : palette.gray[5],
    lineNumberActive: isLight ? palette.gray[2] : palette.gray[8],
    cursor: isColorblind ? palette.blue[9] : isDefault ? palette.orange[7] : isLight ? palette.blue[7] : palette.cyan[9],
    selection: withAlpha(isLight ? palette.blue[7] : isDefault ? palette.orange[5] : palette.blue[5], isLight ? 0.22 : 0.3),
    findMatch: withAlpha(isLight ? palette.orange[7] : palette.yellow[7], isLight ? 0.28 : 0.32),
    currentLine: isLight ? "#0000000a" : "#ffffff10"
  };
}
