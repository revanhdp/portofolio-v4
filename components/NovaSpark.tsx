"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { playHandFold, playHandUnfurl, triggerHaptic } from "@/lib/sound";

/**
 * NovaSpark
 * A modern, minimalist 4-point dynamic star inspired by Linear and Vercel design aesthetics.
 * Features an organic curved hypocycloid geometry, celestial satellite sparks,
 * and elastic spin + radiant glow interactions.
 */
export default function NovaSpark() {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState(0);

  const handleMouseEnter = () => {
    setIsHovered(true);
    triggerHaptic("medium");
    playHandUnfurl();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    playHandFold();
  };

  const handleClick = () => {
    triggerHaptic("selection");
    playHandUnfurl();
    // Burst spin 180deg on each click
    setRotation((prev) => prev + 180);
  };

  return (
    <motion.div
      id="interactive-brand-icon"
      data-testid="interactive-nova-spark"
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "36px",
        height: "36px",
        cursor: "pointer",
        lineHeight: 0,
        marginBottom: "8px",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.9 }}
      role="button"
      tabIndex={0}
      aria-label="Nova Spark icon (hover or click to spin & radiate)"
    >
      {/* ── Soft Radiant Aura (glowing backdrop on hover) ── */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-6px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--foreground) 16%, transparent) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.25 : 0.8,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />

      {/* ── Main Rotating SVG ── */}
      <motion.svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: "visible",
          position: "relative",
          zIndex: 1,
        }}
        animate={{
          rotate: isHovered ? rotation + 90 : rotation,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        {/* Core 4-pointed curved star (hypocycloid) */}
        <motion.path
          d="M16 2.5C16 9.8 9.8 16 2.5 16C9.8 16 16 22.2 16 29.5C16 22.2 22.2 16 29.5 16C22.2 16 16 9.8 16 2.5Z"
          fill="none"
          stroke="var(--foreground)"
          strokeWidth="1.85"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={{
            fill: isHovered
              ? "color-mix(in srgb, var(--foreground) 10%, transparent)"
              : "transparent",
          }}
          transition={{ duration: 0.2 }}
        />

        {/* Inner concentric micro-core */}
        <motion.path
          d="M16 10C16 13.2 13.2 16 10 16C13.2 16 16 18.8 16 22C16 18.8 18.8 16 22 16C18.8 16 16 13.2 16 10Z"
          fill="var(--foreground)"
          opacity={isHovered ? 0.9 : 0.35}
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
          }}
          transition={{
            duration: 1.2,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        {/* Cardinal core dot */}
        <circle cx="16" cy="16" r="1.5" fill="var(--background)" />

        {/* ── Satellite Sparkle 1 (Top-Right) ── */}
        <motion.g
          animate={{
            scale: isHovered ? [1, 1.35, 1] : [0.8, 1, 0.8],
            opacity: isHovered ? [0.7, 1, 0.7] : [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <path
            d="M26 4C26 5.8 24.8 7 23 7C24.8 7 26 8.2 26 10C26 8.2 27.2 7 29 7C27.2 7 26 5.8 26 4Z"
            fill="var(--foreground)"
          />
        </motion.g>

        {/* ── Satellite Sparkle 2 (Bottom-Left) ── */}
        <motion.g
          animate={{
            scale: isHovered ? [1.35, 1, 1.35] : [1, 0.8, 1],
            opacity: isHovered ? [1, 0.7, 1] : [0.6, 0.3, 0.6],
          }}
          transition={{
            duration: 1.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        >
          <path
            d="M6 22C6 23.8 4.8 25 3 25C4.8 25 6 26.2 6 28C6 26.2 7.2 25 9 25C7.2 25 6 23.8 6 22Z"
            fill="var(--foreground)"
          />
        </motion.g>

        {/* ── Tiny Ambient Dot (Bottom-Right) ── */}
        <motion.circle
          cx="25.5"
          cy="25.5"
          r="1"
          fill="var(--muted)"
          animate={{
            opacity: isHovered ? 0.9 : 0.3,
            scale: isHovered ? 1.4 : 1,
          }}
          transition={{ duration: 0.25 }}
        />
      </motion.svg>
    </motion.div>
  );
}
