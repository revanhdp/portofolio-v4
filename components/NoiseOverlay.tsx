"use client";

/**
 * NoiseOverlay (Poin 2)
 * Adds a micro-fine SVG analog film grain / noise texture across the viewport.
 * Blends with multiply (light mode) and screen (dark mode) to eliminate digital
 * gradient banding and provide a bespoke, tactile matte paper depth.
 */
export default function NoiseOverlay() {
  return <div className="noise-overlay" aria-hidden="true" />;
}
