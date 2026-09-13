"use client";

import { motion } from "framer-motion";
import {
  Database,
  LayoutTemplate,
  Server,
  Terminal,
} from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { stack, type StackCategory } from "@/lib/data";
import { hoverSound } from "@/lib/sound";

// Data stays serializable — icon keys are mapped to components here.
const icons = {
  frontend: LayoutTemplate,
  backend: Server,
  database: Database,
  tooling: Terminal,
} as const;

interface StackRowProps {
  item: StackCategory["items"][0];
  index: number;
}

function StackRow({ item, index }: StackRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      {...hoverSound}
      className="row-hover"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid var(--border)",
        gap: "16px",
      }}
    >
      {/* Left: name */}
      <span
        style={{
          fontSize: "14px",
          fontWeight: 400,
          color: "var(--foreground)",
          flexShrink: 0,
        }}
      >
        {item.name}
      </span>

      {/* Right: note */}
      <span
        style={{
          fontSize: "13px",
          color: "var(--muted)",
          textAlign: "right",
          maxWidth: "min(240px, 50%)",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item.note}
      </span>
    </motion.div>
  );
}

interface StackGroupProps {
  category: StackCategory;
  /** Running row count, so the stagger flows across the whole page. */
  offset: number;
}

function StackGroup({ category, offset }: StackGroupProps) {
  const Icon = icons[category.icon];

  return (
    <section style={{ marginTop: "32px" }}>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: offset * 0.04 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "7px",
          marginBottom: "4px",
        }}
      >
        <span
          style={{ color: "var(--muted)", display: "flex" }}
          aria-hidden="true"
        >
          <Icon size={13} strokeWidth={1.75} />
        </span>
        <h2
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "var(--foreground)",
          }}
        >
          {category.label}
        </h2>
      </motion.div>

      {category.items.map((item, index) => (
        <StackRow key={item.name} item={item} index={offset + index + 1} />
      ))}
    </section>
  );
}

export default function StackPage() {
  // Each group consumes one delay slot for its heading plus one per row,
  // so the stagger keeps flowing across group boundaries.
  const groups = stack.map((category, i) => ({
    category,
    offset: stack
      .slice(0, i)
      .reduce((total, prev) => total + prev.items.length + 1, 0),
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
          Stack
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "var(--muted)",
            marginTop: "2px",
          }}
        >
          The languages, frameworks, and tools I reach for day to day — chosen
          for the boring reason that they hold up well in{" "}
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              color: "var(--foreground)",
            }}
          >
            production
          </em>
          .
        </p>
      </div>

      {groups.map(({ category, offset }) => (
        <StackGroup key={category.id} category={category} offset={offset} />
      ))}
    </PageWrapper>
  );
}
