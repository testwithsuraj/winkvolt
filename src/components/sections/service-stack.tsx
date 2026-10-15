"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import { ServiceArt } from "@/components/svg/service-art";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { PlayArea } from "@/components/ui/play-area";
import { serviceHref, services, type ServiceKey } from "@/lib/site";
import { cn } from "@/lib/utils";

const theme: Record<ServiceKey, { card: string; panel: string; muted: string; chip: string }> = {
  lenses: { card: "bg-volt text-ink", panel: "bg-ink/[0.06]", muted: "text-ink/70", chip: "border-ink/20" },
  roblox: { card: "bg-cobalt text-paper", panel: "bg-ink/20", muted: "text-paper/75", chip: "border-paper/25" },
  apps: { card: "bg-signal text-ink", panel: "bg-ink/[0.08]", muted: "text-ink/70", chip: "border-ink/20" },
};

/**
 * Service cards that pin and stack as you scroll: each card sticks below the
 * navbar while the next slides over it, and the ones underneath shrink back.
 */
export function ServiceStack() {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <div ref={ref} className="mt-10 sm:mt-12">
      {services.map((service, i) => (
        <StackCard
          key={service.key}
          index={i}
          total={services.length}
          progress={scrollYProgress}
          service={service}
        />
      ))}
    </div>
  );
}

function StackCard({
  index,
  total,
  progress,
  service,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  service: (typeof services)[number];
}) {
  const c = theme[service.key];
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div
      className="sticky top-[calc(4.75rem+var(--i)*0.75rem)] pb-5 sm:top-[calc(5.5rem+var(--i)*1.25rem)] last:pb-0"
      style={{ "--i": index } as React.CSSProperties}
    >
      <motion.div
        style={{ scale }}
        className="origin-top"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <PlayArea
          amount={0.5}
          className={cn(
            "grid overflow-hidden rounded-[1.75rem] p-2.5 sm:rounded-[2rem] sm:p-4 md:grid-cols-2 md:gap-4 lg:min-h-[32rem]",
            c.card,
          )}
        >
          <article className="flex flex-col justify-between gap-6 p-3.5 sm:gap-10 sm:p-6 lg:p-8">
            <div>
              <div className="flex items-center justify-between font-mono text-xs tracking-[0.18em] uppercase">
                <span>{service.index} / 03</span>
                {service.status === "soon" ? (
                  <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-[0.7rem] tracking-[0.14em] text-paper">
                    <span className="size-1.5 animate-pulse rounded-full bg-volt" />
                    Coming soon
                  </span>
                ) : (
                  <span className={cn("hidden sm:inline", c.muted)}>{service.kicker}</span>
                )}
              </div>
              <h3 className="mt-4 type-h3 sm:mt-8">
                {service.title}
              </h3>
              <p className={cn("mt-3 max-w-md type-body sm:mt-5", c.muted)}>
                {service.body}
              </p>
            </div>
            <div>
              <ul className="flex flex-wrap gap-1.5 sm:gap-2">
                {service.points.map((p) => (
                  <li
                    key={p}
                    className={cn("rounded-full border px-3 py-1 text-xs font-medium sm:px-3.5 sm:py-1.5 sm:text-sm", c.chip)}
                  >
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href={serviceHref(service.slug)}
                className="group/button mt-5 inline-flex items-center gap-2 text-base font-semibold underline decoration-current/30 decoration-2 underline-offset-[6px] transition-[text-decoration-color] duration-300 hover:decoration-current sm:mt-8"
              >
                {service.status === "soon" ? "Get notified" : "Explore lenses"} <ArrowIcon />
              </Link>
            </div>
          </article>
          <div
            className={cn(
              "relative grid h-44 place-items-center overflow-hidden rounded-[1.25rem] sm:h-auto sm:aspect-[6/5] sm:rounded-[1.5rem] md:aspect-auto",
              c.panel,
            )}
          >
            <ServiceArt kind={service.key} className="h-full w-auto max-w-md py-2 sm:h-auto sm:w-[85%] sm:py-0" />
          </div>
        </PlayArea>
      </motion.div>
    </div>
  );
}
