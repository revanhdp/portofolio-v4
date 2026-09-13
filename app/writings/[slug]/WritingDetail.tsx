"use client";

import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PageWrapper from "@/components/PageWrapper";
import { Writing } from "@/lib/data";
import { linkSound } from "@/lib/sound";

interface Props {
  writing: Writing;
}

export default function WritingDetail({ writing }: Props) {
  return (
    <PageWrapper showBack>
      {/* Article header */}
      <motion.header
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ marginBottom: "32px" }}
      >
        <h1
          style={{
            fontSize: "15px",
            fontWeight: 500,
            lineHeight: 1.4,
            color: "var(--foreground)",
            marginBottom: "6px",
          }}
        >
          {writing.title}
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "13px",
            color: "var(--muted)",
          }}
        >
          <span>{writing.date}</span>
          <span>·</span>
          <span>{writing.readingTime} min read</span>
        </div>
      </motion.header>

      {/* Article body */}
      <motion.article
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.08 }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => (
              <h1
                style={{
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "var(--foreground)",
                  marginTop: "32px",
                  marginBottom: "12px",
                  lineHeight: 1.4,
                }}
              >
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--foreground)",
                  marginTop: "28px",
                  marginBottom: "10px",
                  lineHeight: 1.4,
                }}
              >
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--foreground)",
                  marginTop: "20px",
                  marginBottom: "8px",
                }}
              >
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.625,
                  color: "var(--foreground)",
                  marginBottom: "16px",
                }}
              >
                {children}
              </p>
            ),
            strong: ({ children }) => (
              <strong style={{ fontWeight: 500 }}>{children}</strong>
            ),
            em: ({ children }) => (
              <em style={{ fontStyle: "italic" }}>{children}</em>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="link"
                {...linkSound}
              >
                {children}
              </a>
            ),
            ul: ({ children }) => (
              <ul
                style={{
                  fontSize: "15px",
                  listStyleType: "disc",
                  paddingLeft: "18px",
                  marginBottom: "16px",
                  color: "var(--foreground)",
                  lineHeight: 1.625,
                }}
              >
                {children}
              </ul>
            ),
            ol: ({ children }) => (
              <ol
                style={{
                  fontSize: "15px",
                  listStyleType: "decimal",
                  paddingLeft: "18px",
                  marginBottom: "16px",
                  color: "var(--foreground)",
                  lineHeight: 1.625,
                }}
              >
                {children}
              </ol>
            ),
            li: ({ children }) => (
              <li style={{ marginBottom: "4px" }}>{children}</li>
            ),
            code: ({ inline, children }: { inline?: boolean; children?: React.ReactNode }) =>
              inline ? (
                <code
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "13px",
                    backgroundColor: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "4px",
                    padding: "1px 5px",
                    color: "var(--foreground)",
                    letterSpacing: 0,
                  }}
                >
                  {children}
                </code>
              ) : (
                <code
                  style={{
                    fontFamily: "var(--font-geist-mono), monospace",
                    fontSize: "13px",
                    letterSpacing: 0,
                  }}
                >
                  {children}
                </code>
              ),
            pre: ({ children }) => (
              <pre
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  backgroundColor: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "6px",
                  padding: "16px",
                  overflowX: "auto",
                  marginBottom: "16px",
                  color: "var(--foreground)",
                  letterSpacing: 0,
                }}
              >
                {children}
              </pre>
            ),
            blockquote: ({ children }) => (
              <blockquote
                style={{
                  borderLeft: "2px solid var(--border)",
                  paddingLeft: "16px",
                  marginBottom: "16px",
                  color: "var(--muted)",
                  fontStyle: "italic",
                  fontSize: "15px",
                }}
              >
                {children}
              </blockquote>
            ),
            hr: () => (
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid var(--border)",
                  margin: "24px 0",
                }}
              />
            ),
          }}
        >
          {writing.content}
        </ReactMarkdown>

        {/* Bottom back to writings navigation */}
        <div
          style={{
            marginTop: "48px",
            paddingTop: "24px",
            borderTop: "1px solid var(--border)",
          }}
        >
          <Link
            href="/writings"
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
            <span>All writings</span>
          </Link>
        </div>
      </motion.article>
    </PageWrapper>
  );
}
