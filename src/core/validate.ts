import type { CanonicalTheme } from "./types.ts";

function assertHex(value: string, context: string): void {
  if (!/^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(value)) {
    throw new Error(`Invalid hex color in ${context}: ${value}`);
  }
}

export function validateTheme(theme: CanonicalTheme): void {
  for (const [key, value] of Object.entries(theme.semantic.syntax) as Array<[string, string]>) {
    assertHex(value, `semantic.syntax.${key}`);
  }
  for (const [key, value] of Object.entries(theme.semantic.diagnostics) as Array<[string, string]>) {
    assertHex(value, `semantic.diagnostics.${key}`);
  }
  for (const [key, value] of Object.entries(theme.semantic.vcs) as Array<[string, string]>) {
    assertHex(value, `semantic.vcs.${key}`);
  }
  for (const [key, value] of Object.entries(theme.ui.bg) as Array<[string, string]>) {
    assertHex(value, `ui.bg.${key}`);
  }
  for (const [key, value] of Object.entries(theme.ui.fg) as Array<[string, string]>) {
    assertHex(value, `ui.fg.${key}`);
  }
  for (const [key, value] of Object.entries(theme.ui.border) as Array<[string, string]>) {
    assertHex(value, `ui.border.${key}`);
  }
  for (const [key, value] of Object.entries(theme.ui.state) as Array<[string, string]>) {
    assertHex(value, `ui.state.${key}`);
  }
  for (const [key, value] of Object.entries(theme.ui.editor) as Array<[string, string]>) {
    assertHex(value, `ui.editor.${key}`);
  }

  assertHex(theme.ui.terminal.background, "ui.terminal.background");
  assertHex(theme.ui.terminal.foreground, "ui.terminal.foreground");

  for (const [key, value] of Object.entries(theme.ui.terminal.ansi) as Array<[string, string]>) {
    assertHex(value, `ui.terminal.ansi.${key}`);
  }
}
