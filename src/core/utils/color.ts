import type { Hex } from "../types.ts";

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function channelFromHex(hex: string, offset: number): number {
  return Number.parseInt(hex.slice(offset, offset + 2), 16);
}

function hexFromChannel(n: number): string {
  return clamp(Math.round(n), 0, 255).toString(16).padStart(2, "0");
}

export function withAlpha(hex: Hex, alpha: number): Hex {
  const normalized = clamp(alpha, 0, 1);
  const alphaHex = hexFromChannel(normalized * 255);
  return `${hex}${alphaHex}` as Hex;
}

export function mix(a: Hex, b: Hex, ratio: number): Hex {
  const t = clamp(ratio, 0, 1);
  const ar = channelFromHex(a, 1);
  const ag = channelFromHex(a, 3);
  const ab = channelFromHex(a, 5);

  const br = channelFromHex(b, 1);
  const bg = channelFromHex(b, 3);
  const bb = channelFromHex(b, 5);

  const rr = ar + (br - ar) * t;
  const rg = ag + (bg - ag) * t;
  const rb = ab + (bb - ab) * t;

  return `#${hexFromChannel(rr)}${hexFromChannel(rg)}${hexFromChannel(rb)}` as Hex;
}
