import type { ServiceKey } from "@/lib/site";
import { cn } from "@/lib/utils";

const t = "transition-transform duration-500 ease-out-expo [transform-box:fill-box] [transform-origin:center]";

/** Compact service icons for menus. They animate on hover of the nearest `group/item`. */
export function ServiceGlyph({ kind, className }: { kind: ServiceKey; className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-8", className)}>
      {kind === "lenses" && (
        <>
          <g className="stroke-ink" strokeWidth="2" fill="none" strokeLinecap="round">
            <path d="M9 5H5v4M23 5h4v4M9 27H5v-4M23 27h4v-4" className={cn(t, "group-hover/item:scale-110")} />
          </g>
          <circle cx="16" cy="16" r="8" className="fill-volt stroke-ink" strokeWidth="2" />
          <circle cx="13.2" cy="14.5" r="1.3" className="fill-ink" />
          <circle cx="18.8" cy="14.5" r="1.3" className={cn(t, "fill-ink group-hover/item:scale-y-0")} />
          <path d="M12.5 18.5q3.5 2.6 7 0" fill="none" className="stroke-ink" strokeWidth="1.6" strokeLinecap="round" />
        </>
      )}
      {kind === "roblox" && (
        <g className={cn(t, "group-hover/item:-translate-y-0.5 group-hover/item:rotate-[8deg]")}>
          <path d="M16 5 26 10.5 16 16 6 10.5Z" className="fill-paper stroke-ink" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M6 10.5 16 16v11L6 21.5Z" className="fill-volt stroke-ink" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M26 10.5 16 16v11l10-5.5Z" className="fill-cobalt stroke-ink" strokeWidth="1.6" strokeLinejoin="round" />
        </g>
      )}
      {kind === "apps" && (
        <>
          <rect x="9" y="3.5" width="14" height="25" rx="4" className="fill-ink" />
          <rect x="11" y="6" width="10" height="20" rx="2.5" className="fill-paper" />
          <g className={cn(t, "group-hover/item:-translate-y-1")}>
            <rect x="12.5" y="9" width="7" height="4" rx="1.5" className="fill-signal" />
            <rect x="12.5" y="15" width="7" height="2" rx="1" className="fill-ink" />
            <rect x="12.5" y="19" width="5" height="2" rx="1" className="fill-line" />
          </g>
        </>
      )}
    </svg>
  );
}
