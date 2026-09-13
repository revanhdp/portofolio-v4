"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playHover, playThemeSwitch } from "@/lib/sound";

// Clean Sun Icon: pure warm golden yellow
function SunIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#eab308"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Central solar disc */}
      <circle cx="12" cy="12" r="4.2" fill="rgba(234, 179, 8, 0.2)" />
      {/* 4 cardinal ticks */}
      <line x1="12" y1="2" x2="12" y2="4.5" />
      <line x1="12" y1="19.5" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4.5" y2="12" />
      <line x1="19.5" y1="12" x2="22" y2="12" />
      {/* 4 diagonal celestial dots */}
      <circle cx="6.5" cy="6.5" r="0.9" fill="#eab308" stroke="none" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="#eab308" stroke="none" />
      <circle cx="17.5" cy="17.5" r="0.9" fill="#eab308" stroke="none" />
      <circle cx="6.5" cy="17.5" r="0.9" fill="#eab308" stroke="none" />
    </svg>
  );
}

// Clean Moon Icon: celestial cool blue
function MoonIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#60a5fa"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Crescent */}
      <path
        d="M19 13.5A8.5 8.5 0 1 1 10.5 5a6.8 6.8 0 0 0 8.5 8.5z"
        fill="rgba(96, 165, 250, 0.2)"
      />
      {/* Micro star */}
      <path
        d="M17.5 3.2C17.5 4.5 16.5 5.5 15.2 5.5C16.5 5.5 17.5 6.5 17.5 7.8C17.5 6.5 18.5 5.5 19.8 5.5C18.5 5.5 17.5 4.5 17.5 3.2Z"
        fill="#93c5fd"
        stroke="none"
      />
    </svg>
  );
}

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="theme-toggle-btn"
        style={{ width: "32px", height: "32px" }}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    playThemeSwitch(!isDark);
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      onMouseEnter={playHover}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.9 }}
      className="theme-toggle-btn"
      style={{
        position: "fixed",
        width: "32px",
        height: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "none",
        outline: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        padding: 0,
        zIndex: 50,
      }}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isDark ? <MoonIcon size={17} /> : <SunIcon size={17} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
