import type { MetadataRoute } from "next";

import { pages } from "@/lib/pages";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map((p) => ({
    url: `${site.url}${p.path === "/" ? "" : p.path}`,
    lastModified: p.updated ? new Date(`${p.updated}T00:00:00Z`) : lastModified,
    changeFrequency: p.priority >= 0.8 ? "weekly" : "monthly",
    priority: p.priority,
  }));
}
