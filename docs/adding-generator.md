# Adding a New Editor Generator

## Steps

1. Create `src/generators/<editor>/index.ts` that exports an `EditorGenerator`.
2. Map canonical `theme.semantic` and `theme.ui` tokens into the target editor format.
3. Return one or more artifacts from `generate()`.
4. Register generator in `src/plugins/builtins.ts`.
5. Run `npm run build:engine` and inspect `dist/<editor>/` outputs.

## Minimal Generator Template

```ts
import path from "node:path";
import type { EditorGenerator } from "../../core/types.ts";

export const myEditorGenerator: EditorGenerator = {
  id: "terminal",
  displayName: "My Editor",
  async generate(theme, context) {
    return [
      {
        path: path.join(context.outDir, "my-editor", `${theme.id}-${theme.variation}.json`),
        contents: JSON.stringify({
          bg: theme.ui.bg.base,
          fg: theme.semantic.syntax.text
        }, null, 2)
      }
    ];
  }
};
```
