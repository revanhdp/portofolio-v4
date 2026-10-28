import { useSyncExternalStore, type RefObject } from "react";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";

/** How long a freshly drawn mark takes to draw in. */
export const DRAW_IN_MARK_MS = 380;

const REDUCED = "(prefers-reduced-motion: reduce)";

function subscribeReduced(onChange: () => void) {
  const query = window.matchMedia(REDUCED);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/** Whether sketch animations should play: the prop wins, otherwise the user's motion setting. */
export function useAnimate(animate?: boolean): boolean {
  const reduced = useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
  return animate ?? !reduced;
}

/** Draws every stroke inside `ref` from start to end, again whenever `seed` changes. */
export function useDrawIn(
  ref: RefObject<HTMLElement | null>,
  duration: number,
  enabled: boolean,
  seed: number,
  /** Wait this long (ms) before drawing; the strokes stay hidden meanwhile. */
  delay = 0,
): void {
  useIsomorphicLayoutEffect(() => {
    const root = ref.current;
    if (!root || !enabled) return;

    const animations = Array.from(root.querySelectorAll("path")).map((path) => {
      const length = path.getTotalLength();
      return path.animate(
        [
          { strokeDasharray: length, strokeDashoffset: length },
          { strokeDasharray: length, strokeDashoffset: 0 },
        ],
        { duration, delay, easing: "cubic-bezier(0.22, 1, 0.36, 1)", fill: "backwards" },
      );
    });
    return () => animations.forEach((a) => a.cancel());
  }, [ref, duration, delay, enabled, seed]);
}
