"use client";

import * as React from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";

const RADIUS = 22;

/**
 * Floating button in the bottom-right corner. It appears once you scroll past the
 * first screen, its ring fills as you read down the page, and one click glides
 * back to the top.
 */
export function BackToTop() {
  const lenis = useLenis();
  const { scrollY, scrollYProgress } = useScroll();
  const [visible, setVisible] = React.useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > window.innerHeight * 0.6));

  const toTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          type="button"
          onClick={toTop}
          aria-label="Back to top"
          title="Back to top"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className="group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-[55] grid size-12 place-items-center rounded-full bg-ink text-paper shadow-lg ring-1 shadow-ink/20 ring-paper/25 transition-colors duration-300 hover:bg-volt hover:text-ink sm:right-6 sm:bottom-6 sm:size-14 lg:right-8 lg:bottom-8"
        >
          {/* Reading progress ring */}
          <svg viewBox="0 0 48 48" className="absolute inset-0 size-full -rotate-90" aria-hidden>
            <circle cx="24" cy="24" r={RADIUS} fill="none" strokeWidth="2" className="stroke-paper/15 group-hover:stroke-ink/15" />
            <motion.circle
              cx="24"
              cy="24"
              r={RADIUS}
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ pathLength: scrollYProgress }}
              className="stroke-volt group-hover:stroke-ink"
            />
          </svg>
          <svg
            viewBox="0 0 16 16"
            className="relative size-5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5"
            aria-hidden
          >
            <path
              d="M8 13V3M3.5 7.5 8 3l4.5 4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
