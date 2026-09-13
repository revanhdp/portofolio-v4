"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import { writings } from "@/lib/data";
import { linkSound } from "@/lib/sound";

export default function WritingsPage() {
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
          Writings
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "var(--muted)",
            marginTop: "2px",
          }}
        >
          Essays, notes, and things I&apos;m thinking about.
        </p>
      </div>

      {/* List */}
      <div>
        {writings.map((writing, index) => (
          <motion.div
            key={writing.slug}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.25, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Link
              href={`/writings/${writing.slug}`}
              id={`writing-${writing.slug}`}
              {...linkSound}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid var(--border)",
                textDecoration: "none",
                color: "inherit",
                gap: "16px",
                touchAction: "manipulation",
              }}
              className="row-hover group"
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "var(--foreground)",
                }}
                className="group-hover:translate-x-0.5 transition-transform duration-200"
              >
                {writing.title}
              </span>
              <span
                style={{
                  fontSize: "13px",
                  color: "var(--muted)",
                  flexShrink: 0,
                }}
              >
                {writing.date}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </PageWrapper>
  );
}
