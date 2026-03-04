import type { Palette, UiTokens, VariationId } from "../../core/types.ts";

export function buildTerminalTokens(palette: Palette, variation: VariationId): UiTokens["terminal"] {
  const darkBackground = variation === "oled" ? palette.black : palette.gray[0];
  const lightBackground = palette.gray[10];

  return {
    background: variation === "light" ? lightBackground : darkBackground,
    foreground: variation === "light" ? palette.gray[1] : palette.gray[9],
    ansi: {
      black: variation === "light" ? palette.gray[3] : palette.gray[1],
      red: palette.red[7],
      green: palette.green[7],
      yellow: palette.yellow[7],
      blue: palette.blue[7],
      magenta: palette.magenta[7],
      cyan: palette.cyan[7],
      white: variation === "light" ? palette.gray[9] : palette.gray[9],
      brightBlack: palette.gray[6],
      brightRed: palette.red[9],
      brightGreen: palette.green[9],
      brightYellow: palette.yellow[9],
      brightBlue: palette.blue[9],
      brightMagenta: palette.magenta[9],
      brightCyan: palette.cyan[9],
      brightWhite: palette.white
    }
  };
}
