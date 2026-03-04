export type Hex = `#${string}`;

export type EditorId =
  | "vscode"
  | "zed"
  | "jetbrains"
  | "neovim"
  | "sublime"
  | "helix"
  | "warp"
  | "terminal";

export type VariationId = "default" | "dark" | "light" | "oled" | "colorblind";

export interface PaletteScale {
  0: Hex;
  1: Hex;
  2: Hex;
  3: Hex;
  4: Hex;
  5: Hex;
  6: Hex;
  7: Hex;
  8: Hex;
  9: Hex;
  10: Hex;
}

export interface AccentScale {
  3: Hex;
  5: Hex;
  7: Hex;
  9: Hex;
}

export interface Palette {
  black: Hex;
  white: Hex;
  gray: PaletteScale;
  red: AccentScale;
  orange: AccentScale;
  yellow: AccentScale;
  green: AccentScale;
  cyan: AccentScale;
  blue: AccentScale;
  magenta: AccentScale;
}

export interface SemanticSyntaxTokens {
  text: Hex;
  comment: Hex;
  keyword: Hex;
  string: Hex;
  number: Hex;
  function: Hex;
  method: Hex;
  type: Hex;
  variable: Hex;
  constant: Hex;
  property: Hex;
  tag: Hex;
  operator: Hex;
}

export interface SemanticDiagnosticTokens {
  error: Hex;
  warning: Hex;
  info: Hex;
  hint: Hex;
}

export interface SemanticVcsTokens {
  added: Hex;
  modified: Hex;
  removed: Hex;
  ignored: Hex;
}

export interface SemanticTokens {
  syntax: SemanticSyntaxTokens;
  diagnostics: SemanticDiagnosticTokens;
  vcs: SemanticVcsTokens;
}

export interface UiTokens {
  bg: {
    base: Hex;
    elevated: Hex;
    panel: Hex;
    overlay: Hex;
  };
  fg: {
    base: Hex;
    muted: Hex;
    subtle: Hex;
    inverted: Hex;
  };
  border: {
    subtle: Hex;
    strong: Hex;
    focus: Hex;
  };
  state: {
    active: Hex;
    hover: Hex;
    selected: Hex;
    disabled: Hex;
  };
  editor: {
    lineNumber: Hex;
    lineNumberActive: Hex;
    cursor: Hex;
    selection: Hex;
    findMatch: Hex;
    currentLine: Hex;
  };
  terminal: {
    background: Hex;
    foreground: Hex;
    ansi: {
      black: Hex;
      red: Hex;
      green: Hex;
      yellow: Hex;
      blue: Hex;
      magenta: Hex;
      cyan: Hex;
      white: Hex;
      brightBlack: Hex;
      brightRed: Hex;
      brightGreen: Hex;
      brightYellow: Hex;
      brightBlue: Hex;
      brightMagenta: Hex;
      brightCyan: Hex;
      brightWhite: Hex;
    };
  };
}

export interface CanonicalTheme {
  id: string;
  variation: VariationId;
  displayName: string;
  palette: Palette;
  semantic: SemanticTokens;
  ui: UiTokens;
}

export interface Variation {
  id: VariationId;
  displayName: string;
  apply(palette: Palette): {
    semantic: SemanticTokens;
    ui: UiTokens;
  };
}

export interface BuildConfig {
  themeId: string;
  themeDisplayName: string;
  outDir: string;
  variations: VariationId[];
  packageVersion: string;
  dryRun?: boolean;
}

export interface GenerationContext {
  outDir: string;
  packageVersion: string;
  dryRun?: boolean;
}

export interface GeneratedArtifact {
  path: string;
  contents: string;
}

export interface EditorGenerator {
  id: EditorId;
  displayName: string;
  fileExtHint?: string;
  generate(theme: CanonicalTheme, context: GenerationContext): Promise<GeneratedArtifact[]>;
}

export interface ThemeEnginePlugin {
  name: string;
  generators: EditorGenerator[];
  setup?(): Promise<void> | void;
}
