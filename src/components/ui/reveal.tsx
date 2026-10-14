"use client";

import * as React from "react";
import { motion, useInView, type HTMLMotionProps } from "motion/react";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

/** Fades and lifts its children into view once, when scrolled into the viewport. */
export function Reveal({ delay = 0, y = 24, children, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type SplitWordsProps = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
};

/**
 * Reveals a line word by word, each word sliding up from behind a mask.
 * Visibility is tracked on the wrapper: the words themselves start clipped,
 * so observing them directly would never fire.
 */
export function SplitWords({ text, className, wordClassName, delay = 0, stagger = 0.06 }: SplitWordsProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -5% 0px" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className={`inline-block ${wordClassName ?? ""}`}
              initial={{ y: "110%" }}
              animate={{ y: inView ? "0%" : "110%" }}
              transition={{ duration: 1, delay: delay + i * stagger, ease: [0.16, 1, 0.3, 1] }}
            >
              {word}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </span>
  );
}
