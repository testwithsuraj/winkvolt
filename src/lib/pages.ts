import { blogCategories, categoryHref, postHref, sortedPosts } from "@/lib/blog";
import { legalLinks, serviceHref, services } from "@/lib/site";

export type SitePage = { path: string; title: string; summary: string; priority: number; updated?: string };

/** Every public page, used by the sitemap and llms.txt. */
export const pages: SitePage[] = [
  { path: "/", title: "Home", summary: "Overview of WinkVolt, our Snapchat Lens work, capabilities, process and FAQ.", priority: 1 },
  ...services.map((s) => ({
    path: serviceHref(s.slug),
    title: s.status === "soon" ? `${s.title} (coming soon)` : s.title,
    summary: s.body,
    priority: s.status === "live" ? 0.9 : 0.6,
  })),
  { path: "/about", title: "About", summary: "Who we are, how we think and what we build.", priority: 0.7 },
  { path: "/contact", title: "Contact", summary: "Book a 15-minute call or email us to start a project.", priority: 0.8 },
  { path: "/blog", title: "Blog", summary: "Guides and lessons on Snapchat Lenses and AR marketing.", priority: 0.8 },
  ...blogCategories.map((c) => ({ path: categoryHref(c.slug), title: `Blog: ${c.name}`, summary: c.description, priority: 0.5 })),
  ...sortedPosts().map((p) => ({ path: postHref(p.slug), title: p.title, summary: p.description, priority: 0.7, updated: p.updated })),
  ...legalLinks.map((l) => ({ path: l.href, title: l.label, summary: `${l.label} for this website.`, priority: 0.3 })),
];
