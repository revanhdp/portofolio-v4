"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface StackMeta {
  colorLight: string;
  colorDark: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
  glow: string;
  icon: (color: string) => React.ReactNode;
}

const stackRegistry: Record<string, StackMeta> = {
  React: {
    colorLight: "#0284c7",
    colorDark: "#38bdf8",
    bgLight: "rgba(14, 165, 233, 0.09)",
    bgDark: "rgba(56, 189, 248, 0.12)",
    borderLight: "rgba(14, 165, 233, 0.28)",
    borderDark: "rgba(56, 189, 248, 0.32)",
    glow: "rgba(56, 189, 248, 0.28)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="-11.5 -10.23174 23 20.46348" fill="none">
        <circle cx="0" cy="0" r="2.05" fill={c} />
        <g stroke={c} strokeWidth="1">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  TypeScript: {
    colorLight: "#1d4ed8",
    colorDark: "#60a5fa",
    bgLight: "rgba(29, 78, 216, 0.09)",
    bgDark: "rgba(96, 165, 250, 0.12)",
    borderLight: "rgba(29, 78, 216, 0.28)",
    borderDark: "rgba(96, 165, 250, 0.32)",
    glow: "rgba(59, 130, 246, 0.28)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill={c} />
        <path
          d="M4 8h8M8 8v10M13 14c1 1 2.2 1.5 3.5 1.5 1.2 0 1.9-.5 1.9-1.2 0-.8-.7-1.1-2.2-1.6-2-.6-3.2-1.4-3.2-2.9C13 8.2 14.5 7 16.6 7c1.3 0 2.4.4 3.4 1l-.9 1.6c-.8-.5-1.6-.8-2.5-.8-1 0-1.6.4-1.6 1 0 .7.6 1 2 1.5 2.1.7 3.4 1.5 3.4 3.1 0 1.8-1.5 3.1-3.9 3.1-1.6 0-3-.5-4-1.3l.5-1.2z"
          fill="#ffffff"
        />
      </svg>
    ),
  },
  "Next.js": {
    colorLight: "#09090b",
    colorDark: "#f4f4f5",
    bgLight: "rgba(0, 0, 0, 0.06)",
    bgDark: "rgba(255, 255, 255, 0.1)",
    borderLight: "rgba(0, 0, 0, 0.2)",
    borderDark: "rgba(255, 255, 255, 0.26)",
    glow: "rgba(255, 255, 255, 0.2)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 180 180" fill="none">
        <circle cx="90" cy="90" r="86" fill="currentColor" fillOpacity="0.1" stroke={c} strokeWidth="8" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill={c}
        />
        <rect x="115" y="54" width="12" height="72" fill={c} />
      </svg>
    ),
  },
  Laravel: {
    colorLight: "#b91c1c",
    colorDark: "#f87171",
    bgLight: "rgba(185, 28, 28, 0.09)",
    bgDark: "rgba(248, 113, 113, 0.12)",
    borderLight: "rgba(185, 28, 28, 0.28)",
    borderDark: "rgba(248, 113, 113, 0.32)",
    glow: "rgba(239, 68, 68, 0.28)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path
          d="M11.5 2.5L3 7.5V16.5L11.5 21.5L20 16.5V7.5L11.5 2.5Z"
          stroke={c}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M11.5 2.5V21.5M3 7.5L20 16.5M20 7.5L3 16.5" stroke={c} strokeWidth="1.5" />
      </svg>
    ),
  },
  "Tailwind CSS": {
    colorLight: "#0e7490",
    colorDark: "#22d3ee",
    bgLight: "rgba(14, 116, 144, 0.09)",
    bgDark: "rgba(34, 211, 238, 0.12)",
    borderLight: "rgba(14, 116, 144, 0.28)",
    borderDark: "rgba(34, 211, 238, 0.32)",
    glow: "rgba(34, 211, 238, 0.28)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 6c-2.7 0-4.4 1.3-5 4 1-1.3 2.2-1.8 3.7-1.3.9.3 1.5 1 2.2 1.7C14 11.5 15.4 13 18.5 13c2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.7 1.3-.9-.3-1.5-1-2.2-1.7C16.5 7.5 15.1 6 12 6zM5.5 13C2.8 13 1.1 14.3.5 17c1-1.3 2.2-1.8 3.7-1.3.9.3 1.5 1 2.2 1.7C7.5 18.5 8.9 20 12 20c2.7 0 4.4-1.3 5-4-1 1.3-2.2 1.8-3.7 1.3-.9-.3-1.5-1-2.2-1.7C10 14.5 8.6 13 5.5 13z"
          fill={c}
        />
      </svg>
    ),
  },
  PostgreSQL: {
    colorLight: "#1d4ed8",
    colorDark: "#60a5fa",
    bgLight: "rgba(29, 78, 216, 0.09)",
    bgDark: "rgba(96, 165, 250, 0.12)",
    borderLight: "rgba(29, 78, 216, 0.28)",
    borderDark: "rgba(96, 165, 250, 0.32)",
    glow: "rgba(59, 130, 246, 0.28)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  MySQL: {
    colorLight: "#0284c7",
    colorDark: "#38bdf8",
    bgLight: "rgba(2, 132, 199, 0.09)",
    bgDark: "rgba(56, 189, 248, 0.12)",
    borderLight: "rgba(2, 132, 199, 0.28)",
    borderDark: "rgba(56, 189, 248, 0.32)",
    glow: "rgba(56, 189, 248, 0.28)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
        <path d="M4 19C4 12 9 6 17 6c1.5 0 3 .4 4 1-1.5 2-4 3-7 3-3 0-5 2-6 5" />
        <circle cx="16" cy="15" r="3" fill={c} fillOpacity="0.3" />
      </svg>
    ),
  },
  "Node.js": {
    colorLight: "#15803d",
    colorDark: "#4ade80",
    bgLight: "rgba(21, 128, 61, 0.09)",
    bgDark: "rgba(74, 222, 128, 0.12)",
    borderLight: "rgba(21, 128, 61, 0.28)",
    borderDark: "rgba(74, 222, 128, 0.32)",
    glow: "rgba(74, 222, 128, 0.28)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
        <path d="M12 2l9 5v10l-9 5-9-5V7l9-5z" />
        <path d="M12 12l9-5M12 12v10M12 12L3 7" strokeWidth="1.4" />
      </svg>
    ),
  },
  Vite: {
    colorLight: "#6d28d9",
    colorDark: "#a78bfa",
    bgLight: "rgba(109, 40, 217, 0.09)",
    bgDark: "rgba(167, 139, 250, 0.12)",
    borderLight: "rgba(109, 40, 217, 0.28)",
    borderDark: "rgba(167, 139, 250, 0.32)",
    glow: "rgba(167, 139, 250, 0.28)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L3 14h8l-2 8 12-13h-8l2-7z" fill={c} />
      </svg>
    ),
  },
  "Alpine.js": {
    colorLight: "#0f766e",
    colorDark: "#2dd4bf",
    bgLight: "rgba(15, 118, 110, 0.09)",
    bgDark: "rgba(45, 212, 191, 0.12)",
    borderLight: "rgba(15, 118, 110, 0.28)",
    borderDark: "rgba(45, 212, 191, 0.32)",
    glow: "rgba(45, 212, 191, 0.28)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <path d="M18 16.5L12 10.5L6 16.5H18Z" fill={c} />
        <path d="M12 7.5L6 13.5H0L9 4.5L12 7.5Z" fill={c} fillOpacity="0.6" />
      </svg>
    ),
  },
  Redis: {
    colorLight: "#b91c1c",
    colorDark: "#f87171",
    bgLight: "rgba(185, 28, 28, 0.09)",
    bgDark: "rgba(248, 113, 113, 0.12)",
    borderLight: "rgba(185, 28, 28, 0.28)",
    borderDark: "rgba(248, 113, 113, 0.32)",
    glow: "rgba(239, 68, 68, 0.28)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
        <path d="M12 2L2 7l10 5 10-5-10-5z" fill={c} fillOpacity="0.2" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  GraphQL: {
    colorLight: "#be185d",
    colorDark: "#f472b6",
    bgLight: "rgba(190, 24, 93, 0.09)",
    bgDark: "rgba(244, 114, 182, 0.12)",
    borderLight: "rgba(190, 24, 93, 0.28)",
    borderDark: "rgba(244, 114, 182, 0.32)",
    glow: "rgba(244, 114, 182, 0.28)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.7">
        <circle cx="12" cy="3" r="2" fill={c} />
        <circle cx="20" cy="8" r="2" fill={c} />
        <circle cx="20" cy="16" r="2" fill={c} />
        <circle cx="12" cy="21" r="2" fill={c} />
        <circle cx="4" cy="16" r="2" fill={c} />
        <circle cx="4" cy="8" r="2" fill={c} />
        <path d="M12 3l8 5v8l-8 5-8-5V8l8-5z" />
      </svg>
    ),
  },
  WebSocket: {
    colorLight: "#0284c7",
    colorDark: "#38bdf8",
    bgLight: "rgba(2, 132, 199, 0.09)",
    bgDark: "rgba(56, 189, 248, 0.12)",
    borderLight: "rgba(2, 132, 199, 0.28)",
    borderDark: "rgba(56, 189, 248, 0.32)",
    glow: "rgba(56, 189, 248, 0.28)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" />
      </svg>
    ),
  },
  Gatsby: {
    colorLight: "#6b21a8",
    colorDark: "#c084fc",
    bgLight: "rgba(107, 33, 168, 0.09)",
    bgDark: "rgba(192, 132, 252, 0.12)",
    borderLight: "rgba(107, 33, 168, 0.28)",
    borderDark: "rgba(192, 132, 252, 0.32)",
    glow: "rgba(192, 132, 252, 0.28)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8a4 4 0 100 8h4v-4h-4" />
      </svg>
    ),
  },
  "styled-components": {
    colorLight: "#be185d",
    colorDark: "#f472b6",
    bgLight: "rgba(190, 24, 93, 0.09)",
    bgDark: "rgba(244, 114, 182, 0.12)",
    borderLight: "rgba(190, 24, 93, 0.28)",
    borderDark: "rgba(244, 114, 182, 0.32)",
    glow: "rgba(244, 114, 182, 0.28)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill={c} fillOpacity="0.25" />
      </svg>
    ),
  },
  MDX: {
    colorLight: "#c2410c",
    colorDark: "#fb923c",
    bgLight: "rgba(194, 65, 12, 0.09)",
    bgDark: "rgba(251, 146, 60, 0.12)",
    borderLight: "rgba(194, 65, 12, 0.28)",
    borderDark: "rgba(251, 146, 60, 0.32)",
    glow: "rgba(251, 146, 60, 0.28)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M7 15V9l3 3 3-3v6M17 12l2 3M19 12l-2 3" />
      </svg>
    ),
  },
  JavaScript: {
    colorLight: "#a16207",
    colorDark: "#facc15",
    bgLight: "rgba(161, 98, 7, 0.09)",
    bgDark: "rgba(250, 204, 21, 0.12)",
    borderLight: "rgba(161, 98, 7, 0.28)",
    borderDark: "rgba(250, 204, 21, 0.32)",
    glow: "rgba(250, 204, 21, 0.28)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill={c} />
        <path
          d="M7 16c.5.8 1.4 1.2 2.4 1.2 1.5 0 2.4-.8 2.4-2.4V8h-2.1v6.7c0 .6-.3.9-.8.9-.5 0-.8-.3-1.1-.7L7 16zm7.8-1.2c.7.9 1.7 1.4 2.8 1.4 1.6 0 2.5-.8 2.5-1.9 0-1.1-.8-1.6-2.2-2.1-1.6-.6-2.6-1.2-2.6-2.6 0-1.5 1.2-2.7 3-2.7 1.3 0 2.3.5 3 1.4l-.8 1.5c-.5-.6-1.3-.9-2.1-.9-.8 0-1.4.4-1.4 1.1 0 .7.6 1.1 1.8 1.6 1.9.7 3 1.4 3 2.8 0 1.7-1.3 2.8-3.3 2.8-1.7 0-2.8-.7-3.6-1.8l.9-1.4z"
          fill="#18181b"
        />
      </svg>
    ),
  },
  "GitHub API": {
    colorLight: "#374151",
    colorDark: "#9ca3af",
    bgLight: "rgba(55, 65, 81, 0.09)",
    bgDark: "rgba(156, 163, 175, 0.12)",
    borderLight: "rgba(55, 65, 81, 0.28)",
    borderDark: "rgba(156, 163, 175, 0.32)",
    glow: "rgba(156, 163, 175, 0.25)",
    icon: (c) => (
      <svg width="13" height="13" viewBox="0 0 24 24" fill={c}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
};

// Fallback for custom or unmapped stacks
const defaultMeta: StackMeta = {
  colorLight: "#52525b",
  colorDark: "#d4d4d8",
  bgLight: "rgba(0, 0, 0, 0.05)",
  bgDark: "rgba(255, 255, 255, 0.08)",
  borderLight: "rgba(0, 0, 0, 0.16)",
  borderDark: "rgba(255, 255, 255, 0.2)",
  glow: "rgba(255, 255, 255, 0.15)",
  icon: (c) => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
};

export default function StackBadge({ name }: { name: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const meta = stackRegistry[name] || defaultMeta;
  const isDark = mounted ? resolvedTheme === "dark" : false;

  const textColor = isDark ? meta.colorDark : meta.colorLight;
  const bgColor = isDark ? meta.bgDark : meta.bgLight;
  const borderColor = isDark ? meta.borderDark : meta.borderLight;

  return (
    <motion.li
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "4px 10px 4px 8px",
        borderRadius: "9999px",
        fontSize: "12.5px",
        fontWeight: 480,
        color: textColor,
        backgroundColor: bgColor,
        border: `1px solid ${borderColor}`,
        // Glossy specular highlight finish
        backgroundImage: isDark
          ? "linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.02) 60%, transparent 100%)"
          : "linear-gradient(180deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.1) 60%, transparent 100%)",
        boxShadow: isDark
          ? "inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 2px rgba(0, 0, 0, 0.2)"
          : "inset 0 1px 0 rgba(255, 255, 255, 0.8), 0 1px 2px rgba(0, 0, 0, 0.04)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        cursor: "default",
        userSelect: "none",
        transition:
          "background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        {meta.icon(textColor)}
      </span>
      <span>{name}</span>
    </motion.li>
  );
}
