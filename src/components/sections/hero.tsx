"use client";

import { motion } from "motion/react";

import { HeroScene } from "@/components/svg/hero-scene";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Magnetic } from "@/components/ui/magnetic";
import { SplitWords } from "@/components/ui/reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
});

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex flex-col overflow-hidden pt-24 pb-14 sm:pt-28 lg:min-h-[100svh] lg:pt-24 lg:pb-10"
    >
      <div className="container-x grid flex-1 items-center gap-10 lg:grid-cols-12 lg:gap-6">
        {/* copy */}
        <div className="lg:col-span-6 xl:col-span-6">
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

          <h1 className="text-hero lg:whitespace-nowrap">
            <SplitWords text="We build things" className="block" />
            <span className="block">
              <SplitWords text="people" delay={0.12} />{" "}
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block bg-volt px-[0.12em] font-serif font-normal tracking-[-0.02em] italic"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.22, ease }}
                >
                  play
                </motion.span>
              </span>
            </span>
            <SplitWords text="with." delay={0.3} className="block" />
          </h1>

          <motion.p
            {...fadeUp(0.45)}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted sm:text-xl lg:mt-[min(1.75rem,3vh)]"
          >
            WinkVolt designs and builds Snapchat Lenses, Roblox games and mobile apps that people open, play and
            share, again and again.
          </motion.p>

          <motion.div
            {...fadeUp(0.55)}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center lg:mt-[min(2.25rem,4vh)]"
          >
            <Magnetic className="w-full sm:w-auto">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href="#contact">
                  Start a project <ArrowIcon />
                </a>
              </Button>
            </Magnetic>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <a href="#services">See what we build</a>
            </Button>
          </motion.div>

          <motion.dl
            {...fadeUp(0.7)}
            className="mt-10 flex max-w-md divide-x divide-line border-t border-line pt-5 lg:mt-[min(2.75rem,5vh)]"
          >
            <div className="pr-6">
              <dt className="text-sm text-muted">Lenses built</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight tabular">150+</dd>
            </div>
            <div className="px-6">
              <dt className="text-sm text-muted">Total views</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight tabular">500M+</dd>
            </div>
          </motion.dl>
        </div>

        {/* illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease }}
          className="relative mx-auto flex w-full max-w-[30rem] flex-col items-center sm:max-w-[34rem] lg:col-span-6 lg:max-w-none"
        >
          <HeroScene className="aspect-square w-full select-none lg:h-[min(calc(100svh-10rem),40rem)] lg:w-auto lg:max-w-full" />
          <p className="mt-2 font-mono text-[0.7rem] tracking-[0.18em] text-muted uppercase">
            <span className="lg:hidden">Tap</span>
            <span className="hidden lg:inline">Click</span> the phone to switch lenses
          </p>
        </motion.div>
      </div>
    </section>
  );
}
