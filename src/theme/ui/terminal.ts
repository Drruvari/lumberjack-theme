import type { Palette, UiTokens, VariationId } from "../../core/types.ts";

export function buildTerminalTokens(palette: Palette, variation: VariationId): UiTokens["terminal"] {
  const isLight = variation === "light";
  const background = isLight ? palette.gray[10] : variation === "oled" ? palette.black : palette.gray[0];
  const foreground = isLight ? palette.gray[1] : palette.gray[9];
  const normalAccent = (isLight ? 5 : 7) as 5 | 7;
  const brightAccent = (isLight ? 7 : 9) as 7 | 9;

  return {
    background,
    foreground,
    ansi: {
      black: isLight ? palette.gray[2] : palette.gray[1],
      red: palette.red[normalAccent],
      green: palette.green[normalAccent],
      yellow: palette.yellow[normalAccent],
      blue: palette.blue[normalAccent],
      magenta: palette.magenta[normalAccent],
      cyan: palette.cyan[normalAccent],
      white: isLight ? palette.gray[8] : palette.gray[9],
      brightBlack: isLight ? palette.gray[5] : palette.gray[6],
      brightRed: palette.red[brightAccent],
      brightGreen: palette.green[brightAccent],
      brightYellow: palette.yellow[brightAccent],
      brightBlue: palette.blue[brightAccent],
      brightMagenta: palette.magenta[brightAccent],
      brightCyan: palette.cyan[brightAccent],
      brightWhite: isLight ? palette.gray[9] : palette.white
    }
  };
}
