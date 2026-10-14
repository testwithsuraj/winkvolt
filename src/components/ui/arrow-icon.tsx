import { cn } from "@/lib/utils";

/** Arrow that slides out and back in on hover of the nearest `group/button` or `group` parent. */
export function ArrowIcon({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn("relative inline-block size-4 overflow-hidden", className)}>
      <svg
        viewBox="0 0 16 16"
        className="absolute inset-0 size-4 transition-transform duration-500 ease-out-expo group-hover/button:translate-x-full group-hover/button:-translate-y-full group-hover:translate-x-full group-hover:-translate-y-full"
      >
        <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      <svg
        viewBox="0 0 16 16"
        className="absolute inset-0 size-4 -translate-x-full translate-y-full transition-transform duration-500 ease-out-expo group-hover/button:translate-x-0 group-hover/button:translate-y-0 group-hover:translate-x-0 group-hover:translate-y-0"
      >
        <path d="M4 12 12 4M5.5 4H12v6.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}
