"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";

import { ArrowIcon } from "@/components/ui/arrow-icon";
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

const nextSteps = [
  { title: "Say hello", body: "Book a quick call or send us an email with your idea." },
  { title: "We shape it", body: "We turn your goal into concepts built to be played and shared." },
  { title: "You get a plan", body: "A clear scope, timeline and estimate, so you can decide with confidence." },
];

const t = "transition-transform duration-700 ease-out-expo [transform-box:fill-box]";

function CalendarArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className="size-14 sm:size-16">
      <rect x="8" y="12" width="48" height="44" rx="12" className="fill-ink" />
      <rect x="8" y="12" width="48" height="14" rx="7" className="fill-ink" />
      <path d="M20 8v10M44 8v10" className="stroke-ink" strokeWidth="4" strokeLinecap="round" />
      <path d="M8 26h48" className="stroke-volt/30" strokeWidth="2" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={16 + c * 9}
            y={31 + r * 7.5}
            width="5"
            height="4"
            rx="1.5"
            className={r === 1 && c === 2 ? "fill-signal" : "fill-volt/35"}
          />
        )),
      )}
      {/* clock badge */}
      <g className={cn(t, "origin-center group-hover/tile:-translate-y-1 group-hover/tile:rotate-[-8deg]")}>
        <circle cx="50" cy="48" r="11" className="fill-paper stroke-ink" strokeWidth="3" />
        <path d="M50 48v-5.5" className="stroke-ink" strokeWidth="2.5" strokeLinecap="round" />
        <path
          d="M50 48h4.5"
          className="stroke-ink transition-transform duration-700 ease-out-expo [transform-box:view-box] [transform-origin:50px_48px] group-hover/tile:rotate-[270deg]"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

function MailArt() {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className="size-14 overflow-visible sm:size-16">
      {/* letter slides up out of the envelope on hover */}
      <g className={cn(t, "translate-y-3 group-hover/tile:-translate-y-2")}>
        <rect x="16" y="14" width="32" height="26" rx="4" className="fill-paper stroke-ink" strokeWidth="2.5" />
        <path d="M22 22h20M22 28h14" className="stroke-ink" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <path d="M8 28 32 44l24-16v24a6 6 0 0 1-6 6H14a6 6 0 0 1-6-6Z" className="fill-volt stroke-ink" strokeWidth="3" strokeLinejoin="round" />
      <path d="M8 58l19-16M56 58 37 42" className="stroke-ink" strokeWidth="3" strokeLinecap="round" />
      <circle cx="54" cy="24" r="6" className={cn(t, "origin-center scale-0 fill-signal group-hover/tile:scale-100")} />
    </svg>
  );
}

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

        <div className="mt-12 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* pitch + what happens next */}
          <Reveal className="lg:col-span-5">
            <p className="max-w-md text-lg leading-relaxed text-ink/75 sm:text-xl">
              Tell us what you&apos;re dreaming up. Whether it&apos;s one lens or a whole world, we&apos;ll help you
              shape it into something people can&apos;t stop playing with.
            </p>
            <ol className="mt-10 space-y-6 border-t border-ink/15 pt-8">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="group flex gap-4">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/25 font-mono text-xs font-medium transition-colors duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-volt">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="text-lg font-semibold tracking-tight">{s.title}</p>
                    <p className="mt-1 text-ink/70">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* action card */}
          <Reveal delay={0.1} className="lg:col-span-7">
            <div className="rounded-[2rem] bg-ink p-5 text-paper sm:p-8 lg:p-10">
              <fieldset>
                <legend className="font-mono text-xs tracking-[0.18em] text-paper/60 uppercase">
                  I&apos;m looking for
                </legend>
                <div className="mt-4 flex flex-wrap gap-2">
                  {projectTypes.map((p) => {
                    const active = p.label === type.label;
                    return (
                      <label
                        key={p.label}
                        className={cn(
                          "relative cursor-pointer rounded-full border px-4 py-2.5 text-sm font-medium transition-colors duration-300 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-volt sm:px-5 sm:text-base",
                          active ? "border-volt text-ink" : "border-paper/20 text-paper/85 hover:border-paper/60",
                        )}
                      >
                        <input
                          type="radio"
                          name="project-type"
                          value={p.label}
                          checked={active}
                          onChange={() => setType(p)}
                          className="sr-only"
                        />
                        {active && (
                          <motion.span
                            layoutId="project-type-pill"
                            className="absolute inset-0 rounded-full bg-volt"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        <span className="relative">{p.label}</span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <a
                  href={site.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/tile group/button relative flex min-h-56 flex-col justify-between overflow-hidden rounded-[1.5rem] bg-volt p-6 text-ink transition-transform duration-500 ease-out-expo hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between">
                    <CalendarArt />
                    <span className="grid size-10 place-items-center rounded-full bg-ink text-volt">
                      <ArrowIcon />
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold tracking-tight">Book a 15-min call</p>
                    <p className="mt-1 text-sm text-ink/70">Talk through {type.phrase} with us. No prep needed.</p>
                  </div>
                </a>

                <a
                  href={mailto}
                  className="group/tile group/button relative flex min-h-56 flex-col justify-between overflow-hidden rounded-[1.5rem] border border-paper/15 bg-ink-2 p-6 transition-[transform,border-color] duration-500 ease-out-expo hover:-translate-y-1 hover:border-paper/40"
                >
                  <div className="flex items-start justify-between">
                    <MailArt />
                    <span className="grid size-10 place-items-center rounded-full bg-paper text-ink">
                      <ArrowIcon />
                    </span>
                  </div>
                  <div>
                    <p className="text-2xl font-semibold tracking-tight">Email us</p>
                    <p className="mt-1 text-sm text-paper/60">Tell us about {type.phrase} in your own words.</p>
                  </div>
                </a>
              </div>

              <div className="mt-6 flex flex-col gap-3 border-t border-paper/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm text-paper/60">Prefer to copy our address?</span>
                <button
                  type="button"
                  onClick={copy}
                  className="group inline-flex items-center gap-3 self-start rounded-full text-base font-medium sm:self-auto"
                  aria-live="polite"
                >
                  <span className="underline decoration-paper/30 decoration-2 underline-offset-[6px] transition-colors group-hover:decoration-volt">
                    {site.email}
                  </span>
                  <span className="relative grid size-9 place-items-center rounded-full bg-paper text-ink transition-colors group-hover:bg-volt">
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
                          <path
                            d="M3 10V4a1 1 0 0 1 1-1h6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                          />
                        </motion.svg>
                      )}
                    </AnimatePresence>
                  </span>
                  <span className="sr-only">{copied ? "Email copied" : "Copy email address"}</span>
                </button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
