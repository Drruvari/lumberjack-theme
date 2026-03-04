# VS Code Theme Token Checklist

This is a practical "near-100%" checklist for VS Code theme authoring.

Important: VS Code does not have a permanently fixed 100% theme spec. New keys are added over time, and some keys are optional or extension-specific. Treat this checklist as a strong baseline for core UI and editor coverage.

## Fast Missing-Token Workflow

1. In VS Code, activate your theme.
2. Run `Developer: Generate Color Theme From Current Settings`.
3. Save the generated file (recommended path: `tmp/generated-theme.json`).
4. Run:

```bash
npm run tokens:diff
```

5. Add missing keys reported by the script into `src/themes/lumberjack-color-theme.json`.

## Reference Tokens

### Base

- `foreground`
- `errorForeground`
- `focusBorder`
- `descriptionForeground`
- `disabledForeground`
- `icon.foreground`
- `selection.background`

### Window

- `window.activeBorder`
- `window.inactiveBorder`

### Title Bar

- `titleBar.activeBackground`
- `titleBar.activeForeground`
- `titleBar.inactiveBackground`
- `titleBar.inactiveForeground`
- `titleBar.border`

### Activity Bar

- `activityBar.background`
- `activityBar.foreground`
- `activityBar.inactiveForeground`
- `activityBar.border`
- `activityBar.activeBorder`
- `activityBar.activeBackground`
- `activityBarBadge.background`
- `activityBarBadge.foreground`

### Sidebar

- `sideBar.background`
- `sideBar.foreground`
- `sideBar.border`
- `sideBarTitle.foreground`
- `sideBarSectionHeader.background`
- `sideBarSectionHeader.foreground`
- `sideBarSectionHeader.border`

### Editor

- `editor.background`
- `editor.foreground`
- `editorLineNumber.foreground`
- `editorLineNumber.activeForeground`
- `editorCursor.foreground`
- `editorCursor.background`
- `editor.selectionBackground`
- `editor.selectionForeground`
- `editor.inactiveSelectionBackground`
- `editor.selectionHighlightBackground`
- `editor.wordHighlightBackground`
- `editor.wordHighlightStrongBackground`
- `editor.findMatchBackground`
- `editor.findMatchBorder`
- `editor.findMatchHighlightBackground`
- `editor.findMatchHighlightBorder`
- `editor.lineHighlightBackground`
- `editor.lineHighlightBorder`
- `editor.hoverHighlightBackground`
- `editor.rangeHighlightBackground`
- `editor.linkedEditingBackground`
- `editorWhitespace.foreground`
- `editorIndentGuide.background`
- `editorIndentGuide.activeBackground`
- `editorBracketMatch.background`
- `editorBracketMatch.border`

### Editor Brackets

- `editorBracketHighlight.foreground1`
- `editorBracketHighlight.foreground2`
- `editorBracketHighlight.foreground3`
- `editorBracketHighlight.foreground4`
- `editorBracketHighlight.foreground5`
- `editorBracketHighlight.foreground6`
- `editorBracketHighlight.unexpectedBracket.foreground`

### Diagnostics

- `editorError.foreground`
- `editorWarning.foreground`
- `editorInfo.foreground`
- `editorHint.foreground`

### Editor Gutter

- `editorGutter.background`
- `editorGutter.addedBackground`
- `editorGutter.deletedBackground`
- `editorGutter.modifiedBackground`

### Overview Ruler

- `editorOverviewRuler.border`
- `editorOverviewRuler.errorForeground`
- `editorOverviewRuler.warningForeground`
- `editorOverviewRuler.infoForeground`
- `editorOverviewRuler.addedForeground`
- `editorOverviewRuler.deletedForeground`
- `editorOverviewRuler.modifiedForeground`
- `editorOverviewRuler.selectionHighlightForeground`

### Suggest Widget

- `editorSuggestWidget.background`
- `editorSuggestWidget.border`
- `editorSuggestWidget.foreground`
- `editorSuggestWidget.highlightForeground`
- `editorSuggestWidget.selectedBackground`
- `editorSuggestWidget.selectedForeground`

### Hover / Widgets

- `editorHoverWidget.background`
- `editorHoverWidget.border`
- `editorWidget.background`
- `editorWidget.border`
- `editorWidget.resizeBorder`

### Editor Groups

- `editorGroup.border`
- `editorGroupHeader.tabsBackground`
- `editorGroupHeader.tabsBorder`
- `editorGroupHeader.noTabsBackground`

### Tabs

- `tab.activeBackground`
- `tab.activeForeground`
- `tab.activeBorder`
- `tab.activeBorderTop`
- `tab.inactiveBackground`
- `tab.inactiveForeground`
- `tab.hoverBackground`
- `tab.border`

### Breadcrumb

- `breadcrumb.background`
- `breadcrumb.foreground`
- `breadcrumb.focusForeground`
- `breadcrumb.activeSelectionForeground`
- `breadcrumbPicker.background`

### Lists

