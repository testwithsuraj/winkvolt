import { LogoMark } from "@/components/svg/logo";
import { navLinks, site } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="overflow-hidden bg-ink pt-16 text-paper sm:pt-20">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <LogoMark className="size-12" />
            <p className="mt-6 max-w-sm text-lg leading-relaxed text-paper/65">
              A creative technology studio building Snapchat Lenses, Roblox games and mobile apps.
            </p>
          </div>
          <nav aria-label="Footer" className="md:col-span-3">
            <p className="font-mono text-xs tracking-[0.18em] text-paper/40 uppercase">Explore</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-paper/80 transition-colors hover:text-volt">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-3">
            <p className="font-mono text-xs tracking-[0.18em] text-paper/40 uppercase">Say hello</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block text-paper/80 transition-colors hover:text-volt"
            >
              {site.email}
            </a>
            <a
              href="#top"
              className="group mt-8 flex w-fit items-center gap-3 text-sm text-paper/60 transition-colors hover:text-paper"
            >
              <span className="grid size-10 place-items-center rounded-full border border-paper/20 transition-colors group-hover:border-volt group-hover:bg-volt group-hover:text-ink">
                <svg
                  viewBox="0 0 16 16"
                  className="size-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5"
                  aria-hidden
                >
                  <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              Back to top
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-3 border-t border-paper/10 py-6 text-sm text-paper/50 sm:flex-row">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <p>Made to be played with.</p>
        </div>
      </div>

      <p
        aria-hidden
        className="-mb-[0.1em] flex justify-center text-[23vw] leading-[0.95] font-semibold tracking-[-0.07em] select-none"
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
