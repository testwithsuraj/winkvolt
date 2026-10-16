import { BlogIndex } from "@/components/blog/blog-index";
import { JsonLd } from "@/components/json-ld";
import { postHref, sortedPosts } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

const description =
  "Guides, ideas and lessons from building 150+ Snapchat Lenses with 300M+ total views: lens types, costs, timelines, sharing and AR marketing.";

export const metadata = {
  ...pageMetadata({ title: "Blog", description, path: "/blog" }),
  alternates: { canonical: "/blog", types: { "application/rss+xml": `${site.url}/blog/rss.xml` } },
};

export default function BlogPage() {
  const posts = sortedPosts();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${site.url}/blog#blog`,
          name: `${site.name} Blog`,
          description,
          url: `${site.url}/blog`,
          publisher: { "@id": `${site.url}/#organization` },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${site.url}${postHref(p.slug)}`,
            datePublished: p.published,
            dateModified: p.updated,
          })),
        }}
      />
      <BlogIndex
        eyebrow="WinkVolt Blog"
        title="Notes on lenses, play and"
        accent="reach."
        description={description}
        posts={posts}
      />
    </>
  );
}
