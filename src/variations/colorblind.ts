import type { Palette, Variation } from "../core/types.ts";
import { withAlpha } from "../core/utils/color.ts";
import { buildSyntaxTokens } from "../theme/semantics/syntax.ts";
import { buildDiagnosticTokens } from "../theme/semantics/diagnostics.ts";
import { buildVcsTokens } from "../theme/semantics/vcs.ts";
import { buildSurfaceTokens } from "../theme/ui/surfaces.ts";
import { buildEditorUiTokens } from "../theme/ui/interactions.ts";
import { buildTerminalTokens } from "../theme/ui/terminal.ts";

function makeTheme(palette: Palette): ReturnType<Variation["apply"]> {
  const syntax = buildSyntaxTokens(palette, "colorblind");
  const ui = buildSurfaceTokens(palette, "colorblind");
  const editor = buildEditorUiTokens(palette, "colorblind");

  // Bias toward stronger blues/yellows for safer contrast separation.
  syntax.keyword = palette.blue[9];
  syntax.operator = palette.blue[7];
  syntax.type = palette.yellow[9];
  syntax.string = palette.cyan[9];
  syntax.number = palette.orange[9];
  ui.border.focus = palette.blue[9];
  ui.state.active = palette.blue[7];
  ui.state.selected = withAlpha(palette.blue[5], 0.32);
  editor.cursor = palette.blue[9];
  editor.selection = withAlpha(palette.blue[5], 0.34);
  editor.findMatch = withAlpha(palette.yellow[7], 0.36);

  return {
    semantic: {
      syntax,
      diagnostics: buildDiagnosticTokens(palette),
      vcs: buildVcsTokens(palette)
    },
    ui: {
      ...ui,
      editor,
      terminal: buildTerminalTokens(palette, "colorblind")
    }
  };
}

export const colorblindVariation: Variation = {
  id: "colorblind",
  displayName: "Colorblind",
  apply: (palette) => makeTheme(palette)
};
