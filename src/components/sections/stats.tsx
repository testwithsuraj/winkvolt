import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { stats } from "@/lib/site";

export function Stats({ index = "01" }: { index?: string }) {
  return (
    <section aria-labelledby="stats-title" className="py-16 sm:py-20 lg:py-24">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel index={index} className="text-muted">
              By the numbers
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <h2 id="stats-title" className="type-h2 max-w-3xl">
              Built for reach. Measured in <span className="font-serif font-normal italic">millions.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line sm:mt-12 md:grid-cols-2">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              delay={i * 0.1}
              className="group @container relative flex min-h-44 flex-col justify-between gap-10 overflow-hidden bg-paper p-7 transition-colors duration-500 hover:bg-ink hover:text-paper sm:p-9"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs tracking-[0.18em] text-muted uppercase transition-colors duration-500 group-hover:text-paper/60">
                  {stat.label}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden
                  className="size-6 transition-transform duration-700 ease-out-expo group-hover:scale-125 group-hover:-rotate-12"
                >
                  <path d="M13 2 4 14h7l-1 8 9-12h-7Z" className="fill-volt stroke-ink" strokeWidth="1.5" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <Counter
                  to={stat.value}
                  delay={i * 0.12}
                  suffix={stat.suffix}
                  className="block type-h1 tabular"
                />
                <p className="mt-4 text-base text-muted transition-colors duration-500 group-hover:text-paper/70">
                  {stat.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
