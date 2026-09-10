"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import VictoryHand from "@/components/VictoryHand";
import Greeting from "@/components/Greeting";
import PageWrapper from "@/components/PageWrapper";
import WorkSection from "@/components/WorkSection";
import SoundToggle from "@/components/SoundToggle";
import { InlineExpand } from "@/components/InlineExpand";
import { linkSound } from "@/lib/sound";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

export default function HomePage() {
  return (
    <PageWrapper>
      {/* Victory Hand interactive SVG */}
      <motion.div {...fadeUp(0)}>
        <VictoryHand />
      </motion.div>

      {/* Name block */}
      <motion.div {...fadeUp(0.06)} style={{ marginBottom: "20px" }}>
        <h1
          style={{
            fontSize: "16px",
            fontWeight: 500,
            color: "var(--foreground)",
            lineHeight: 1.4,
            marginTop: "12px",
            marginBottom: "2px",
          }}
        >
          <Greeting />
        </h1>
        <p
          style={{
            fontSize: "16px",
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
          fontSize: "16px",
          lineHeight: 1.625,
          color: "var(--foreground)",
          marginBottom: "28px",
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
          <span style={{ fontWeight: 500, color: "var(--foreground)" }}>
            Abhipraya
          </span>{" "}
          <InlineExpand
            summary="(more)"
            detail={
              <>
                (a digital software agency specializing in web development,
                enterprise portals, and tailored digital solutions).{" "}
              </>
            }
          />
          , where I build impactful platforms including{" "}
          <span style={{ fontWeight: 500 }}>eManifest</span> (Kemenhub),{" "}
          <span style={{ fontWeight: 500 }}>eKompu</span> (Kemen PUPR), and{" "}
          <span style={{ fontWeight: 500 }}>PKP HUB</span> (Kemen PKP).
          Previously completed two certified independent study (Studi
          Independen) programs in modern web software engineering.
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
          fontSize: "16px",
          lineHeight: 1.625,
          color: "var(--foreground)",
        }}
      >
        <p>
          Read my{" "}
          <Link href="/writings" className="link" {...linkSound}>
            writings
          </Link>
          , browse the{" "}
          <Link href="/projects" className="link" {...linkSound}>
            projects
          </Link>{" "}
          I&apos;ve built, or see the{" "}
          <Link href="/stack" className="link" {...linkSound}>
            stack
          </Link>{" "}
          I build with. Wanna discuss a project or just say hi?{" "}
          <a
            href="mailto:revanzahadiputra2@gmail.com"
            className="link"
            {...linkSound}
          >
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
            {...linkSound}
          >
            X
          </a>
          ,{" "}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
            {...linkSound}
          >
            GitHub
          </a>
          ,{" "}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="link"
            {...linkSound}
          >
            LinkedIn
          </a>
          , or reach me via{" "}
          <a
            href="mailto:revanzahadiputra2@gmail.com"
            className="link"
            {...linkSound}
          >
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
