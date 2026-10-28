"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { RoughSvg } from "@/components/ui/tabs-utils/rough-svg";
import { useAnimate, useDrawIn } from "@/components/ui/tabs-utils/animations-index";
import { deriveSeed } from "@/components/ui/tabs-utils/utils";

const noopSubscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(noopSubscribe, () => true, () => false);

/* A page title with a hand-drawn underline that draws itself in. The same
   sketch style as the tab underline in components/ui/tabs.tsx. The line is
   added after hydration, so it can draw in from nothing instead of
   flashing in fully drawn first.                                         */
export default function SketchTitle({
  children,
  seedKey,
}: {
  children: ReactNode;
  /** Changes the drawing; titles with different keys get different lines. */
  seedKey: string;
}) {
  const mounted = useMounted();
  const animate = useAnimate();
  const line = useRef<HTMLSpanElement>(null);
  const seed = deriveSeed(7, seedKey);

  // Starts once the page's own fade-in is mostly done
  useDrawIn(line, 600, animate, seed, 250);

  return (
    // marginBottom is the air between the line and whatever follows the title
    <span style={{ position: "relative", display: "inline-block", marginBottom: 6 }}>
      {children}
      {mounted && (
        <span
          ref={line}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: -2,
            right: -2,
            bottom: -3,
            height: 8,
            pointerEvents: "none",
          }}
        >
          <RoughSvg
            shape="line"
            roughness={0.7}
            bowing={1.6}
            seed={seed}
            strokeWidth={1.25}
            sketchColor="var(--foreground)"
            inset={2}
          />
        </span>
      )}
    </span>
  );
}
