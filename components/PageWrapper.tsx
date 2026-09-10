"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageWrapperProps {
  children: React.ReactNode;
  showBack?: boolean;
}

export default function PageWrapper({
  children,
  showBack = false,
}: PageWrapperProps) {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
      }}
    >
      {/* Exact arikko.dev container: max-w-[40rem]=640px, padding 80px top/bottom, 24px sides */}
      <div
        style={{
          maxWidth: "560px",
          margin: "0 auto",
          paddingTop: "80px",
          paddingBottom: "80px",
          paddingLeft: "24px",
          paddingRight: "24px",
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
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "5px",
                fontSize: "13px",
                color: "var(--muted)",
                textDecoration: "none",
              }}
              className="hover:text-zinc-900 transition-colors"
            >
              <ArrowLeft size={12} strokeWidth={1.75} />
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
