import path from "node:path";
import type { EditorGenerator } from "../../core/types.ts";

export const sublimeGenerator: EditorGenerator = {
  id: "sublime",
  displayName: "Sublime Text",
  fileExtHint: "sublime-color-scheme",
  async generate(theme, context) {
    const payload = {
      name: `${theme.displayName} ${theme.variation}`,
      variables: {
        background: theme.ui.bg.base,
        foreground: theme.semantic.syntax.text,
        accent: theme.ui.state.active,
        comment: theme.semantic.syntax.comment,
        string: theme.semantic.syntax.string,
        keyword: theme.semantic.syntax.keyword
      },
      globals: {
        background: "var(background)",
        foreground: "var(foreground)",
        selection: theme.ui.editor.selection,
        caret: theme.ui.editor.cursor,
        line_highlight: theme.ui.editor.currentLine
      },
      rules: [
        { scope: "comment", foreground: "var(comment)" },
        { scope: "string", foreground: "var(string)" },
        { scope: "keyword", foreground: "var(keyword)" },
        { scope: "entity.name.function", foreground: theme.semantic.syntax.function },
        { scope: "entity.name.type", foreground: theme.semantic.syntax.type }
      ]
    };

    return [
      {
        path: path.join(context.outDir, "sublime", `${theme.id}-${theme.variation}.sublime-color-scheme`),
        contents: JSON.stringify(payload, null, 2)
      }
    ];
  }
};
