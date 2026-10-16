"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { HeroScene } from "@/components/svg/hero-scene";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { CalendarIcon } from "@/components/ui/calendar-icon";
import { Counter } from "@/components/ui/counter";
import { Magnetic } from "@/components/ui/magnetic";
import { SplitWords } from "@/components/ui/reveal";
import { RotatingWord } from "@/components/ui/rotating-word";
import { site } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

/** Verbs that complete "We build things people ___ with." */
const heroWords = ["play", "create", "connect", "shop", "engage"] as const;

/** Inline "coming soon" marker for services that haven't launched yet. */
function Soon() {
  return (
    <span className="mx-1 inline-flex -translate-y-px items-center gap-1 rounded-full bg-ink px-2 py-0.5 align-middle font-mono text-[0.6rem] leading-none tracking-[0.12em] text-paper uppercase">
      <span className="size-1 rounded-full bg-volt" />
      Soon
    </span>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden pt-24 pb-14 sm:pt-28 lg:min-h-[100svh] lg:pt-28 lg:pb-12"
    >
      <div className="container-x grid flex-1 items-center gap-10 lg:grid-cols-12 lg:gap-10 xl:gap-16">
        {/* copy */}
        <div className="lg:col-span-7">
          <motion.div
            {...fadeUp(0)}
            className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-line bg-paper-2 py-1.5 pr-4 pl-1.5 text-sm lg:mb-[min(1.75rem,3vh)]"
          >
            <span className="relative grid size-6 place-items-center rounded-full bg-ink">
              <span className="size-2 animate-pulse rounded-full bg-volt" />
            </span>
            <span className="font-medium">Creative tech studio</span>
            <span className="hidden text-muted sm:inline">· AR, games &amp; apps</span>
          </motion.div>

          <h1 className="type-display lg:text-[clamp(3.25rem,min(1.2rem+3.8vw,10.5vh),4.5rem)] lg:whitespace-nowrap">
            <span className="sr-only">We build things people play with.</span>
            <span aria-hidden>
              <SplitWords text="We build things" className="block" />
              <span className="block">
                <SplitWords text="people" delay={0.12} />{" "}
                <RotatingWord
                  words={heroWords}
                  delay={0.22}
                  className="bg-volt"
                  wordClassName="font-serif font-normal tracking-[-0.02em] italic"
                />
              </span>
              <SplitWords text="with." delay={0.3} className="block" />
            </span>
          </h1>

          <motion.p
            {...fadeUp(0.45)}
            className="mt-6 max-w-xl type-lead text-muted lg:mt-[min(1.75rem,3vh)] lg:max-w-[33rem]"
          >
            WinkVolt designs and builds Snapchat Lenses, Roblox games
            <Soon /> and mobile apps
            <Soon /> that people open, play and share, again and again.
          </motion.p>

          <motion.div
            {...fadeUp(0.55)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-[min(2.25rem,4vh)]"
          >
            <Magnetic className="w-full sm:w-auto">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/contact">
                  Start a project <ArrowIcon />
                </Link>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                <CalendarIcon /> Book a 15-min call
              </a>
            </Button>
          </motion.div>

          <motion.dl
            {...fadeUp(0.7)}
            className="mt-10 flex max-w-md divide-x divide-line border-t border-line pt-5 lg:hidden"
          >
            <div className="pr-6">
              <dt className="text-sm text-muted">Lenses built</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight tabular">
                <Counter to={150} suffix="+" delay={0.7} />
              </dd>
            </div>
            <div className="px-6">
              <dt className="text-sm text-muted">Total views</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight tabular">
                <Counter to={300} suffix="M+" delay={0.8} />
              </dd>
            </div>
          </motion.dl>
        </div>

        {/* illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
          className="relative mx-auto flex w-full max-w-[30rem] flex-col items-center sm:max-w-[34rem] lg:col-span-5 lg:mx-0 lg:w-fit lg:max-w-full lg:justify-self-start"
        >
          <HeroScene className="aspect-square w-full select-none lg:h-[min(calc(100svh-12rem),36rem)] lg:w-auto lg:max-w-full" />
          <p className="mt-3 font-mono text-[0.68rem] tracking-[0.18em] text-muted uppercase">
            <span className="lg:hidden">Tap</span>
            <span className="hidden lg:inline">Click</span> the phone to switch lenses
          </p>
        </motion.div>
      </div>
    </section>
  );
}
