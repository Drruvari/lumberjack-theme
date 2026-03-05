import type { Palette, Variation } from "../core/types.ts";
import { withAlpha } from "../core/utils/color.ts";
import { buildSyntaxTokens } from "../theme/semantics/syntax.ts";
import { buildDiagnosticTokens } from "../theme/semantics/diagnostics.ts";
import { buildVcsTokens } from "../theme/semantics/vcs.ts";
import { buildSurfaceTokens } from "../theme/ui/surfaces.ts";
import { buildEditorUiTokens } from "../theme/ui/interactions.ts";
import { buildTerminalTokens } from "../theme/ui/terminal.ts";

function makeTheme(palette: Palette): ReturnType<Variation["apply"]> {
  const syntax = buildSyntaxTokens(palette, "default");
  const ui = buildSurfaceTokens(palette, "default");
  const editor = buildEditorUiTokens(palette, "default");

  // Keep default warm and high-contrast to preserve the flagship identity.
  syntax.keyword = palette.yellow[9];
  syntax.operator = palette.yellow[7];
  syntax.function = palette.cyan[9];
  syntax.method = palette.cyan[9];
  syntax.property = palette.blue[9];
  syntax.type = palette.green[9];
  ui.border.focus = palette.orange[7];
  ui.state.active = palette.orange[5];
  ui.state.selected = withAlpha(palette.orange[5], 0.28);
  editor.cursor = palette.orange[7];
  editor.selection = withAlpha(palette.blue[5], 0.32);
  editor.findMatch = withAlpha(palette.yellow[7], 0.35);

  return {
    semantic: {
      syntax,
      diagnostics: buildDiagnosticTokens(palette),
      vcs: buildVcsTokens(palette)
    },
    ui: {
      ...ui,
      editor,
      terminal: buildTerminalTokens(palette, "default")
    }
  };
}

export const defaultVariation: Variation = {
  id: "default",
  displayName: "Default",
  apply: (palette) => makeTheme(palette)
};
