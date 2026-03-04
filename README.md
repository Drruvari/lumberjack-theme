# Lumberjack Theme

Lumberjack Theme is a dark, high-contrast color theme for VS Code and Cursor.
It now includes a multi-editor TypeScript theme engine that generates themes from one canonical token system.

## Preview

![Lumberjack Theme Logo](./assets/lumberjack.png)

## Install

### VS Code Marketplace
1. Open Extensions.
2. Search for `Lumberjack Theme`.
3. Click Install.

### Cursor
1. Open Extensions.
2. Search for `Lumberjack Theme`.
3. If search does not show it, open the Extensions menu (`...`) -> `Install from VSIX...`.
4. Select the packaged file (for example `lumberjack-theme-0.0.2.vsix`).

## Activate
1. Open Command Palette (`Cmd/Ctrl+Shift+P`).
2. Run `Preferences: Color Theme`.
3. Select one of:
- `Lumberjack Theme (Default)`
- `Lumberjack Forest Night`
- `Lumberjack White Birch`
- `Lumberjack Ember OLED`
- `Lumberjack Signal Colorblind`

## Repository

- Issues: https://github.com/drruvari/lumberjack-theme/issues
- Source: https://github.com/drruvari/lumberjack-theme

## Build Engine

Generate all variations for all supported editors:

```bash
npm run build
```

List supported output targets:

```bash
npm run targets
```

Validate canonical token integrity:

```bash
npm run validate:engine
```

## Theme Coverage Audit

To find missing color tokens quickly:

1. In VS Code, run `Developer: Generate Color Theme From Current Settings`.
2. Save it as `tmp/generated-theme.json`.
3. Run:

```bash
npm run tokens:diff
```

Reference checklist: [docs/vscode-theme-token-checklist.md](./docs/vscode-theme-token-checklist.md)

## Auto Publish On Push

This repo includes GitHub Actions workflow [`.github/workflows/auto-publish.yml`](./.github/workflows/auto-publish.yml).

When you push to `main` or `master`, it will automatically:
1. Run `npm ci`.
2. Bump patch version (`npm version patch`).
3. Build the theme.
4. Publish to VS Code Marketplace.
5. Optionally publish to Open VSX (if token exists).
6. Push the version commit and tag back to GitHub.

Required GitHub repository secrets:
- `VSCE_PAT` (required): Visual Studio Marketplace personal access token.
- `OPEN_VSX_TOKEN` (optional): Open VSX publish token.
