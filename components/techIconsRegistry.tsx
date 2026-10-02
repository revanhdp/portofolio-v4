import React from "react";

export interface TechIconDefinition {
  name: string;
  iconSrc?: string;
  darkIconSrc?: string;
  color: string;
  darkColor?: string;
  glow: string;
  renderIcon?: (color: string) => React.ReactNode;
}

export const TECH_ICONS: Record<string, TechIconDefinition> = {
  TypeScript: {
    name: "TypeScript",
    iconSrc: "/icons/tech/typescript.svg",
    color: "#3178C6",
    glow: "rgba(49, 120, 198, 0.45)",
  },
  React: {
    name: "React",
    iconSrc: "/icons/tech/react.svg",
    color: "#61DAFB",
    glow: "rgba(97, 218, 251, 0.45)",
  },
  "Next.js": {
    name: "Next.js",
    iconSrc: "/icons/tech/nextjs.svg",
    darkIconSrc: "/icons/tech/nextjs-dark.svg",
    color: "#000000",
    darkColor: "#ffffff",
    glow: "rgba(255, 255, 255, 0.35)",
  },
  "Tailwind CSS": {
    name: "Tailwind CSS",
    iconSrc: "/icons/tech/tailwindcss.svg",
    color: "#06B6D4",
    glow: "rgba(6, 182, 212, 0.45)",
  },
  "Framer Motion": {
    name: "Framer Motion",
    iconSrc: "/icons/tech/framermotion.svg",
    color: "#0055FF",
    glow: "rgba(0, 85, 255, 0.45)",
  },
  "Vue.js": {
    name: "Vue.js",
    iconSrc: "/icons/tech/vue.svg",
    color: "#41B883",
    glow: "rgba(65, 184, 131, 0.45)",
  },
  Vue: {
    name: "Vue.js",
    iconSrc: "/icons/tech/vue.svg",
    color: "#41B883",
    glow: "rgba(65, 184, 131, 0.45)",
  },
  NestJS: {
    name: "NestJS",
    iconSrc: "/icons/tech/nestjs.svg",
    color: "#E0234E",
    glow: "rgba(224, 35, 78, 0.45)",
  },
  "Nest.js": {
    name: "NestJS",
    iconSrc: "/icons/tech/nestjs.svg",
    color: "#E0234E",
    glow: "rgba(224, 35, 78, 0.45)",
  },
  "Node.js": {
    name: "Node.js",
    iconSrc: "/icons/tech/nodejs.svg",
    color: "#539E43",
    glow: "rgba(83, 158, 67, 0.45)",
  },
  Laravel: {
    name: "Laravel",
    iconSrc: "/icons/tech/laravel.svg",
    color: "#FF2D20",
    glow: "rgba(255, 45, 32, 0.45)",
  },
  Express: {
    name: "Express",
    iconSrc: "/icons/tech/express.svg",
    color: "#000000",
    darkColor: "#ffffff",
    glow: "rgba(255, 255, 255, 0.35)",
  },
  "REST API": {
    name: "REST API",
    iconSrc: "/icons/tech/restapi.svg",
    color: "#FF6C37",
    glow: "rgba(255, 108, 55, 0.45)",
  },
  PostgreSQL: {
    name: "PostgreSQL",
    iconSrc: "/icons/tech/postgresql.svg",
    color: "#4169E1",
    glow: "rgba(65, 105, 225, 0.45)",
  },
  MySQL: {
    name: "MySQL",
    iconSrc: "/icons/tech/mysql.svg",
    color: "#4479A1",
    glow: "rgba(68, 121, 161, 0.45)",
  },
  Prisma: {
    name: "Prisma",
    iconSrc: "/icons/tech/prisma.svg",
    color: "#5A67D8",
    darkColor: "#ffffff",
    glow: "rgba(90, 103, 216, 0.45)",
  },
  Redis: {
    name: "Redis",
    iconSrc: "/icons/tech/redis.svg",
    color: "#DC382D",
    glow: "rgba(220, 56, 45, 0.45)",
  },
  Git: {
    name: "Git",
    iconSrc: "/icons/tech/git.svg",
    color: "#F05032",
    glow: "rgba(240, 80, 50, 0.45)",
  },
  Docker: {
    name: "Docker",
    iconSrc: "/icons/tech/docker.svg",
    color: "#2496ED",
    glow: "rgba(36, 150, 237, 0.45)",
  },
  Vercel: {
    name: "Vercel",
    iconSrc: "/icons/tech/vercel.svg",
    color: "#000000",
    darkColor: "#ffffff",
    glow: "rgba(255, 255, 255, 0.35)",
  },
  Figma: {
    name: "Figma",
    iconSrc: "/icons/tech/figma.svg",
    color: "#F24E1E",
    glow: "rgba(242, 78, 30, 0.45)",
  },
  Vite: {
    name: "Vite",
    iconSrc: "/icons/tech/vite.svg",
    color: "#646CFF",
    glow: "rgba(100, 108, 255, 0.45)",
  },
  "Alpine.js": {
    name: "Alpine.js",
    color: "#0f766e",
    darkColor: "#2dd4bf",
    glow: "rgba(45, 212, 191, 0.45)",
    renderIcon: (c) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M18 16.5L12 10.5L6 16.5H18Z" fill={c} />
        <path d="M12 7.5L6 13.5H0L9 4.5L12 7.5Z" fill={c} fillOpacity="0.75" />
      </svg>
    ),
  },
  JavaScript: {
    name: "JavaScript",
    color: "#a16207",
    darkColor: "#facc15",
    glow: "rgba(250, 204, 21, 0.45)",
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path
          d="M7 16c.5.8 1.4 1.2 2.4 1.2 1.5 0 2.4-.8 2.4-2.4V8h-2.1v6.7c0 .6-.3.9-.8.9-.5 0-.8-.3-1.1-.7L7 16zm7.8-1.2c.7.9 1.7 1.4 2.8 1.4 1.6 0 2.5-.8 2.5-1.9 0-1.1-.8-1.6-2.2-2.1-1.6-.6-2.6-1.2-2.6-2.6 0-1.5 1.2-2.7 3-2.7 1.3 0 2.3.5 3 1.4l-.8 1.5c-.5-.6-1.3-.9-2.1-.9-.8 0-1.4.4-1.4 1.1 0 .7.6 1.1 1.8 1.6 1.9.7 3 1.4 3 2.8 0 1.7-1.3 2.8-3.3 2.8-1.7 0-2.8-.7-3.6-1.8l.9-1.4z"
          fill="#000000"
        />
      </svg>
    ),
  },
  GraphQL: {
    name: "GraphQL",
    color: "#be185d",
    darkColor: "#f472b6",
    glow: "rgba(244, 114, 182, 0.45)",
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#E10098" strokeWidth="1.8">
        <circle cx="12" cy="3" r="2" fill="#E10098" />
        <circle cx="20" cy="8" r="2" fill="#E10098" />
        <circle cx="20" cy="16" r="2" fill="#E10098" />
        <circle cx="12" cy="21" r="2" fill="#E10098" />
        <circle cx="4" cy="16" r="2" fill="#E10098" />
        <circle cx="4" cy="8" r="2" fill="#E10098" />
        <path d="M12 3l8 5v8l-8 5-8-5V8l8-5z" />
      </svg>
    ),
  },
  WebSocket: {
    name: "WebSocket",
    color: "#0284c7",
    darkColor: "#38bdf8",
    glow: "rgba(56, 189, 248, 0.45)",
    renderIcon: (c) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 8l-4 4 4 4M17 8l4 4-4 4M14 4l-4 16" />
      </svg>
    ),
  },
  "GitHub API": {
    name: "GitHub API",
    color: "#374151",
    darkColor: "#e5e7eb",
    glow: "rgba(156, 163, 175, 0.35)",
    renderIcon: (c) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill={c}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
  },
  Gatsby: {
    name: "Gatsby",
    color: "#6b21a8",
    darkColor: "#c084fc",
    glow: "rgba(192, 132, 252, 0.45)",
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#663399" strokeWidth="2.2">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8a4 4 0 100 8h4v-4h-4" />
      </svg>
    ),
  },
  "styled-components": {
    name: "styled-components",
    color: "#be185d",
    darkColor: "#f472b6",
    glow: "rgba(244, 114, 182, 0.45)",
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#DB7093" strokeWidth="2">
        <path d="M12 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" fill="#DB7093" fillOpacity="0.4" />
      </svg>
    ),
  },
  MDX: {
    name: "MDX",
    color: "#c2410c",
    darkColor: "#fb923c",
    glow: "rgba(251, 146, 60, 0.45)",
    renderIcon: (c) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M7 15V9l3 3 3-3v6M17 12l2 3M19 12l-2 3" />
      </svg>
    ),
  },
  OpenAPI: {
    name: "OpenAPI",
    color: "#15803d",
    darkColor: "#85EA2D",
    glow: "rgba(133, 234, 45, 0.45)",
    renderIcon: (c) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v10M8 9l8 6M8 15l8-6" />
      </svg>
    ),
  },
  OKLCH: {
    name: "OKLCH",
    color: "#ec4899",
    darkColor: "#f472b6",
    glow: "rgba(236, 72, 153, 0.45)",
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="url(#oklch-reg-grad)" strokeWidth="2.5" />
        <defs>
          <linearGradient id="oklch-reg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  Canvas: {
    name: "Canvas",
    color: "#b45309",
    darkColor: "#f59e0b",
    glow: "rgba(245, 158, 11, 0.45)",
    renderIcon: (c) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" fill={c} />
        <path d="M21 15l-5-5L5 21" />
      </svg>
    ),
  },
  IndexedDB: {
    name: "IndexedDB",
    color: "#1d4ed8",
    darkColor: "#60a5fa",
    glow: "rgba(96, 165, 250, 0.45)",
    renderIcon: (c) => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  "OpenWeather API": {
    name: "OpenWeather API",
    color: "#c2410c",
    darkColor: "#fb923c",
    glow: "rgba(235, 110, 75, 0.45)",
    renderIcon: () => (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#EB6E4B" strokeWidth="2">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
      </svg>
    ),
  },
};

export const defaultTechIcon: TechIconDefinition = {
  name: "Code",
  iconSrc: "/icons/tech/typescript.svg",
  color: "#71717a",
  glow: "rgba(113, 113, 122, 0.3)",
};

