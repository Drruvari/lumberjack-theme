import path from "node:path";
import type { EditorGenerator } from "../../core/types.ts";

export const warpGenerator: EditorGenerator = {
  id: "warp",
  displayName: "Warp",
  fileExtHint: "yaml",
  async generate(theme, context) {
    const yaml = `name: ${theme.id}-${theme.variation}\naccent: "${theme.ui.state.active}"\nbackground: "${theme.ui.terminal.background}"\nforeground: "${theme.ui.terminal.foreground}"\ndetails: ${theme.variation === "light" ? "lighter" : "darker"}\nterminal_colors:\n  normal:\n    black: "${theme.ui.terminal.ansi.black}"\n    red: "${theme.ui.terminal.ansi.red}"\n    green: "${theme.ui.terminal.ansi.green}"\n    yellow: "${theme.ui.terminal.ansi.yellow}"\n    blue: "${theme.ui.terminal.ansi.blue}"\n    magenta: "${theme.ui.terminal.ansi.magenta}"\n    cyan: "${theme.ui.terminal.ansi.cyan}"\n    white: "${theme.ui.terminal.ansi.white}"\n  bright:\n    black: "${theme.ui.terminal.ansi.brightBlack}"\n    red: "${theme.ui.terminal.ansi.brightRed}"\n    green: "${theme.ui.terminal.ansi.brightGreen}"\n    yellow: "${theme.ui.terminal.ansi.brightYellow}"\n    blue: "${theme.ui.terminal.ansi.brightBlue}"\n    magenta: "${theme.ui.terminal.ansi.brightMagenta}"\n    cyan: "${theme.ui.terminal.ansi.brightCyan}"\n    white: "${theme.ui.terminal.ansi.brightWhite}"\n`;

    return [
      {
        path: path.join(context.outDir, "warp", `${theme.id}-${theme.variation}.yaml`),
        contents: yaml
      }
    ];
  }
};
