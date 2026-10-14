"use client";

import * as React from "react";
import { motion, useScroll, useSpring } from "motion/react";

import { Reveal } from "@/components/ui/reveal";
import { SectionLabel } from "@/components/ui/section-label";
import { process } from "@/lib/site";

export function Process() {
  const listRef = React.useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

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
          {/* progress rail */}
          <div aria-hidden className="absolute top-0 bottom-0 left-[1.375rem] w-px bg-line sm:left-7" />
          <motion.div
            aria-hidden
            className="absolute top-0 bottom-0 left-[1.375rem] w-[3px] -translate-x-px origin-top bg-ink sm:left-7"
            style={{ scaleY: progress }}
          />

          {process.map((item, i) => (
            <li key={item.step} className="relative pb-6 pl-16 last:pb-0 sm:pl-24">
              <Reveal delay={i * 0.05}>
                <span
                  aria-hidden
                  className="absolute top-6 left-0 grid size-11 place-items-center rounded-full border border-line bg-paper font-mono text-xs font-medium sm:top-8 sm:size-14 sm:text-sm"
                >
                  {item.step}
                </span>
                <div className="group rounded-[1.75rem] border border-line bg-paper p-6 transition-[background-color,border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink hover:bg-ink hover:text-paper sm:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">{item.title}</h3>
                    <span className="shrink-0 rounded-full bg-paper-2 px-3 py-1 font-mono text-xs text-ink transition-colors duration-500 group-hover:bg-volt">
                      {item.meta}
                    </span>
                  </div>
                  <p className="mt-3 max-w-lg leading-relaxed text-muted transition-colors duration-500 group-hover:text-paper/70">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