- `list.activeSelectionBackground`
- `list.activeSelectionForeground`
- `list.inactiveSelectionBackground`
- `list.inactiveSelectionForeground`
- `list.hoverBackground`
- `list.hoverForeground`
- `list.focusBackground`
- `list.focusForeground`
- `list.highlightForeground`
- `list.errorForeground`
- `list.warningForeground`
- `list.dropBackground`

### Inputs

- `input.background`
- `input.foreground`
- `input.border`
- `input.placeholderForeground`
- `inputOption.activeBackground`
- `inputOption.activeForeground`
- `inputOption.hoverBackground`

### Dropdown

- `dropdown.background`
- `dropdown.foreground`
- `dropdown.border`
- `dropdown.listBackground`

### Buttons

- `button.background`
- `button.foreground`
- `button.hoverBackground`
- `button.secondaryBackground`
- `button.secondaryForeground`
- `button.secondaryHoverBackground`
- `button.border`

### Badge

- `badge.background`
- `badge.foreground`

### Panel

- `panel.background`
- `panel.border`
- `panelTitle.activeForeground`
- `panelTitle.activeBorder`
- `panelTitle.inactiveForeground`
- `panelSectionHeader.background`
- `panelSectionHeader.foreground`
- `panelSectionHeader.border`

### Status Bar

- `statusBar.background`
- `statusBar.foreground`
- `statusBar.border`
- `statusBar.debuggingBackground`
- `statusBar.debuggingForeground`
- `statusBar.noFolderBackground`
- `statusBar.noFolderForeground`
- `statusBarItem.hoverBackground`
- `statusBarItem.hoverForeground`
- `statusBarItem.activeBackground`
- `statusBarItem.remoteBackground`
- `statusBarItem.remoteForeground`
- `statusBarItem.warningBackground`
- `statusBarItem.warningForeground`
- `statusBarItem.errorBackground`
- `statusBarItem.errorForeground`

### Terminal

- `terminal.background`
- `terminal.foreground`
- `terminal.selectionForeground`
- `terminalCursor.foreground`
- `terminalCursor.background`
- `terminal.ansiBlack`
- `terminal.ansiRed`
- `terminal.ansiGreen`
- `terminal.ansiYellow`
- `terminal.ansiBlue`
- `terminal.ansiMagenta`
- `terminal.ansiCyan`
- `terminal.ansiWhite`
- `terminal.ansiBrightBlack`
- `terminal.ansiBrightRed`
- `terminal.ansiBrightGreen`
- `terminal.ansiBrightYellow`
- `terminal.ansiBrightBlue`
- `terminal.ansiBrightMagenta`
- `terminal.ansiBrightCyan`
- `terminal.ansiBrightWhite`

### Scrollbars

- `scrollbar.shadow`
- `scrollbarSlider.background`
- `scrollbarSlider.hoverBackground`
- `scrollbarSlider.activeBackground`

### Minimap

- `minimap.background`
- `minimap.findMatchHighlight`
- `minimap.selectionHighlight`
- `minimap.errorHighlight`
- `minimap.warningHighlight`

### Peek View

- `peekView.border`
- `peekViewTitle.background`
- `peekViewTitleLabel.foreground`
- `peekViewTitleDescription.foreground`
- `peekViewEditor.background`
- `peekViewEditorGutter.background`
- `peekViewResult.background`
- `peekViewResult.fileForeground`
- `peekViewResult.lineForeground`
- `peekViewResult.matchHighlightBackground`
- `peekViewResult.selectionBackground`

### Diff Editor

- `diffEditor.insertedLineBackground`
- `diffEditor.insertedTextBackground`
- `diffEditor.removedLineBackground`
- `diffEditor.removedTextBackground`
- `diffEditor.diagonalFill`
- `diffEditorOverview.insertedForeground`
- `diffEditorOverview.removedForeground`

### Git Decorations

- `gitDecoration.addedResourceForeground`
- `gitDecoration.modifiedResourceForeground`
- `gitDecoration.deletedResourceForeground`
- `gitDecoration.untrackedResourceForeground`
- `gitDecoration.ignoredResourceForeground`
- `gitDecoration.conflictingResourceForeground`

### Notifications

- `notificationCenterHeader.background`
- `notificationCenterHeader.foreground`
- `notifications.background`
- `notifications.foreground`
- `notifications.border`
- `notificationsErrorIcon.foreground`
- `notificationsWarningIcon.foreground`
- `notificationsInfoIcon.foreground`

### Menu

- `menu.background`
- `menu.foreground`
- `menu.selectionForeground`
- `menu.separatorBackground`
- `menu.border`

### Progress

- `progressBar.background`

### Text

- `textLink.foreground`
- `textLink.activeForeground`
- `textBlockQuote.background`
- `textBlockQuote.border`
- `textCodeBlock.background`
- `textPreformat.foreground`
- `textSeparator.foreground`

## Newer Surfaces to Include

- `inlineChat.*`
- `merge.*`
- `notebook.*`
- `testing.*`
- `charts.*`
- `commandCenter.*`
- `welcomePage.*`
