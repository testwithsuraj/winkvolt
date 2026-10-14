import { ServiceArt } from "@/components/svg/service-art";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { PlayArea } from "@/components/ui/play-area";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { services, type ServiceKey } from "@/lib/site";
import { cn } from "@/lib/utils";

const theme: Record<ServiceKey, { card: string; panel: string; muted: string; chip: string }> = {
  lenses: { card: "bg-volt text-ink", panel: "bg-ink/[0.06]", muted: "text-ink/70", chip: "border-ink/20" },
  roblox: { card: "bg-cobalt text-paper", panel: "bg-ink/20", muted: "text-paper/75", chip: "border-paper/25" },
  apps: { card: "bg-signal text-ink", panel: "bg-ink/[0.08]", muted: "text-ink/70", chip: "border-ink/20" },
};

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="pb-20 sm:pb-28 lg:pb-36">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionLabel index="02" className="text-muted">
              What we build
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.08} className="lg:col-span-8">
            <h2 id="services-title" className="text-heading max-w-3xl">
              Three platforms. One obsession: <span className="font-serif font-normal italic">play.</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-14 space-y-5 sm:mt-20">
          {services.map((service, i) => {
            const c = theme[service.key];
            return (
              <div
                key={service.key}
                className="lg:sticky"
                style={{ top: `calc(5.5rem + ${i * 1.25}rem)` }}
              >
                <Reveal y={40}>
                  <PlayArea
                    amount={0.5}
                    className={cn(
                      "grid overflow-hidden rounded-[2rem] p-3 sm:p-4 md:grid-cols-2 md:gap-4 lg:min-h-[32rem]",
                      c.card,
                    )}
                  >
                    <article className="flex flex-col justify-between gap-10 p-4 sm:p-6 lg:p-8">
                      <div>
                        <div className="flex items-center justify-between font-mono text-xs tracking-[0.18em] uppercase">
                          <span>{service.index} / 03</span>
                          <span className={cn("hidden sm:inline", c.muted)}>{service.kicker}</span>
                        </div>
                        <h3 className="mt-8 text-[clamp(2.25rem,5vw,4.25rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
                          {service.title}
                        </h3>
                        <p className={cn("mt-5 max-w-md text-base leading-relaxed sm:text-lg", c.muted)}>
                          {service.body}
                        </p>
                      </div>
                      <div>
                        <ul className="flex flex-wrap gap-2">
                          {service.points.map((p) => (
                            <li key={p} className={cn("rounded-full border px-3.5 py-1.5 text-sm font-medium", c.chip)}>
                              {p}
                            </li>
                          ))}
                        </ul>
                        <a
                          href="#contact"
                          className="group/button mt-8 inline-flex items-center gap-2 text-base font-semibold underline decoration-current/30 decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-current"
                        >
                          Build with us <ArrowIcon />
                        </a>
                      </div>
                    </article>
                    <div
                      className={cn(
                        "relative grid aspect-[6/5] place-items-center overflow-hidden rounded-[1.5rem] md:aspect-auto",
                        c.panel,
                      )}
                    >
                      <ServiceArt kind={service.key} className="w-[85%] max-w-md" />
                    </div>
                  </PlayArea>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
