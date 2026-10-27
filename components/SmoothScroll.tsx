"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useSetting } from "@/lib/settings";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const enabled = useSetting("smoothScroll");

  useEffect(() => {
    if (!enabled) return;

    // Respect reduced motion settings
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.25,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [enabled]);

  return <>{children}</>;
}
