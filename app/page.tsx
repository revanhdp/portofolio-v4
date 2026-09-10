"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import WorkSection from "@/components/WorkSection";
import SoundToggle from "@/components/SoundToggle";
import { InlineExpand } from "@/components/InlineExpand";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

export default function HomePage() {
  return (
    <PageWrapper>
      {/* ✌️ Emoji */}
      <motion.div {...fadeUp(0)} style={{ fontSize: "22px", marginBottom: "16px" }}>
        ✌️
      </motion.div>

      {/* Name block */}
      <motion.div {...fadeUp(0.06)} style={{ marginBottom: "20px" }}>
        <p
          style={{
            fontSize: "15px",
            fontWeight: 500,
            color: "var(--foreground)",
            lineHeight: 1.4,
          }}
        >
          Howdy, I&apos;m Revanza Hadi Putra.
        </p>
        <p
          style={{
            fontSize: "15px",
            color: "var(--muted)",
            lineHeight: 1.4,
          }}
        >
          You can call me &ldquo;Revan&rdquo;
        </p>
      </motion.div>

      {/* Bio */}
      <motion.div
        {...fadeUp(0.12)}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          fontSize: "15px",
          lineHeight: 1.625,
          color: "var(--foreground)",
          marginBottom: "20px",
        }}
      >
        <p>
          I&apos;m a Software Engineer interested in building{" "}
          <InlineExpand
            summary="(more)"
            detail={
              <>
                clean, minimal interfaces and scalable backend systems. I care
                deeply about developer experience, performance, and
                maintainability.{" "}
              </>
            }
          />{" "}
          products that actually matter, based in Indonesia.
        </p>
        <p>
          Currently engineering at{" "}
          <a
            href="https://gotogroup.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            GoTo Group ↗
          </a>{" "}
          <InlineExpand
            summary="(more)"
            detail={
              <>
                (Southeast Asia&apos;s largest tech company, powering Gojek,
                Tokopedia, and GoPay with billions of transactions annually).{" "}
              </>
            }
          />
          . Previously built{" "}
          <a
            href="https://tokopedia.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            Tokopedia ↗
          </a>{" "}
          <InlineExpand
            summary="(more)"
            detail={
              <>
                (Indonesia&apos;s largest e-commerce with 100M+ users and
                millions of sellers across the archipelago).{" "}
              </>
            }
          />
          .
        </p>
      </motion.div>

      {/* Work section */}
      <motion.div {...fadeUp(0.18)}>
        <WorkSection />
      </motion.div>

      {/* Bottom links */}
      <motion.div
        {...fadeUp(0.24)}
        style={{
          marginTop: "32px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          fontSize: "15px",
          lineHeight: 1.625,
          color: "var(--foreground)",
        }}
      >
        <p>
          Read my{" "}
          <Link href="/writings" className="link">
            writings
          </Link>
          , or browse the{" "}
          <Link href="/projects" className="link">
            projects
          </Link>{" "}
          I&apos;ve built. Wanna discuss a project or just say hi?{" "}
          <a href="mailto:revanzahadiputra2@gmail.com" className="link">
            Let&apos;s grab a coffee
          </a>
        </p>
        <p>
          You can find me on{" "}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            X
          </a>
          ,{" "}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            GitHub
          </a>
          ,{" "}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
          >
            LinkedIn
          </a>
          , or reach me via{" "}
          <a href="mailto:revanzahadiputra2@gmail.com" className="link">
            email
          </a>
          .
        </p>
      </motion.div>

      {/* Sound toggle */}
      <motion.div {...fadeUp(0.3)}>
        <SoundToggle />
      </motion.div>
    </PageWrapper>
  );
}
