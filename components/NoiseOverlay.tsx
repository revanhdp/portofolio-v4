"use client";

import { useSetting } from "@/lib/settings";

/**
 * NoiseOverlay (Poin 2)
 * Adds a micro-fine SVG analog film grain / noise texture across the viewport.
 * Blends with multiply (light mode) and screen (dark mode) to eliminate digital
 * gradient banding and provide a bespoke, tactile matte paper depth.
 */
export default function NoiseOverlay() {
  const enabled = useSetting("grain");
  if (!enabled) return null;
  return <div className="noise-overlay" aria-hidden="true" />;
}
