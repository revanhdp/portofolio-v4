"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function SoundToggle() {
  const [soundOn, setSoundOn] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const next = !soundOn;
    setSoundOn(next);

    if (next && mounted) {
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(880, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
      } catch (_) {}
    }
  };

  if (!mounted) return null;

  return (
    <motion.button
      onClick={handleToggle}
      whileTap={{ scale: 0.96 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "13px",
        color: "var(--muted)",
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        marginTop: "20px",
        font: "inherit",
        letterSpacing: "inherit",
        transition: "color 0.15s",
      }}
      className="hover:text-zinc-900"
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
