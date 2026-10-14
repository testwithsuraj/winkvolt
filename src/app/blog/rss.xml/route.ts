import { getCategory, postHref, sortedPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const posts = sortedPosts();
  const items = posts
    .map((p) => {
      const url = `${site.url}${postHref(p.slug)}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.description)}</description>
      <category>${esc(getCategory(p.category)?.name ?? p.category)}</category>
      <pubDate>${new Date(`${p.published}T09:00:00Z`).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} Blog</title>
    <link>${site.url}/blog</link>
    <atom:link href="${site.url}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>${esc("Guides and lessons on Snapchat Lenses, AR marketing and play.")}</description>
    <language>en</language>
    <lastBuildDate>${new Date(`${posts[0]?.updated ?? "2026-10-14"}T09:00:00Z`).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
