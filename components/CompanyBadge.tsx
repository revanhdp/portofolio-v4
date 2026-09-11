"use client";

import Image from "next/image";

interface CompanyBadgeProps {
  company: string;
  /** Logo file in /public. Falls back to the company monogram when absent. */
  logo?: string;
}

const SIZE = 26;

/* The 26px left column shared by every work row — a white tile so brand
   colours read identically in both themes, bordered like the icon boxes
   elsewhere in the app. Logos are used at their own scale: each asset
   carries its own padding, and a round mark has to sit wider than a
   letterform to look the same size. */
export default function CompanyBadge({ company, logo }: CompanyBadgeProps) {
  return (
    <div
      style={{
        width: `${SIZE}px`,
        height: `${SIZE}px`,
        borderRadius: "6px",
        border: "1px solid var(--border)",
        backgroundColor: logo ? "#ffffff" : "var(--card)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      {logo ? (
        // 28px source at 24px, so no optimizer round-trip is worth it.
        <Image
          src={logo}
          alt=""
          width={SIZE - 2}
          height={SIZE - 2}
          unoptimized
          style={{ objectFit: "contain" }}
        />
      ) : (
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "var(--muted)",
            letterSpacing: "0",
          }}
        >
          {company.charAt(0)}
        </span>
      )}
    </div>
  );
}
