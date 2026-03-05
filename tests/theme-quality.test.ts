import assert from "node:assert/strict";
import test from "node:test";
import { buildCanonicalTheme } from "../src/theme/compose.ts";
import { allVariations } from "../src/variations/index.ts";
import { toVsCodeTheme } from "../src/generators/vscode/index.ts";

const requiredColorKeys = [
  "foreground",
  "disabledForeground",
  "focusBorder",
  "editor.background",
  "editor.foreground",
  "editorLineNumber.foreground",
  "editorLineNumber.activeForeground",
  "editorCursor.foreground",
  "editor.selectionBackground",
  "editor.findMatchBackground",
  "activityBar.background",
  "activityBar.foreground",
  "sideBar.background",
  "sideBar.foreground",
  "statusBar.background",
  "statusBar.foreground",
  "panel.background",
  "panel.border",
  "button.background",
  "button.foreground",
  "button.hoverBackground",
  "button.secondaryBackground",
  "button.secondaryForeground",
  "button.secondaryHoverBackground",
  "button.border",
  "input.background",
  "input.foreground",
  "terminal.background",
  "terminal.foreground",
  "editorError.foreground",
  "editorWarning.foreground",
  "editorInfo.foreground",
  "editorHint.foreground"
];

const requiredSemanticTokenKeys = [
  "class",
  "enum",
  "function",
  "method",
  "namespace",
  "parameter",
  "property",
  "type",
  "variable",
  "variableReadOnly"
];

function isHexColor(value: unknown): boolean {
  return typeof value === "string" && /^#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?$/.test(value);
}

function parseHex(hex: string): [number, number, number] {
  const raw = hex.slice(1, 7);
  return [Number.parseInt(raw.slice(0, 2), 16), Number.parseInt(raw.slice(2, 4), 16), Number.parseInt(raw.slice(4, 6), 16)];
}

function relativeChannel(channel: number): number {
  const normalized = channel / 255;
  return normalized <= 0.03928 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
}

function luminance(hex: string): number {
  const [r, g, b] = parseHex(hex);
  return 0.2126 * relativeChannel(r) + 0.7152 * relativeChannel(g) + 0.0722 * relativeChannel(b);
}

function contrastRatio(hexA: string, hexB: string): number {
  const [lighter, darker] = [luminance(hexA), luminance(hexB)].sort((a, b) => b - a);
  return (lighter + 0.05) / (darker + 0.05);
}

test("VS Code themes include core token coverage for every variation", () => {
  for (const variation of allVariations) {
    const canonical = buildCanonicalTheme({
      id: "lumberjack",
      displayName: "Lumberjack",
      variation
    });

    const payload = toVsCodeTheme(canonical) as {
      colors?: Record<string, unknown>;
      semanticTokenColors?: Record<string, unknown>;
    };

    assert.ok(payload.colors, `Missing 'colors' for variation ${variation.id}`);
    assert.ok(payload.semanticTokenColors, `Missing 'semanticTokenColors' for variation ${variation.id}`);

    for (const key of requiredColorKeys) {
      assert.ok(key in payload.colors, `Missing colors.${key} for variation ${variation.id}`);
      assert.ok(isHexColor(payload.colors[key]), `Invalid color value for ${variation.id} -> colors.${key}`);
    }

    for (const key of requiredSemanticTokenKeys) {
      assert.ok(key in payload.semanticTokenColors, `Missing semanticTokenColors.${key} for variation ${variation.id}`);
    }
  }
});

test("Foreground contrast remains high across all variations", () => {
  const minimumContrast = 7;

  for (const variation of allVariations) {
    const canonical = buildCanonicalTheme({
      id: "lumberjack",
      displayName: "Lumberjack",
      variation
    });

    const baseContrast = contrastRatio(canonical.ui.fg.base, canonical.ui.bg.base);
    assert.ok(
      baseContrast >= minimumContrast,
      `ui.fg.base contrast is too low for '${variation.id}': ${baseContrast.toFixed(2)} < ${minimumContrast}`
    );

    const editorTextContrast = contrastRatio(canonical.semantic.syntax.text, canonical.ui.bg.base);
    assert.ok(
      editorTextContrast >= minimumContrast,
      `semantic.syntax.text contrast is too low for '${variation.id}': ${editorTextContrast.toFixed(2)} < ${minimumContrast}`
    );
  }
});

test("Disabled buttons remain visually distinct from enabled buttons", () => {
  for (const variation of allVariations) {
    const canonical = buildCanonicalTheme({
      id: "lumberjack",
      displayName: "Lumberjack",
      variation
    });

    const payload = toVsCodeTheme(canonical) as {
      colors?: Record<string, unknown>;
    };

    assert.ok(payload.colors, `Missing 'colors' for variation ${variation.id}`);
    assert.notEqual(
      payload.colors["button.foreground"],
      payload.colors["disabledForeground"],
      `button.foreground and disabledForeground should differ for variation ${variation.id}`
    );
  }
});

test("Primary button text remains readable across all variations", () => {
  const minimumContrast = 4.5;

  for (const variation of allVariations) {
    const canonical = buildCanonicalTheme({
      id: "lumberjack",
      displayName: "Lumberjack",
      variation
    });

    const payload = toVsCodeTheme(canonical) as {
      colors?: Record<string, unknown>;
    };

    assert.ok(payload.colors, `Missing 'colors' for variation ${variation.id}`);
    const buttonBackground = payload.colors["button.background"];
    const buttonForeground = payload.colors["button.foreground"];
    assert.equal(typeof buttonBackground, "string", `Missing button.background for variation ${variation.id}`);
    assert.equal(typeof buttonForeground, "string", `Missing button.foreground for variation ${variation.id}`);

    const ratio = contrastRatio(buttonBackground as string, buttonForeground as string);
    assert.ok(
      ratio >= minimumContrast,
      `button contrast is too low for '${variation.id}': ${ratio.toFixed(2)} < ${minimumContrast}`
    );
  }
});
