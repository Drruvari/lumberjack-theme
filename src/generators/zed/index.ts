import path from "node:path";
import type { EditorGenerator } from "../../core/types.ts";

export const zedGenerator: EditorGenerator = {
  id: "zed",
  displayName: "Zed",
  fileExtHint: "json",
  async generate(theme, context) {
    const payload = {
      name: `${theme.displayName} ${theme.variation}`,
      appearance: theme.variation === "light" ? "light" : "dark",
      style: {
        background: theme.ui.bg.base,
        text: theme.ui.fg.base,
        panel_background: theme.ui.bg.panel,
        panel_border: theme.ui.border.subtle,
        status_bar_background: theme.ui.bg.elevated,
        border: theme.ui.border.subtle
      },
      syntax: {
        text: theme.semantic.syntax.text,
        comment: theme.semantic.syntax.comment,
        keyword: theme.semantic.syntax.keyword,
        string: theme.semantic.syntax.string,
        function: theme.semantic.syntax.function,
        type: theme.semantic.syntax.type,
        variable: theme.semantic.syntax.variable
      }
    };

    return [
      {
        path: path.join(context.outDir, "zed", `${theme.id}-${theme.variation}.json`),
        contents: JSON.stringify(payload, null, 2)
      }
    ];
  }
};
