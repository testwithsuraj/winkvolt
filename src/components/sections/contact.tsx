"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { CalendarIcon } from "@/components/ui/calendar-icon";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal, SplitWords } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { site } from "@/lib/site";

export function Contact({ index = "06" }: { index?: string }) {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-volt py-20 text-ink sm:py-28 lg:py-36">
      <div className="container-x">
        <Reveal>
          <SectionLabel index={index} className="text-ink/70">
            Start a project
          </SectionLabel>
        </Reveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <h2 id="contact-title" className="text-display text-[clamp(2.75rem,6vw,6.25rem)] lg:col-span-8">
            <SplitWords text="Got an idea?" className="block" />
            <span className="block">
              <SplitWords text="Let's make it" delay={0.15} />{" "}
              <SplitWords text="wink." delay={0.3} wordClassName="font-serif font-normal italic" />
            </span>
          </h2>

          <Reveal delay={0.15} className="lg:col-span-4 lg:pb-3">
            <p className="max-w-sm text-lg leading-relaxed text-ink/75">
              Tell us what you&apos;re dreaming up. Grab 15 minutes with us or send an email, and we&apos;ll take it
              from there.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
              <Magnetic className="w-full sm:w-auto lg:w-full xl:w-auto">
                <Button asChild size="lg" className="w-full">
                  <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                    <CalendarIcon /> Book a 15-min call
                  </a>
                </Button>
              </Magnetic>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto lg:w-full xl:w-auto">
                <a href={`mailto:${site.email}?subject=${encodeURIComponent("New project")}`}>
                  Email us <ArrowIcon />
                </a>
              </Button>
            </div>

            <button
              type="button"
              onClick={copy}
              className="group mt-6 inline-flex items-center gap-2.5 text-base font-medium"
              aria-live="polite"
            >
              <span className="underline decoration-ink/30 decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-ink">
                {site.email}
              </span>
              <span className="grid size-8 place-items-center rounded-full bg-ink text-volt">
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.svg
                      key="check"
                      viewBox="0 0 16 16"
                      className="size-3.5"
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                    >
                      <motion.path
                        d="M3 8.5l3 3 7-7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.35 }}
                      />
                    </motion.svg>
                  ) : (
                    <motion.svg
                      key="copy"
                      viewBox="0 0 16 16"
                      className="size-3.5"
                      initial={{ scale: 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.4, opacity: 0 }}
                    >
                      <rect x="5" y="5" width="8" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M3 10V4a1 1 0 0 1 1-1h6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </motion.svg>
                  )}
                </AnimatePresence>
              </span>
              <span className="sr-only">{copied ? "Email copied" : "Copy email address"}</span>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
