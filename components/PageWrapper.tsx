"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { linkSound } from "@/lib/sound";

interface PageWrapperProps {
  children: React.ReactNode;
  showBack?: boolean;
  maxWidth?: string;
}

export default function PageWrapper({
  children,
  showBack = false,
  maxWidth = "640px",
}: PageWrapperProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        transition: "background-color 0.2s ease, color 0.2s ease",
      }}
    >
      {/* Modern responsive container */}
      <div
        className="main-container"
        style={{
          maxWidth,
        }}
      >
        {showBack && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.25 }}
            style={{ marginBottom: "32px" }}
          >
            <Link
              href="/"
              {...linkSound}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "13px",
                color: "var(--muted)",
                textDecoration: "none",
                touchAction: "manipulation",
              }}
              className="hover-foreground group"
            >
              <span
                style={{ display: "inline-flex" }}
                className="group-hover:-translate-x-1 transition-transform duration-200"
              >
                <ArrowLeft size={12} strokeWidth={1.75} />
              </span>
              <span>Index</span>
            </Link>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {children}
        </motion.div>
      </div>
    </main>
  );
}
