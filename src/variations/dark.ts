import type { Palette, Variation } from "../core/types.ts";
import { withAlpha } from "../core/utils/color.ts";
import { buildSyntaxTokens } from "../theme/semantics/syntax.ts";
import { buildDiagnosticTokens } from "../theme/semantics/diagnostics.ts";
import { buildVcsTokens } from "../theme/semantics/vcs.ts";
import { buildSurfaceTokens } from "../theme/ui/surfaces.ts";
import { buildEditorUiTokens } from "../theme/ui/interactions.ts";
import { buildTerminalTokens } from "../theme/ui/terminal.ts";

function makeTheme(palette: Palette): ReturnType<Variation["apply"]> {
  const syntax = buildSyntaxTokens(palette, "dark");
  const ui = buildSurfaceTokens(palette, "dark");
  const editor = buildEditorUiTokens(palette, "dark");

  // Keep dark cool and calm versus the warmer default profile.
  syntax.keyword = palette.blue[7];
  syntax.operator = palette.cyan[7];
  syntax.type = palette.cyan[9];
  ui.border.focus = palette.cyan[9];
  ui.state.active = palette.cyan[7];
  ui.state.selected = withAlpha(palette.cyan[5], 0.26);
  editor.cursor = palette.cyan[9];
  editor.selection = withAlpha(palette.blue[5], 0.3);

  return {
    semantic: {
      syntax,
      diagnostics: buildDiagnosticTokens(palette),
      vcs: buildVcsTokens(palette)
    },
    ui: {
      ...ui,
      editor,
      terminal: buildTerminalTokens(palette, "dark")
    }
  };
}

export const darkVariation: Variation = {
  id: "dark",
  displayName: "Dark",
  apply: (palette) => makeTheme(palette)
};
