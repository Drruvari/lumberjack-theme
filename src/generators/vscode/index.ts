import path from "node:path";
import type { CanonicalTheme, EditorGenerator, GeneratedArtifact } from "../../core/types.ts";

function getThemeType(variation: CanonicalTheme["variation"]): "dark" | "light" {
  return variation === "light" ? "light" : "dark";
}

function toVsCodeTheme(theme: CanonicalTheme): Record<string, unknown> {
  return {
    $schema: "vscode://schemas/color-theme",
    name: `${theme.displayName} ${theme.variation}`,
    type: getThemeType(theme.variation),
    semanticHighlighting: true,
    colors: {
      foreground: theme.ui.fg.base,
      focusBorder: theme.ui.border.focus,
      "editor.background": theme.ui.bg.base,
      "editor.foreground": theme.semantic.syntax.text,
      "editorLineNumber.foreground": theme.ui.editor.lineNumber,
      "editorLineNumber.activeForeground": theme.ui.editor.lineNumberActive,
      "editorCursor.foreground": theme.ui.editor.cursor,
      "editor.selectionBackground": theme.ui.editor.selection,
      "editor.findMatchBackground": theme.ui.editor.findMatch,
      "editor.lineHighlightBackground": theme.ui.editor.currentLine,
      "activityBar.background": theme.ui.bg.elevated,
      "activityBar.foreground": theme.ui.fg.base,
      "sideBar.background": theme.ui.bg.panel,
      "sideBar.foreground": theme.ui.fg.base,
      "statusBar.background": theme.ui.bg.elevated,
      "statusBar.foreground": theme.ui.fg.base,
      "panel.background": theme.ui.bg.panel,
      "panel.border": theme.ui.border.subtle,
      "button.background": theme.ui.state.active,
      "button.foreground": theme.ui.fg.inverted,
      "input.background": theme.ui.bg.overlay,
      "input.foreground": theme.ui.fg.base,
      "terminal.background": theme.ui.terminal.background,
      "terminal.foreground": theme.ui.terminal.foreground,
      "terminal.ansiBlack": theme.ui.terminal.ansi.black,
      "terminal.ansiRed": theme.ui.terminal.ansi.red,
      "terminal.ansiGreen": theme.ui.terminal.ansi.green,
      "terminal.ansiYellow": theme.ui.terminal.ansi.yellow,
      "terminal.ansiBlue": theme.ui.terminal.ansi.blue,
      "terminal.ansiMagenta": theme.ui.terminal.ansi.magenta,
      "terminal.ansiCyan": theme.ui.terminal.ansi.cyan,
      "terminal.ansiWhite": theme.ui.terminal.ansi.white,
      "terminal.ansiBrightBlack": theme.ui.terminal.ansi.brightBlack,
      "terminal.ansiBrightRed": theme.ui.terminal.ansi.brightRed,
      "terminal.ansiBrightGreen": theme.ui.terminal.ansi.brightGreen,
      "terminal.ansiBrightYellow": theme.ui.terminal.ansi.brightYellow,
      "terminal.ansiBrightBlue": theme.ui.terminal.ansi.brightBlue,
      "terminal.ansiBrightMagenta": theme.ui.terminal.ansi.brightMagenta,
      "terminal.ansiBrightCyan": theme.ui.terminal.ansi.brightCyan,
      "terminal.ansiBrightWhite": theme.ui.terminal.ansi.brightWhite,
      "gitDecoration.addedResourceForeground": theme.semantic.vcs.added,
      "gitDecoration.modifiedResourceForeground": theme.semantic.vcs.modified,
      "gitDecoration.deletedResourceForeground": theme.semantic.vcs.removed,
      "editorError.foreground": theme.semantic.diagnostics.error,
      "editorWarning.foreground": theme.semantic.diagnostics.warning,
      "editorInfo.foreground": theme.semantic.diagnostics.info,
      "editorHint.foreground": theme.semantic.diagnostics.hint
    },
    semanticTokenColors: {
      class: theme.semantic.syntax.type,
      enum: theme.semantic.syntax.type,
      function: theme.semantic.syntax.function,
      method: theme.semantic.syntax.method,
      namespace: theme.semantic.syntax.tag,
      parameter: theme.semantic.syntax.variable,
      property: theme.semantic.syntax.property,
      type: theme.semantic.syntax.type,
      variable: theme.semantic.syntax.variable,
      variableReadOnly: theme.semantic.syntax.constant
    },
    tokenColors: [
      {
        scope: ["comment"],
        settings: { foreground: theme.semantic.syntax.comment }
      },
      {
        scope: ["keyword", "storage", "keyword.operator"],
        settings: { foreground: theme.semantic.syntax.keyword }
      },
      {
        scope: ["string"],
        settings: { foreground: theme.semantic.syntax.string }
      },
      {
        scope: ["constant.numeric", "constant.language"],
        settings: { foreground: theme.semantic.syntax.number }
      },
      {
        scope: ["entity.name.function", "support.function"],
        settings: { foreground: theme.semantic.syntax.function }
      },
      {
        scope: ["entity.name.type", "support.type"],
        settings: { foreground: theme.semantic.syntax.type }
      },
      {
        scope: ["variable"],
        settings: { foreground: theme.semantic.syntax.variable }
      }
    ]
  };
}

export const vscodeGenerator: EditorGenerator = {
  id: "vscode",
  displayName: "VS Code",
  fileExtHint: "json",
  async generate(theme, context) {
    const payload = JSON.stringify(toVsCodeTheme(theme), null, 2);
    const artifacts: GeneratedArtifact[] = [
      {
        path: path.join(context.outDir, "vscode", "themes", `${theme.id}-${theme.variation}-color-theme.json`),
        contents: payload
      }
    ];

    if (theme.variation === "dark") {
      artifacts.push({
        path: path.join(context.outDir, "vscode", "themes", `${theme.id}-color-theme.json`),
        contents: payload
      });
    }

    return artifacts;
  }
};
