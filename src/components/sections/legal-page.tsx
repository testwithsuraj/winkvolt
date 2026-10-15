import { Reveal } from "@/components/ui/reveal";

export type LegalSection = { heading: string; body: React.ReactNode };

export function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: React.ReactNode; sections: LegalSection[] }) {
  return (
    <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">Legal · Updated {updated}</p>
              <h1 className="type-h1 mt-6">{title}</h1>
            </Reveal>
          </div>
        </div>
        <Reveal delay={0.1} className="lg:col-span-8">
          <div className="max-w-2xl type-lead text-muted">{intro}</div>
          <ol className="mt-12 space-y-10 border-t border-line pt-10">
            {sections.map((s, i) => (
              <li key={s.heading} className="grid gap-3 sm:grid-cols-[3rem_1fr]">
                <span className="font-mono text-sm text-muted tabular">0{i + 1}</span>
                <div>
                  <h2 className="type-title">{s.heading}</h2>
                  <div className="mt-3 max-w-2xl space-y-3 leading-relaxed text-muted">{s.body}</div>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
