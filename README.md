# Lumberjack Theme

Precision color themes for VS Code and Cursor, generated from one TypeScript theme engine.

![Lumberjack Theme Logo](./assets/lumberjack.png)

## Why This Theme

- Strong contrast with careful token grouping.
- Five variations for different workflows and accessibility needs.
- Multi-editor output from one canonical source of truth.
- Automated packaging and publishing pipeline.

## Theme Variations

1. `Lumberjack Theme (Default)` - Bearded/WebDevCody inspired dark baseline.
2. `Lumberjack Forest Night` - Cooler dark variant.
3. `Lumberjack White Birch` - Clean light variant.
4. `Lumberjack Ember OLED` - True-black OLED variant.
5. `Lumberjack Signal Colorblind` - Contrast-biased colorblind-safe variant.

## Install

### VS Code / Cursor Marketplace
1. Open Extensions.
2. Search `Lumberjack Theme`.
3. Install.

### From VSIX
1. Open Extensions.
2. Use `...` -> `Install from VSIX...`.
3. Select the latest packaged file, e.g. `lumberjack-theme-<version>.vsix`.

## Activate

1. Open Command Palette (`Cmd/Ctrl+Shift+P`).
2. Run `Preferences: Color Theme`.
3. Select a Lumberjack variation.

## Development

```bash
npm run typecheck
npm run build
npm run validate:engine
npm run test:engine
```

### Useful commands

- `npm run package` - build and package VSIX.
- `npm run targets` - list output targets.
- `npm run tokens:diff` - compare generated VS Code token coverage.
- `npm run release:note -- 0.0.5` - generate a release-note template.

## Release Notes Convention

Release notes are versioned and stored in [`releases/`](./releases):

- One markdown file per version: `releases/<version>.md`
- Required sections:
  - `Summary`
  - `Highlights`
  - `Added`
  - `Changed`
  - `Fixed`
  - `Breaking Changes` (when needed)
  - `Verification`
  - `Assets`

See [`releases/README.md`](./releases/README.md) and [`releases/_template.md`](./releases/_template.md).

## Automated Publish On Push

Workflow: [`.github/workflows/auto-publish.yml`](./.github/workflows/auto-publish.yml)

On each push it will:
1. Install dependencies.
2. Validate publish secrets.
3. Bump patch version.
4. Typecheck/build/validate/test.
5. Auto-generate `releases/<version>.md` from commit history.
6. Commit version + release note and create tag.
7. Package a new VSIX.
8. Upload VSIX as artifact and GitHub release asset.
9. Publish to VS Code Marketplace.
10. Publish to Open VSX.
11. Verify that the published version is visible on both registries.
12. Push release commit and tag.
13. Create a GitHub Release with release notes and VSIX asset.

Required GitHub secrets:
- `VSCE_PAT`
- `OPEN_VSX_TOKEN`

## CI And Main Protection

Workflow: [`.github/workflows/ci.yml`](./.github/workflows/ci.yml)

On each PR and `main` push it runs:
- `npm ci`
- `npm run typecheck`
- `npm run build`
- `npm run validate:engine`
- `npm run test:engine`

Apply main branch protection (requires admin token):

```bash
GITHUB_TOKEN=... npm run repo:protect-main
```

Optional branch-protection inputs:
- `REQUIRED_CHECKS` (default: `CI / ci`, comma-separated)
- positional argument `<owner/repo>` to target a different repository

## License

GNU GPL v3.0 only. See [`LICENSE`](./LICENSE).
