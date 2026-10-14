"use client";

import { ReactLenis } from "lenis/react";

/** Site-wide smooth scrolling. In-page anchor links glide to their section (offset by `scroll-padding-top` in globals.css). */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        wheelMultiplier: 1,
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
