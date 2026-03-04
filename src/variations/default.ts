import type { Palette, Variation } from "../core/types.ts";

function makeTheme(palette: Palette): ReturnType<Variation["apply"]> {
  void palette;

  return {
    semantic: {
      syntax: {
        text: "#4eeafe",
        comment: "#018799",
        keyword: "#f1d868",
        string: "#f75f94",
        number: "#ec5342",
        function: "#82f0ff",
        method: "#82f0ff",
        type: "#f75f94",
        variable: "#eeeeee",
        constant: "#ec5342",
        property: "#81f0fe",
        tag: "#82f0ff",
        operator: "#f1d868"
      },
      diagnostics: {
        error: "#e61e3f",
        warning: "#e3946a",
        info: "#e95d74",
        hint: "#018799"
      },
      vcs: {
        added: "#60e66f",
        modified: "#f1d868",
        removed: "#e61e3f",
        ignored: "#018799cc"
      }
    },
    ui: {
      bg: {
        base: "#00171a",
        elevated: "#002e34",
        panel: "#000d0f",
        overlay: "#002329"
      },
      fg: {
        base: "#81f0fe",
        muted: "#4eeafe",
        subtle: "#018799",
        inverted: "#00171a"
      },
      border: {
        subtle: "#000000b3",
        strong: "#000000",
        focus: "#e95d74"
      },
      state: {
        active: "#003942",
        hover: "#003942",
        selected: "#e95d7433",
        disabled: "#000d0f80"
      },
      editor: {
        lineNumber: "#009eb380",
        lineNumberActive: "#00e2ff",
        cursor: "#e95d74",
        selection: "#e95d7440",
        findMatch: "#f1d8684d",
        currentLine: "#002e344d"
      },
      terminal: {
        background: "#00171a",
        foreground: "#81f0fe",
        ansi: {
          black: "#000000",
          red: "#ec5342",
          green: "#f75f94",
          yellow: "#f1d868",
          blue: "#82f0ff",
          magenta: "#f75f94",
          cyan: "#f1d868",
          white: "#FFFFFF",
          brightBlack: "#00889a",
          brightRed: "#f17d70",
          brightGreen: "#f990b4",
          brightYellow: "#f5e497",
          brightBlue: "#b5f6ff",
          brightMagenta: "#f990b4",
          brightCyan: "#f5e497",
          brightWhite: "#b4f6fe"
        }
      }
    }
  };
}

export const defaultVariation: Variation = {
  id: "default",
  displayName: "Default",
  apply: (palette) => makeTheme(palette)
};
