"use client";

import * as React from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

const text =
  "150+ lenses and 500M+ views taught us one thing: people don't share software, they share moments. We build the moments.";

function Word({ word, range, progress }: { word: string; range: [number, number]; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const highlight = /\d/.test(word);
  return (
    <span className="relative mr-[0.25em] inline-block">
      <motion.span style={{ opacity }} className={highlight ? "rounded-md bg-volt px-1.5 text-ink" : undefined}>
        {word}
      </motion.span>
    </span>
  );
}

/** A big statement whose words light up one by one as it scrolls through the viewport. */
export function Statement() {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  return (
    <section aria-label="Our approach" className="bg-ink py-24 text-paper sm:py-32 lg:py-44">
      <div className="container-x">
        <p
          ref={ref}
          className="max-w-4xl type-h2"
        >
          <span className="sr-only">{text}</span>
          <span aria-hidden>
            {words.map((word, i) => (
              <Word
                key={`${word}-${i}`}
                word={word}
                progress={scrollYProgress}
                range={[i / words.length, (i + 1) / words.length]}
              />
            ))}
          </span>
        </p>
      </div>
    </section>
  );
}
