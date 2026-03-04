import type { Palette, UiTokens, VariationId } from "../../core/types.ts";
import { withAlpha } from "../../core/utils/color.ts";

export function buildEditorUiTokens(palette: Palette, variation: VariationId): UiTokens["editor"] {
  return {
    lineNumber: variation === "light" ? palette.gray[6] : palette.gray[5],
    lineNumberActive: variation === "light" ? palette.gray[2] : palette.gray[8],
    cursor: variation === "colorblind" ? palette.blue[9] : palette.yellow[7],
    selection: withAlpha(variation === "light" ? palette.blue[7] : palette.blue[5], 0.3),
    findMatch: withAlpha(variation === "light" ? palette.orange[7] : palette.orange[5], 0.35),
    currentLine: variation === "light" ? "#0000000d" : "#ffffff0d"
  };
}
