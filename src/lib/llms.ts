import { getCategory, postHref, postMarkdown, sortedPosts } from "@/lib/blog";
import { pages } from "@/lib/pages";
import { capabilities, faqs, process, services, site, stats } from "@/lib/site";

const abs = (path: string) => `${site.url}${path === "/" ? "" : path}`;

/** llms.txt (https://llmstxt.org): a short, link-first summary of the site for AI assistants. */
export function llmsTxt() {
  return [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `${site.name} is a creative technology studio. Today we design and build Snapchat Lenses (face, world and game lenses, and sponsored brand lenses) in Lens Studio. Roblox games and mobile apps are coming soon.`,
    "",
    `- Track record: ${stats.map((s) => `${s.value}${s.suffix} ${s.label.toLowerCase()}`).join(", ")}`,
    `- Contact: ${site.email}`,
    `- Book a 15-minute call: ${site.bookingUrl}`,
    "",
    "## Pages",
    "",
    ...pages
      .filter((p) => p.priority >= 0.6 && !p.path.startsWith("/blog/"))
      .map((p) => `- [${p.title}](${abs(p.path)}): ${p.summary}`),
    "",
    "## Blog",
    "",
    ...sortedPosts().map((p) => `- [${p.title}](${abs(postHref(p.slug))}): ${p.answer}`),
    "",
    "## Optional",
    "",
    `- [Full details](${site.url}/llms-full.txt): services, capabilities, process and FAQ in one file`,
    `- [RSS feed](${site.url}/blog/rss.xml)`,
    ...pages.filter((p) => p.priority < 0.5).map((p) => `- [${p.title}](${abs(p.path)})`),
    "",
  ].join("\n");
}

/** llms-full.txt: the same content as the site, in plain Markdown. */
export function llmsFullTxt() {
  return [
    `# ${site.name}`,
    "",
    `> ${site.description}`,
    "",
    `Website: ${site.url}`,
    `Email: ${site.email}`,
    `Book a 15-minute call: ${site.bookingUrl}`,
    "",
    "## Services",
    "",
    ...services.flatMap((s) => [
      `### ${s.title}${s.status === "soon" ? " (coming soon)" : ""}`,
      "",
      s.body,
      "",
      ...s.points.map((p) => `- ${p}`),
      "",
      `More: ${abs(`/services/${s.slug}`)}`,
      "",
    ]),
    "## Capabilities",
    "",
    ...capabilities.map((c) => `- **${c.title}**: ${c.body}`),
    "",
    "## Process",
    "",
    ...process.map((p) => `${p.step}. **${p.title}** (${p.meta}): ${p.body}`),
    "",
    "## FAQ",
    "",
    ...faqs.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
    "# Blog",
    "",
    ...sortedPosts().flatMap((p) => [
      postMarkdown(p),
      `Category: ${getCategory(p.category)?.name ?? p.category} · Published ${p.published} · ${abs(postHref(p.slug))}`,
      "",
    ]),
  ].join("\n");
}
