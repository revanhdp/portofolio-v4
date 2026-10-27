"use client";

import { Layers } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import TextShimmer from "@/components/TextShimmer";
import {
  IntegrationGrid,
  type IntegrationGridLogo,
} from "@/components/ui/integration-grid";
import { TECH_ICONS } from "@/components/techIconsRegistry";
import { stack } from "@/lib/data";

// Outer slots fill row by row (7 · 8 · 7). Leave the top corners and the bottom
// centre empty so the 19 tools sit balanced in the 22 slots.
const EMPTY_SLOTS = new Set([0, 6, 18]);

const logos: (IntegrationGridLogo | null)[] = (() => {
  const items = stack.flatMap((c) => c.items);
  let n = 0;
  return Array.from({ length: 22 }, (_, i) => {
    if (EMPTY_SLOTS.has(i)) return null;
    const item = items[n++];
    if (!item) return null;
    const meta = TECH_ICONS[item.name];
    if (!meta?.iconSrc) return null;
    return {
      name: item.name,
      src: meta.iconSrc,
      darkSrc: meta.darkIconSrc,
      invertDark: item.name === "Vercel" || item.name === "Express",
    };
  });
})();

export default function StackPage() {
  return (
    <PageWrapper showBack>
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
            <TextShimmer>production</TextShimmer>
          </em>
          .
        </p>
      </div>

      <div style={{ marginTop: "28px" }}>
        <IntegrationGrid
          logos={logos}
          mark={<Layers size="100%" strokeWidth={1.5} style={{ width: "46%", height: "46%" }} />}
          label={`Tech stack: ${stack
            .flatMap((c) => c.items.map((i) => i.name))
            .join(", ")}`}
        />
      </div>

      <div
        style={{
          marginTop: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        {stack.map((category) => (
          <section key={category.id}>
            <h2
              style={{
                fontSize: "13.5px",
                fontWeight: 500,
                color: "var(--foreground)",
              }}
            >
              {category.label}
            </h2>
            <p style={{ fontSize: "13px", color: "var(--muted)" }}>
              {category.items.map((i) => i.name).join(" · ")}
            </p>
          </section>
        ))}
      </div>
    </PageWrapper>
  );
}
