import { registerBuiltins } from "../plugins/builtins.ts";

function main(): void {
  const registry = registerBuiltins();
  for (const generator of registry.list()) {
    console.log(`${generator.id}\t${generator.displayName}`);
  }
}

main();
