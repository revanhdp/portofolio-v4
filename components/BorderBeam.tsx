"use client";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  borderWidth?: number;
  colorFrom?: string;
  colorTo?: string;
  className?: string;
  delay?: number;
}

/**
 * BorderBeam (Poin 6: Magic UI inspired micro-effect)
 * A smooth traveling ray of light tracing the border of cards or interactive bars.
 */
export default function BorderBeam({
  size = 180,
  duration = 7,
  borderWidth = 1.5,
  colorFrom = "#60a5fa",
  colorTo = "#a855f7",
  className = "",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      aria-hidden="true"
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--border-width": `${borderWidth}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={`border-beam ${className}`}
    />
  );
}
