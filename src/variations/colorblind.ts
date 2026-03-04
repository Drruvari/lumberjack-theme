import type { Palette, Variation } from "../core/types.ts";
import { buildSyntaxTokens } from "../theme/semantics/syntax.ts";
import { buildDiagnosticTokens } from "../theme/semantics/diagnostics.ts";
import { buildVcsTokens } from "../theme/semantics/vcs.ts";
import { buildSurfaceTokens } from "../theme/ui/surfaces.ts";
import { buildEditorUiTokens } from "../theme/ui/interactions.ts";
import { buildTerminalTokens } from "../theme/ui/terminal.ts";

function makeTheme(palette: Palette): ReturnType<Variation["apply"]> {
  const syntax = buildSyntaxTokens(palette, "colorblind");

  // Bias toward stronger blues/yellows for safer contrast separation.
  syntax.keyword = palette.blue[9];
  syntax.operator = palette.blue[7];
  syntax.type = palette.yellow[9];

  return {
    semantic: {
      syntax,
      diagnostics: buildDiagnosticTokens(palette),
      vcs: buildVcsTokens(palette)
    },
    ui: {
      ...buildSurfaceTokens(palette, "colorblind"),
      editor: buildEditorUiTokens(palette, "colorblind"),
      terminal: buildTerminalTokens(palette, "colorblind")
    }
  };
}

export const colorblindVariation: Variation = {
  id: "colorblind",
  displayName: "Colorblind",
  apply: (palette) => makeTheme(palette)
};
