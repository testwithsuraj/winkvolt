import { cn } from "@/lib/utils";

/*
 * Small animated glyphs for the capabilities grid. They animate through the
 * `play:` variant, so hovering (or scrolling past on touch) the tile brings them to life.
 */

const t = "transition-all duration-500 ease-out-expo [transform-box:fill-box] [transform-origin:center]";
const stroke = { fill: "none", strokeWidth: 2.5, strokeLinecap: "round", strokeLinejoin: "round" } as const;

function Face() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className="size-full">
      <circle cx="32" cy="32" r="20" className="stroke-current" {...stroke} />
      <circle cx="25" cy="28" r="2.5" className="fill-current" />
      <circle cx="39" cy="28" r="2.5" className={cn(t, "fill-current play:scale-y-0")} />
      <path d="M36 29l3-3 3 3" className={cn(t, "stroke-current opacity-0 play:opacity-100")} {...stroke} />
      <path d="M25 39q7 5 14 0" className="stroke-current" {...stroke} />
      {[
        [12, 18],
        [52, 18],
        [12, 46],
        [52, 46],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="2.5"
          className={cn(t, "fill-signal play:scale-150")}
          style={{ transitionDelay: `${i * 70}ms` }}
        />
      ))}
    </svg>
  );
}

function World() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className="size-full">
      <ellipse cx="32" cy="50" rx="22" ry="6" className="stroke-current" {...stroke} />
      <ellipse cx="32" cy="50" rx="10" ry="2.5" className={cn(t, "fill-current/20 play:scale-75")} />
      <g className={cn(t, "play:-translate-y-2.5 play:rotate-12")}>
        <path d="M32 14l12 7v13l-12 7-12-7V21Z" className="fill-volt stroke-current" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M20 21l12 7 12-7M32 28v13" className="stroke-current" {...stroke} />
      </g>
    </svg>
  );
}

function Hand() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className="size-full">
      <circle cx="32" cy="32" r="6" className="fill-signal" />
      <circle cx="32" cy="32" r="14" className={cn(t, "stroke-current opacity-40 play:scale-125 play:opacity-0")} {...stroke} />
      <circle cx="32" cy="32" r="22" className={cn(t, "stroke-current opacity-20 delay-100 play:scale-110 play:opacity-0")} {...stroke} />
      <path d="M32 6v6M32 52v6M6 32h6M52 32h6" className={cn(t, "stroke-current play:scale-90")} {...stroke} />
    </svg>
  );
}

function Multiplayer() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className="size-full">
      <g className={cn(t, "play:translate-x-2")}>
        <circle cx="16" cy="26" r="6" className="fill-cobalt" />
        <path d="M6 46q10-14 20 0" className="stroke-current" {...stroke} />
      </g>
      <g className={cn(t, "play:-translate-y-1.5")}>
        <circle cx="32" cy="22" r="7" className="fill-volt stroke-current" strokeWidth="2.5" />
        <path d="M20 46q12-16 24 0" className="stroke-current" {...stroke} />
      </g>
      <g className={cn(t, "play:-translate-x-2")}>
        <circle cx="48" cy="26" r="6" className="fill-signal" />
        <path d="M38 46q10-14 20 0" className="stroke-current" {...stroke} />
      </g>
    </svg>
  );
}

function Economy() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className="size-full">
      <ellipse cx="32" cy="48" rx="16" ry="5" className="fill-current/15 stroke-current" strokeWidth="2.5" />
      <ellipse cx="32" cy="40" rx="16" ry="5" className="fill-current/15 stroke-current" strokeWidth="2.5" />
      <g className={cn(t, "play:-translate-y-5")}>
        <ellipse cx="32" cy="32" rx="16" ry="5" className={cn(t, "fill-volt stroke-current play:scale-x-[0.3]")} strokeWidth="2.5" />
      </g>
      <path d="M50 14l2 5 5 2-5 2-2 5-2-5-5-2 5-2Z" className={cn(t, "fill-current scale-0 delay-150 play:scale-100")} />
    </svg>
  );
}

function Analytics() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className="size-full">
      <path d="M8 54h48" className="stroke-current" {...stroke} />
      {[
        [12, 30, "fill-current/20"],
        [24, 22, "fill-current/30"],
        [36, 32, "fill-current/40"],
        [48, 14, "fill-signal"],
      ].map(([x, h, c], i) => (
        <rect
          key={i}
          x={x as number}
          y={50 - (h as number)}
          width="8"
          height={h as number}
          rx="2"
          className={cn(t, c as string, "[transform-origin:bottom] scale-y-50 play:scale-y-100")}
          style={{ transitionDelay: `${i * 70}ms` }}
        />
      ))}
      <path
        d="M10 30 22 22l12 6 16-18"
        pathLength={1}
        className={cn(t, "stroke-current [stroke-dasharray:1] [stroke-dashoffset:1] play:[stroke-dashoffset:0]")}
        {...stroke}
      />
    </svg>
  );
}

const icons = {
  face: Face,
  world: World,
  hand: Hand,
  multiplayer: Multiplayer,
  economy: Economy,
  analytics: Analytics,
} as const;

export type CapabilityIconKey = keyof typeof icons;

export function CapabilityIcon({ kind, className }: { kind: CapabilityIconKey; className?: string }) {
  const Icon = icons[kind];
  return (
    <div className={cn("size-14", className)}>
      <Icon />
    </div>
  );
}
