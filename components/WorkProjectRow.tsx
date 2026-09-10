"use client";

import {
  Building2,
  Code,
  Globe,
  GraduationCap,
  LayoutTemplate,
  Megaphone,
  Ship,
} from "lucide-react";
import type { WorkExperience, WorkIcon } from "@/lib/data";
import { playHover } from "@/lib/sound";

// Data stays serializable — icon keys are mapped to components here.
const icons: Record<WorkIcon, typeof Ship> = {
  ship: Ship,
  megaphone: Megaphone,
  building: Building2,
  code: Code,
  graduation: GraduationCap,
  layout: LayoutTemplate,
  globe: Globe,
};

interface WorkProjectRowProps {
  project: WorkExperience["projects"][number];
  /** Hairline below the row — used on the Work page, not in the home list. */
  divider?: boolean;
}

/* Shared by the home list and the Work page so both stay on the same grid:
   the icon occupies the same 26px column as the company badge, which puts
   every label in one text column at 36px. No row is indented. */
export default function WorkProjectRow({
  project,
  divider = false,
}: WorkProjectRowProps) {
  const Icon = icons[project.icon];

  return (
    <div
      onMouseEnter={playHover}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "7px 0",
        borderBottom: divider ? "1px solid var(--border)" : "none",
      }}
    >
      {/* Icon column — same line weight as the rest of the UI */}
      <span
        style={{
          width: "26px",
          display: "flex",
          justifyContent: "center",
          color: "var(--muted)",
          flexShrink: 0,
        }}
        aria-hidden="true"
      >
        <Icon size={14} strokeWidth={1.75} />
      </span>

      {/* Name + note, mirroring the company / period pair above */}
      <span
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "8px",
          flex: 1,
          minWidth: 0,
        }}
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: 500,
            color: "var(--foreground)",
            whiteSpace: "nowrap",
          }}
        >
          {project.name}
        </span>
        <span
          style={{
            fontSize: "13px",
            color: "var(--muted)",
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {project.description}
        </span>
      </span>
    </div>
  );
}
