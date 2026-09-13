"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import type { ProjectImage } from "@/lib/data";
import { playClick } from "@/lib/sound";

interface ProjectImageFrameProps {
  images: ProjectImage[];
  windowTitle?: string;
}

export default function ProjectImageFrame({
  images,
  windowTitle = "app.preview",
}: ProjectImageFrameProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;
  const currentImage = images[currentIndex] || images[0];

  const nextImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (total <= 1) return;
      playClick();
      setCurrentIndex((prev) => (prev + 1) % total);
    },
    [total]
  );

  const prevImage = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      if (total <= 1) return;
      playClick();
      setCurrentIndex((prev) => (prev - 1 + total) % total);
    },
    [total]
  );

  // Keyboard navigation for both lightbox and page
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen) {
        if (e.key === "Escape") {
          setIsOpen(false);
        } else if (e.key === "ArrowRight") {
          nextImage();
        } else if (e.key === "ArrowLeft") {
          prevImage();
        }
      }
    };

    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, nextImage, prevImage]);

  // Touch swipe handling for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || total <= 1) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 45) {
      if (diff > 0) nextImage();
      else prevImage();
    }
    touchStartX.current = null;
  };

  const openLightbox = () => {
    playClick();
    setIsOpen(true);
  };

  const closeLightbox = () => {
    playClick();
    setIsOpen(false);
  };

  if (!currentImage) return null;

  return (
    <figure style={{ width: "100%", margin: 0 }}>
      {/* ── Minimalist App Window Frame (Fixed 1 Consistent Div) ── */}
      <div
        onClick={openLightbox}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          width: "100%",
          borderRadius: "10px",
          border: "1px solid var(--border)",
          backgroundColor: "var(--card)",
          overflow: "hidden",
          cursor: "zoom-in",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.03)",
          transition: "border-color 0.2s ease, box-shadow 0.2s ease",
          position: "relative",
        }}
        className="group hover:border-[var(--muted)]"
        title="Click to view full screen (or use arrows to browse)"
      >
        {/* Micro Title Bar */}
        <div
          style={{
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 10px",
            borderBottom: "1px solid var(--border)",
            backgroundColor: "var(--card)",
            userSelect: "none",
          }}
        >
          {/* Left: Window traffic dots */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "rgba(239, 68, 68, 0.7)",
              }}
            />
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "rgba(245, 158, 11, 0.7)",
              }}
            />
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                backgroundColor: "rgba(16, 185, 129, 0.7)",
              }}
            />
          </div>

          {/* Center: Window address */}
          <span
            style={{
              fontSize: "11px",
              color: "var(--muted)",
              fontFamily: "var(--font-geist-mono), monospace",
              letterSpacing: "0.02em",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              maxWidth: "180px",
            }}
          >
            {windowTitle}
          </span>

          {/* Right: Controls (Arrows if multi-image + Maximize Icon) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              color: "var(--muted)",
            }}
          >
            {total > 1 && (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "2px",
                  padding: "1px 4px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(0, 0, 0, 0.04)",
                  border: "1px solid var(--border)",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  type="button"
                  onClick={prevImage}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "16px",
                    height: "16px",
                    background: "none",
                    border: "none",
                    color: "var(--foreground)",
                    cursor: "pointer",
                    padding: 0,
                    borderRadius: "3px",
                  }}
                  title="Previous (←)"
                  aria-label="Previous screen"
                >
                  <ChevronLeft size={12} strokeWidth={2} />
                </button>
                <span
                  style={{
                    fontSize: "10.5px",
                    fontFamily: "var(--font-geist-mono), monospace",
                    padding: "0 3px",
                    color: "var(--muted)",
                  }}
                >
                  {currentIndex + 1}/{total}
                </span>
                <button
                  type="button"
                  onClick={nextImage}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "16px",
                    height: "16px",
                    background: "none",
                    border: "none",
                    color: "var(--foreground)",
                    cursor: "pointer",
                    padding: 0,
                    borderRadius: "3px",
                  }}
                  title="Next (→)"
                  aria-label="Next screen"
                >
                  <ChevronRight size={12} strokeWidth={2} />
                </button>
              </div>
            )}

            <Maximize2 size={11} strokeWidth={1.75} />
          </div>
        </div>

        {/* Constrained Image Canvas (Strictly contained in 16:10 div) */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16 / 10",
            overflow: "hidden",
            backgroundColor: "var(--card)",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18, ease: "easeInOut" }}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={currentImage.src}
                alt={currentImage.caption}
                fill
                priority
                sizes="(max-width: 640px) 100vw, 640px"
                style={{
                  objectFit: "cover",
                  objectPosition: "top left",
                  transform: isHovered ? "scale(1.015)" : "scale(1)",
                  transition: "transform 0.3s ease",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Quick floating arrow overlays on hover for multi-image */}
          {total > 1 && isHovered && (
            <>
              <button
                type="button"
                onClick={prevImage}
                style={{
                  position: "absolute",
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 2,
                  transition: "transform 0.15s ease",
                }}
                title="Previous"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                onClick={nextImage}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(0, 0, 0, 0.6)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 2,
                  transition: "transform 0.15s ease",
                }}
                title="Next"
              >
                <ChevronRight size={14} />
              </button>
            </>
          )}

          {/* Subtle click hint pill on hover */}
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              display: "inline-flex",
              alignItems: "center",
              gap: "4px",
              padding: "3px 8px",
              borderRadius: "9999px",
              backgroundColor: "rgba(0, 0, 0, 0.65)",
              color: "#ffffff",
              fontSize: "11px",
              backdropFilter: "blur(6px)",
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? "translateY(0)" : "translateY(4px)",
              transition: "opacity 0.2s ease, transform 0.2s ease",
              pointerEvents: "none",
              zIndex: 3,
            }}
          >
            <span>Click to zoom</span>
          </div>
        </div>
      </div>

      {/* Caption below with smooth crossfade */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.figcaption
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          style={{
            fontSize: "13px",
            color: "var(--muted)",
            marginTop: "8px",
            lineHeight: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "12px",
          }}
        >
          <span>{currentImage.caption}</span>
          {total > 1 && (
            <span
              style={{
                fontFamily: "var(--font-geist-mono), monospace",
                fontSize: "11px",
                flexShrink: 0,
                color: "var(--muted)",
              }}
            >
              {currentIndex + 1}/{total}
            </span>
          )}
        </motion.figcaption>
      </AnimatePresence>

      {/* ── Fullscreen Minimalist Lightbox Modal with Multi-Slide Navigation ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 100,
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "24px 16px",
              cursor: "zoom-out",
            }}
          >
            {/* Top Bar inside Lightbox: Counter & Close */}
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: "absolute",
                top: "18px",
                left: "20px",
                right: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                zIndex: 102,
                cursor: "default",
              }}
            >
              {/* Counter / Slide Title */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  fontSize: "12px",
                  fontFamily: "var(--font-geist-mono), monospace",
                }}
              >
                <span>{windowTitle}</span>
                {total > 1 && (
                  <>
                    <span style={{ opacity: 0.4 }}>•</span>
                    <span>
                      {currentIndex + 1} of {total}
                    </span>
                  </>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={closeLightbox}
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "background-color 0.15s ease",
                }}
                title="Close (Esc)"
                aria-label="Close full view"
              >
                <X size={16} strokeWidth={2} />
              </button>
            </div>

            {/* Previous Button (Lightbox) */}
            {total > 1 && (
              <button
                type="button"
                onClick={prevImage}
                style={{
                  position: "absolute",
                  left: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 102,
                  transition: "background-color 0.15s ease",
                }}
                title="Previous (←)"
                aria-label="Previous"
              >
                <ChevronLeft size={20} strokeWidth={2} />
              </button>
            )}

            {/* Next Button (Lightbox) */}
            {total > 1 && (
              <button
                type="button"
                onClick={nextImage}
                style={{
                  position: "absolute",
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "42px",
                  height: "42px",
                  borderRadius: "50%",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  zIndex: 102,
                  transition: "background-color 0.15s ease",
                }}
                title="Next (→)"
                aria-label="Next"
              >
                <ChevronRight size={20} strokeWidth={2} />
              </button>
            )}

            {/* Uncropped High-Res Image Container */}
            <motion.div
              key={currentIndex}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "92vw",
                maxHeight: "82vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "default",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={currentImage.src}
                alt={currentImage.caption}
                style={{
                  maxWidth: "100%",
                  maxHeight: "76vh",
                  width: "auto",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.6)",
                }}
              />

              {currentImage.caption && (
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.8)",
                    fontSize: "13px",
                    marginTop: "12px",
                    textAlign: "center",
                    maxWidth: "640px",
                    lineHeight: 1.5,
                  }}
                >
                  {currentImage.caption}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </figure>
  );
}
