"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/** Table of contents that highlights the section currently being read. */
export function Toc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = React.useState(items[0]?.id);

  // Active = the last section whose top has passed 30% of the viewport height.
  React.useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      let current = els[0]?.id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">On this page</p>
      <ol className="mt-4 space-y-1 border-l border-line">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-4 text-sm leading-snug transition-colors duration-300",
                active === item.id ? "border-ink font-medium text-ink" : "border-transparent text-muted hover:text-ink",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
