import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogIndex } from "@/components/blog/blog-index";
import { JsonLd } from "@/components/json-ld";
import { blogCategories, categoryHref, getCategory, postHref, postsInCategory } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogCategories.map((c) => ({ category: c.slug }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) return {};
  return pageMetadata({ title: `${c.name} articles`, description: c.description, path: categoryHref(c.slug) });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const c = getCategory(category);
  if (!c) notFound();
  const posts = postsInCategory(c.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${c.name} articles`,
          description: c.description,
          url: `${site.url}${categoryHref(c.slug)}`,
          isPartOf: { "@id": `${site.url}/blog#blog` },
          mainEntity: {
            "@type": "ItemList",
            itemListElement: posts.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${site.url}${postHref(p.slug)}`,
              name: p.title,
            })),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
            { "@type": "ListItem", position: 3, name: c.name, item: `${site.url}${categoryHref(c.slug)}` },
          ],
        }}
      />
      <BlogIndex
        eyebrow={`Blog · ${c.name}`}
        title={c.name}
        accent="articles."
        description={c.description}
        posts={posts}
        activeCategory={c.slug}
        feature={posts.length > 2}
      />
    </>
  );
}
