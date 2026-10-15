import Link from "next/link";

import { LogoMark } from "@/components/svg/logo";
import { SmartLink } from "@/components/ui/smart-link";
import { legalLinks, serviceHref, services, site } from "@/lib/site";

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Process", href: "/#process" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
];

const linkClass = "text-paper/80 transition-colors hover:text-volt";

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <p className="font-mono text-xs tracking-[0.18em] text-paper/40 uppercase">{children}</p>;
}

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="overflow-hidden bg-ink pt-16 text-paper sm:pt-20">
      <div className="container-x">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12">
          <div className="sm:col-span-2 lg:col-span-5">
            <LogoMark className="size-12" onDark />
            <p className="mt-6 max-w-sm type-body text-paper/65">
              A creative technology studio building Snapchat Lenses people play and share. Roblox games and mobile
              apps coming soon.
            </p>
            <a href={`mailto:${site.email}`} className="mt-6 inline-block text-lg text-paper transition-colors hover:text-volt">
              {site.email}
            </a>
          </div>

          <nav aria-label="Services" className="lg:col-span-3">
            <ColumnTitle>Services</ColumnTitle>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.key} className="flex items-center gap-2">
                  <Link href={serviceHref(s.slug)} className={linkClass}>
                    {s.title}
                  </Link>
                  {s.status === "soon" && (
                    <span className="rounded-full bg-paper/10 px-2 py-0.5 font-mono text-[0.65rem] tracking-[0.12em] text-paper/60 uppercase">
                      Soon
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company" className="lg:col-span-2">
            <ColumnTitle>Company</ColumnTitle>
            <ul className="mt-5 space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <SmartLink href={link.href} className={linkClass}>
                    {link.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal" className="lg:col-span-2">
            <ColumnTitle>Legal</ColumnTitle>
            <ul className="mt-5 space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={linkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-paper/10 py-6 text-sm text-paper/50 sm:flex-row sm:items-center">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <a href="#top" className="group flex w-fit items-center gap-3 transition-colors hover:text-paper">
            Back to top
            <span className="grid size-9 place-items-center rounded-full border border-paper/20 transition-colors group-hover:border-volt group-hover:bg-volt group-hover:text-ink">
              <svg
                viewBox="0 0 16 16"
                className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5"
                aria-hidden
              >
                <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <p
        aria-hidden
        className="-mb-[0.1em] flex justify-center text-[clamp(5rem,19vw,17rem)] leading-[0.95] font-semibold tracking-[-0.07em] select-none"
      >
        {"winkvolt".split("").map((letter, i) => (
          <span
            key={i}
            className="inline-block text-paper/[0.07] transition-[color,translate] duration-500 ease-out-expo hover:-translate-y-[0.08em] hover:text-volt"
          >
            {letter}
          </span>
        ))}
      </p>
    </footer>
  );
}
