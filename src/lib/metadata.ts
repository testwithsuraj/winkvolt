import type { Metadata } from "next";

import { site } from "@/lib/site";

/** Per-page metadata with canonical URL and matching Open Graph / Twitter cards. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: site.tagline }],
    },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: ["/opengraph-image"] },
  };
}
