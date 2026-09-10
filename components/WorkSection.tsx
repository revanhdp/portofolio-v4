"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { works } from "@/lib/data";

interface WorkItemProps {
  work: (typeof works)[0];
  index: number;
}

function WorkItem({ work, index }: WorkItemProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        style={{
          width: "100%",
          textAlign: "left",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "10px 0",
          background: "none",
          border: "none",
          borderRadius: 0,
          cursor: "pointer",
          font: "inherit",
          letterSpacing: "inherit",
          color: "inherit",
          borderBottom: expanded ? "none" : "1px solid var(--border)",
        }}
      >
        {/* Company logo badge */}
        <div
          style={{
            width: "26px",
            height: "26px",
            borderRadius: "6px",
            backgroundColor: work.logoColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "11px",
            fontWeight: 600,
            flexShrink: 0,
            letterSpacing: "0",
          }}
          aria-hidden="true"
        >
          {work.logo}
        </div>

        {/* Company name + period */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "14px", fontWeight: 500 }}>
            {work.company}
          </span>
          <span style={{ fontSize: "13px", color: "var(--muted)" }}>
            {work.period}
          </span>
        </div>

        {/* Chevron — rotates when expanded */}
        <motion.div
          animate={{ rotate: expanded ? 90 : 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          style={{ color: "var(--muted)", flexShrink: 0 }}
        >
          <ChevronRight size={14} strokeWidth={1.5} />
        </motion.div>
      </button>

      {/* Expanded sub-items */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ borderBottom: "1px solid var(--border)" }}>
              {work.projects.map((project, i) => (
                <div
                  key={project.name}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 0 8px 36px",
                    borderBottom:
                      i < work.projects.length - 1
                        ? "1px solid var(--border)"
                        : "none",
                    gap: "16px",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ fontSize: "13px" }}>{project.icon}</span>
                    <span style={{ fontSize: "13px", fontWeight: 500 }}>
                      {project.name}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      color: "var(--muted)",
                      flexShrink: 0,
                      textAlign: "right",
                    }}
                  >
                    {project.description}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function WorkSection() {
  return (
    <section>
      <p
        style={{
          fontSize: "14px",
          color: "var(--muted)",
          marginBottom: "8px",
        }}
      >
        Work
      </p>
      <div>
        {works.map((work, index) => (
          <WorkItem key={work.id} work={work} index={index} />
        ))}
      </div>
    </section>
  );
}
