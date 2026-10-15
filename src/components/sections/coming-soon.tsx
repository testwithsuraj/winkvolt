import Link from "next/link";

import { ServiceArt } from "@/components/svg/service-art";
import { ServiceGlyph } from "@/components/svg/service-glyph";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { serviceHref, services } from "@/lib/site";

type Service = (typeof services)[number];

/** "What's planned" list for a service that hasn't launched yet, plus a pointer to what's live today. */
export function ComingSoon({ service }: { service: Service }) {
  const live = services.find((s) => s.status === "live")!;
  return (
    <section aria-labelledby="planned-title" className="pb-20 sm:pb-28 lg:pb-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel index="01" className="text-muted">
              What&apos;s planned
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <h2 id="planned-title" className="type-h2 max-w-3xl">
              What we&apos;ll build <span className="font-serif font-normal italic">first.</span>
            </h2>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-[2rem] border border-line bg-line sm:mt-20 sm:grid-cols-2">
          {service.points.map((point, i) => (
            <li key={point} className="bg-paper">
              <Reveal delay={(i % 2) * 0.08} className="flex h-full items-center gap-5 p-7 sm:p-9">
                <span className="font-mono text-xs text-muted tabular">0{i + 1}</span>
                <span className="type-h3">{point}</span>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="mt-6">
          <Link
            href={serviceHref(live.slug)}
            className="group group/item flex flex-col gap-6 rounded-[2rem] bg-ink p-7 text-paper sm:flex-row sm:items-center sm:justify-between sm:p-9"
          >
            <div className="flex items-center gap-5">
              <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-volt">
                <ServiceGlyph kind={live.key} />
              </span>
              <div>
                <p className="font-mono text-xs tracking-[0.18em] text-paper/50 uppercase">Available now</p>
                <p className="mt-1 type-h3">{live.title}</p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 font-medium text-volt">
              Explore lenses <ArrowIcon />
            </span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/** Colored illustration panel used beside service page headers. */
export function ServicePanel({ service }: { service: Service }) {
  const tone =
    service.key === "lenses" ? "bg-volt" : service.key === "roblox" ? "bg-cobalt" : "bg-signal";
  return (
    <div className={`relative grid aspect-[5/4] place-items-center overflow-hidden rounded-[2rem] ${tone}`}>
      {service.status === "soon" && (
        <span className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 font-mono text-[0.7rem] tracking-[0.14em] text-paper uppercase">
          <span className="size-1.5 animate-pulse rounded-full bg-volt" />
          Coming soon
        </span>
      )}
      <ServiceArt kind={service.key} className="w-[80%]" />
    </div>
  );
}
