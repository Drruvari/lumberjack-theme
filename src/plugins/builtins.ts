import { GeneratorRegistry } from "../core/registry.ts";
import type { ThemeEnginePlugin } from "../core/types.ts";
import { vscodeGenerator } from "../generators/vscode/index.ts";
import { zedGenerator } from "../generators/zed/index.ts";
import { jetbrainsGenerator } from "../generators/jetbrains/index.ts";
import { neovimGenerator } from "../generators/neovim/index.ts";
import { sublimeGenerator } from "../generators/sublime/index.ts";
import { helixGenerator } from "../generators/helix/index.ts";
import { warpGenerator } from "../generators/warp/index.ts";
import { terminalGenerator } from "../generators/terminal/index.ts";

export const builtinPlugin: ThemeEnginePlugin = {
  name: "builtin-generators",
  generators: [
    vscodeGenerator,
    zedGenerator,
    jetbrainsGenerator,
    neovimGenerator,
    sublimeGenerator,
    helixGenerator,
    warpGenerator,
    terminalGenerator
  ]
};

export function registerBuiltins(registry = new GeneratorRegistry()): GeneratorRegistry {
  registry.registerPlugin(builtinPlugin);
  return registry;
}
