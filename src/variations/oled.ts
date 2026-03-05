import type { Palette, Variation } from "../core/types.ts";
import { withAlpha } from "../core/utils/color.ts";
import { buildSyntaxTokens } from "../theme/semantics/syntax.ts";
import { buildDiagnosticTokens } from "../theme/semantics/diagnostics.ts";
import { buildVcsTokens } from "../theme/semantics/vcs.ts";
import { buildSurfaceTokens } from "../theme/ui/surfaces.ts";
import { buildEditorUiTokens } from "../theme/ui/interactions.ts";
import { buildTerminalTokens } from "../theme/ui/terminal.ts";

function makeTheme(palette: Palette): ReturnType<Variation["apply"]> {
  const syntax = buildSyntaxTokens(palette, "oled");
  const ui = buildSurfaceTokens(palette, "oled");
  const editor = buildEditorUiTokens(palette, "oled");

  syntax.keyword = palette.yellow[9];
  syntax.function = palette.cyan[9];
  syntax.method = palette.cyan[9];
  syntax.tag = palette.cyan[9];
  ui.border.focus = palette.cyan[9];
  ui.state.active = palette.cyan[5];
  ui.state.selected = withAlpha(palette.cyan[5], 0.3);
  editor.cursor = palette.yellow[9];
  editor.selection = withAlpha(palette.cyan[5], 0.3);

  return {
    semantic: {
      syntax,
      diagnostics: buildDiagnosticTokens(palette),
      vcs: buildVcsTokens(palette)
    },
    ui: {
      ...ui,
      editor,
      terminal: buildTerminalTokens(palette, "oled")
    }
  };
}

export const oledVariation: Variation = {
  id: "oled",
  displayName: "OLED",
  apply: (palette) => makeTheme(palette)
};
