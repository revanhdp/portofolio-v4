/** Options shared by the sketch components. Anything left out falls back to a default. */
export interface SketchProps {
  /** How wobbly the hand-drawn strokes are. 0 is a straight line. */
  roughness?: number;
  /** Same seed, same drawing. Defaults to a fixed seed so server and client agree. */
  seed?: number;
  /** One colour for both text and strokes, overriding the theme. */
  sketchColor?: string;
  /** How much the lines curve between their end points. */
  bowing?: number;
  fillStyle?: "hachure" | "solid" | "zigzag" | "cross-hatch" | "dots" | "dashed" | "zigzag-line";
  strokeWidth?: number;
}
