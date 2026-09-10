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
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: index * 0.04 }}
          >
            <Link
              href={`/writings/${writing.slug}`}
              id={`writing-${writing.slug}`}
              {...linkSound}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px 0",
                borderBottom: "1px solid var(--border)",
                textDecoration: "none",
                color: "inherit",
                gap: "16px",
              }}
              className="group"
            >
              <span
                style={{
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "var(--foreground)",
                  transition: "color 0.15s",
                }}
                className="group-hover:opacity-60 transition-opacity"
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
