"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { ReactLenis, useLenis } from "lenis/react";

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
