"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";

import { Logo } from "@/components/svg/logo";
import { ServiceGlyph } from "@/components/svg/service-glyph";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { SmartLink } from "@/components/ui/smart-link";
import { navItems, serviceHref, services, site } from "@/lib/site";
import { cn } from "@/lib/utils";

function RollText({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-out-expo group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

function SoonBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "rounded-full bg-paper-2 px-2 py-0.5 font-mono text-[0.65rem] tracking-[0.12em] text-muted uppercase",
        className,
      )}
    >
      Soon
    </span>
  );
}

function ServicesMenu() {
  return (
    <div className="w-[26rem] rounded-[1.5rem] border border-line bg-paper p-2">
      <ul>
        {services.map((s) => (
          <li key={s.key}>
            <NavigationMenu.Link asChild>
              <Link
                href={serviceHref(s.slug)}
                className="group/item flex items-center gap-4 rounded-[1rem] p-3 transition-colors duration-300 hover:bg-paper-2 focus-visible:bg-paper-2"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-line bg-paper transition-colors duration-300 group-hover/item:border-ink">
                  <ServiceGlyph kind={s.key} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2 font-medium">
                    {s.title}
                    {s.status === "soon" && <SoonBadge />}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">{s.short}</span>
                </span>
                <span className="text-muted transition-[transform,color] duration-300 group-hover/item:translate-x-0.5 group-hover/item:text-ink">
                  <svg viewBox="0 0 16 16" className="size-4" aria-hidden>
                    <path d="M6 3.5 10.5 8 6 12.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </Link>
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>
      <div className="mt-1 flex items-center justify-between rounded-[1rem] bg-ink px-4 py-3 text-sm text-paper">
        <span className="text-paper/70">Have something in mind?</span>
        <NavigationMenu.Link asChild>
          <a
            href={site.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/button inline-flex items-center gap-1.5 font-medium text-volt"
          >
            Book a 15-min call <ArrowIcon className="size-3.5" />
          </a>
        </NavigationMenu.Link>
      </div>
    </div>
  );
}

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [menuValue, setMenuValue] = React.useState("");
  const [desktop, setDesktop] = React.useState(true);
  const lenis = useLenis();
  const router = useRouter();
  const pathname = usePathname();

  // On phones the wordmark tucks away once you scroll and slides back in at the top.
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

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
    if (y < 160 || open || menuValue) {
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
    // Wait for the menu's scroll lock to release before moving.
    setTimeout(() => {
      lenis?.start();
      if (href.startsWith("/#") && pathname === "/") {
        const hash = href.slice(1);
        if (lenis) lenis.scrollTo(hash, { duration: 1.4 });
        else document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(href);
      }
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
          <div
            className={cn(
              "flex h-14 items-center justify-between rounded-full border pr-2 pl-3 transition-[background-color,border-color] duration-500 sm:h-16 sm:pl-4",
              scrolled || menuValue ? "border-line bg-paper/90 backdrop-blur-md" : "border-transparent bg-transparent",
            )}
          >
            <Link href="/" aria-label={`${site.name} home`} className="rounded-full">
              <Logo hideWordmark={scrolled && !desktop} />
            </Link>

            <NavigationMenu.Root
              aria-label="Primary"
              value={menuValue}
              onValueChange={setMenuValue}
              delayDuration={80}
              className="hidden md:block"
            >
              <NavigationMenu.List className="flex items-center gap-1">
                {navItems.map((item) =>
                  item.dropdown ? (
                    <NavigationMenu.Item key={item.label} value="services" className="relative">
                      <NavigationMenu.Trigger className="group inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-[0.95rem] font-medium outline-none data-[state=open]:bg-paper-2">
                        <RollText>{item.label}</RollText>
                        <svg
                          viewBox="0 0 16 16"
                          aria-hidden
                          className="size-3.5 transition-transform duration-300 ease-out-expo group-data-[state=open]:rotate-180"
                        >
                          <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                        </svg>
                      </NavigationMenu.Trigger>
                      <NavigationMenu.Content className="absolute top-full left-1/2 pt-3 data-[state=closed]:animate-[menu-out_180ms_ease-in_both] data-[state=open]:animate-[menu-in_380ms_cubic-bezier(0.16,1,0.3,1)_both]">
                        <ServicesMenu />
                      </NavigationMenu.Content>
                    </NavigationMenu.Item>
                  ) : (
                    <NavigationMenu.Item key={item.label}>
                      <NavigationMenu.Link asChild active={pathname === item.href || pathname.startsWith(`${item.href}/`)}>
                        <SmartLink
                          href={item.href}
                          className="group relative inline-flex h-10 items-center rounded-full px-4 text-[0.95rem] font-medium data-[active]:bg-paper-2"
                        >
                          <RollText>{item.label}</RollText>
                        </SmartLink>
                      </NavigationMenu.Link>
                    </NavigationMenu.Item>
                  ),
                )}
              </NavigationMenu.List>
            </NavigationMenu.Root>

            <div className="flex items-center gap-2">
              <Button asChild size="md" className="hidden sm:inline-flex">
                <Link href="/contact">
                  Start a project <ArrowIcon />
                </Link>
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
                <AnimatePresence>{open && <MobileMenu onNavigate={navigate} />}</AnimatePresence>
              </Dialog.Root>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}

function MobileMenu({ onNavigate }: { onNavigate: (href: string) => void }) {
  const ease = [0.16, 1, 0.3, 1] as const;
  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(href);
  };
  const enter = (i: number) => ({
    initial: { y: "100%" },
    animate: { y: "0%" },
    exit: { y: "100%" },
    transition: { duration: 0.7, delay: 0.15 + i * 0.05, ease },
  });

  return (
    <Dialog.Portal forceMount>
      <Dialog.Content forceMount asChild aria-describedby={undefined} data-lenis-prevent="">
        <motion.div
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-ink text-paper"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.7, ease }}
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>
          <div className="container-x flex h-[4.25rem] shrink-0 items-center justify-between pt-3">
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

          <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-center py-8">
            <ul className="space-y-1">
              {navItems.map((item, i) => (
                <li key={item.label}>
                  <div className="overflow-hidden">
                    <motion.a
                      href={item.href}
                      onClick={go(item.href)}
                      className="flex items-baseline gap-4 py-1.5 type-h2 active:text-volt"
                      {...enter(i)}
                    >
                      <span className="font-mono text-sm tracking-normal text-paper/50">0{i + 1}</span>
                      {item.label}
                    </motion.a>
                  </div>
                  {item.dropdown && (
                    <motion.ul
                      className="mt-2 mb-4 ml-9 space-y-1 border-l border-paper/15 pl-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, delay: 0.35 }}
                    >
                      {services.map((s) => (
                        <li key={s.key}>
                          <a
                            href={serviceHref(s.slug)}
                            onClick={go(serviceHref(s.slug))}
                            className="flex items-center gap-2 py-1.5 text-base text-paper/80 active:text-volt"
                          >
                            {s.title}
                            {s.status === "soon" && <SoonBadge className="bg-paper/10 text-paper/60" />}
                          </a>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="container-x flex shrink-0 flex-col gap-4 border-t border-paper/10 py-6">
            <Button asChild variant="volt" size="lg" className="w-full">
              <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                Book a 15-min call
              </a>
            </Button>
            <div className="flex items-center justify-between text-sm text-paper/60">
              <a href={`mailto:${site.email}`} className="text-paper">
                {site.email}
              </a>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </div>
        </motion.div>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
