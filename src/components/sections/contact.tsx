import { IdeaBubble } from "@/components/svg/idea-bubble";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { CalendarIcon } from "@/components/ui/calendar-icon";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal, SplitWords } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { site } from "@/lib/site";

export function Contact({ index = "06" }: { index?: string }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="overflow-hidden bg-volt py-20 text-ink sm:py-24 lg:py-28">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-8">
          <Reveal>
            <SectionLabel index={index} className="text-ink/70">
              Start a project
            </SectionLabel>
          </Reveal>

          <h2 id="contact-title" className="type-display mt-8">
            <SplitWords text="Got an idea?" className="block" />
            <span className="block">
              <SplitWords text="Let's make it" delay={0.15} />{" "}
              <SplitWords text="wink." delay={0.3} wordClassName="font-serif font-normal italic" />
            </span>
          </h2>

          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl type-lead text-ink/75">
              Grab 15 minutes with us or send an email. We&apos;ll take it from there.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic className="w-full sm:w-auto">
                <Button asChild size="lg" className="w-full sm:w-auto">
                  <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                    <CalendarIcon /> Book a 15-min call
                  </a>
                </Button>
              </Magnetic>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                <a href={`mailto:${site.email}?subject=${encodeURIComponent("New project")}`}>
                  Email us <ArrowIcon />
                </a>
              </Button>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:col-span-4">
          <IdeaBubble className="mx-auto w-52 sm:w-64 lg:w-full lg:max-w-sm" />
        </Reveal>
      </div>
    </section>
  );
}
