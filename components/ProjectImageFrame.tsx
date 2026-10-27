"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProjectImage } from "@/lib/data";
import { playClick } from "@/lib/sound";
import { useLanguage } from "@/lib/i18n";

interface ProjectImageFrameProps {
  images: ProjectImage[];
  windowTitle?: string;
}

export default function ProjectImageFrame({
  images,
  windowTitle = "app.preview",
}: ProjectImageFrameProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
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

  const openLightbox = (index: number) => {
    playClick();
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    playClick();
    setIsOpen(false);
  };

  if (!currentImage) return null;

  return (
    <figure style={{ width: "100%", margin: 0 }}>
      {/* Thumbnail grid — each tile shows a skeleton until its image has loaded */}
      <div className="grid w-full grid-cols-3 gap-2">
        {images.map((image, i) => (
          <button
            key={`${image.src}-${i}`}
            type="button"
            onClick={() => openLightbox(i)}
            title={image.caption}
            aria-label={`View screen ${i + 1} of ${total}: ${image.caption}`}
            className="group relative aspect-square w-full cursor-zoom-in overflow-hidden rounded-md border border-border bg-card p-0 transition-colors hover:border-muted"
          >
            {!loaded[i] && (
              <Skeleton className="absolute inset-0 aspect-square w-full rounded-md" />
            )}
            <Image
              src={image.src}
              alt={image.caption}
              fill
              sizes="(max-width: 640px) 33vw, 200px"
              onLoad={() => setLoaded((prev) => ({ ...prev, [i]: true }))}
              className="object-cover object-top-left transition-transform duration-300 group-hover:scale-[1.04]"
              style={{ opacity: loaded[i] ? 1 : 0 }}
            />
          </button>
        ))}
      </div>
      <p
        style={{
          fontSize: "13px",
          color: "var(--muted)",
          marginTop: "8px",
          lineHeight: 1.5,
        }}
      >
        {t.projects.screensHint}
      </p>

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
