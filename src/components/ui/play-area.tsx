"use client";

import * as React from "react";
import { useInView } from "motion/react";

type PlayAreaProps = React.ComponentProps<"div"> & {
  /** How much of the element must be visible before it plays on touch devices. */
  amount?: number;
};

/**
 * Wrapper that drives the `play:` CSS variant. Pointer devices play on hover;
 * touch devices (no hover) play automatically while the element is in view.
 */
export function PlayArea({ amount = 0.6, children, ...props }: PlayAreaProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount });
  const [touch, setTouch] = React.useState(false);

  React.useEffect(() => {
    const mq = window.matchMedia("(hover: none)");
    const update = () => setTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div ref={ref} data-play="" data-active={touch && inView ? "true" : undefined} {...props}>
      {children}
    </div>
  );
}
