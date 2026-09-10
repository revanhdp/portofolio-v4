"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playHover, playThemeSwitch } from "@/lib/sound";

// Custom Non-Generic Minimal Sun Icon (Astrolabe / Solar Corona)
// Clean central solar disc with 4 precision cardinal ticks and 4 diagonal celestial dots
function SunIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Central solar core */}
      <circle cx="12" cy="12" r="4" />
      {/* 4 cardinal precision marks */}
      <line x1="12" y1="2" x2="12" y2="4.5" />
      <line x1="12" y1="19.5" x2="12" y2="22" />
      <line x1="2" y1="12" x2="4.5" y2="12" />
      <line x1="19.5" y1="12" x2="22" y2="12" />
      {/* 4 diagonal celestial dots */}
      <circle cx="6.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="17.5" cy="17.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="6.5" cy="17.5" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Custom Non-Generic Minimal Moon Icon (Celestial Crescent with Sparkle)
// Slender astronomical crescent paired with a delicate 4-point micro star
function MoonIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Sleek astronomical crescent */}
      <path d="M19 13.5A8.5 8.5 0 1 1 10.5 5a6.8 6.8 0 0 0 8.5 8.5z" />
      {/* Delicate 4-point celestial star */}
      <path
        d="M17.5 3.2C17.5 4.5 16.5 5.5 15.2 5.5C16.5 5.5 17.5 6.5 17.5 7.8C17.5 6.5 18.5 5.5 19.8 5.5C18.5 5.5 17.5 4.5 17.5 3.2Z"
        fill="currentColor"
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
        style={{
          width: "30px",
          height: "30px",
        }}
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
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      className="theme-toggle-btn hover-foreground"
      style={{
        width: "30px",
        height: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
        color: "var(--muted)",
        cursor: "pointer",
        padding: 0,
        boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
        transition:
          "color 0.15s ease, background-color 0.25s ease, border-color 0.25s ease, box-shadow 0.2s ease",
      }}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ rotate: -35, opacity: 0, scale: 0.75 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 35, opacity: 0, scale: 0.75 }}
          transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          {isDark ? <MoonIcon size={15} /> : <SunIcon size={15} />}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  );
}
