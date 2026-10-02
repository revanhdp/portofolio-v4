"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playClick, playHover } from "@/lib/sound";

interface InlineExpandProps {
  summary: React.ReactNode;
  detail: React.ReactNode;
}

export function InlineExpand({ summary, detail }: InlineExpandProps) {
  const [expanded, setExpanded] = useState(false);
  const toggle = useCallback(() => {
    playClick();
    setExpanded((v) => !v);
  }, []);

  if (expanded) {
    return (
      <AnimatePresence mode="wait">
        <motion.span
          key="detail"
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          style={{ display: "inline" }}
        >
          {detail}
          <motion.button
            type="button"
            whileTap={{ scale: 0.95 }}
            onClick={toggle}
            onMouseEnter={playHover}
            className="link-dotted"
          >
            (less)
          </motion.button>
        </motion.span>
      </AnimatePresence>
    );
  }

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.95 }}
      onClick={toggle}
      onMouseEnter={playHover}
      className="link-dotted"
    >
      {summary}
    </motion.button>
  );
}
