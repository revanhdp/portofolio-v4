"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { playHandFold, playHandUnfurl } from "@/lib/sound";

// Peace Hand paths from arikko.dev:
const u =
  "M345.995 520.082C326.495 448.416 286.595 284.382 282.995 201.582C278.495 98.0823 298.995 27.5823 400.995 18.5823C502.995 9.58233 525.495 105.082 519.495 268.582L512 599.498";
const p =
  "M722.995 590.582C764.995 480.082 784.118 425.391 807.995 368.582C863.495 212.582 891.419 199.468 882.995 137.082C866.995 18.5825 734.995 47.0822 695.995 74.0822C656.995 101.082 625.495 131.082 580.995 327.082L525 605.498";
const x =
  "M435.496 1005.09C397.495 943.589 412.996 841.089 495.996 789.089M601.496 767.089C560.996 783.589 458.696 803.389 373.496 750.589C266.996 684.589 311.495 586.589 373.496 588.589C435.496 590.589 452.022 623.363 590.496 592.585C653.496 578.582 843.496 573.586 849.496 789.089C854.911 983.582 609.495 1150.59 373.496 1113.59C184.696 1083.99 118.496 946.589 108.996 881.589";
const g =
  "M218.495 831.08C204.662 855.746 162.195 897.68 102.995 868.08C28.9951 831.08 22.4952 772.08 18.4952 716.58C14.4952 661.08 33.9954 580.081 102.995 562.58C136.662 554.04 164.328 572.246 173.495 580.08M412.995 772.582C411.329 801.248 391.995 858.182 327.995 856.582C247.995 854.582 186.495 838.578 165.495 716.58C144.495 594.581 194.995 513.081 277.995 506.081C344.395 500.481 386.329 559.081 398.995 589.081";
const L =
  "M134.995 398.082C100.995 365.082 53.372 332.22 70.372 379.22C81.372 411.22 124.372 442.22 160.372 452.22C176.372 414.22 193.372 366.22 171.372 339.22C161.372 327.22 143.995 388.082 134.995 398.082Z";

// Peace Sign Hand Component
function PeaceHand() {
  return (
    <svg
      width="903"
      height="1137"
      viewBox="0 0 903 1137"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Peace victory sign"
      role="img"
      style={{
        width: "auto",
        height: "34px",
        overflow: "visible",
      }}
    >
      <path d={u} stroke="var(--foreground)" strokeWidth={52} strokeLinecap="round" />
      <path d={p} stroke="var(--foreground)" strokeWidth={52} strokeLinecap="round" />
      <path d={x} stroke="var(--foreground)" strokeWidth={52} strokeLinecap="round" />
      <path d={g} stroke="var(--foreground)" strokeWidth={52} strokeLinecap="round" />
      <path
        d={L}
        fill="#dc2626"
        stroke="#dc2626"
        strokeWidth={54}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Active Waving Hand Component
function WavingHand({ isHovered }: { isHovered: boolean }) {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.85"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label="Lambaian tangan bergerak"
      role="img"
      style={{ overflow: "visible", color: "var(--foreground)" }}
    >
      <motion.g
        style={{
          transformOrigin: "14px 21px",
        }}
        animate={
          isHovered
            ? {
                rotate: [0, 18, -12, 18, -8, 14, 0],
              }
            : { rotate: 0 }
        }
        transition={{
          duration: 0.95,
          ease: "easeInOut",
          repeat: Infinity,
          repeatDelay: 0.1,
        }}
      >
        {/* Open 5-finger palm */}
        <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
        <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />

        {/* Red heart accent at wrist matching the peace hand */}
        <path
          d="M4.5 17.5C3.8 16.5 2.6 17 2.2 17.8C1.8 18.6 2.4 19.5 3.5 20.2C4.5 21 5.2 21.2 5.5 21C5.8 20.8 5.6 19.8 5.2 19C4.8 18.2 4.6 17.7 4.5 17.5Z"
          fill="#dc2626"
          stroke="#dc2626"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Waving breeze lines for dynamic feel */}
        <motion.path
          d="M22.5 4.5C23.8 6 23.8 8 22.5 9.5"
          stroke="var(--muted)"
          strokeWidth="1.5"
          animate={isHovered ? { opacity: [0.2, 0.95, 0.2] } : { opacity: 0 }}
          transition={{ duration: 0.95, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M24.5 2.5C26.5 5 26.5 9 24.5 11.5"
          stroke="var(--muted)"
          strokeWidth="1.5"
          animate={isHovered ? { opacity: [0.1, 0.8, 0.1] } : { opacity: 0 }}
          transition={{ duration: 0.95, delay: 0.1, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.g>
    </svg>
  );
}

export default function VictoryHand() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHandUnfurl();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    playHandFold();
  };

  const handleClick = () => {
    setIsHovered((prev) => {
      const next = !prev;
      if (next) playHandUnfurl();
      else playHandFold();
      return next;
    });
  };

  return (
    <motion.div
      id="interactive-hand-icon"
      data-testid="interactive-hand"
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "38px",
        height: "38px",
        cursor: "pointer",
        lineHeight: 0,
        marginBottom: "8px",
        userSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      role="button"
      tabIndex={0}
      aria-label={
        isHovered
          ? "Lambaian tangan bergerak (aktif)"
          : "Icon tangan damai (hover untuk melambaikan tangan)"
      }
    >
      {/* 1. Default Peace Hand (fades out smoothly on hover) */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
        animate={{
          opacity: isHovered ? 0 : 1,
          scale: isHovered ? 0.8 : 1,
          rotate: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <PeaceHand />
      </motion.div>

      {/* 2. Active Waving Hand (fades in and actively waves on hover) */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
          rotate: isHovered ? 0 : 8,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <WavingHand isHovered={isHovered} />
      </motion.div>
    </motion.div>
  );
}
