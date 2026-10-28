/* Colours come from the site's CSS variables, so the sketch follows light
   and dark mode without any extra work.                                   */
export function useSketchTheme(sketchColor?: string): {
  ink: string;
  accent: string;
} {
  return {
    ink: sketchColor ?? "var(--foreground)",
    accent: sketchColor ?? "var(--foreground)",
  };
}
