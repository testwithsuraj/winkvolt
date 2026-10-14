"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

/** Keeps Lenis in sync with page changes: top of the new page, or the section in the URL hash. */
function RouteScroll() {
  const pathname = usePathname();
  const lenis = useLenis();

  React.useEffect(() => {
    if (!lenis) return;
    const id = requestAnimationFrame(() => {
      lenis.resize();
      const hash = window.location.hash;
      if (hash && document.querySelector(hash)) lenis.scrollTo(hash, { immediate: true, force: true });
      else lenis.scrollTo(0, { immediate: true, force: true });
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return null;
}

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
      <RouteScroll />
      {children}
    </ReactLenis>
  );
}
