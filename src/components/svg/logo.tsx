import { cn } from "@/lib/utils";

/** WinkVolt mark: a face that blinks on its own and winks on hover, with a bolt for a smile. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("group/logo size-9", className)} aria-hidden>
      <circle cx="20" cy="20" r="20" className="fill-volt" />
      <ellipse
        cx="14"
        cy="16"
        rx="2.6"
        ry="3.3"
        className="animate-blink fill-ink [transform-box:fill-box] [transform-origin:center]"
      />
      <g>
        <ellipse
          cx="26"
          cy="16"
          rx="2.6"
          ry="3.3"
          className="fill-ink transition-transform duration-200 [transform-box:fill-box] [transform-origin:center] group-hover/logo:scale-y-0"
        />
        <path
          d="M23 17l3-2.6 3 2.6"
          fill="none"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-ink opacity-0 transition-opacity duration-200 group-hover/logo:opacity-100"
        />
      </g>
      <path
        d="M11.5 24.5l5 3.5 3.5-4 3.5 4 5-3.5"
        fill="none"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-ink"
      />
    </svg>
  );
}

export function Logo({ className, wordmarkClassName }: { className?: string; wordmarkClassName?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className={cn("text-xl font-semibold tracking-[-0.04em]", wordmarkClassName)}>winkvolt</span>
    </span>
  );
}
