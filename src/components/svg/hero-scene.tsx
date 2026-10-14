"use client";

import * as React from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { Cube } from "@/components/svg/service-art";

const ease = [0.16, 1, 0.3, 1] as const;
const spring = { type: "spring", stiffness: 320, damping: 18 } as const;

const LENSES = [
  { key: "shades", swatch: "fill-ink" },
  { key: "pup", swatch: "fill-signal" },
  { key: "crown", swatch: "fill-volt" },
  { key: "wink", swatch: "fill-cobalt" },
] as const;

type LensKey = (typeof LENSES)[number]["key"];

/** A layer that drifts with the pointer; deeper layers move further. */
function Layer({
  depth,
  mx,
  my,
  children,
}: {
  depth: number;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  children: React.ReactNode;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return <motion.g style={{ x, y }}>{children}</motion.g>;
}

function Sparkle({ x, y, s = 1, delay = 0, className }: { x: number; y: number; s?: number; delay?: number; className?: string }) {
  return (
    <motion.path
      d={`M${x} ${y - 14 * s}l${4 * s} ${10 * s} ${10 * s} ${4 * s}-${10 * s} ${4 * s}-${4 * s} ${10 * s}-${4 * s}-${10 * s}-${10 * s}-${4 * s} ${10 * s}-${4 * s}Z`}
      className={className ?? "fill-ink"}
      animate={{ scale: [0.4, 1, 0.4], rotate: [0, 90, 180], opacity: [0.4, 1, 0.4] }}
      transition={{ duration: 3.2, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

function LensOverlay({ lens }: { lens: LensKey }) {
  return (
    <AnimatePresence mode="popLayout">
      {lens === "shades" && (
        <motion.g
          key="shades"
          initial={{ y: -150, rotate: -12 }}
          animate={{ y: 0, rotate: 0 }}
          exit={{ y: -150, opacity: 0 }}
          transition={{ ...spring, stiffness: 260 }}
        >
          <rect x="252" y="266" width="42" height="28" rx="10" className="fill-ink" />
          <rect x="306" y="266" width="42" height="28" rx="10" className="fill-ink" />
          <path d="M294 276h12" className="stroke-ink" strokeWidth="5" />
          <rect x="259" y="271" width="11" height="6" rx="3" className="fill-volt" />
          <rect x="313" y="271" width="11" height="6" rx="3" className="fill-volt" />
        </motion.g>
      )}
      {lens === "pup" && (
        <motion.g key="pup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.path
            d="M250 250 236 190l52 34Z"
            className="fill-ink"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: [0, -8, 0] }}
            transition={{ scale: spring, rotate: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } }}
          />
          <motion.path
            d="M350 250l14-60-52 34Z"
            className="fill-ink"
            initial={{ scale: 0, rotate: 30 }}
            animate={{ scale: 1, rotate: [0, 8, 0] }}
            transition={{ scale: { ...spring, delay: 0.06 }, rotate: { duration: 1.6, repeat: Infinity, ease: "easeInOut" } }}
          />
          <motion.ellipse cx="300" cy="300" rx="10" ry="7" className="fill-ink" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={spring} />
          <motion.circle cx="262" cy="306" r="9" className="fill-signal" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...spring, delay: 0.1 }} />
          <motion.circle cx="338" cy="306" r="9" className="fill-signal" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ ...spring, delay: 0.1 }} />
        </motion.g>
      )}
      {lens === "crown" && (
        <motion.g
          key="crown"
          initial={{ y: -140, rotate: 14 }}
          animate={{ y: 0, rotate: 0 }}
          exit={{ y: -140, opacity: 0 }}
          transition={{ ...spring, stiffness: 240, damping: 12 }}
        >
          <path
            d="M260 238l-6-44 24 20 22-30 22 30 24-20-6 44Z"
            className="fill-signal stroke-ink"
            strokeWidth="4.5"
            strokeLinejoin="round"
          />
          <circle cx="300" cy="222" r="5" className="fill-volt stroke-ink" strokeWidth="2.5" />
          <circle cx="273" cy="226" r="3.5" className="fill-paper" />
          <circle cx="327" cy="226" r="3.5" className="fill-paper" />
        </motion.g>
      )}
    </AnimatePresence>
  );
}

/**
 * Hero illustration: a phone running a lens on the WinkVolt face, surrounded by
 * Roblox blocks, live stats and notifications. Lenses cycle on their own, a
 * click switches to the next one, and every layer drifts with the pointer.
 */
