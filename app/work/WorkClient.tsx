"use client";

import { motion } from "framer-motion";
import PageWrapper from "@/components/PageWrapper";
import SketchTitle from "@/components/SketchTitle";
import WorkProjectRow from "@/components/WorkProjectRow";
import type { WorkExperience } from "@/lib/data";
import type { CWork } from "@/lib/types";
import { localizeWork } from "@/lib/localize";
import { playHover } from "@/lib/sound";
import { useLanguage } from "@/lib/i18n";

// "2024 – Present" / "2024 – Sekarang"
const isCurrent = (period: string) => /present|sekarang/i.test(period);

/* One step on the timeline: period | spine with a dot | company, role and
   the projects shipped there. The grid lives in globals.css (.tl-*).     */
function WorkEntry({
  work,
  index,
  last,
  present,
}: {
  work: WorkExperience;
  index: number;
  last: boolean;
  present: string;
}) {
  const current = isCurrent(work.period);

  return (
    <motion.li
      className="tl-item"
      data-last={last || undefined}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.06 }}
      onMouseEnter={playHover}
    >
      <span className="tl-period">
        {current
          ? work.period.replace(/present|sekarang/i, present)
          : work.period}
      </span>

      <span className="tl-spine" aria-hidden="true">
        <span className="tl-dot" data-current={current || undefined} />
      </span>

      <div className="tl-body">
        <h2
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "var(--foreground)",
          }}
        >
          {work.company}
        </h2>
        <p style={{ fontSize: "13px", color: "var(--muted)" }}>{work.role}</p>

        <div style={{ marginTop: "8px" }}>
          {work.projects.map((project) => (
            <WorkProjectRow key={project.name} project={project} divider />
          ))}
        </div>
      </div>
    </motion.li>
  );
}

export default function WorkClient({ data }: { data: CWork[] }) {
  const { t, lang } = useLanguage();
  const works = data.map((w) => localizeWork(w, lang));

  return (
    <PageWrapper showBack>
      {/* Header */}
      <div>
        <h1
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "var(--foreground)",
          }}
        >
          <SketchTitle seedKey="work">{t.work.title}</SketchTitle>
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "var(--muted)",
            marginTop: "2px",
          }}
        >
          {t.work.introBefore}{" "}
          <em
            style={{
              fontStyle: "italic",
              fontWeight: 500,
              color: "var(--foreground)",
            }}
          >
            {t.work.introEmph}
          </em>{" "}
          {t.work.introAfter}
        </p>
      </div>

      <ol style={{ listStyle: "none", marginTop: "36px" }}>
        {works.map((work, i) => (
          <WorkEntry
            key={work.id}
            work={work}
            index={i}
            last={i === works.length - 1}
            present={t.work.present}
          />
        ))}
      </ol>
    </PageWrapper>
  );
}
