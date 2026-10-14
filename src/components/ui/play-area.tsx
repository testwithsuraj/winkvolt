"use client";

import * as React from "react";
import { useInView } from "motion/react";

type PlayAreaProps = React.ComponentProps<"div"> & {
  /** How much of the element must be visible before it starts playing. */
  amount?: number;
};

/**
 * Wrapper that drives the `play:` CSS variant. The illustrations inside play
 * automatically while the element is in view (on every device), and also on hover.
 */
export function PlayArea({ amount = 0.6, children, ...props }: PlayAreaProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount });

  return (
    <div ref={ref} data-play="" data-active={inView ? "true" : undefined} {...props}>
      {children}
    </div>
  );
}
