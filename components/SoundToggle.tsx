"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  isSoundEnabled,
  playHover,
  playSoundOff,
  playSoundOn,
  setSoundEnabled,
} from "@/lib/sound";

export default function SoundToggle() {
  const [soundOn, setSoundOn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
    setMounted(true);

    const handleSoundChange = () => {
      setSoundOn(isSoundEnabled());
    };
    window.addEventListener("porto:sound-change", handleSoundChange);
    return () => window.removeEventListener("porto:sound-change", handleSoundChange);
  }, []);

  const handleToggle = () => {
    const next = !soundOn;

    // Both cues bypass the enabled-gate: turning sound on has to be
    // audible, and turning it off has to be heard before it stops.
    if (next) playSoundOn();
    else playSoundOff();

    setSoundOn(next);
    setSoundEnabled(next);
  };

  if (!mounted) return null;

  return (
    <motion.button
      onClick={handleToggle}
      onMouseEnter={playHover}
      whileTap={{ scale: 0.96 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "13px",
        color: "var(--muted)",
        background: "none",
        border: "none",
        padding: "6px 0",
        touchAction: "manipulation",
        cursor: "pointer",
        marginTop: "16px",
        font: "inherit",
        letterSpacing: "inherit",
        transition: "color 0.15s",
      }}
      className="hover-foreground"
      aria-label={soundOn ? "Turn sound off" : "Turn sound on"}
    >
      {/* Speaker icon SVG */}
      <motion.span
        key={soundOn ? "on" : "off"}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.12 }}
        style={{ display: "flex", alignItems: "center" }}
      >
        {soundOn ? (
          // Speaker with waves
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
          </svg>
        ) : (
          // Speaker muted
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}
      </motion.span>
      <span>{soundOn ? "Sound on" : "Sound off"}</span>
    </motion.button>
  );
}
