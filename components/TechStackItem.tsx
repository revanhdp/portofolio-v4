"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useTheme } from "next-themes";
import { TECH_ICONS, defaultTechIcon } from "@/components/techIconsRegistry";
import { playHover, triggerHaptic } from "@/lib/sound";

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

  const handleClick = () => {
    triggerHaptic("medium");
    handleMouseEnter();
    // On touch devices (or mobile tap), auto-settle the wobble after it completes
    if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
      setTimeout(() => {
        setIsHovered(false);
      }, 700);
    }
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
          whileTap={{ scale: 0.92 }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onFocus={handleMouseEnter}
          onBlur={handleMouseLeave}
          tabIndex={0}
          role="button"
          aria-label={`${name}${note ? `: ${note}` : ""}`}
          onClick={handleClick}
          className="relative inline-flex items-center justify-center cursor-pointer select-none p-0 border-0 outline-none bg-transparent w-[52px] h-[52px] sm:w-[58px] sm:h-[58px]"
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "16px",
            // Strictly NO BORDER and NO BACKGROUND difference on hover
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            boxShadow: "none",
            cursor: "pointer",
            userSelect: "none",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          {/* Interactive wobbling & enlarging icon ('membesar dan goyang') */}
          <motion.div
            animate={
              isHovered
                ? {
                    scale: [1, 1.28, 1.22, 1.25],
                    rotate: [0, -16, 14, -10, 8, -4, 0],
                  }
                : {
                    scale: 1,
                    rotate: 0,
                  }
            }
            transition={
              isHovered
                ? {
                    scale: {
                      duration: 0.35,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                    rotate: {
                      duration: 0.6,
                      ease: [0.36, 0.07, 0.19, 0.97],
                    },
                  }
                : {
                    scale: { duration: 0.2, ease: "easeOut" },
                    rotate: { duration: 0.2, ease: "easeOut" },
                  }
            }
            style={{
              position: "relative",
              zIndex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transformOrigin: "center center",
            }}
          >
            {/* Authentic full-color iconic SVG logo or custom SVG vector */}
            {iconSource ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={iconSource}
                alt={name}
                loading="lazy"
                decoding="async"
                className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] object-contain pointer-events-none"
                style={{
                  filter: needsInvert ? "invert(1)" : "none",
                  pointerEvents: "none",
                }}
              />
            ) : iconMeta.renderIcon ? (
              <div
                className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] flex items-center justify-center pointer-events-none"
                style={{ pointerEvents: "none" }}
              >
                {iconMeta.renderIcon(
                  isDark ? iconMeta.darkColor || iconMeta.color : iconMeta.color
                )}
              </div>
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={defaultTechIcon.iconSrc}
                alt={name}
                className="w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] object-contain pointer-events-none"
              />
            )}
          </motion.div>
        </motion.div>
      </Tooltip.Trigger>

      {/* Floating tooltip with name and note */}
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          sideOffset={8}
          className="z-50 hidden sm:block"
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
