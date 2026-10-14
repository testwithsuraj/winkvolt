import { CategoryNav } from "@/components/blog/category-nav";
import { PostCard } from "@/components/blog/post-card";
import { Reveal, SplitWords } from "@/components/ui/reveal";
import type { BlogPost } from "@/lib/blog";

type BlogIndexProps = {
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  posts: BlogPost[];
  activeCategory?: string;
  /** Show the first post as a large featured card. */
  feature?: boolean;
};

export function BlogIndex({ eyebrow, title, accent, description, posts, activeCategory, feature = true }: BlogIndexProps) {
  const [lead, ...rest] = posts;
  const showFeature = feature && lead;
  const grid = showFeature ? rest : posts;

  return (
    <section className="pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="font-mono text-xs tracking-[0.18em] text-muted uppercase">{eyebrow}</p>
            </Reveal>
            <h1 className="text-heading mt-6 text-[clamp(2.6rem,7vw,6rem)]">
              <SplitWords text={title} />{" "}
              <SplitWords text={accent} delay={0.2} wordClassName="font-serif font-normal italic" />
            </h1>
          </div>
          <Reveal delay={0.15} className="lg:col-span-4">
            <p className="max-w-md text-lg leading-relaxed text-muted">{description}</p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-10 border-t border-line pt-6 sm:mt-14">
          <CategoryNav active={activeCategory} />
        </Reveal>

        {showFeature && (
          <Reveal className="mt-8">
            <PostCard post={lead} featured />
          </Reveal>
        )}

        {grid.length > 0 && (
          <ul className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {grid.map((post, i) => (
              <li key={post.slug}>
                <Reveal delay={(i % 3) * 0.08} className="h-full">
                  <PostCard post={post} />
                </Reveal>
              </li>
            ))}
          </ul>
        )}

        {posts.length === 0 && <p className="mt-12 text-lg text-muted">No posts here yet. Check back soon.</p>}
      </div>
    </section>
  );
}
