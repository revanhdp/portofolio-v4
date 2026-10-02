"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import {
  Database,
  LayoutTemplate,
  Server,
  Terminal,
  Sparkles,
  Layers,
} from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import TechStackItem from "@/components/TechStackItem";
import { TECH_ICONS } from "@/components/techIconsRegistry";
import { stack, type StackCategory } from "@/lib/data";
import { playHover, playExpand } from "@/lib/sound";

const categoryIcons = {
  frontend: LayoutTemplate,
  backend: Server,
  database: Database,
  tooling: Terminal,
} as const;

export default function StackPage() {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [activeTech, setActiveTech] = useState<{
    name: string;
    note?: string;
  } | null>(null);

  const filterTabs = [
    { id: "all", label: "All" },
    ...stack.map((c) => ({ id: c.id, label: c.label })),
  ];

  const visibleCategories =
    selectedFilter === "all"
      ? stack
      : stack.filter((c) => c.id === selectedFilter);

  // Active tech icon metadata if hovered
  const activeMeta = activeTech ? TECH_ICONS[activeTech.name] : null;

  return (
    <Tooltip.Provider delayDuration={120} skipDelayDuration={300}>
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

        {/* ── Category Filter Tabs (Horizontal) ── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginTop: "24px",
            overflowX: "auto",
            paddingBottom: "4px",
            scrollbarWidth: "none",
          }}
        >
          {filterTabs.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  playExpand();
                  setSelectedFilter(tab.id);
                }}
                onMouseEnter={playHover}
                style={{
                  padding: "5px 12px",
                  borderRadius: "9999px",
                  fontSize: "13px",
                  fontWeight: isActive ? 500 : 400,
                  color: isActive ? "var(--foreground)" : "var(--muted)",
                  backgroundColor: isActive
                    ? "var(--card)"
                    : "transparent",
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  transition:
                    "color 0.15s ease, background-color 0.15s ease",
                  whiteSpace: "nowrap",
                  userSelect: "none",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </motion.div>

        {/* ── Interactive Live Spotlight Display Bar (Borderless) ── */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{
            marginTop: "16px",
            padding: "11px 16px",
            borderRadius: "14px",
            backgroundColor: "var(--card)",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            minHeight: "44px",
          }}
        >
          <AnimatePresence mode="wait">
            {activeTech ? (
              <motion.div
                key={activeTech.name}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 6 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  width: "100%",
                  fontSize: "13px",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: activeMeta?.color || "var(--foreground)",
                    boxShadow: `0 0 8px ${activeMeta?.color || "var(--muted)"}`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontWeight: 550,
                    color: "var(--foreground)",
                  }}
                >
                  {activeTech.name}
                </span>
                {activeTech.note && (
                  <>
                    <span style={{ color: "var(--muted)", opacity: 0.5 }}>•</span>
                    <span
                      style={{
                        color: "var(--muted)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {activeTech.note}
                    </span>
                  </>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--muted)",
                  fontSize: "13px",
                }}
              >
                <Sparkles size={13} strokeWidth={1.75} style={{ opacity: 0.7 }} />
                <span>Hover or tap any icon to explore details & role</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Horizontal Stack Shelves (Side-by-Side) ── */}
        <div style={{ marginTop: "28px", display: "flex", flexDirection: "column", gap: "28px" }}>
          {visibleCategories.map((category, catIndex) => {
            const Icon = categoryIcons[category.icon] || Layers;
            return (
              <section key={category.id}>
                {/* Category Heading */}
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: catIndex * 0.05 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    style={{ color: "var(--muted)", display: "flex" }}
                    aria-hidden="true"
                  >
                    <Icon size={14} strokeWidth={1.75} />
                  </span>
                  <h2
                    style={{
                      fontSize: "14px",
                      fontWeight: 500,
                      color: "var(--foreground)",
                    }}
                  >
                    {category.label}
                  </h2>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "var(--muted)",
                      marginLeft: "auto",
                      fontWeight: 400,
                    }}
                  >
                    {category.items.length} tools
                  </span>
                </motion.div>

                {/* Horizontal row of interactive wobbling icons (menyamping kanan/kiri) */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {category.items.map((item, itemIndex) => (
                    <TechStackItem
                      key={item.name}
                      name={item.name}
                      note={item.note}
                      index={catIndex * 5 + itemIndex}
                      onHover={(name, note) => setActiveTech({ name, note })}
                      onLeave={() => setActiveTech(null)}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </PageWrapper>
    </Tooltip.Provider>
  );
}
