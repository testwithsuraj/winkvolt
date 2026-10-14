"use client";

import * as React from "react";
import { AnimatePresence, motion, useAnimate, useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

// A "W" drawn as a zigzag of current: the letter, a volt and a bolt in one line.
const W_PATH = "M9 13.5 14.5 27.5 20 17 25.5 27.5 31 13.5";

/**
 * WinkVolt mark: a volt zigzag "W" on an ink tile, with an orange spark that winks.
 * It draws itself in on mount, then every few seconds (and on hover) a pulse
 * of current runs along the W and the spark winks.
 */
export function LogoMark({
  className,
  interval = 5000,
  onDark = false,
}: {
  className?: string;
  interval?: number;
  /** Lift the tile off an ink background. */
  onDark?: boolean;
}) {
  const [scope, animate] = useAnimate<SVGSVGElement>();
  const reduce = useReducedMotion();
  const busy = React.useRef(false);

  const pulse = React.useCallback(async () => {
    if (reduce || busy.current || !scope.current) return;
    busy.current = true;
    try {
      animate("[data-tile]", { rotate: [0, -8, 0] }, { duration: 0.7, ease });
      animate("[data-wink]", { scaleY: [1, 0.12, 1] }, { duration: 0.38, delay: 0.5, ease: "easeInOut" });
      await animate(
        "[data-current]",
        { pathOffset: [0, 1], opacity: [0, 1, 1, 0] },
        { duration: 0.9, ease: "easeInOut" },
      );
    } finally {
      busy.current = false;
    }
  }, [animate, reduce, scope]);

  React.useEffect(() => {
    if (reduce) return;
    const id = setInterval(pulse, interval);
    return () => clearInterval(id);
  }, [pulse, interval, reduce]);

  return (
    <svg
      ref={scope}
      viewBox="0 0 40 40"
      className={cn("size-9 shrink-0 overflow-visible", className)}
      aria-hidden
      onPointerEnter={(e) => e.pointerType === "mouse" && pulse()}
    >
      <motion.rect
        data-tile=""
        x="0"
        y="0"
        width="40"
        height="40"
        rx="12"
        className={onDark ? "fill-ink-3" : "fill-ink"}
        initial={{ scale: 0.6, rotate: -14, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      />
      <motion.path
        d={W_PATH}
        fill="none"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-volt"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease }}
      />
      {/* the pulse of current that runs along the W */}
      <motion.path
        data-current=""
        d={W_PATH}
        fill="none"
        strokeWidth="3.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-paper"
        initial={{ pathLength: 0.16, pathOffset: 0, opacity: 0 }}
      />
      <motion.g
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 420, damping: 14, delay: 0.95 }}
      >
        <ellipse data-wink="" cx="31" cy="8" rx="2.9" ry="2.9" className="fill-signal" />
      </motion.g>
    </svg>
  );
}

export function Logo({
  className,
  wordmarkClassName,
  onDark = false,
  hideWordmark = false,
}: {
  className?: string;
  wordmarkClassName?: string;
  onDark?: boolean;
  /** Collapse the wordmark (it slides back in when this turns false again). */
  hideWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <LogoMark onDark={onDark} />
      <AnimatePresence initial={false}>
        {!hideWordmark && (
          <motion.span
            key="wordmark"
            className="inline-block overflow-hidden"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
          >
            <motion.span
              className={cn(
                "inline-block pl-2.5 text-[1.3rem] leading-none font-semibold tracking-[-0.05em] whitespace-nowrap",
                wordmarkClassName,
              )}
              initial={{ x: "-40%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-40%" }}
              transition={{ duration: 0.55, ease }}
            >
              winkvolt
            </motion.span>
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
