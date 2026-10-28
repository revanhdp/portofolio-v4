import { useMemo } from "react";
import rough from "roughjs";
import type { SketchProps } from "./types";

interface RoughSvgProps extends SketchProps {
  shape: "line";
  /** Space kept clear at both ends of the line, in drawing units. */
  inset?: number;
}

// The drawing is made on a fixed canvas and stretched to its container.
// Strokes keep their width (non-scaling), so only the wobble stretches.
const WIDTH = 120;
const HEIGHT = 10;

const generator = rough.generator();

export function RoughSvg({
  roughness = 1,
  seed = 1,
  sketchColor = "currentColor",
  bowing = 1,
  strokeWidth = 1.5,
  inset = 0,
}: RoughSvgProps) {
  const paths = useMemo(
    () =>
      generator.toPaths(
        generator.line(inset, HEIGHT / 2, WIDTH - inset, HEIGHT / 2, {
          roughness,
          bowing,
          seed,
          strokeWidth,
        }),
      ),
    [roughness, bowing, seed, strokeWidth, inset],
  );

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      width="100%"
      height="100%"
      style={{ display: "block", overflow: "visible" }}
      aria-hidden="true"
    >
      {paths.map((p, i) => (
        <path
          key={i}
          d={p.d}
          fill="none"
          stroke={sketchColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
