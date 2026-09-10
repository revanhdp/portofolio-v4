"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { projects, archivedProjects } from "@/lib/data";
import { hoverSound, linkSound } from "@/lib/sound";

// GitHub SVG (not in lucide-react)
function GithubIcon({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

interface ProjectRowProps {
  project: (typeof projects)[0];
  index: number;
}

function ProjectRow({ project, index }: ProjectRowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      {...hoverSound}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 0",
        borderBottom: "1px solid var(--border)",
        gap: "16px",
      }}
      className="group"
    >
      {/* Left: name + icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "14px", fontWeight: 400, color: "var(--foreground)" }}>
          {project.name}
        </span>
        <span
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
            opacity: 0,
            transition: "opacity 0.15s",
            color: "var(--muted)",
          }}
          className="group-hover:opacity-100"
        >
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${project.name}`}
              {...linkSound}
              style={{
                color: "var(--muted)",
                display: "flex",
                transition: "color 0.15s",
              }}
              className="hover-foreground"
            >
              <ExternalLink size={12} strokeWidth={1.5} />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.name} on GitHub`}
              {...linkSound}
              style={{
                color: "var(--muted)",
                display: "flex",
                transition: "color 0.15s",
              }}
              className="hover-foreground"
            >
              <GithubIcon size={12} />
            </a>
          )}
        </span>
      </div>

      {/* Right: description */}
      <span
        style={{
          fontSize: "13px",
          color: "var(--muted)",
          flexShrink: 0,
          textAlign: "right",
          maxWidth: "220px",
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {project.description}
      </span>
    </motion.div>
  );
}

export default function ProjectsPage() {
  return (
    <PageWrapper showBack>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "15px", fontWeight: 500, color: "var(--foreground)" }}>
          Projects
        </h1>
        <p style={{ fontSize: "15px", color: "var(--muted)", marginTop: "2px" }}>
          Listed below are the projects I&apos;ve participated in, dedicating
          significant time and effort towards their creation, maintenance, and
          enhancement.
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
          <h2 style={{ fontSize: "15px", fontWeight: 500, color: "var(--foreground)" }}>
            Archived
          </h2>
          <p style={{ fontSize: "15px", color: "var(--muted)", marginTop: "2px" }}>
            The following are projects I&apos;ve been involved with previously,
            but are no longer actively{" "}
            <em
              style={{
                fontStyle: "italic",
                fontWeight: 500,
                color: "var(--foreground)",
              }}
            >
              maintained
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