export function HeroScene({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const [index, setIndex] = React.useState(0);
  const [blink, setBlink] = React.useState(false);
  const [wink, setWink] = React.useState(false);
  const lens = LENSES[index].key;

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 80, damping: 20 });
  const my = useSpring(rawY, { stiffness: 80, damping: 20 });
  const pupilX = useTransform(mx, (v) => v * 2.6);
  const pupilY = useTransform(my, (v) => v * 2.6);

  // Pointer parallax, normalised to -1..1 around the viewport centre.
  React.useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      rawX.set((e.clientX / window.innerWidth) * 2 - 1);
      rawY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [rawX, rawY, reduce]);

  // Switch to the next lens, with a wink as it changes.
  const winkTimer = React.useRef<ReturnType<typeof setTimeout>>(undefined);
  const next = React.useCallback(() => {
    setIndex((i) => (i + 1) % LENSES.length);
    setWink(true);
    clearTimeout(winkTimer.current);
    winkTimer.current = setTimeout(() => setWink(false), 420);
  }, []);

  React.useEffect(() => () => clearTimeout(winkTimer.current), []);

  // Auto-cycle; the timer restarts after every change, including clicks.
  React.useEffect(() => {
    const id = setTimeout(next, 2800);
    return () => clearTimeout(id);
  }, [index, next]);

  // Natural blinking.
  React.useEffect(() => {
    if (reduce) return;
    let t: ReturnType<typeof setTimeout>;
    const loop = () => {
      t = setTimeout(() => {
        setBlink(true);
        setTimeout(() => setBlink(false), 130);
        loop();
      }, 1800 + Math.random() * 2200);
    };
    loop();
    return () => clearTimeout(t);
  }, [reduce]);

  const rightClosed = wink || lens === "wink";

  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      role="img"
      aria-label="Animated illustration: a phone running a Snapchat-style lens, Roblox blocks and app notifications. Click to switch lenses."
      onClick={next}
      style={{ cursor: "pointer", touchAction: "manipulation" }}
    >
      <defs>
        <clipPath id="hero-screen">
          <rect x="207" y="97" width="186" height="406" rx="32" />
        </clipPath>
      </defs>

      {/* backdrop */}
      <Layer depth={-6} mx={mx} my={my}>
        <motion.g animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
          <circle cx="300" cy="300" r="282" fill="none" className="stroke-ink/20" strokeWidth="1.2" strokeDasharray="3 9" />
          <circle cx="300" cy="18" r="6" className="fill-signal" />
          <circle cx="18" cy="300" r="4" className="fill-ink" />
        </motion.g>
        <circle cx="300" cy="300" r="244" className="fill-cobalt" />
      </Layer>

      {/* roblox blocks */}
      <Layer depth={12} mx={mx} my={my}>
        <g transform="translate(14 300)">
          <ellipse cx="102" cy="226" rx="78" ry="12" className="fill-ink/30" />
          <Cube x={34} y={150} />
          <Cube x={102} y={150} />
          <Cube x={68} y={170} />
          <motion.g
            animate={{ y: [0, -16, 0], rotate: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <Cube x={68} y={110} />
          </motion.g>
        </g>
        <motion.g
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.g animate={{ scaleX: [1, 0.15, 1] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
            <circle cx="62" cy="372" r="18" className="fill-volt stroke-ink" strokeWidth="4" />
            <path d="M62 363v18" className="stroke-ink" strokeWidth="4" strokeLinecap="round" />
          </motion.g>
        </motion.g>
      </Layer>

      {/* phone */}
      <Layer depth={6} mx={mx} my={my}>
        <motion.g
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="195" y="85" width="210" height="430" rx="44" className="fill-ink" />
          <rect x="207" y="97" width="186" height="406" rx="32" className="fill-paper" />

          <g clipPath="url(#hero-screen)">
            {/* tracking frame */}
            <motion.g
              key={`frame-${index}`}
              initial={{ scale: 1.12, opacity: 0.4 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease }}
            >
              <g className="stroke-ink" strokeWidth="4" fill="none" strokeLinecap="round">
                <path d="M248 196h-20v20" />
                <path d="M352 196h20v20" />
                <path d="M248 384h-20v-20" />
                <path d="M352 384h20v-20" />
              </g>
            </motion.g>

            {/* face */}
            <circle cx="300" cy="290" r="66" className="fill-volt stroke-ink" strokeWidth="4.5" />
            <motion.g animate={{ scaleY: blink ? 0.08 : 1 }} transition={{ duration: 0.07 }}>
              <ellipse cx="277" cy="280" rx="9" ry="12" className="fill-ink" />
              <motion.circle cx="277" cy="277" r="3" className="fill-paper" style={{ x: pupilX, y: pupilY }} />
            </motion.g>
            <motion.g animate={{ scaleY: rightClosed || blink ? 0.06 : 1 }} transition={{ duration: 0.08 }}>
              <ellipse cx="323" cy="280" rx="9" ry="12" className="fill-ink" />
              <motion.circle cx="323" cy="277" r="3" className="fill-paper" style={{ x: pupilX, y: pupilY }} />
            </motion.g>
            <motion.path
              d="M313 283l10-9 10 9"
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-ink"
              initial={false}
              animate={{ opacity: rightClosed ? 1 : 0 }}
              transition={{ duration: 0.1 }}
            />
            <motion.path
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="stroke-ink"
              initial={false}
              animate={{
                d: rightClosed
                  ? "M268 312 L284 326 L300 314 L316 326 L332 312"
                  : "M270 316 L285 323 L300 315 L315 323 L330 316",
              }}
              transition={spring}
            />

            <LensOverlay lens={lens} />

            {/* tracking points */}
            {[
              [236, 262],
              [364, 262],
              [300, 358],
              [244, 330],
              [356, 330],
            ].map(([cx, cy], i) => (
              <motion.circle
                key={`${i}-${index}`}
                cx={cx}
                cy={cy}
                r="4"
                className="fill-signal"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.6, 1] }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              />
            ))}

            {/* lens carousel */}
            {LENSES.map((l, i) => (
              <motion.circle
                key={l.key}
                cy="458"
                r="13"
                className={`${l.swatch} stroke-ink`}
                strokeWidth="2.5"
                initial={false}
                animate={{ cx: 300 + (i - index) * 44, scale: i === index ? 1 : 0.8 }}
                transition={{ duration: 0.6, ease }}
              />
            ))}
            <circle cx="300" cy="458" r="22" fill="none" className="stroke-ink" strokeWidth="4" />
          </g>
          <rect x="274" y="108" width="52" height="15" rx="7.5" className="fill-ink" />
        </motion.g>
      </Layer>

      {/* floating UI */}
      <Layer depth={20} mx={mx} my={my}>
        <motion.g
          animate={{ y: [0, -10, 0], rotate: [-4, -2, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect x="384" y="118" width="176" height="56" rx="28" className="fill-volt stroke-ink" strokeWidth="3" />
          <circle cx="412" cy="146" r="17" className="fill-ink" />
          <path d="M414 135l-9 13h7l-2 9 9-13h-7Z" className="fill-volt" />
          <text x="438" y="153" className="fill-ink font-sans text-[20px] font-semibold tracking-tight">
            150+ lenses
          </text>
        </motion.g>

        <motion.g
          animate={{ y: [0, 10, 0], rotate: [3, 5, 3] }}
          transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        >
          <rect x="26" y="168" width="186" height="56" rx="28" className="fill-ink" />
          <circle cx="54" cy="196" r="17" className="fill-signal" />
          <circle cx="54" cy="196" r="6" className="fill-ink" />
          <text x="80" y="203" className="fill-paper font-sans text-[20px] font-semibold tracking-tight">
            500M+ views
          </text>
        </motion.g>

        {/* notification that pops in and out */}
        <motion.g
          animate={{ y: [24, 0, 0, 24], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 5.6, times: [0, 0.12, 0.85, 1], repeat: Infinity, repeatDelay: 0.6 }}
        >
          <rect x="370" y="398" width="200" height="68" rx="20" className="fill-paper stroke-ink" strokeWidth="3" />
          <rect x="384" y="412" width="40" height="40" rx="12" className="fill-signal" />
          <path d="M404 442c-7-6-15-1-11 6l11 10 11-10c4-7-4-12-11-6Z" transform="translate(0 -14)" className="fill-paper" />
          <text x="436" y="430" className="fill-ink font-sans text-[15px] font-semibold">
            Your lens is live
          </text>
          <rect x="436" y="440" width="96" height="7" rx="3.5" className="fill-line" />
        </motion.g>

        {[0, 1, 2].map((i) => (
          <motion.path
            key={i}
            d="M520 392c-6-5-13-1-10 5l10 9 10-9c3-6-4-10-10-5Z"
            className={i === 1 ? "fill-volt stroke-ink" : "fill-signal"}
            strokeWidth="2"
            animate={{ y: [0, -90], x: [0, i % 2 ? 14 : -12], opacity: [0, 1, 0], scale: [0.6, 1.1, 0.8] }}
            transition={{ duration: 2.6, repeat: Infinity, delay: 1 + i * 0.8, ease: "easeOut" }}
          />
        ))}

        <Sparkle x={520} y={250} s={1.3} className="fill-volt stroke-ink" />
        <Sparkle x={150} y={110} s={1.1} delay={1.1} />
        <Sparkle x={470} y={520} s={0.9} delay={0.6} className="fill-signal" />
      </Layer>
    </svg>
  );
}
