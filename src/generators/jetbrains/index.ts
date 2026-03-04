import path from "node:path";
import type { EditorGenerator } from "../../core/types.ts";

function xmlEscape(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export const jetbrainsGenerator: EditorGenerator = {
  id: "jetbrains",
  displayName: "JetBrains IDEs",
  fileExtHint: "icls",
  async generate(theme, context) {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<scheme name="${xmlEscape(`${theme.displayName} ${theme.variation}`)}" version="142" parent_scheme="Default">
  <option name="LINE_SPACING" value="1.0" />
  <colors>
    <option name="CARET_COLOR" value="${theme.ui.editor.cursor.slice(1)}" />
    <option name="LINE_NUMBERS_COLOR" value="${theme.ui.editor.lineNumber.slice(1)}" />
    <option name="SELECTION_BACKGROUND" value="${theme.ui.editor.selection.slice(1, 7)}" />
    <option name="EDITOR_BACKGROUND" value="${theme.ui.bg.base.slice(1)}" />
    <option name="EDITOR_FOREGROUND" value="${theme.semantic.syntax.text.slice(1)}" />
  </colors>
</scheme>
`;

    return [
      {
        path: path.join(context.outDir, "jetbrains", `${theme.id}-${theme.variation}.icls`),
        contents: xml
      }
    ];
  }
};
