"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";

/** Simple CTA illustration: a chat bubble with a face that winks every few seconds. */
export function IdeaBubble({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [wink, setWink] = React.useState(false);

  React.useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      setWink(true);
      setTimeout(() => setWink(false), 450);
    }, 3200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <motion.svg
      viewBox="0 0 240 220"
      aria-hidden
      className={className}
      animate={reduce ? undefined : { y: [0, -10, 0], rotate: [-2, 2, -2] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      onPointerEnter={() => setWink(true)}
      onPointerLeave={() => setWink(false)}
    >
      <path d="M40 20h160a28 28 0 0 1 28 28v88a28 28 0 0 1-28 28h-96l-40 36v-36H40a28 28 0 0 1-28-28V48a28 28 0 0 1 28-28Z" className="fill-ink" />
      {/* eyes */}
      <ellipse cx="92" cy="78" rx="11" ry="14" className="fill-volt" />
      <motion.ellipse
        cx="148"
        cy="78"
        rx="11"
        ry="14"
        className="fill-volt"
        animate={{ scaleY: wink ? 0.08 : 1 }}
        transition={{ duration: 0.12 }}
      />
      <motion.path
        d="M136 82l12-10 12 10"
        fill="none"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-volt"
        initial={false}
        animate={{ opacity: wink ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      />
      {/* bolt smile */}
      <motion.path
        fill="none"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-volt"
        initial={false}
        animate={{ d: wink ? "M84 112 L102 128 L120 114 L138 128 L156 112" : "M86 116 L103 124 L120 116 L137 124 L154 116" }}
        transition={{ type: "spring", stiffness: 300, damping: 16 }}
      />
      {/* spark */}
      <motion.path
        d="M210 0l5 12 12 5-12 5-5 12-5-12-12-5 12-5Z"
        className="fill-signal"
        animate={reduce ? undefined : { scale: [0.7, 1.1, 0.7], rotate: [0, 45, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}
