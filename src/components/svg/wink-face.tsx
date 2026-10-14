"use client";

import * as React from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";

const SPARKS = Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2);

/**
 * The hero character. Its eyes follow the pointer, it winks on hover,
 * and a tap or click makes it blink and throw off sparks.
 */
export function WinkFace({ className }: { className?: string }) {
  const ref = React.useRef<SVGSVGElement>(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = React.useState(false);
  const [blink, setBlink] = React.useState(false);
  const [burst, setBurst] = React.useState(0);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 140, damping: 18 });
  const sy = useSpring(py, { stiffness: 140, damping: 18 });
  const faceX = useTransform(sx, (v) => v * 0.5);
  const faceY = useTransform(sy, (v) => v * 0.5);

  React.useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy) || 1;
      const reach = Math.min(dist / 40, 9);
      px.set((dx / dist) * reach);
      py.set((dy / dist) * reach);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [px, py, reduce]);

  React.useEffect(() => {
    if (reduce) return;
    let timeout: ReturnType<typeof setTimeout>;
    const loop = () => {
      timeout = setTimeout(
        () => {
          setBlink(true);
          setTimeout(() => setBlink(false), 140);
          loop();
        },
        2600 + Math.random() * 2600,
      );
    };
    loop();
    return () => clearTimeout(timeout);
  }, [reduce]);

  const poke = () => {
    setBlink(true);
    setBurst((b) => b + 1);
    setTimeout(() => setBlink(false), 160);
  };

  const eyeScale = blink ? 0.08 : 1;
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <svg
      ref={ref}
      viewBox="-120 -120 240 240"
      className={className}
      role="img"
      aria-label="WinkVolt character. Tap to make it blink."
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onClick={poke}
      style={{ cursor: "pointer", touchAction: "manipulation" }}
    >
      {/* spark burst */}
      <g key={burst}>
        {burst > 0 &&
          SPARKS.map((a, i) => (
            <motion.line
              key={i}
              x1={Math.cos(a) * 92}
              y1={Math.sin(a) * 92}
              x2={Math.cos(a) * 104}
              y2={Math.sin(a) * 104}
              strokeWidth="5"
              strokeLinecap="round"
              className={i % 2 ? "stroke-signal" : "stroke-ink"}
              initial={{ opacity: 1, pathLength: 0, x: 0, y: 0 }}
              animate={{ opacity: 0, pathLength: 1, x: Math.cos(a) * 14, y: Math.sin(a) * 14 }}
              transition={{ duration: 0.7, ease }}
            />
          ))}
      </g>

      <motion.g
        animate={{ scale: hovered ? 1.03 : 1, rotate: hovered ? -4 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
      >
        <circle r="86" className="fill-volt" />

        <motion.g style={{ x: faceX, y: faceY }}>
          {/* left eye */}
          <motion.g
            animate={{ scaleY: eyeScale }}
            transition={{ duration: 0.08 }}
          >
            <ellipse cx="-28" cy="-18" rx="13" ry="17" className="fill-ink" />
            <motion.circle cx="-28" cy="-18" r="4.5" className="fill-paper" style={{ x: sx, y: sy }} />
          </motion.g>

          {/* right eye: open, or a wink chevron on hover */}
          <motion.g
            animate={{ scaleY: hovered ? 0 : eyeScale, opacity: hovered ? 0 : 1 }}
            transition={{ duration: hovered ? 0.12 : 0.08 }}
          >
            <ellipse cx="28" cy="-18" rx="13" ry="17" className="fill-ink" />
            <motion.circle cx="28" cy="-18" r="4.5" className="fill-paper" style={{ x: sx, y: sy }} />
          </motion.g>
          <motion.path
            d="M14 -14 L28 -26 L42 -14"
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-ink"
            initial={false}
            animate={{ pathLength: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.25, ease }}
          />

          {/* bolt smile */}
          <motion.path
            fill="none"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="stroke-ink"
            initial={false}
            animate={{
              d: hovered
                ? "M-44 18 L-22 40 L0 22 L22 40 L44 18"
                : "M-40 24 L-20 36 L0 24 L20 36 L40 24",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 16 }}
          />
          {/* cheek */}
          <motion.circle
            cx="50"
            cy="10"
            r="9"
            className="fill-signal"
            initial={false}
            animate={{ scale: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          />
        </motion.g>
      </motion.g>
    </svg>
  );
}
