import { ServiceStack } from "@/components/sections/service-stack";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";

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

        <ServiceStack />
      </div>
    </section>
  );
}
