"use client";

import PageWrapper from "@/components/PageWrapper";
import TextShimmer from "@/components/TextShimmer";
import SketchTitle from "@/components/SketchTitle";
import StackProse from "@/components/StackProse";
import type { CStackCategory } from "@/lib/types";
import { localizeStack } from "@/lib/localize";
import { useLanguage } from "@/lib/i18n";

export default function StackClient({ data }: { data: CStackCategory[] }) {
  const { t, lang } = useLanguage();
  const stack = localizeStack(data, lang);

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

      <div style={{ marginTop: "32px" }}>
        <StackProse stack={stack} />
      </div>
    </PageWrapper>
  );
}
