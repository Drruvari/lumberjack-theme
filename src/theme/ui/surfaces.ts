import type { Palette, UiTokens, VariationId } from "../../core/types.ts";
import { withAlpha } from "../../core/utils/color.ts";

export function buildSurfaceTokens(palette: Palette, variation: VariationId): Pick<UiTokens, "bg" | "fg" | "border" | "state"> {
  if (variation === "light") {
    return {
      bg: {
        base: palette.gray[10],
        elevated: palette.gray[9],
        panel: palette.gray[8],
        overlay: palette.gray[7]
      },
      fg: {
        base: palette.gray[1],
        muted: palette.gray[4],
        subtle: palette.gray[5],
        inverted: palette.gray[10]
      },
      border: {
        subtle: palette.gray[7],
        strong: palette.gray[6],
        focus: palette.blue[7]
      },
      state: {
        active: palette.blue[5],
        hover: withAlpha(palette.gray[7], 0.35),
        selected: withAlpha(palette.blue[5], 0.22),
        disabled: withAlpha(palette.gray[6], 0.55)
      }
    };
  }

  if (variation === "oled") {
    return {
      bg: {
        base: palette.black,
        elevated: palette.gray[0],
        panel: palette.gray[1],
        overlay: palette.gray[2]
      },
      fg: {
        base: palette.gray[9],
        muted: palette.gray[7],
        subtle: palette.gray[6],
        inverted: palette.gray[0]
      },
      border: {
        subtle: palette.gray[2],
        strong: palette.gray[4],
        focus: palette.cyan[9]
      },
      state: {
        active: palette.cyan[5],
        hover: palette.gray[2],
        selected: withAlpha(palette.cyan[5], 0.3),
        disabled: palette.gray[5]
      }
    };
  }

  const isColorblind = variation === "colorblind";
  const isDefault = variation === "default";

  return {
    bg: {
      base: palette.gray[0],
      elevated: palette.gray[1],
      panel: palette.gray[2],
      overlay: palette.gray[3]
    },
    fg: {
      base: palette.gray[9],
      muted: palette.gray[7],
      subtle: palette.gray[6],
      inverted: palette.gray[0]
    },
    border: {
      subtle: palette.gray[3],
      strong: palette.gray[5],
      focus: isColorblind ? palette.blue[9] : isDefault ? palette.orange[7] : palette.blue[7]
    },
    state: {
      active: isColorblind ? palette.blue[7] : isDefault ? palette.orange[5] : palette.blue[5],
      hover: palette.gray[3],
      selected: isColorblind
        ? withAlpha(palette.blue[5], 0.3)
        : isDefault
          ? withAlpha(palette.orange[5], 0.28)
          : withAlpha(palette.blue[5], 0.28),
      disabled: palette.gray[5]
    }
  };
}
