"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";

import { Logo } from "@/components/svg/logo";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { navLinks, site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const lenis = useLenis();

  // Freeze smooth scrolling behind the open mobile menu.
  React.useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
  }, [open, lenis]);

  // Hide on a deliberate scroll down, reveal on any deliberate scroll up.
  // Small deltas are ignored so smooth-scroll inertia doesn't make it flicker.
  const travel = React.useRef(0);
  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - (scrollY.getPrevious() ?? y);
    setScrolled(y > 24);
    if (y < 160 || open) {
      travel.current = 0;
      setHidden(false);
      return;
    }
    travel.current = Math.sign(delta) === Math.sign(travel.current) ? travel.current + delta : delta;
    if (travel.current > 24) setHidden(true);
    else if (travel.current < -12) setHidden(false);
  });

  const navigate = (href: string) => {
    setOpen(false);
    // Wait for the menu's scroll lock to release before gliding to the section.
    setTimeout(() => {
      lenis?.start();
      if (lenis) lenis.scrollTo(href, { duration: 1.4 });
      else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      history.replaceState(null, "", href);
    }, 80);
  };

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-signal"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.header
        className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-4"
        initial={false}
        animate={hidden ? { y: "-130%", opacity: 0 } : { y: "0%", opacity: 1 }}
        transition={
          hidden
            ? { duration: 0.45, ease: [0.7, 0, 0.84, 0] }
            : { y: { type: "spring", stiffness: 260, damping: 30, mass: 0.9 }, opacity: { duration: 0.35 } }
        }
      >
        <div className="container-x">
          <nav
            aria-label="Primary"
            className={cn(
              "flex h-14 items-center justify-between rounded-full border pr-2 pl-3 transition-[background-color,border-color,box-shadow] duration-500 sm:h-16 sm:pl-4",
              scrolled ? "border-line bg-paper/90 backdrop-blur-md" : "border-transparent bg-transparent",
            )}
          >
            <a href="#top" aria-label={`${site.name} home`} className="rounded-full">
              <Logo />
            </a>

            <ul className="hidden items-center gap-1 md:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group relative inline-flex h-10 items-center overflow-hidden rounded-full px-4 text-[0.95rem] font-medium"
                  >
                    <span className="relative block overflow-hidden">
                      <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
                        {link.label}
                      </span>
                      <span
                        aria-hidden
                        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
                      >
                        {link.label}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <Button asChild size="md" className="hidden sm:inline-flex">
                <a href="#contact">
                  Start a project <ArrowIcon />
                </a>
              </Button>

              <Dialog.Root open={open} onOpenChange={setOpen}>
                <Dialog.Trigger asChild>
                  <button
                    type="button"
                    aria-label="Open menu"
                    className="grid size-11 place-items-center rounded-full bg-ink text-paper md:hidden"
                  >
                    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
                      <path d="M4 9h16M4 15h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </button>
                </Dialog.Trigger>
                <AnimatePresence>
                  {open && <MobileMenu onNavigate={navigate} />}
                </AnimatePresence>
              </Dialog.Root>
            </div>
          </nav>
        </div>
      </motion.header>
    </>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: (href: string) => void }) {
  const ease = [0.16, 1, 0.3, 1] as const;
  return (
    <Dialog.Portal forceMount>
      <Dialog.Content forceMount asChild aria-describedby={undefined} data-lenis-prevent="">
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col bg-ink text-paper"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease }}
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <div className="container-x flex h-[4.25rem] items-center justify-between pt-3">
            <Logo wordmarkClassName="text-paper" onDark />
            <Dialog.Close
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-full bg-volt text-ink"
            >
              <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
                <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center">
            <ul className="space-y-1">
              {[...navLinks, { label: "Contact", href: "#contact" }].map((link, i) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(link.href);
                    }}
                    className="flex items-baseline gap-4 py-2 text-[clamp(2.5rem,12vw,4.5rem)] leading-none font-semibold tracking-[-0.04em] active:text-volt"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.05, ease }}
                  >
                    <span className="font-mono text-sm tracking-normal text-paper/50">0{i + 1}</span>
                    {link.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="container-x flex items-center justify-between border-t border-paper/10 py-6 text-sm text-paper/60">
            <a href={`mailto:${site.email}`} className="text-paper">
              {site.email}
            </a>
            <span>© {new Date().getFullYear()}</span>
          </div>
        </motion.div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
