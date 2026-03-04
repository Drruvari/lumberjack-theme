import type { CanonicalTheme, Variation } from "../core/types.ts";
import { basePalette } from "./palette/base.ts";
import { buildSyntaxTokens } from "./semantics/syntax.ts";
import { buildDiagnosticTokens } from "./semantics/diagnostics.ts";
import { buildVcsTokens } from "./semantics/vcs.ts";
import { buildSurfaceTokens } from "./ui/surfaces.ts";
import { buildEditorUiTokens } from "./ui/interactions.ts";
import { buildTerminalTokens } from "./ui/terminal.ts";

export function buildCanonicalTheme(input: {
  id: string;
  displayName: string;
  variation: Variation;
}): CanonicalTheme {
  const palette = basePalette;

  const semanticBase = {
    syntax: buildSyntaxTokens(palette, input.variation.id),
    diagnostics: buildDiagnosticTokens(palette),
    vcs: buildVcsTokens(palette)
  };

  const surface = buildSurfaceTokens(palette, input.variation.id);
  const uiBase = {
    ...surface,
    editor: buildEditorUiTokens(palette, input.variation.id),
    terminal: buildTerminalTokens(palette, input.variation.id)
  };

  const variationResult = input.variation.apply(palette);

  return {
    id: input.id,
    displayName: input.displayName,
    variation: input.variation.id,
    palette,
    semantic: {
      ...semanticBase,
      ...variationResult.semantic
    },
    ui: {
      ...uiBase,
      ...variationResult.ui,
      bg: variationResult.ui.bg,
      fg: variationResult.ui.fg,
      border: variationResult.ui.border,
      state: variationResult.ui.state,
      editor: variationResult.ui.editor,
      terminal: variationResult.ui.terminal
    }
  };
}
