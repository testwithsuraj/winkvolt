"use client";

import * as React from "react";
import { motion, useInView, useScroll, useSpring } from "motion/react";

import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { process } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Process() {
  const listRef = React.useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 55%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  return (
    <section id="process" aria-labelledby="process-title" className="py-20 sm:py-28 lg:py-36">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <SectionLabel index="04" className="text-muted">
                How we work
              </SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="process-title" className="text-heading mt-8">
                From spark to <span className="font-serif font-normal italic">launch.</span>
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
                A tight, playable-first process. You see real builds early and often, so there are no surprises on
                launch day.
              </p>
            </Reveal>
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-7">
          {/* rail + scroll-driven fill */}
          <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-0.5 rounded-full bg-line sm:left-[9px]" />
          <motion.div
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-0.5 origin-top rounded-full bg-ink sm:left-[9px]"
            style={{ scaleY: progress }}
          />

          {process.map((item, i) => (
            <Step key={item.step} item={item} last={i === process.length - 1} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Step({ item, last }: { item: (typeof process)[number]; last: boolean }) {
  const ref = React.useRef<HTMLLIElement>(null);
  // A step lights up once its top passes the middle of the viewport, in step with the rail fill.
  const active = useInView(ref, { margin: "200% 0px -45% 0px" });

  return (
    <li ref={ref} className={cn("group relative pl-10 sm:pl-16", last ? "pb-0" : "pb-14 sm:pb-20")}>
      <span
        aria-hidden
        className={cn(
          "absolute top-2 left-0 grid size-4 place-items-center rounded-full border-2 transition-[background-color,border-color,transform] duration-500 ease-out-expo sm:size-5",
          active ? "scale-110 border-ink bg-volt" : "border-line bg-paper",
        )}
      >
        <span
          className={cn(
            "size-1.5 rounded-full bg-ink transition-transform duration-500 ease-out-expo",
            active ? "scale-100" : "scale-0",
          )}
        />
      </span>

      <Reveal y={20}>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "font-mono text-xs tracking-[0.18em] uppercase transition-colors duration-500",
              active ? "text-ink" : "text-muted",
            )}
          >
            Step {item.step}
          </span>
          <span className="h-px w-6 bg-line" aria-hidden />
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 font-mono text-xs transition-colors duration-500",
              active ? "bg-ink text-volt" : "bg-paper-2 text-muted",
            )}
          >
            {item.meta}
          </span>
        </div>

        <h3
          className={cn(
            "mt-4 text-[clamp(2.25rem,6vw,3.75rem)] leading-[0.95] font-semibold tracking-[-0.045em] transition-colors duration-500",
            active ? "text-ink" : "text-ink/25",
          )}
        >
          {item.title}
        </h3>
        <p
          className={cn(
            "mt-4 max-w-lg text-base leading-relaxed transition-colors duration-500 sm:text-lg",
            active ? "text-muted" : "text-muted/50",
          )}
        >
          {item.body}
        </p>
      </Reveal>
    </li>
  );
}
