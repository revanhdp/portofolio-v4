"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface InlineExpandProps {
  summary: React.ReactNode;
  detail: React.ReactNode;
}

export function InlineExpand({ summary, detail }: InlineExpandProps) {
  const [expanded, setExpanded] = useState(false);
  const toggle = useCallback(() => setExpanded((v) => !v), []);

  if (expanded) {
    return (
      <AnimatePresence mode="wait">
        <motion.span
          key="detail"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
          style={{ display: "inline" }}
        >
          {detail}
          <button onClick={toggle} className="link-dotted">
            (less)
          </button>
        </motion.span>
      </AnimatePresence>
    );
  }

  return (
    <button onClick={toggle} className="link-dotted">
      {summary}
    </button>
  );
}
