"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useTheme } from "next-themes";
import { TECH_ICONS, defaultTechIcon } from "@/components/techIconsRegistry";
import { playHover } from "@/lib/sound";

export interface TechStackItemProps {
  name: string;
  note?: string;
  index?: number;
  onHover?: (name: string, note?: string) => void;
  onLeave?: () => void;
}

export default function TechStackItem({
  name,
  note,
  index = 0,
  onHover,
  onLeave,
}: TechStackItemProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isHovered, setIsHovered] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;
  const iconMeta = TECH_ICONS[name] || defaultTechIcon;

  // Resolve icon source according to theme
  const iconSource =
    isDark && iconMeta.darkIconSrc ? iconMeta.darkIconSrc : iconMeta.iconSrc;

  // For Express and Vercel, invert black SVG to white in dark mode
  const needsInvert = isDark && (name === "Vercel" || name === "Express");

  const handleMouseEnter = () => {
    setIsHovered(true);
    playHover();
    if (onHover) onHover(name, note);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (onLeave) onLeave();
  };

  return (
    <Tooltip.Root delayDuration={120}>
      <Tooltip.Trigger asChild>
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: index * 0.03,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          whileHover={{
            y: -4,
            transition: { duration: 0.2, ease: "easeOut" },
          }}
          whileTap={{ scale: 0.92 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          tabIndex={0}
          role="button"
          aria-label={`${name}${note ? `: ${note}` : ""}`}
          style={{
            position: "relative",
            width: "58px",
            height: "58px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "16px",
            // Strictly NO BORDER - borderless floating icon aesthetic
            border: "none",
            outline: "none",
            backgroundColor: isHovered
              ? isDark
                ? "rgba(255, 255, 255, 0.07)"
                : "rgba(0, 0, 0, 0.04)"
              : "transparent",
            boxShadow: isHovered
              ? `0 12px 28px -6px ${iconMeta.glow}`
              : "none",
            cursor: "pointer",
            userSelect: "none",
            transition:
              "background-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease",
          }}
        >
          {/* Soft ambient brand aura on hover (borderless) */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1.1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "absolute",
                inset: "2px",
                borderRadius: "16px",
                background: `radial-gradient(circle, ${iconMeta.glow} 0%, transparent 70%)`,
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
          )}

          {/* Interactive wobbling / swaying icon ('bergoyang' on hover) */}
          <motion.div
            animate={
              isHovered
                ? {
                    rotate: [0, -18, 16, -12, 10, -5, 2, 0],
                    scale: [1, 1.2, 1.12, 1.16, 1.14],
                  }
                : {
                    rotate: 0,
                    scale: 1,
                  }
            }
            transition={{
              rotate: {
                duration: 0.65,
                ease: [0.36, 0.07, 0.19, 0.97],
              },
              scale: {
                duration: 0.3,
                ease: "easeOut",
              },
            }}
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "38px",
              height: "38px",
              transformOrigin: "center 75%",
            }}
          >
            {/* Authentic full-color iconic SVG logo */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={iconSource}
              alt={name}
              width={38}
              height={38}
              loading="lazy"
              decoding="async"
              style={{
                width: "38px",
                height: "38px",
                objectFit: "contain",
                filter: needsInvert
                  ? "invert(1)"
                  : isHovered
                  ? `drop-shadow(0 4px 10px ${iconMeta.glow})`
                  : "none",
                transition: "filter 0.25s ease",
                pointerEvents: "none",
              }}
            />
          </motion.div>
        </motion.div>
      </Tooltip.Trigger>

      {/* Floating tooltip with name and note */}
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={8}
          className="z-50"
          style={{
            backgroundColor: isDark ? "#18181b" : "#ffffff",
            color: isDark ? "#f4f4f5" : "#18181b",
            borderRadius: "10px",
            padding: "6px 12px",
            boxShadow:
              "0 12px 30px -4px rgba(0, 0, 0, 0.28), 0 4px 12px -2px rgba(0, 0, 0, 0.12)",
            fontSize: "12px",
            lineHeight: 1.35,
            maxWidth: "240px",
            textAlign: "center",
            pointerEvents: "none",
            animation: "tooltipFade 0.15s ease-out",
            border: "none",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: "13px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              color: isDark ? "#ffffff" : "#09090b",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: iconMeta.color,
              }}
            />
            {name}
          </div>
          {note && (
            <div
              style={{
                fontSize: "11.5px",
                color: "var(--muted)",
                marginTop: "3px",
                fontWeight: 400,
              }}
            >
              {note}
            </div>
          )}
          <Tooltip.Arrow
            style={{
              fill: isDark ? "#18181b" : "#ffffff",
            }}
          />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}
