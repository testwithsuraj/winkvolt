import { cn } from "@/lib/utils";

type SectionLabelProps = {
  index: string;
  children: React.ReactNode;
  className?: string;
};

export function SectionLabel({ index, children, className }: SectionLabelProps) {
  return (
    <div className={cn("flex items-center gap-3 font-mono text-xs tracking-[0.18em] uppercase", className)}>
      <span className="inline-grid h-6 min-w-6 place-items-center rounded-full bg-current/10 px-2 tabular">{index}</span>
      <span>{children}</span>
    </div>
  );
}
