import type { Palette, Variation } from "../core/types.ts";
import { withAlpha } from "../core/utils/color.ts";
import { buildSyntaxTokens } from "../theme/semantics/syntax.ts";
import { buildDiagnosticTokens } from "../theme/semantics/diagnostics.ts";
import { buildVcsTokens } from "../theme/semantics/vcs.ts";
import { buildSurfaceTokens } from "../theme/ui/surfaces.ts";
import { buildEditorUiTokens } from "../theme/ui/interactions.ts";
import { buildTerminalTokens } from "../theme/ui/terminal.ts";

function makeTheme(palette: Palette): ReturnType<Variation["apply"]> {
  const syntax = buildSyntaxTokens(palette, "light");
  const ui = buildSurfaceTokens(palette, "light");
  const editor = buildEditorUiTokens(palette, "light");

  syntax.comment = palette.gray[5];
  syntax.keyword = palette.blue[5];
  syntax.operator = palette.blue[5];
  syntax.function = palette.blue[7];
  syntax.method = palette.blue[7];
  syntax.type = palette.blue[5];
  syntax.number = palette.orange[5];
  syntax.constant = palette.orange[5];
  ui.border.focus = palette.blue[7];
  ui.state.active = palette.blue[5];
  ui.state.selected = withAlpha(palette.blue[5], 0.22);
  editor.cursor = palette.blue[7];
  editor.selection = withAlpha(palette.blue[7], 0.2);
  editor.findMatch = withAlpha(palette.orange[7], 0.26);

  return {
    semantic: {
      syntax,
      diagnostics: buildDiagnosticTokens(palette),
      vcs: buildVcsTokens(palette)
    },
    ui: {
      ...ui,
      editor,
      terminal: buildTerminalTokens(palette, "light")
    }
  };
}

export const lightVariation: Variation = {
  id: "light",
  displayName: "Light",
  apply: (palette) => makeTheme(palette)
};
