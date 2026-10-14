import { cn } from "@/lib/utils";

/** Small calendar glyph whose clock hand sweeps on hover of the nearest `group/button`. */
export function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden className={cn("size-[1.1em]", className)}>
      <rect x="2.5" y="4" width="15" height="13.5" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6.5 2.5v3M13.5 2.5v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="10" cy="11.5" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M10 11.5V9.6"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        className="origin-[10px_11.5px] transition-transform duration-700 ease-out-expo group-hover/button:rotate-[360deg]"
      />
    </svg>
  );
}
