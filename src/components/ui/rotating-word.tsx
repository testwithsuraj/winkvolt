"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

type RotatingWordProps = {
  words: readonly string[];
  interval?: number;
  /** Delay before the first word slides in and the rotation starts (seconds). */
  delay?: number;
  className?: string;
  wordClassName?: string;
};

/**
 * Highlighted word that cycles through `words`: the current word slides up and
 * out while the next slides in, and the highlight eases to the new word's width.
 */
export function RotatingWord({ words, interval = 2400, delay = 0, className, wordClassName }: RotatingWordProps) {
  const [index, setIndex] = React.useState(0);
  const [width, setWidth] = React.useState<number | "auto">("auto");
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const word = words[index];

  // Measure the incoming word so the highlight animates its real width (no text squish).
  React.useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    const update = () => setWidth(el.offsetWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [word]);

  React.useEffect(() => {
    let id: ReturnType<typeof setInterval>;
    const start = setTimeout(() => {
      id = setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    }, delay * 1000 + 600);
    return () => {
      clearTimeout(start);
      clearInterval(id);
    };
  }, [words.length, interval, delay]);

  const wordClasses = cn("inline-block whitespace-nowrap px-[0.12em]", wordClassName);

  return (
    <span className="inline-block overflow-hidden pb-[0.14em] align-bottom">
      <motion.span
        className={cn("relative inline-flex overflow-hidden align-bottom", className)}
        initial={{ y: "110%" }}
        animate={{ y: "0%", width }}
        transition={{ y: { duration: 1, delay, ease }, width: { duration: 0.55, ease } }}
      >
        {/* invisible copy used for measuring */}
        <span ref={measureRef} aria-hidden className={cn(wordClasses, "invisible absolute top-0 left-0")}>
          {word}
        </span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={word}
            className={wordClasses}
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-105%", opacity: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            {word}
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </span>
  );
}
