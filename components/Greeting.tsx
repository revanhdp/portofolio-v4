"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { greetings } from "@/lib/data";

// Typewriter timings, in ms.
const TYPE = 85;
const ERASE = 45;
const HOLD = 1800;
const PAUSE = 400;

export default function Greeting() {
  // Starts on the full first greeting so SSR and no-JS render a
  // complete sentence — the cycle begins by erasing it.
  const [index, setIndex] = useState(0);
  const [text, setText] = useState<string>(greetings[0]);
  const [erasing, setErasing] = useState(false);
  const reducedMotion = useReducedMotion();

  const word = greetings[index];
  const settled = text === word || text === "";

  useEffect(() => {
    if (reducedMotion) return;

    const delay = erasing
      ? text === ""
        ? PAUSE
        : ERASE
      : text === word
        ? HOLD
        : TYPE;

    const timer = setTimeout(() => {
      if (erasing) {
        if (text === "") {
          setErasing(false);
          setIndex((i) => (i + 1) % greetings.length);
        } else {
          setText(word.slice(0, text.length - 1));
        }
      } else if (text === word) {
        setErasing(true);
      } else {
        setText(word.slice(0, text.length + 1));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, word, erasing, reducedMotion]);

  return (
    <>
      {/* Stable sentence for screen readers — the animated copy is decorative. */}
      <span className="sr-only">Hello, I&apos;m Revanza Hadi Putra.</span>

      {/* The greeting gets its own line so the introduction below never
          moves. Nothing reflows as the word grows and shrinks. */}
      <span aria-hidden="true" style={{ display: "block" }}>
        <span>{text}</span>
        {/* Blinks only while the word rests, and CSS stills it under
            reduced-motion. Always rendered, so hydration matches and the
            line keeps its height while the word is empty. */}
        <span className={settled ? "caret caret-blink" : "caret"} />,
      </span>
      <span aria-hidden="true" style={{ display: "block" }}>
        I&apos;m Revanza Hadi Putra.
      </span>
    </>
  );
}
