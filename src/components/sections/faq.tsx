import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { faqs, site } from "@/lib/site";

export function Faq({ index = "05" }: { index?: string }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-20 sm:py-28 lg:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel index={index} className="text-muted">
              FAQ
            </SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 id="faq-title" className="text-heading mt-8">
              Good <span className="font-serif font-normal italic">questions.</span>
            </h2>
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted">
              Something else on your mind?{" "}
              <a
                href={`mailto:${site.email}`}
                className="font-medium text-ink underline decoration-line decoration-2 underline-offset-4 transition-colors hover:decoration-signal"
              >
                Ask us directly.
              </a>
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.12} className="lg:col-span-7">
          <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-line">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.q} value={`item-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
