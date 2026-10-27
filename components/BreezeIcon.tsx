"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { playHandFold, playHandUnfurl, triggerHaptic } from "@/lib/sound";

export default function BreezeIcon() {
  const [isHovered, setIsHovered] = useState(false);

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
  };

  return (
    <motion.div
      id="interactive-brand-icon"
      data-testid="interactive-breeze-icon"
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
      whileTap={{ scale: 0.92 }}
      role="button"
      tabIndex={0}
      aria-label="Wind breeze icon (hover to surge breeze)"
    >
      {/* ── Soft Aerodynamic Air Aura on Hover ── */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-4px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.25 : 0.8,
        }}
        transition={{ duration: 0.25 }}
      />

      {/* ── Wind Wave SVG ── */}
      <svg
        width="34"
        height="34"
        viewBox="0 0 128 128"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          overflow: "visible",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Top Wind Wave */}
        <motion.path
          d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738z"
          fill="currentColor"
          style={{
            color: isHovered ? "#38bdf8" : "var(--foreground)",
            transition: "color 0.2s ease",
          }}
          animate={
            isHovered
              ? {
                  x: [0, 5, -2, 0],
                  y: [0, -1.5, 1, 0],
                }
              : { x: 0, y: 0 }
          }
          transition={{
            duration: 1.1,
            repeat: isHovered ? Infinity : 0,
            ease: "easeInOut",
          }}
        />

        {/* Bottom Wind Wave */}
        <motion.path
          d="M32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64z"
          fill="currentColor"
          style={{
            color: isHovered ? "#38bdf8" : "var(--foreground)",
            transition: "color 0.2s ease",
          }}
          animate={
            isHovered
              ? {
                  x: [0, 4.5, -1.5, 0],
                  y: [0, 1, -1, 0],
                }
              : { x: 0, y: 0 }
          }
          transition={{
            duration: 1.1,
            repeat: isHovered ? Infinity : 0,
            delay: 0.1,
            ease: "easeInOut",
          }}
        />

        {/* Dynamic Air Stream Trail Particles */}
        <motion.circle
          cx="120"
          cy="32"
          r="4"
          fill="#38bdf8"
          animate={
            isHovered
              ? {
                  x: [0, 8, 16],
                  opacity: [0, 0.9, 0],
                  scale: [0.6, 1.2, 0.4],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: 0.85,
            repeat: isHovered ? Infinity : 0,
            ease: "easeOut",
          }}
        />
        <motion.circle
          cx="88"
          cy="74"
          r="3"
          fill="#38bdf8"
          animate={
            isHovered
              ? {
                  x: [0, 7, 14],
                  opacity: [0, 0.8, 0],
                  scale: [0.5, 1, 0.3],
                }
              : { opacity: 0 }
          }
          transition={{
            duration: 0.85,
            repeat: isHovered ? Infinity : 0,
            delay: 0.18,
            ease: "easeOut",
          }}
        />
      </svg>
    </motion.div>
  );
}
