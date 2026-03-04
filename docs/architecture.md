# Theme Engine Architecture

## Goals

- One canonical color system.
- Multiple editor targets generated from shared semantic and UI tokens.
- Variation-first design (dark, light, OLED, colorblind) with zero generator duplication.
- Plugin-based generator onboarding.

## Layers

1. `theme/palette`: raw color primitives.
2. `theme/semantics`: meaning-based syntax/diagnostic/VCS tokens.
3. `theme/ui`: editor UI intent tokens.
4. `theme/compose.ts`: merges palette + variation into canonical theme object.
5. `generators/*`: per-editor mapping to output format.
6. `core/engine.ts`: orchestrates generation for all variations and editors.

## Data Flow

`palette -> variation.apply() -> canonical theme -> generators -> dist/<editor>/...`

## Output Policy

Each generator writes into its own editor-specific dist folder.

- `dist/vscode/themes/*.json`
- `dist/zed/*.json`
- `dist/jetbrains/*.icls`
- `dist/neovim/*.lua`
- `dist/sublime/*.sublime-color-scheme`
- `dist/helix/*.toml`
- `dist/warp/*.yaml`
- `dist/terminal/*.json`

## Compatibility

The VS Code generator also emits `dist/vscode/themes/lumberjack-color-theme.json` for extension manifest compatibility.
