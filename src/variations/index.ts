import type { Variation, VariationId } from "../core/types.ts";
import { darkVariation } from "./dark.ts";
import { lightVariation } from "./light.ts";
import { oledVariation } from "./oled.ts";
import { colorblindVariation } from "./colorblind.ts";

export const allVariations: Variation[] = [
  darkVariation,
  lightVariation,
  oledVariation,
  colorblindVariation
];

const variationById = new Map<VariationId, Variation>(
  allVariations.map((variation) => [variation.id, variation])
);

export function getVariationById(id: VariationId): Variation | undefined {
  return variationById.get(id);
}
