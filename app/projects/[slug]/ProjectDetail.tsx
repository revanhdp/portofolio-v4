"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import GithubIcon from "@/components/GithubIcon";
import type { Project } from "@/lib/data";
import { linkSound } from "@/lib/sound";

interface Props {
  project: Project;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

/* Section heading — same scale as "Archived" on the index and the group
   headings on /stack, so the page nests into the existing hierarchy. */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "15px",
        fontWeight: 500,
        color: "var(--foreground)",
        marginBottom: "8px",
      }}
    >
      {children}
    </h2>
  );
}

export default function ProjectDetail({ project }: Props) {
  const hasImages = (project.images?.length ?? 0) > 0;

  return (
    <PageWrapper showBack>
      {/* Header */}
      <motion.header {...fadeUp(0)}>
        <h1
          style={{
            fontSize: "15px",
            fontWeight: 500,
            lineHeight: 1.4,
            color: "var(--foreground)",
          }}
        >
          {project.name}
        </h1>
        <p
          style={{ fontSize: "15px", color: "var(--muted)", marginTop: "2px" }}
        >
          {project.description}
        </p>

        {/* Meta line — mirrors the date · reading-time line on a writing */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "8px",
            fontSize: "13px",
            color: "var(--muted)",
            marginTop: "10px",
          }}
        >
          <span>{project.year}</span>
          <span aria-hidden="true">·</span>
          <span>{project.role}</span>
          {project.archived && (
            <>
              <span aria-hidden="true">·</span>
              <em style={{ fontStyle: "italic" }}>archived</em>
            </>
          )}
        </div>

        {/* Links, if the project has any */}
        {(project.url || project.github) && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px",
              marginTop: "12px",
            }}
          >
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                {...linkSound}
                className="hover-foreground"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "13px",
                  color: "var(--muted)",
                  textDecoration: "none",
                }}
              >
                <ExternalLink size={12} strokeWidth={1.75} />
                <span>{project.url.replace(/^https?:\/\//, "")}</span>
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                {...linkSound}
                className="hover-foreground"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "5px",
                  fontSize: "13px",
                  color: "var(--muted)",
                  textDecoration: "none",
                }}
              >
                <GithubIcon size={12} />
                <span>Source</span>
              </a>
            )}
          </div>
        )}
      </motion.header>

      {/* Overview */}
      <motion.section {...fadeUp(0.06)} style={{ marginTop: "32px" }}>
        <SectionHeading>Overview</SectionHeading>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            fontSize: "15px",
            lineHeight: 1.625,
            color: "var(--foreground)",
          }}
        >
          {project.overview.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </motion.section>

      {/* Tech stack — tiles built from the same tokens as the icon boxes */}
      <motion.section {...fadeUp(0.12)} style={{ marginTop: "32px" }}>
        <SectionHeading>Stack</SectionHeading>
        <ul
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            listStyle: "none",
          }}
        >
          {project.stack.map((tech) => (
            <li
              key={tech}
              style={{
                fontSize: "13px",
                color: "var(--foreground)",
                backgroundColor: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                padding: "3px 8px",
              }}
            >
              {tech}
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Highlights */}
      <motion.section {...fadeUp(0.18)} style={{ marginTop: "32px" }}>
        <SectionHeading>What I built</SectionHeading>
        <ul
          style={{
            fontSize: "15px",
            lineHeight: 1.625,
            color: "var(--foreground)",
            listStyleType: "disc",
            paddingLeft: "18px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {project.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </motion.section>

      {/* Gallery — omitted entirely when the project has no screenshots */}
      {hasImages && (
        <motion.section {...fadeUp(0.24)} style={{ marginTop: "32px" }}>
          <SectionHeading>Screens</SectionHeading>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {project.images?.map((image) => (
              <figure key={image.src}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "16 / 10",
                    borderRadius: "8px",
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--card)",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={image.src}
                    alt={image.caption}
                    fill
                    sizes="(max-width: 560px) 100vw, 512px"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <figcaption
                  style={{
                    fontSize: "13px",
                    color: "var(--muted)",
                    marginTop: "8px",
                  }}
                >
                  {image.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </motion.section>
      )}
    </PageWrapper>
  );
}
