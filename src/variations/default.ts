import type { Palette, Variation } from "../core/types.ts";
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
  const diagnostics = buildDiagnosticTokens(palette);
  const vcs = buildVcsTokens(palette);
  const terminal = buildTerminalTokens(palette, "default");

  // Keep default bold and cyber-lumberjack: teal base + warm pink/yellow accents.
  syntax.text = "#66dbe8";
  syntax.comment = "#2d909e";
  syntax.keyword = "#e3cb6d";
  syntax.operator = palette.yellow[7];
  syntax.string = "#f07ca3";
  syntax.number = "#e16d58";
  syntax.function = "#7de7f6";
  syntax.method = "#7de7f6";
  syntax.type = "#74d68f";
  syntax.variable = "#e9f2f4";
  syntax.constant = "#e16d58";
  syntax.property = "#87eaf5";
  syntax.tag = "#7de7f6";

  ui.bg.base = "#001419";
  ui.bg.elevated = "#00242b";
  ui.bg.panel = "#000e11";
  ui.bg.overlay = "#002028";
  ui.fg.base = "#8fe8f4";
  ui.fg.muted = "#5fd6e4";
  ui.fg.subtle = "#2b8b98";
  ui.fg.inverted = "#001419";
  ui.border.subtle = "#000000a8";
  ui.border.strong = "#000000";
  ui.border.focus = "#e26a89";
  ui.state.active = "#00373f";
  ui.state.hover = "#00373f";
  ui.state.selected = "#e26a8933";
  ui.state.disabled = "#000e1180";

  editor.lineNumber = "#1fa9ba80";
  editor.lineNumberActive = "#59e9fb";
  editor.cursor = "#e26a89";
  editor.selection = "#e26a8940";
  editor.findMatch = "#e3cb6d4d";
  editor.currentLine = "#00242b66";

  diagnostics.error = "#e33455";
  diagnostics.warning = "#dd9b6f";
  diagnostics.info = "#e26a89";
  diagnostics.hint = "#2d909e";
  vcs.added = "#66dc84";
  vcs.modified = "#e3cb6d";
  vcs.removed = "#e33455";
  vcs.ignored = "#2d909ecc";

  terminal.background = "#001419";
  terminal.foreground = "#8fe8f4";
  terminal.ansi.black = "#000000";
  terminal.ansi.red = "#e16d58";
  terminal.ansi.green = "#66dc84";
  terminal.ansi.yellow = "#e3cb6d";
  terminal.ansi.blue = "#7de7f6";
  terminal.ansi.magenta = "#f07ca3";
  terminal.ansi.cyan = "#5fd6e4";
  terminal.ansi.white = "#f5fdff";
  terminal.ansi.brightBlack = "#0a8c9e";
  terminal.ansi.brightRed = "#ee8b78";
  terminal.ansi.brightGreen = "#8de6a6";
  terminal.ansi.brightYellow = "#ebd998";
  terminal.ansi.brightBlue = "#b6f4fb";
  terminal.ansi.brightMagenta = "#f5a4c1";
  terminal.ansi.brightCyan = "#9ae7f0";
  terminal.ansi.brightWhite = "#b7f5fc";

  return {
    semantic: {
      syntax,
      diagnostics,
      vcs
    },
    ui: {
      ...ui,
      editor,
      terminal
    }
  };
}

export const defaultVariation: Variation = {
  id: "default",
  displayName: "Default",
  apply: (palette) => makeTheme(palette)
};
