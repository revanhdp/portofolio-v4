import { useSyncExternalStore } from "react";

/* Boolean preferences stored per-browser. Sound has its own store in
   lib/sound.ts; these cover the visual and scrolling options.        */

export type SettingKey = "smoothScroll" | "grain";

const DEFAULTS: Record<SettingKey, boolean> = {
  smoothScroll: true,
  grain: true,
};

const EVENT = "porto:settings-change";
const storageKey = (key: SettingKey) => `porto:${key}`;

function read(key: SettingKey): boolean {
  try {
    const saved = localStorage.getItem(storageKey(key));
    if (saved !== null) return saved === "true";
  } catch {}
  return DEFAULTS[key];
}

function subscribe(onChange: () => void) {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function setSetting(key: SettingKey, value: boolean): void {
  try {
    localStorage.setItem(storageKey(key), String(value));
  } catch {}
  window.dispatchEvent(new Event(EVENT));
}

export function useSetting(key: SettingKey): boolean {
  return useSyncExternalStore(
    subscribe,
    () => read(key),
    () => DEFAULTS[key],
  );
}
