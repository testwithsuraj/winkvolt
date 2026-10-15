"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { cancelFrame, frame } from "motion/react";
import { ReactLenis, useLenis, type LenisRef } from "lenis/react";

/**
 * Runs before first paint (inlined in <head>): a refresh or fresh visit always
 * opens at the top of the page, even if the URL still carries a #section.
 */
export const scrollResetScript = `(function(){try{if("scrollRestoration" in history)history.scrollRestoration="manual";if(location.hash){history.replaceState(null,"",location.pathname+location.search)}}catch(e){}})();`;

/** Keeps Lenis in sync with page changes: top of the new page, or the section a link pointed at. */
function RouteScroll() {
  const pathname = usePathname();
  const lenis = useLenis();
  const firstLoad = React.useRef(true);

  React.useEffect(() => {
    if (!lenis) return;
    const id = requestAnimationFrame(() => {
      lenis.resize();
      const hash = window.location.hash;
      const target = !firstLoad.current && hash ? document.querySelector(hash) : null;
      firstLoad.current = false;
      if (target) lenis.scrollTo(hash, { immediate: true, force: true });
      else lenis.scrollTo(0, { immediate: true, force: true });
      // Don't leave "#section" in the URL, so a later refresh starts at the top.
      if (hash) window.history.replaceState(null, "", window.location.pathname + window.location.search);
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return null;
}

/**
 * Site-wide smooth scrolling on every page. In-page anchor links glide to their
 * section (offset by `scroll-padding-top` in globals.css).
 *
 * Lenis is driven from Motion's frame loop instead of its own requestAnimationFrame,
 * so the scroll position and every scroll-linked animation (progress bar, sticky
 * service cards, statement words) update in the same frame and never drift apart.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = React.useRef<LenisRef>(null);

  React.useEffect(() => {
    const update = ({ timestamp }: { timestamp: number }) => lenisRef.current?.lenis?.raf(timestamp);
    frame.update(update, true);
    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      root
      ref={lenisRef}
      options={{
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
        anchors: true,
        stopInertiaOnNavigate: true,
      }}
    >
      <RouteScroll />
      {children}
    </ReactLenis>
  );
}
