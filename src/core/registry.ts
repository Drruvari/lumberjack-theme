import type { EditorGenerator, ThemeEnginePlugin } from "./types.ts";

export class GeneratorRegistry {
  private readonly generators = new Map<string, EditorGenerator>();

  register(generator: EditorGenerator): void {
    if (this.generators.has(generator.id)) {
      throw new Error(`Generator with id '${generator.id}' is already registered.`);
    }
    this.generators.set(generator.id, generator);
  }

  registerPlugin(plugin: ThemeEnginePlugin): void {
    for (const generator of plugin.generators) {
      this.register(generator);
    }
  }

  list(): EditorGenerator[] {
    return [...this.generators.values()];
  }
}
