// Sound manager using Web Audio API

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

export function isSoundEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return localStorage.getItem("porto:sound") === "true";
  } catch {
    return false;
  }
}

export function setSoundEnabled(enabled: boolean): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("porto:sound", String(enabled));
    window.dispatchEvent(new Event("porto:sound-change"));
  } catch {}
}

/* ── Tone primitive ────────────────────────────────────────────────
   Every sound in the app is built from this so the palette stays
   consistent: sine waves, tiny 6ms attack (no click artifact), and
   an exponential decay to silence.                                  */

interface ToneOptions {
  freq: number;
  /** Optional glide target, reached at the end of the tone. */
  toFreq?: number;
  gain?: number;
  duration?: number;
  /** Offset from now, for building small arpeggios. */
  delay?: number;
}

function tone({
  freq,
  toFreq,
  gain = 0.05,
  duration = 0.08,
  delay = 0,
}: ToneOptions): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    const start = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const amp = ctx.createGain();
    osc.connect(amp);
    amp.connect(ctx.destination);

    osc.frequency.setValueAtTime(freq, start);
    if (toFreq !== undefined) {
      osc.frequency.exponentialRampToValueAtTime(toFreq, start + duration);
    }

    amp.gain.setValueAtTime(0.0001, start);
    amp.gain.linearRampToValueAtTime(gain, start + 0.006);
    amp.gain.exponentialRampToValueAtTime(0.0001, start + duration);

    osc.start(start);
    osc.stop(start + duration);
  } catch {}
}

/** Plays only when the user has sound turned on. */
function cue(play: () => void): void {
  if (!isSoundEnabled()) return;
  play();
}

/* ── Victory hand ── */

export function playHandFold(): void {
  cue(() =>
    tone({ freq: 659.25, toFreq: 494, gain: 0.06, duration: 0.1 })
  );
}

export function playHandUnfurl(): void {
  cue(() =>
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) =>
      tone({ freq, gain: 0.04, duration: 0.08, delay: i * 0.05 })
    )
  );
}

/* ── Disclosure (accordion rows, inline expands) ── */

export function playExpand(): void {
  cue(() => {
    tone({ freq: 587.33, gain: 0.035, duration: 0.06 });
    tone({ freq: 880, gain: 0.03, duration: 0.07, delay: 0.045 });
  });
}

export function playCollapse(): void {
  cue(() => {
    tone({ freq: 880, gain: 0.03, duration: 0.06 });
    tone({ freq: 587.33, gain: 0.035, duration: 0.07, delay: 0.045 });
  });
}

/* ── Pointer feedback ── */

export function playClick(): void {
  cue(() => tone({ freq: 740, toFreq: 660, gain: 0.035, duration: 0.06 }));
}

export function playNav(): void {
  cue(() => {
    tone({ freq: 659.25, gain: 0.035, duration: 0.07 });
    tone({ freq: 987.77, gain: 0.028, duration: 0.09, delay: 0.055 });
  });
}

let lastHover = 0;

/** Very quiet tick. Throttled so sweeping a list stays pleasant. */
export function playHover(): void {
  cue(() => {
    const now = Date.now();
    if (now - lastHover < 70) return;
    lastHover = now;
    tone({ freq: 1244.51, gain: 0.012, duration: 0.035 });
  });
}

/* ── Theme ── */

export function playThemeSwitch(toDark: boolean): void {
  cue(() => {
    const notes = toDark ? [783.99, 523.25] : [523.25, 783.99];
    notes.forEach((freq, i) =>
      tone({ freq, gain: 0.035, duration: 0.09, delay: i * 0.06 })
    );
  });
}

/* ── Sound toggle itself ──────────────────────────────────────────
   These two bypass the gate: turning sound on has to be audible,
   and turning it off has to be heard before the gate closes.       */

export function playSoundOn(): void {
  tone({ freq: 880, toFreq: 440, gain: 0.08, duration: 0.1 });
}

export function playSoundOff(): void {
  tone({ freq: 440, toFreq: 220, gain: 0.06, duration: 0.12 });
}

/* ── Shared handler props ─────────────────────────────────────────
   Spread onto links so every navigation sounds the same without
   repeating two handlers at each call site.                        */

export const linkSound = {
  onMouseEnter: playHover,
  onClick: playNav,
} as const;

export const hoverSound = {
  onMouseEnter: playHover,
} as const;
