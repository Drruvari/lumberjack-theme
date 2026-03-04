import path from "node:path";
import type { EditorGenerator } from "../../core/types.ts";

export const terminalGenerator: EditorGenerator = {
  id: "terminal",
  displayName: "Generic Terminal",
  fileExtHint: "json",
  async generate(theme, context) {
    const payload = {
      name: `${theme.displayName} ${theme.variation}`,
      background: theme.ui.terminal.background,
      foreground: theme.ui.terminal.foreground,
      cursor: theme.ui.editor.cursor,
      selection: theme.ui.editor.selection,
      ansi: {
        black: theme.ui.terminal.ansi.black,
        red: theme.ui.terminal.ansi.red,
        green: theme.ui.terminal.ansi.green,
        yellow: theme.ui.terminal.ansi.yellow,
        blue: theme.ui.terminal.ansi.blue,
        magenta: theme.ui.terminal.ansi.magenta,
        cyan: theme.ui.terminal.ansi.cyan,
        white: theme.ui.terminal.ansi.white,
        brightBlack: theme.ui.terminal.ansi.brightBlack,
        brightRed: theme.ui.terminal.ansi.brightRed,
        brightGreen: theme.ui.terminal.ansi.brightGreen,
        brightYellow: theme.ui.terminal.ansi.brightYellow,
        brightBlue: theme.ui.terminal.ansi.brightBlue,
        brightMagenta: theme.ui.terminal.ansi.brightMagenta,
        brightCyan: theme.ui.terminal.ansi.brightCyan,
        brightWhite: theme.ui.terminal.ansi.brightWhite
      }
    };

    return [
      {
        path: path.join(context.outDir, "terminal", `${theme.id}-${theme.variation}.json`),
        contents: JSON.stringify(payload, null, 2)
      }
    ];
  }
};
