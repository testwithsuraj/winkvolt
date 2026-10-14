# WinkVolt

Marketing site for **WinkVolt**, a creative technology studio building Snapchat Lenses (Roblox games and mobile apps coming soon).

## Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript), statically prerendered
- [Tailwind CSS v4](https://tailwindcss.com) with the design tokens in `src/app/globals.css`
- [Motion](https://motion.dev) for reveals, scroll effects and SVG micro-interactions
- [Lenis](https://lenis.darkroom.engineering) for site-wide smooth scrolling (`src/components/smooth-scroll.tsx`)
- [Radix UI](https://www.radix-ui.com) primitives (accordion, dialog) wrapped shadcn/ui-style in `src/components/ui`

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Script              | What it does                     |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start the dev server             |
| `npm run build`     | Production build                 |
| `npm run start`     | Serve the production build       |
| `npm run lint`      | ESLint                           |
| `npm run typecheck` | TypeScript, no emit              |

## Pages

| Route                         | What it is                                  |
| ----------------------------- | ------------------------------------------- |
| `/`                           | Home (hero, services, capabilities, process, FAQ, contact) |
| `/services/snapchat-lenses`   | Snapchat Lenses service page                |
| `/services/roblox-games`      | Roblox games, coming soon                   |
| `/services/mobile-apps`       | Mobile apps, coming soon                    |
| `/about`                      | About the studio                            |
| `/contact`                    | Book a call / email, plus FAQ               |
| `/privacy`, `/terms`          | Legal pages                                 |
| `/sitemap.xml`, `/robots.txt` | Generated for search engines                |
| `/llms.txt`, `/llms-full.txt` | Site summary for AI assistants ([llmstxt.org](https://llmstxt.org)) |

Every page has its own title, description, canonical URL and Open Graph tags. The layout adds Organization and
WebSite JSON-LD, and service pages add Service JSON-LD.

## Project structure

```
src/
  app/                    # routes (see above), layout, metadata files, globals.css
  components/
    sections/             # one component per section (navbar, hero, services, contact, footer, ...)
    svg/                  # animated logo, hero scene, service & capability illustrations
    ui/                   # button, accordion, reveal, counter, magnetic, play-area, smart-link, ...
    smooth-scroll.tsx     # Lenis smooth scrolling
  lib/
    site.ts               # all copy and content (edit text here)
    pages.ts              # page list for sitemap and llms.txt
    metadata.ts, llms.ts, utils.ts
```

## Editing content

Copy, stats, services (and whether each is `live` or `soon`), navigation, capabilities, process steps, values and FAQs all live in `src/lib/site.ts`.
Update `site.url`, `site.email` and `site.bookingUrl` (your Cal.com or Calendly link for the "Book a 15-min call" buttons) there before going live.

## Design notes

- Solid colors only, no gradients: ink `#0e0e0c`, paper `#f2efe8`, volt `#dcff3b`, signal `#ff5b2e`, cobalt `#2f4bff`.
- Illustrations animate through the custom `play:` Tailwind variant: automatically when scrolled into view on every device, and on hover (see `components/ui/play-area.tsx`).
- Animations respect `prefers-reduced-motion`.

## Deploying to Vercel

Import the repository at [vercel.com/new](https://vercel.com/new). Vercel detects Next.js automatically, so no extra configuration is needed.
