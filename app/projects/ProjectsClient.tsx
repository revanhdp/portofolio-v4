"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import type { Project } from "@/lib/data";
import type { CProject } from "@/lib/types";
import { localizeProject } from "@/lib/localize";
import { linkSound } from "@/lib/sound";
import { useLanguage } from "@/lib/i18n";

interface ProjectRowProps {
  project: Project;
  index: number;
}

function ProjectRow({ project, index }: ProjectRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileTap={{ scale: 0.99 }}
      transition={{ duration: 0.25, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <Link
        href={`/projects/${project.id}`}
        {...linkSound}
        className="row-hover group"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 0",
          borderBottom: "1px solid var(--border)",
          gap: "16px",
          textDecoration: "none",
          color: "inherit",
          touchAction: "manipulation",
        }}
      >
        {/* Left: name */}
        <span
          style={{
            fontSize: "14px",
            fontWeight: 400,
            color: "var(--foreground)",
            flexShrink: 0,
            transition: "color 0.15s ease",
          }}
          className="group-hover:text-[var(--foreground)]"
        >
          {project.name}
        </span>

        {/* Right: description + affordance */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            minWidth: 0,
            justifyContent: "flex-end",
          }}
        >
          <span
            style={{
              fontSize: "13px",
              color: "var(--muted)",
              textAlign: "right",
              maxWidth: "min(240px, 50%)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {project.description}
          </span>
          <span
            style={{ color: "var(--muted)", display: "flex", flexShrink: 0 }}
            className="group-hover:translate-x-0.5 group-hover:text-[var(--foreground)] transition-all duration-200"
            aria-hidden="true"
          >
            <ChevronRight size={14} strokeWidth={1.5} />
          </span>
        </span>
      </Link>
    </motion.div>
  );
}

export default function ProjectsClient({ data }: { data: CProject[] }) {
  const { t, lang } = useLanguage();
  const all = data.map((p) => localizeProject(p, lang));
  const projects = all.filter((p) => !p.archived);
  const archivedProjects = all.filter((p) => p.archived);
  return (
    <PageWrapper showBack>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "var(--foreground)",
          }}
        >
          {t.projects.title}
        </h1>
        <p
          style={{ fontSize: "15px", color: "var(--muted)", marginTop: "2px" }}
        >
          {t.projects.intro}
        </p>
      </div>

      {/* Active projects */}
      <section>
        {projects.map((project, index) => (
          <ProjectRow key={project.id} project={project} index={index} />
        ))}
      </section>

      {/* Archived */}
      <motion.section
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: projects.length * 0.04 + 0.1 }}
        style={{ marginTop: "40px" }}
      >
        <div style={{ marginBottom: "16px" }}>
          <h2
            style={{
              fontSize: "15px",
              fontWeight: 500,
              color: "var(--foreground)",
            }}
          >
            {t.projects.archived}
          </h2>
          <p
            style={{ fontSize: "15px", color: "var(--muted)", marginTop: "2px" }}
          >
            {t.projects.archivedBefore}{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                color: "var(--foreground)",
              }}
            >
              {t.projects.archivedEmph}
            </em>
            .
          </p>
        </div>

        {archivedProjects.map((project, index) => (
          <ProjectRow
            key={project.id}
            project={project}
            index={projects.length + index}
          />
        ))}
      </motion.section>
    </PageWrapper>
  );
}
