import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogCover } from "@/components/blog/blog-cover";
import { Badge, PostCard } from "@/components/blog/post-card";
import { RichText } from "@/components/blog/rich-text";
import { Toc } from "@/components/blog/toc";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { CalendarIcon } from "@/components/ui/calendar-icon";
import { PlayArea } from "@/components/ui/play-area";
import { Reveal } from "@/components/ui/reveal";
import {
  blogPosts,
  categoryHref,
  formatDate,
  getCategory,
  getPost,
  postHref,
  readingMinutes,
  relatedPosts,
  wordCount,
  type Block,
} from "@/lib/blog";
import { site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const category = getCategory(post.category);
  const title = post.seoTitle ?? post.title;
  return {
    title: { absolute: `${title} | ${site.name}` },
    description: post.description,
    keywords: post.tags,
    authors: [{ name: `${site.name} Studio`, url: `${site.url}/about` }],
    alternates: { canonical: postHref(post.slug) },
    openGraph: {
      type: "article",
      url: postHref(post.slug),
      siteName: site.name,
      title,
      description: post.description,
      publishedTime: post.published,
      modifiedTime: post.updated,
      authors: [`${site.url}/about`],
      section: category?.name,
      tags: post.tags,
    },
    twitter: { card: "summary_large_image", title, description: post.description },
  };
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return (
        <p>
          <RichText text={block.text} />
        </p>
      );
    case "quote":
      return (
        <blockquote className="border-l-4 border-volt pl-5 type-lead text-ink italic">
          <RichText text={block.text} />
        </blockquote>
      );
    case "ul":
    case "ol": {
      const List = block.type === "ul" ? "ul" : "ol";
      return (
        <List className={block.type === "ul" ? "space-y-3" : "list-none space-y-3 [counter-reset:item]"}>
          {block.items.map((item) => (
            <li
              key={item}
              className={
                block.type === "ul"
                  ? "relative pl-6 before:absolute before:top-[0.7em] before:left-0 before:size-2 before:rounded-full before:bg-signal"
                  : "relative pl-10 [counter-increment:item] before:absolute before:top-0.5 before:left-0 before:grid before:size-7 before:place-items-center before:rounded-full before:bg-ink before:font-mono before:text-xs before:text-volt before:content-[counter(item)]"
              }
            >
              <RichText text={item} />
            </li>
          ))}
        </List>
      );
    }
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const category = getCategory(post.category);
  const url = `${site.url}${postHref(post.slug)}`;
  const toc = [
    { id: "short-answer", label: "The short answer" },
    ...post.sections.map((s) => ({ id: s.id, label: s.heading })),
    ...(post.faqs.length ? [{ id: "faq", label: "FAQ" }] : []),
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "@id": `${url}#article`,
          headline: post.seoTitle ?? post.title,
          description: post.description,
          image: [`${url}/opengraph-image`],
          datePublished: post.published,
          dateModified: post.updated,
          author: { "@type": "Organization", name: `${site.name} Studio`, url: `${site.url}/about` },
          publisher: { "@id": `${site.url}/#organization` },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
          articleSection: category?.name,
          keywords: post.tags.join(", "),
          wordCount: wordCount(post),
          inLanguage: "en",
          isPartOf: { "@id": `${site.url}/blog#blog` },
          speakable: { "@type": "SpeakableSpecification", cssSelector: ["#short-answer p"] },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
            ...(category
              ? [{ "@type": "ListItem", position: 3, name: category.name, item: `${site.url}${categoryHref(category.slug)}` }]
              : []),
            { "@type": "ListItem", position: category ? 4 : 3, name: post.title, item: url },
          ],
        }}
      />
      {post.faqs.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: post.faqs.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      )}

      <article className="pt-32 pb-20 sm:pt-40 sm:pb-28">
        <header className="container-x">
          <Reveal>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
                <li>
                  <Link href="/" className="hover:text-ink">
                    Home
                  </Link>
                </li>
                <li aria-hidden>/</li>
                <li>
                  <Link href="/blog" className="hover:text-ink">
                    Blog
                  </Link>
                </li>
                {category && (
                  <>
                    <li aria-hidden>/</li>
                    <li>
                      <Link href={categoryHref(category.slug)} className="hover:text-ink">
                        {category.name}
                      </Link>
                    </li>
                  </>
                )}
              </ol>
            </nav>
          </Reveal>

          <div className="mt-8 max-w-4xl">
            <Reveal delay={0.05} className="flex flex-wrap gap-2">
              {category && (
                <Link href={categoryHref(category.slug)}>
                  <Badge className="bg-ink text-paper transition-colors hover:bg-ink-3">{category.name}</Badge>
                </Link>
              )}
              <Badge className="bg-volt text-ink">{readingMinutes(post)} min read</Badge>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="mt-6 type-h1 text-balance">
                {post.title}
              </h1>
              <p className="mt-6 max-w-2xl type-lead text-muted">{post.description}</p>
            </Reveal>
            <Reveal delay={0.15} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-5 text-sm text-muted">
              <span>
                By <Link href="/about" className="font-medium text-ink hover:underline">{site.name} Studio</Link>
              </span>
              <span>
                Published <time dateTime={post.published}>{formatDate(post.published)}</time>
              </span>
              {post.updated !== post.published && (
                <span>
                  Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
                </span>
              )}
            </Reveal>
          </div>

          <Reveal delay={0.2} className="mt-10">
            <PlayArea amount={0.3}>
              <BlogCover post={post} large className="aspect-[16/9] rounded-[2rem] sm:aspect-[21/9]" />
            </PlayArea>
          </Reveal>
        </header>

        <div className="container-x mt-10 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <Toc items={toc} />
            </div>
          </aside>

          <div className="min-w-0 max-w-3xl lg:col-span-8 lg:col-start-5">
            <section id="short-answer" aria-labelledby="short-answer-title" className="rounded-[1.75rem] bg-volt p-6 sm:p-8">
              <h2 id="short-answer-title" className="font-mono text-xs tracking-[0.18em] uppercase">
                The short answer
              </h2>
              <p className="mt-4 type-lead font-medium">{post.answer}</p>
            </section>

            <section aria-labelledby="takeaways-title" className="mt-6 rounded-[1.75rem] border border-line p-6 sm:p-8">
              <h2 id="takeaways-title" className="font-mono text-xs tracking-[0.18em] text-muted uppercase">
                Key takeaways
              </h2>
              <ul className="mt-4 space-y-3">
                {post.takeaways.map((t) => (
                  <li key={t} className="flex gap-3 type-body">
                    <svg viewBox="0 0 16 16" aria-hidden className="mt-1 size-4 shrink-0">
                      <circle cx="8" cy="8" r="8" className="fill-ink" />
                      <path d="M4.5 8.2 7 10.5l4.5-5" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="stroke-volt" />
                    </svg>
                    {t}
                  </li>
                ))}
              </ul>
            </section>

            <div className="mt-12 space-y-10 type-body text-muted">
              {post.sections.map((s) => (
                <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-28">
                  <h2
                    id={`${s.id}-title`}
                    className="type-h2 text-ink"
                  >
                    {s.heading}
                  </h2>
                  <div className="mt-5 space-y-5">
                    {s.blocks.map((b, i) => (
                      <BlockView key={i} block={b} />
                    ))}
                  </div>
                </section>
              ))}

              {post.faqs.length > 0 && (
                <section id="faq" aria-labelledby="faq-title" className="scroll-mt-28">
                  <h2 id="faq-title" className="type-h2 text-ink">
                    Frequently asked questions
                  </h2>
                  <dl className="mt-6 divide-y divide-line border-y border-line">
                    {post.faqs.map((f) => (
                      <div key={f.q} className="py-6">
                        <dt className="type-h4 text-ink">{f.q}</dt>
                        <dd className="mt-2">{f.a}</dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
            </div>

            <ul className="mt-12 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Badge className="border border-line text-muted">{tag}</Badge>
                </li>
              ))}
            </ul>

            <aside className="mt-12 flex flex-col gap-6 rounded-[2rem] bg-ink p-7 text-paper sm:p-9">
              <div>
                <p className="font-mono text-xs tracking-[0.18em] text-paper/50 uppercase">Planning a lens?</p>
                <p className="mt-3 type-h3">
                  Let&apos;s make it <span className="font-serif font-normal text-volt italic">wink.</span>
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="volt" size="lg">
                  <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                    <CalendarIcon /> Book a 15-min call
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href={`mailto:${site.email}?subject=${encodeURIComponent(`Re: ${post.title}`)}`}>
                    Email us <ArrowIcon />
                  </a>
                </Button>
              </div>
            </aside>
          </div>
        </div>
      </article>

      <section aria-labelledby="related-title" className="border-t border-line py-16 sm:py-20">
        <div className="container-x">
          <div className="flex items-end justify-between gap-6">
            <h2 id="related-title" className="type-h2">
              Keep <span className="font-serif font-normal italic">reading.</span>
            </h2>
            <Link href="/blog" className="group/button hidden items-center gap-2 font-semibold sm:inline-flex">
              All posts <ArrowIcon />
            </Link>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts(post).map((p) => (
              <li key={p.slug}>
                <PostCard post={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
