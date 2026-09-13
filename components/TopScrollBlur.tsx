"use client";

import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";

export default function TopScrollBlur() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setIsScrolled(latest > 16);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <div
      className={`top-scroll-blur ${isScrolled ? "is-scrolled" : ""}`}
      aria-hidden="true"
    >
      {/* Subtle hairline border that fades in when scrolling */}
      <div className="top-scroll-blur-border" />
    </div>
  );
}
