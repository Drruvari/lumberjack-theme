import type { Palette, Variation } from "../core/types.ts";
import { buildSyntaxTokens } from "../theme/semantics/syntax.ts";
import { buildDiagnosticTokens } from "../theme/semantics/diagnostics.ts";
import { buildVcsTokens } from "../theme/semantics/vcs.ts";
import { buildSurfaceTokens } from "../theme/ui/surfaces.ts";
import { buildEditorUiTokens } from "../theme/ui/interactions.ts";
import { buildTerminalTokens } from "../theme/ui/terminal.ts";

function makeTheme(palette: Palette): ReturnType<Variation["apply"]> {
  return {
    semantic: {
      syntax: buildSyntaxTokens(palette, "oled"),
      diagnostics: buildDiagnosticTokens(palette),
      vcs: buildVcsTokens(palette)
    },
    ui: {
      ...buildSurfaceTokens(palette, "oled"),
      editor: buildEditorUiTokens(palette, "oled"),
      terminal: buildTerminalTokens(palette, "oled")
    }
  };
}

export const oledVariation: Variation = {
  id: "oled",
  displayName: "OLED",
  apply: (palette) => makeTheme(palette)
};
