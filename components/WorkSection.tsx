"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { works } from "@/lib/data";
import { linkSound, playCollapse, playExpand, playHover } from "@/lib/sound";
import WorkProjectRow from "@/components/WorkProjectRow";
import CompanyBadge from "@/components/CompanyBadge";

// The home list stays a preview — the rest lives on /work.
const PREVIEW_COUNT = 3;

interface WorkItemProps {
  work: (typeof works)[0];
}

function WorkItem({ work }: WorkItemProps) {
  const [expanded, setExpanded] = useState(false);

  const toggle = () => {
    if (expanded) playCollapse();
    else playExpand();
    setExpanded(!expanded);
  };

  return (
    <div>
      <button
        onClick={toggle}
        onMouseEnter={playHover}
        aria-expanded={expanded}
        className="row-hover"
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
        <CompanyBadge company={work.company} logo={work.logo} />

        {/* Company name + period */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "15px", fontWeight: 500 }}>
            {work.company}
          </span>
          <span style={{ fontSize: "14px", color: "var(--muted)" }}>
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
            style={{
              overflow: "hidden",
              marginInline: "-10px",
              paddingInline: "10px",
            }}
          >
            {/* Sub-items share the row's left edge — the icon sits in the
                same 26px column as the company badge, so the names line up
                with the company name. No indent, no inner hairlines. */}
            <div
              style={{
                borderBottom: "1px solid var(--border)",
                paddingBottom: "6px",
              }}
            >
              {work.projects.map((project) => (
                <WorkProjectRow key={project.name} project={project} />
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
      {/* Label row doubles as the entry point to the full history */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "12px",
          marginBottom: "8px",
        }}
      >
        <p style={{ fontSize: "14px", color: "var(--muted)" }}>Work</p>
        <Link
          href="/work"
          {...linkSound}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "5px",
            fontSize: "13px",
            color: "var(--muted)",
            textDecoration: "none",
          }}
          className="hover-foreground"
        >
          <span>All work</span>
          <ArrowRight size={12} strokeWidth={1.75} />
        </Link>
      </div>
      <div>
        {works.slice(0, PREVIEW_COUNT).map((work) => (
          <WorkItem key={work.id} work={work} />
        ))}
      </div>
    </section>
  );
}
