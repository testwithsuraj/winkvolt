# WinkVolt

Single-page marketing site for **WinkVolt**, a creative technology studio building Snapchat Lenses, Roblox games and mobile apps.

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

## Project structure

```
src/
  app/
    layout.tsx            # fonts, metadata, MotionConfig
    page.tsx              # composes the sections in order
    globals.css           # color tokens, utilities, `play:` variant
    opengraph-image.tsx   # generated social share image
    icon.svg, robots.ts, sitemap.ts
  components/
    sections/             # one component per page section
      navbar, hero, marquee, stats, services (+ service-stack), capabilities,
      process, statement, faq, contact, footer
    svg/                  # logo, animated hero scene, service & capability illustrations
    ui/                   # button, accordion, reveal, counter, magnetic, play-area, ...
  lib/
    site.ts               # all copy and content (edit text here)
    utils.ts              # cn() helper
```

## Editing content

Copy, stats, services, capabilities, process steps and FAQs all live in `src/lib/site.ts`.
Update `site.url` and `site.email` there before going live.

## Design notes

- Solid colors only, no gradients: ink `#0e0e0c`, paper `#f2efe8`, volt `#dcff3b`, signal `#ff5b2e`, cobalt `#2f4bff`.
- Illustrations animate through the custom `play:` Tailwind variant: automatically when scrolled into view on every device, and on hover (see `components/ui/play-area.tsx`).
- Animations respect `prefers-reduced-motion`.

## Deploying to Vercel

Import the repository at [vercel.com/new](https://vercel.com/new). Vercel detects Next.js automatically, so no extra configuration is needed.
