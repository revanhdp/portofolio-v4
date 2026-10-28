import type { Ref, RefCallback, MutableRefObject } from "react";

export { cn } from "@/lib/utils";

/** Sets a forwarded ref, whether it is a callback or a ref object. */
export function assignRef<T>(ref: Ref<T> | undefined, node: T | null): void {
  if (!ref) return;
  if (typeof ref === "function") (ref as RefCallback<T>)(node);
  else (ref as MutableRefObject<T | null>).current = node;
}

/** A stable seed per key, so each tab draws its own line but always the same one. */
export function deriveSeed(seed: number, key: string): number {
  let h = seed | 0;
  for (let i = 0; i < key.length; i++) {
    h = Math.imul(h ^ key.charCodeAt(i), 16777619);
  }
  return (h >>> 0) % 2147483647 || 1;
}

/* Typography follows the site instead of a handwriting font, so the sketch
   stays in the line work and the text keeps the site's clean look.        */
export const doodleUiFontFamily = "inherit";

/** Maps the weights the sketch components ask for onto the site's 430 / 500 scale. */
export const doodleUiFontWeight = (weight: number): number =>
  weight >= 600 ? 500 : 430;
