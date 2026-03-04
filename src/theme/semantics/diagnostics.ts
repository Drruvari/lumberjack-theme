import type { Palette, SemanticDiagnosticTokens } from "../../core/types.ts";

export function buildDiagnosticTokens(palette: Palette): SemanticDiagnosticTokens {
  return {
    error: palette.red[7],
    warning: palette.yellow[7],
    info: palette.blue[7],
    hint: palette.green[7]
  };
}
