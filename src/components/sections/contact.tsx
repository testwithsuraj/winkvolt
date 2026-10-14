"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Magnetic } from "@/components/ui/magnetic";
import { Reveal, SplitWords } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const projectTypes = [
  { label: "Snapchat Lens", phrase: "a Snapchat Lens" },
  { label: "Roblox game", phrase: "a Roblox game" },
  { label: "Mobile app", phrase: "a mobile app" },
  { label: "Not sure yet", phrase: "a project" },
] as const;

export function Contact() {
  const [type, setType] = React.useState<(typeof projectTypes)[number]>(projectTypes[0]);
  const [copied, setCopied] = React.useState(false);

  const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`New project: ${type.label}`)}`;

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
          <SectionLabel index="06" className="text-ink/70">
            Start a project
          </SectionLabel>
        </Reveal>

        <h2 id="contact-title" className="text-display mt-8 max-w-6xl">
          <SplitWords text="Got an idea?" className="block" />
          <span className="block">
            <SplitWords text="Let's make it" delay={0.15} />{" "}
            <SplitWords text="wink." delay={0.3} wordClassName="font-serif font-normal italic" />
          </span>
        </h2>

        <div className="mt-14 grid gap-10 border-t border-ink/15 pt-10 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <fieldset>
              <legend className="font-mono text-xs tracking-[0.18em] uppercase">I&apos;m looking for</legend>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {projectTypes.map((t) => {
                  const active = t === type;
                  return (
                    <label
                      key={t.label}
                      className={cn(
                        "relative cursor-pointer rounded-full border px-5 py-3 text-base font-medium transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ink",
                        active ? "border-ink text-paper" : "border-ink/25 hover:border-ink",
                      )}
                    >
                      <input
                        type="radio"
                        name="project-type"
                        value={t.label}
                        checked={active}
                        onChange={() => setType(t)}
                        className="sr-only"
                      />
                      {active && (
                        <motion.span
                          layoutId="project-type-pill"
                          className="absolute inset-0 rounded-full bg-ink"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      <span className="relative">{t.label}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-4 lg:col-span-6 lg:items-end">
            <Magnetic className="w-full sm:w-auto">
              <Button asChild size="lg" className="h-16 w-full px-8 text-lg sm:w-auto">
                <a href={mailto}>
                  Email us about {type.phrase} <ArrowIcon />
                </a>
              </Button>
            </Magnetic>
            <button
              type="button"
              onClick={copy}
              className="group inline-flex items-center gap-3 self-start rounded-full py-2 text-lg font-medium lg:self-end"
              aria-live="polite"
            >
              <span className="underline decoration-ink/30 decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-ink">
                {site.email}
              </span>
              <span className="relative grid size-9 place-items-center rounded-full bg-ink text-volt">
                <AnimatePresence mode="wait" initial={false}>
                  {copied ? (
                    <motion.svg
                      key="check"
                      viewBox="0 0 16 16"
                      className="size-4"
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
                      className="size-4"
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
