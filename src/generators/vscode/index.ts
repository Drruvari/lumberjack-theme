import path from "node:path";
import type { CanonicalTheme, EditorGenerator, GeneratedArtifact } from "../../core/types.ts";

function getThemeType(variation: CanonicalTheme["variation"]): "dark" | "light" {
  return variation === "light" ? "light" : "dark";
}

function parseHexRgb(value: string): [number, number, number] {
  const raw = value.slice(1, 7);
  return [Number.parseInt(raw.slice(0, 2), 16), Number.parseInt(raw.slice(2, 4), 16), Number.parseInt(raw.slice(4, 6), 16)];
}

function relativeChannel(channel: number): number {
  const normalized = channel / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const [r, g, b] = parseHexRgb(hex);
  return 0.2126 * relativeChannel(r) + 0.7152 * relativeChannel(g) + 0.0722 * relativeChannel(b);
}

function contrastRatio(hexA: string, hexB: string): number {
  const [lighter, darker] = [luminance(hexA), luminance(hexB)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

function chooseReadableForeground(background: string, preferred: string[], minimumContrast = 4.5): string {
  for (const candidate of preferred) {
    if (contrastRatio(background, candidate) >= minimumContrast) {
      return candidate;
    }
  }

  // Last-resort fallback keeps accessibility sane for extension buttons.
  return contrastRatio(background, "#000000") >= contrastRatio(background, "#ffffff") ? "#000000" : "#ffffff";
}

export function toVsCodeTheme(theme: CanonicalTheme): Record<string, unknown> {
  const primaryButtonForeground = chooseReadableForeground(theme.ui.state.active, [
    theme.ui.fg.inverted,
    theme.ui.fg.base,
    theme.ui.bg.base
  ]);

  return {
    $schema: "vscode://schemas/color-theme",
    name: `${theme.displayName} ${theme.variation}`,
    type: getThemeType(theme.variation),
    semanticHighlighting: true,
    colors: {
      foreground: theme.ui.fg.base,
      disabledForeground: theme.ui.fg.subtle,
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
      "button.foreground": primaryButtonForeground,
      "button.hoverBackground": theme.ui.state.hover,
      "button.secondaryBackground": theme.ui.bg.overlay,
      "button.secondaryForeground": theme.ui.fg.base,
      "button.secondaryHoverBackground": theme.ui.state.hover,
      "button.border": theme.ui.border.subtle,
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
      parameter: theme.semantic.syntax.string,
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
        scope: ["entity.name.class", "support.class", "entity.name.type.class"],
        settings: { foreground: theme.semantic.syntax.type }
      },
      {
        scope: ["entity.name.tag", "meta.tag", "support.class.component"],
        settings: { foreground: theme.semantic.syntax.tag }
      },
      {
        scope: ["variable.parameter", "meta.parameter", "variable.other.readwrite.alias"],
        settings: { foreground: theme.semantic.syntax.string }
      },
      {
        scope: ["variable.object.property", "variable.other.property", "meta.object-literal.key"],
        settings: { foreground: theme.semantic.syntax.property }
      },
      {
        scope: ["variable.other.constant", "constant.other", "constant.character.escape"],
        settings: { foreground: theme.semantic.syntax.constant }
      },
      {
        scope: ["support.variable", "variable.language", "variable.language.this", "variable.language.super"],
        settings: { foreground: theme.semantic.syntax.keyword }
      },
      {
        scope: ["entity.name.function.constructor", "meta.class-method.js entity.name.function"],
        settings: { foreground: theme.semantic.syntax.type }
      },
      {
        scope: ["punctuation.accessor", "punctuation.separator.key-value"],
        settings: { foreground: theme.semantic.syntax.property }
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

    if (theme.variation === "default") {
      artifacts.push({
        path: path.join(context.outDir, "vscode", "themes", `${theme.id}-color-theme.json`),
        contents: payload
      });
    }

    return artifacts;
  }
};
