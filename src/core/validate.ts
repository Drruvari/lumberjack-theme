import type { CanonicalTheme } from "./types.ts";

function assertHex(value: string, context: string): void {
  if (!/^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(value)) {
    throw new Error(`Invalid hex color in ${context}: ${value}`);
  }
}

export function validateTheme(theme: CanonicalTheme): void {
  const colorBuckets: Array<[string, Record<string, string>]> = [
    ["semantic.syntax", theme.semantic.syntax],
    ["semantic.diagnostics", theme.semantic.diagnostics],
    ["semantic.vcs", theme.semantic.vcs],
    ["ui.bg", theme.ui.bg],
    ["ui.fg", theme.ui.fg],
    ["ui.border", theme.ui.border],
    ["ui.state", theme.ui.state],
    ["ui.editor", theme.ui.editor],
    ["ui.terminal", { background: theme.ui.terminal.background, foreground: theme.ui.terminal.foreground }],
    ["ui.terminal.ansi", theme.ui.terminal.ansi]
  ];

  for (const [bucket, values] of colorBuckets) {
    for (const [key, value] of Object.entries(values)) {
      assertHex(value, `${bucket}.${key}`);
    }
  }
}
