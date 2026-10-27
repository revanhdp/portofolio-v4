"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Monitor, Moon, Settings, Sun } from "lucide-react";
import { LANGUAGES, useLanguage } from "@/lib/i18n";
import { setSetting, useSetting, type SettingKey } from "@/lib/settings";
import {
  isSoundEnabled,
  playClick,
  playHover,
  playSoundOff,
  playSoundOn,
  playThemeSwitch,
  setSoundEnabled,
  triggerHaptic,
} from "@/lib/sound";

type ThemeChoice = "light" | "dark" | "system";

const noopSubscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(noopSubscribe, () => true, () => false);

function subscribeSound(onChange: () => void) {
  window.addEventListener("porto:sound-change", onChange);
  return () => window.removeEventListener("porto:sound-change", onChange);
}
const useSound = () =>
  useSyncExternalStore(subscribeSound, isSoundEnabled, () => false);

/* Applies a theme with the expanding-circle reveal, growing out of the
   element that was clicked. Skips the animation when the look will not
   change (e.g. picking "system" while the OS is already dark). */
function applyTheme(
  next: ThemeChoice,
  current: "light" | "dark",
  setTheme: (theme: string) => void,
  origin: HTMLElement,
) {
  const nextResolved: "light" | "dark" =
    next === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : next;

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (nextResolved === current || reducedMotion) {
    setTheme(next);
    return;
  }

  playThemeSwitch(nextResolved === "dark");

  const rect = origin.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  const doc = document as unknown as {
    startViewTransition?: (cb: () => void) => { ready: Promise<void> };
  };

  if (!doc.startViewTransition) {
    // Fallback ripple for browsers without the View Transitions API
    const ripple = document.createElement("div");
    Object.assign(ripple.style, {
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`,
      width: "0px",
      height: "0px",
      borderRadius: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: nextResolved === "dark" ? "#09090b" : "#fafafa",
      pointerEvents: "none",
      zIndex: "99999",
      transition:
        "width 0.45s cubic-bezier(0.22, 1, 0.36, 1), height 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease 0.38s",
    });
    document.body.appendChild(ripple);

    requestAnimationFrame(() => {
      const size = `${endRadius * 2.2}px`;
      ripple.style.width = size;
      ripple.style.height = size;
    });

    setTimeout(() => {
      setTheme(next);
      ripple.style.opacity = "0";
      setTimeout(() => ripple.remove(), 220);
    }, 360);
    return;
  }

  const transition = doc.startViewTransition(() => {
    flushSync(() => setTheme(next));
    // Toggle the class synchronously so the View Transition snapshot is accurate
    document.documentElement.classList.toggle("dark", nextResolved === "dark");
  });

  transition.ready
    .then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 480,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          pseudoElement: "::view-transition-new(root)",
        },
      );
    })
    .catch(() => {
      // Aborted transition — the theme is already applied
    });
}

/* ── Controls ───────────────────────────────────────────────────── */

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        minHeight: "32px",
      }}
    >
      <span style={{ fontSize: "13px", color: "var(--foreground)" }}>
        {label}
      </span>
      {children}
    </div>
  );
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
  label,
}: {
  value: T;
  options: { id: T; label: string; icon?: React.ReactNode; name?: string }[];
  onChange: (id: T, el: HTMLElement) => void;
  label: string;
}) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      style={{
        display: "inline-flex",
        padding: "2px",
        gap: "2px",
        borderRadius: "9px",
        border: "1px solid var(--border)",
        backgroundColor: "var(--background)",
      }}
    >
      {options.map((option) => {
        const active = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={option.name ?? option.label}
            title={option.name ?? option.label}
            onClick={(e) => onChange(option.id, e.currentTarget)}
            onMouseEnter={playHover}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              minWidth: "30px",
              height: "26px",
              padding: "0 8px",
              borderRadius: "7px",
              border: "none",
              fontSize: "12px",
              fontWeight: active ? 500 : 400,
              color: active ? "var(--foreground)" : "var(--muted)",
              backgroundColor: active ? "var(--card)" : "transparent",
              boxShadow: active ? "0 0 0 1px var(--border)" : "none",
              cursor: "pointer",
              touchAction: "manipulation",
              transition: "color 0.15s ease, background-color 0.15s ease",
            }}
          >
            {option.icon}
            {option.icon ? null : option.label}
          </button>
        );
      })}
    </div>
  );
}

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      onMouseEnter={playHover}
      style={{
        position: "relative",
        width: "34px",
        height: "20px",
        padding: 0,
        borderRadius: "9999px",
        border: "1px solid var(--border)",
        backgroundColor: checked ? "var(--foreground)" : "var(--card)",
        cursor: "pointer",
        touchAction: "manipulation",
        transition: "background-color 0.2s ease",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "2px",
          left: checked ? "16px" : "2px",
          width: "14px",
          height: "14px",
          borderRadius: "50%",
          backgroundColor: checked ? "var(--background)" : "var(--muted)",
          transition: "left 0.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </button>
  );
}

/* ── Menu ───────────────────────────────────────────────────────── */

export default function SettingsMenu() {
  const mounted = useMounted();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { lang, t, setLanguage } = useLanguage();
  const soundOn = useSound();
  const smoothScroll = useSetting("smoothScroll");
  const grain = useSetting("grain");

  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  if (!mounted) {
    return (
      <div
        className="settings-menu"
        style={{ width: "32px", height: "32px" }}
        aria-hidden="true"
      />
    );
  }

  const currentTheme: ThemeChoice =
    theme === "light" || theme === "dark" ? theme : "system";

  const toggle = (key: SettingKey) => (next: boolean) => {
    triggerHaptic("selection");
    playClick();
    setSetting(key, next);
  };

  const toggleSound = (next: boolean) => {
    // Both cues bypass the enabled-gate so the change is always heard
    if (next) playSoundOn();
    else playSoundOff();
    triggerHaptic("selection");
    setSoundEnabled(next);
  };

  return (
    <div ref={rootRef} className="settings-menu">
      <motion.button
        type="button"
        onClick={() => {
          triggerHaptic("selection");
          playClick();
          setOpen((o) => !o);
        }}
        onMouseEnter={playHover}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.9 }}
        aria-label={t.settings.open}
        aria-expanded={open}
        aria-haspopup="dialog"
        title={t.settings.title}
        className="hover-foreground"
        style={{
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          outline: "none",
          backgroundColor: "transparent",
          color: open ? "var(--foreground)" : "var(--muted)",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <motion.span
          animate={{ rotate: open ? 60 : 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "flex" }}
        >
          <Settings size={17} strokeWidth={1.75} />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t.settings.title}
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: "40px",
              right: 0,
              width: "min(268px, calc(100vw - 28px))",
              padding: "10px 14px",
              borderRadius: "14px",
              border: "1px solid var(--border)",
              backgroundColor:
                "color-mix(in srgb, var(--card) 92%, transparent)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              boxShadow: "0 12px 32px -8px rgba(0, 0, 0, 0.18)",
              transformOrigin: "top right",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            <Row label={t.settings.theme}>
              <Segmented<ThemeChoice>
                label={t.settings.theme}
                value={currentTheme}
                options={[
                  {
                    id: "light",
                    label: t.settings.light,
                    icon: <Sun size={13} strokeWidth={1.75} />,
                  },
                  {
                    id: "dark",
                    label: t.settings.dark,
                    icon: <Moon size={13} strokeWidth={1.75} />,
                  },
                  {
                    id: "system",
                    label: t.settings.system,
                    icon: <Monitor size={13} strokeWidth={1.75} />,
                  },
                ]}
                onChange={(next, el) => {
                  if (next === currentTheme) return;
                  triggerHaptic("selection");
                  applyTheme(
                    next,
                    resolvedTheme === "dark" ? "dark" : "light",
                    setTheme,
                    el,
                  );
                }}
              />
            </Row>

            <Row label={t.settings.language}>
              <Segmented
                label={t.settings.language}
                value={lang}
                options={LANGUAGES}
                onChange={(next) => {
                  if (next === lang) return;
                  triggerHaptic("selection");
                  playClick();
                  setLanguage(next);
                }}
              />
            </Row>

            <div
              style={{
                height: "1px",
                backgroundColor: "var(--border)",
                margin: "4px 0",
              }}
            />

            <Row label={t.settings.sound}>
              <Switch
                checked={soundOn}
                onChange={toggleSound}
                label={t.settings.sound}
              />
            </Row>
            <Row label={t.settings.smoothScroll}>
              <Switch
                checked={smoothScroll}
                onChange={toggle("smoothScroll")}
                label={t.settings.smoothScroll}
              />
            </Row>
            <Row label={t.settings.grain}>
              <Switch
                checked={grain}
                onChange={toggle("grain")}
                label={t.settings.grain}
              />
            </Row>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
