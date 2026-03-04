import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { GeneratedArtifact } from "../types.ts";

export async function writeArtifacts(artifacts: GeneratedArtifact[]): Promise<void> {
  await Promise.all(
    artifacts.map(async (artifact) => {
      const dir = path.dirname(artifact.path);
      await mkdir(dir, { recursive: true });
      await writeFile(artifact.path, artifact.contents, "utf8");
    })
  );
}
