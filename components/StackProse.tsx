"use client";

import { useState, useSyncExternalStore } from "react";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import * as Tooltip from "@radix-ui/react-tooltip";
import { TECH_ICONS, defaultTechIcon } from "@/components/techIconsRegistry";
import type { StackCategory } from "@/lib/data";
import { useLanguage } from "@/lib/i18n";
import { playHover, triggerHaptic } from "@/lib/sound";

/* The stack written as sentences instead of a list: each category is a
   short paragraph, every tool a name with a small logo in front of it.
   The note behind a tool shows on hover or tap. The sentence is built
   from the stored data, so editing the stack in admin still works.     */

const noopSubscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(noopSubscribe, () => true, () => false);

type Item = StackCategory["items"][number];

function iconSource(item: Item, isDark: boolean) {
  const meta = TECH_ICONS[item.name] ?? defaultTechIcon;
  const custom = !!item.icon;
  // A custom icon replaces the built-in one, including its dark variant
  const src = custom
    ? isDark && item.iconDark
      ? item.iconDark
      : item.icon
    : isDark && meta.darkIconSrc
      ? meta.darkIconSrc
      : meta.iconSrc;
  const invert =
    !custom && isDark && (item.name === "Vercel" || item.name === "Express");
  return { src, invert, meta };
}

function Tool({
  item,
  isDark,
  open,
  onOpenChange,
}: {
  item: Item;
  isDark: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { src, invert, meta } = iconSource(item, isDark);

  const chip = (
    <button
      type="button"
      className="stack-chip"
      aria-label={item.note ? `${item.name}: ${item.note}` : item.name}
      onMouseEnter={playHover}
      onClick={() => {
        triggerHaptic("light");
        onOpenChange(!open);
      }}
    >
      {src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt=""
          width={15}
          height={15}
          loading="lazy"
          decoding="async"
          className="stack-chip-icon"
          style={{ filter: invert ? "invert(1)" : undefined }}
        />
      ) : meta.renderIcon ? (
        <span
          className="stack-chip-icon"
          style={{ display: "inline-flex", verticalAlign: "-2.5px" }}
        >
          {meta.renderIcon(isDark ? meta.darkColor || meta.color : meta.color)}
        </span>
      ) : null}
      {item.name}
    </button>
  );

  if (!item.note) return chip;

  return (
    <Tooltip.Root open={open} onOpenChange={onOpenChange} delayDuration={80}>
      <Tooltip.Trigger asChild>{chip}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={6}
          className="z-50"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: "5px 10px",
            fontSize: 12.5,
            lineHeight: 1.4,
            maxWidth: 240,
            textAlign: "center",
            pointerEvents: "none",
            boxShadow: "0 6px 20px -6px rgba(0, 0, 0, 0.14)",
            animation: "tooltipFade 0.15s ease-out",
          }}
        >
          {item.note}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

export default function StackProse({ stack }: { stack: StackCategory[] }) {
  const { lang } = useLanguage();
  const mounted = useMounted();
  const { resolvedTheme } = useTheme();
  const isDark = mounted && resolvedTheme === "dark";
  const [active, setActive] = useState<string | null>(null);
  // "A, B, and C" in English, "A, B, dan C" in Indonesian
  const list = new Intl.ListFormat(lang, { style: "long", type: "conjunction" });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "26px" }}>
      {stack.map((category, i) => {
        const parts = list.formatToParts(category.items.map((_, n) => String(n)));
        return (
          <motion.section
            key={category.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.06 }}
          >
            <h2
              style={{
                fontSize: "13px",
                fontWeight: 430,
                color: "var(--muted)",
                marginBottom: "2px",
              }}
            >
              {category.label}
            </h2>
            <p
              style={{
                fontSize: "15px",
                lineHeight: 1.85,
                color: "var(--muted)",
              }}
            >
              {parts.map((part, n) => {
                if (part.type === "literal") return part.value;
                const item = category.items[Number(part.value)];
                const id = `${category.id}:${item.name}`;
                return (
                  <Tool
                    key={n}
                    item={item}
                    isDark={isDark}
                    open={active === id}
                    onOpenChange={(o) => setActive(o ? id : null)}
                  />
                );
              })}
              .
            </p>
          </motion.section>
        );
      })}
    </div>
  );
}
