import { cn } from "@/lib/utils";
import type { ServiceKey } from "@/lib/site";

/*
 * Illustrations for the service cards. Each one reacts to hover on the
 * nearest `PlayArea` (see the `play:` variant in globals.css) using plain CSS transitions, so they stay
 * server-rendered and cost nothing until someone interacts.
 */

const t = "transition-all duration-700 ease-out-expo [transform-box:fill-box] [transform-origin:center]";

function LensArt() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" aria-hidden>
      {/* tracking frame */}
      <g className="stroke-ink" strokeWidth="3" fill="none" strokeLinecap="round">
        <path d="M58 30h-18v18" className={cn(t, "play:-translate-x-1.5 play:-translate-y-1.5")} />
        <path d="M182 30h18v18" className={cn(t, "play:translate-x-1.5 play:-translate-y-1.5")} />
        <path d="M58 178h-18v-18" className={cn(t, "play:-translate-x-1.5 play:translate-y-1.5")} />
        <path d="M182 178h18v-18" className={cn(t, "play:translate-x-1.5 play:translate-y-1.5")} />
      </g>
      {/* ears pop up on hover */}
      <path d="M78 66 64 24l40 26Z" className={cn(t, "fill-ink scale-0 play:scale-100")} />
      <path d="M162 66l14-42-40 26Z" className={cn(t, "fill-ink scale-0 delay-75 play:scale-100")} />
      {/* face */}
      <circle cx="120" cy="104" r="58" className="fill-paper stroke-ink" strokeWidth="3" />
      {/* eyes */}
      <circle cx="100" cy="96" r="6" className="fill-ink" />
      <circle cx="140" cy="96" r="6" className={cn(t, "fill-ink play:scale-y-0")} />
      <path
        d="M132 98l8-7 8 7"
        fill="none"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(t, "stroke-ink opacity-0 play:opacity-100")}
      />
      {/* glasses drop in */}
      <g className={cn(t, "-translate-y-16 opacity-0 play:translate-y-0 play:opacity-100")}>
        <rect x="82" y="84" width="32" height="22" rx="8" className="fill-ink" />
        <rect x="126" y="84" width="32" height="22" rx="8" className="fill-ink" />
        <path d="M114 92h12" className="stroke-ink" strokeWidth="4" />
        <rect x="88" y="88" width="8" height="5" rx="2.5" className="fill-volt" />
        <rect x="132" y="88" width="8" height="5" rx="2.5" className="fill-volt" />
      </g>
      {/* mouth */}
      <path d="M102 126q18 14 36 0" fill="none" strokeWidth="3.5" strokeLinecap="round" className="stroke-ink" />
      {/* tracking points */}
      {[
        [76, 80],
        [164, 80],
        [120, 158],
        [70, 118],
        [170, 118],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="3.5"
          className="fill-signal transition-transform duration-500 [transform-box:fill-box] [transform-origin:center] play:scale-150"
          style={{ transitionDelay: `${i * 60}ms` }}
        />
      ))}
      {/* sparkles */}
      <path
        d="M206 70l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z"
        className={cn(t, "fill-ink scale-0 rotate-45 play:scale-100 play:rotate-0")}
      />
      <path
        d="M30 120l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"
        className={cn(t, "fill-ink scale-0 delay-150 play:scale-100")}
      />
    </svg>
  );
}

export function Cube({ x, y, s = 1, className }: { x: number; y: number; s?: number; className?: string }) {
  const w = 34 * s;
  const h = 20 * s;
  const d = 40 * s;
  return (
    <g className={className}>
      <path d={`M${x} ${y} l${w} ${h} l${w} ${-h} l${-w} ${-h}Z`} className="fill-paper" />
      <path d={`M${x} ${y} l${w} ${h} v${d} l${-w} ${-h}Z`} className="fill-volt" />
      <path d={`M${x + w} ${y + h} l${w} ${-h} v${d} l${-w} ${h}Z`} className="fill-ink" />
    </g>
  );
}

function RobloxArt() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" aria-hidden>
      <ellipse cx="120" cy="176" rx="86" ry="12" className="fill-ink/25" />
      <Cube x={52} y={110} className={cn(t, "play:-translate-x-2")} />
      <Cube x={120} y={110} className={cn(t, "play:translate-x-2")} />
      <Cube x={86} y={130} className={cn(t, "play:translate-y-1")} />
      <Cube x={86} y={70} className={cn(t, "delay-75 play:-translate-y-8 play:rotate-[8deg]")} />
      {/* coin */}
      <g className={cn(t, "translate-y-6 opacity-0 delay-150 play:translate-y-0 play:opacity-100")}>
        <circle cx="190" cy="44" r="14" className="fill-volt stroke-ink" strokeWidth="3" />
        <path d="M190 37v14" className="stroke-ink" strokeWidth="3" strokeLinecap="round" />
      </g>
      {/* plus ones */}
      <text
        x="34"
        y="56"
        className={cn(t, "fill-paper font-mono text-[18px] font-bold opacity-0 play:-translate-y-3 play:opacity-100")}
      >
        +1
      </text>
    </svg>
  );
}

function AppArt() {
  return (
    <svg viewBox="0 0 240 200" className="h-full w-full" aria-hidden>
      <defs>
        <clipPath id="app-screen">
          <rect x="80" y="22" width="80" height="164" rx="12" />
        </clipPath>
      </defs>
      <rect x="72" y="12" width="96" height="184" rx="20" className="fill-ink" />
      <rect x="80" y="22" width="80" height="164" rx="12" className="fill-paper" />
      <g clipPath="url(#app-screen)">
        <g className={cn(t, "play:-translate-y-12")}>
          <rect x="88" y="40" width="64" height="40" rx="8" className="fill-volt" />
          <circle cx="100" cy="52" r="5" className="fill-ink" />
          {[92, 120, 148, 176, 204].map((y, i) => (
            <g key={y}>
              <rect x="88" y={y} width="18" height="18" rx="6" className={i % 2 ? "fill-cobalt" : "fill-signal"} />
              <rect x="112" y={y + 3} width="40" height="5" rx="2.5" className="fill-ink" />
              <rect x="112" y={y + 11} width="26" height="4" rx="2" className="fill-line" />
            </g>
          ))}
        </g>
      </g>
      <rect x="106" y="26" width="28" height="7" rx="3.5" className="fill-ink" />
      {/* notification */}
      <g className={cn(t, "-translate-y-6 opacity-0 play:translate-y-0 play:opacity-100")}>
        <rect x="150" y="30" width="78" height="30" rx="15" className="fill-ink" />
        <circle cx="166" cy="45" r="7" className="fill-volt" />
        <rect x="178" y="41" width="40" height="4" rx="2" className="fill-paper" />
        <rect x="178" y="49" width="24" height="3" rx="1.5" className="fill-paper/60" />
      </g>
      {/* heart */}
      <path
        d="M40 120c-8-8-20-2-14 8l14 14 14-14c6-10-6-16-14-8Z"
        className={cn(t, "fill-ink scale-0 -rotate-12 delay-100 play:scale-100 play:rotate-0")}
      />
    </svg>
  );
}

export function ServiceArt({ kind, className }: { kind: ServiceKey; className?: string }) {
  return (
    <div className={className}>
      {kind === "lenses" && <LensArt />}
      {kind === "roblox" && <RobloxArt />}
      {kind === "apps" && <AppArt />}
    </div>
  );
}
