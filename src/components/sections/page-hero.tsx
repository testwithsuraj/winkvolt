import { Reveal, SplitWords } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  eyebrow: React.ReactNode;
  title: string;
  /** Word(s) at the end of the title set in the italic serif. */
  accent?: string;
  description: React.ReactNode;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
};

/** Header for inner pages: copy on the left, an optional illustration on the right. */
export function PageHero({ eyebrow, title, accent, description, actions, aside, className }: PageHeroProps) {
  return (
    <section className={cn("pt-32 pb-16 sm:pt-40 sm:pb-24", className)}>
      <div className={cn("container-x grid items-center gap-12", aside && "lg:grid-cols-12 lg:gap-10")}>
        <div className={aside ? "lg:col-span-7" : "max-w-5xl"}>
          <Reveal>
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line bg-paper-2 py-1.5 pr-4 pl-1.5 text-sm font-medium">
              <span className="grid size-6 place-items-center rounded-full bg-ink">
                <span className="size-2 rounded-full bg-volt" />
              </span>
              {eyebrow}
            </div>
          </Reveal>
          <h1 className="type-h1 mt-7">
            <SplitWords text={title} />
            {accent && (
              <>
                {" "}
                <SplitWords text={accent} delay={0.25} wordClassName="font-serif font-normal italic" />
              </>
            )}
          </h1>
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-xl type-lead text-muted">{description}</p>
          </Reveal>
          {actions && (
            <Reveal delay={0.3}>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">{actions}</div>
            </Reveal>
          )}
        </div>
        {aside && (
          <Reveal delay={0.15} className="lg:col-span-5">
            {aside}
          </Reveal>
        )}
      </div>
    </section>
  );
}
