"use client";

import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import WorkProjectRow from "@/components/WorkProjectRow";
import { works, type WorkExperience } from "@/lib/data";
import { playHover } from "@/lib/sound";

interface WorkEntryProps {
  work: WorkExperience;
  /** Running row count, so the stagger flows across the whole page. */
  offset: number;
}

function WorkEntry({ work, offset }: WorkEntryProps) {
  return (
    <section style={{ marginTop: "32px" }}>
      {/* Header — badge in the icon column, so the company name and every
          project label below it share one text column at 36px. */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: offset * 0.04 }}
        onMouseEnter={playHover}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "10px",
          paddingBottom: "8px",
        }}
      >
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

        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: "12px",
            }}
          >
            <h2
              style={{
                fontSize: "15px",
                fontWeight: 500,
                color: "var(--foreground)",
              }}
            >
              {work.company}
            </h2>
            <span
              style={{
                fontSize: "13px",
                color: "var(--muted)",
                flexShrink: 0,
              }}
            >
              {work.period}
            </span>
          </div>
          {/* The role — the detail the home preview leaves out */}
          <p style={{ fontSize: "13px", color: "var(--muted)" }}>{work.role}</p>
        </div>
      </motion.div>

      {work.projects.map((project, index) => (
        <motion.div
          key={project.name}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: (offset + index + 1) * 0.04 }}
        >
          <WorkProjectRow project={project} divider />
        </motion.div>
      ))}
    </section>
  );
}

export default function WorkPage() {
  // Each entry consumes one delay slot for its header plus one per project,
  // so the stagger keeps flowing across entry boundaries.
  const entries = works.map((work, i) => ({
    work,
    offset: works
      .slice(0, i)
      .reduce((total, prev) => total + prev.projects.length + 1, 0),
  }));

  return (
    <PageWrapper showBack>
      {/* Header */}
      <div>
        <h1
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "var(--foreground)",
          }}
        >
          Work
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "var(--muted)",
            marginTop: "2px",
          }}
        >
          The full account of where I&apos;ve worked — the role I held, and the
          platforms I actually{" "}
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              color: "var(--foreground)",
            }}
          >
            shipped
          </em>{" "}
          there.
        </p>
      </div>

      {entries.map(({ work, offset }) => (
        <WorkEntry key={work.id} work={work} offset={offset} />
      ))}
    </PageWrapper>
  );
}
