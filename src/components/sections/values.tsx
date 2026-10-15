import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { values } from "@/lib/site";

export function Values({ index = "02" }: { index?: string }) {
  return (
    <section aria-labelledby="values-title" className="bg-ink py-20 text-paper sm:py-28 lg:py-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel index={index} className="text-paper/60">
              How we think
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <h2 id="values-title" className="type-h2 max-w-3xl">
              Four rules we <span className="font-serif font-normal text-volt italic">play by.</span>
            </h2>
          </Reveal>
        </div>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-[2rem] border border-paper/10 bg-paper/10 sm:mt-16 md:grid-cols-2">
          {values.map((v, i) => (
            <li key={v.title} className="bg-ink">
              <Reveal
                delay={(i % 2) * 0.08}
                className="group flex h-full flex-col gap-12 p-7 transition-colors duration-500 hover:bg-ink-2 sm:p-10"
              >
                <span className="grid size-11 place-items-center rounded-full border border-paper/20 font-mono text-sm transition-colors duration-500 group-hover:border-volt group-hover:bg-volt group-hover:text-ink">
                  0{i + 1}
                </span>
                <div>
                  <h3 className="type-h3">{v.title}</h3>
                  <p className="mt-3 max-w-md text-paper/65">{v.body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
