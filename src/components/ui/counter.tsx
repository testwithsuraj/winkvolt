"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

type CounterProps = {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

/** Counts up from zero the first time it scrolls into view. */
export function Counter({ to, suffix = "", duration = 2, className }: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduce) {
      node.textContent = `${to}${suffix}`;
      return;
    }
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        node.textContent = `${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, to, suffix, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {`${to}${suffix}`}
    </span>
  );
}
