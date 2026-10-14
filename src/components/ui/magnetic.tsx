"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type MagneticProps = {
  children: React.ReactNode;
  strength?: number;
  className?: string;
};

/** Gently pulls its child toward the pointer while hovered (pointer devices only). */
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className={className ?? "inline-block"}
    >
      {children}
    </motion.div>
  );
}
