"use client";

import { useState, useEffect } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import VictoryHand from "@/components/VictoryHand";
import Greeting from "@/components/Greeting";
import PageWrapper from "@/components/PageWrapper";
import WorkSection from "@/components/WorkSection";
import SoundToggle from "@/components/SoundToggle";
import { InlineExpand } from "@/components/InlineExpand";
import { linkSound, triggerHaptic, playHover } from "@/lib/sound";

export default function HomePage() {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      setHasScrolled(latest > 16);
    });
    return () => unsubscribe();
  }, [scrollY]);

  return (
    <PageWrapper isHome>
      {/* ── Hero Stage: Focused Welcome Greeting on Mobile (Exact 100svh fit) ── */}
      <div className="hero-stage">
        <div>
          {/* Victory Hand interactive SVG */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <VictoryHand />
          </motion.div>

          {/* Name & Typewriter block */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.35,
              delay: 0.06,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            style={{ marginBottom: "8px" }}
          >
            <h1
              style={{
                fontSize: "16px",
                fontWeight: 500,
                color: "var(--foreground)",
                lineHeight: 1.4,
                marginTop: "8px",
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
        </div>

        {/* Mobile-only scroll cue: fades out immediately upon scrolling */}
        <motion.button
          type="button"
          animate={{
            opacity: hasScrolled ? 0 : 0.75,
            y: hasScrolled ? 6 : [0, 4, 0],
          }}
          transition={{
            opacity: { duration: 0.2 },
            y: { repeat: Infinity, duration: 2.2, ease: "easeInOut" },
          }}
          onClick={() => {
            triggerHaptic("selection");
            window.scrollTo({
              top: window.innerHeight,
              behavior: "smooth",
            });
          }}
          onMouseEnter={playHover}
          className="scroll-cue hover-foreground"
          aria-hidden={hasScrolled}
          tabIndex={hasScrolled ? -1 : 0}
        >
          <span>scroll to explore</span>
          <ChevronDown size={12} strokeWidth={2} />
        </motion.button>
      </div>

      {/* ── Bio: Staggered cinematic optical blur-to-focus reveal on scroll ── */}
      <motion.div
        className="bio-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.18,
            },
          },
        }}
      >
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.55,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          }}
        >
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
        </motion.p>
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.55,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            },
          }}
        >
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
          <Link
            href="/projects/emanifest"
            className="link"
            {...linkSound}
            style={{ fontWeight: 500 }}
          >
            eManifest
          </Link>{" "}
          (Kemenhub),{" "}
          <Link
            href="/projects/ekompu"
            className="link"
            {...linkSound}
            style={{ fontWeight: 500 }}
          >
            eKompu
          </Link>{" "}
          (Kemen PUPR), and{" "}
          <Link
            href="/projects/pkp-hub"
            className="link"
            {...linkSound}
            style={{ fontWeight: 500 }}
          >
            PKP HUB
          </Link>{" "}
          (Kemen PKP). Previously completed two certified independent study
          (Studi Independen) programs in modern web software engineering.
        </motion.p>
      </motion.div>

      {/* ── Work Section: Reveals on scroll with smooth blur ── */}
      <motion.div
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <WorkSection />
      </motion.div>

      {/* ── Bottom links: Reveals on scroll with smooth blur ── */}
      <motion.div
        className="bottom-links-section"
        initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
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

      {/* ── Sound toggle: Reveals on scroll ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35 }}
      >
        <SoundToggle />
      </motion.div>
    </PageWrapper>
  );
}
