"use client";

import { Layers } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import TextShimmer from "@/components/TextShimmer";
import SketchTitle from "@/components/SketchTitle";
import {
  IntegrationGrid,
  type IntegrationGridLogo,
} from "@/components/ui/integration-grid";
import { TECH_ICONS, defaultTechIcon } from "@/components/techIconsRegistry";
import type { StackCategory } from "@/lib/data";
import type { CStackCategory } from "@/lib/types";
import { localizeStack } from "@/lib/localize";
import { useLanguage } from "@/lib/i18n";

// Outer slots fill row by row (7 · 8 · 7). Unused slots are left empty, in this
// order, so the tools stay balanced inside the 22 slots.
const SLOTS = 22;
const EMPTY_ORDER = [0, 6, 18, 15, 21, 3, 12, 9];

function buildLogos(stack: StackCategory[]): (IntegrationGridLogo | null)[] {
  const items = stack.flatMap((c) => c.items);
  const empty = new Set(
    EMPTY_ORDER.slice(0, Math.max(0, SLOTS - items.length)),
  );
  let n = 0;
  return Array.from({ length: SLOTS }, (_, i) => {
    if (empty.has(i)) return null;
    const item = items[n++];
    if (!item) return null;
    const meta = TECH_ICONS[item.name] ?? defaultTechIcon;
    if (!meta.iconSrc && !item.icon) return null;
    // A custom icon replaces the built-in one, including its dark variant
    const custom = !!item.icon;
    return {
      name: item.name,
      src: item.icon || meta.iconSrc,
      darkSrc: custom ? item.iconDark || undefined : meta.darkIconSrc,
      invertDark:
        !custom && (item.name === "Vercel" || item.name === "Express"),
    };
  });
}

export default function StackClient({ data }: { data: CStackCategory[] }) {
  const { t, lang } = useLanguage();
  const stack = localizeStack(data, lang);
  const logos = buildLogos(stack);

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
          <SketchTitle seedKey="stack">{t.stack.title}</SketchTitle>
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "var(--muted)",
            marginTop: "2px",
          }}
        >
          {t.stack.introBefore}{" "}
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              color: "var(--foreground)",
            }}
          >
            <TextShimmer>{t.stack.introEmph}</TextShimmer>
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
