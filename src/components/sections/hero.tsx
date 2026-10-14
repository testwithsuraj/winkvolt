"use client";

import { motion } from "motion/react";

import { WinkFace } from "@/components/svg/wink-face";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { Magnetic } from "@/components/ui/magnetic";
import { SplitWords } from "@/components/ui/reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const chips = [
  { label: "Snapchat Lenses", className: "bg-ink text-paper", pos: "left-[-4%] top-[14%]", rotate: -8, delay: 0.9 },
  { label: "Roblox Games", className: "bg-cobalt text-paper", pos: "right-[-6%] top-[30%]", rotate: 6, delay: 1.0 },
  { label: "Mobile Apps", className: "bg-signal text-ink", pos: "left-[4%] bottom-[8%]", rotate: 4, delay: 1.1 },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-36 md:pb-24 lg:pt-40">
      <div className="container-x grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line bg-paper-2 py-1.5 pr-4 pl-1.5 text-sm"
          >
            <span className="relative grid size-6 place-items-center rounded-full bg-ink">
              <span className="size-2 animate-pulse rounded-full bg-volt" />
            </span>
            <span className="font-medium">Creative tech studio</span>
            <span className="hidden text-muted sm:inline">· AR, games &amp; apps</span>
          </motion.div>

          <h1 className="text-display">
            <SplitWords text="We build things" className="block" />
            <span className="block">
              <SplitWords text="people" delay={0.18} />{" "}
              <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <motion.span
                  className="inline-block font-serif font-normal tracking-[-0.02em] italic"
                  initial={{ y: "110%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1, delay: 0.3, ease }}
                >
                  play
                </motion.span>
              </span>{" "}
              <SplitWords text="with." delay={0.36} />
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            WinkVolt designs and builds Snapchat Lenses, Roblox games and mobile apps that people open, play and
            share, again and again.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.62, ease }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic>
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-12 grid max-w-md grid-cols-2 border-t border-line pt-6"
          >
            <div>
              <dt className="text-sm text-muted">Lenses built</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight tabular sm:text-4xl">150+</dd>
            </div>
            <div className="border-l border-line pl-6">
              <dt className="text-sm text-muted">Total views</dt>
              <dd className="mt-1 text-3xl font-semibold tracking-tight tabular sm:text-4xl">500M+</dd>
            </div>
          </motion.dl>
        </div>

        <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:col-span-5 lg:max-w-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.25, ease }}
            className="relative aspect-square"
          >
            {/* orbit ring */}
            <svg viewBox="0 0 200 200" className="absolute inset-0 size-full animate-spin-slow" aria-hidden>
              <circle cx="100" cy="100" r="98" fill="none" className="stroke-ink/15" strokeWidth="0.6" strokeDasharray="2 5" />
              <circle cx="100" cy="2" r="3" className="fill-signal" />
            </svg>
            <WinkFace className="absolute inset-[9%] size-[82%] select-none" />

            {chips.map((chip) => (
              <motion.span
                key={chip.label}
                initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
                animate={{ opacity: 1, scale: 1, rotate: chip.rotate }}
                transition={{ type: "spring", stiffness: 220, damping: 14, delay: chip.delay }}
                whileHover={{ scale: 1.08, rotate: 0 }}
                className={`absolute ${chip.pos} rounded-full px-3.5 py-2 text-xs font-semibold whitespace-nowrap sm:px-4 sm:text-sm ${chip.className}`}
              >
                {chip.label}
              </motion.span>
            ))}
          </motion.div>
          <p className="mt-4 text-center font-mono text-[0.7rem] tracking-[0.18em] text-muted uppercase">
            Hover to wink · Tap to blink
          </p>
        </div>
      </div>
    </section>
  );
}
