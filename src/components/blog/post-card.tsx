import Link from "next/link";

import { BlogCover } from "@/components/blog/blog-cover";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { PlayArea } from "@/components/ui/play-area";
import { formatDate, getCategory, postHref, readingMinutes, type BlogPost } from "@/lib/blog";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.68rem] leading-none tracking-[0.1em] uppercase",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PostMeta({ post, className }: { post: BlogPost; className?: string }) {
  return (
    <p className={cn("flex flex-wrap items-center gap-x-2 text-sm text-muted", className)}>
      <time dateTime={post.published}>{formatDate(post.published)}</time>
      <span aria-hidden>·</span>
      <span>{readingMinutes(post)} min read</span>
    </p>
  );
}

/** Blog card. The whole card is clickable through a stretched title link. */
export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const category = getCategory(post.category);
  return (
    <PlayArea
      amount={0.5}
      className={cn(
        "group/button relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-paper p-3 transition-[border-color,transform] duration-500 ease-out-expo hover:-translate-y-1 hover:border-ink",
        featured && "lg:grid lg:grid-cols-2 lg:gap-4",
      )}
    >
      <div className="relative">
        <BlogCover
          post={post}
          large={featured}
          className={cn("aspect-[16/10] rounded-[1.5rem]", featured && "lg:aspect-auto lg:h-full lg:min-h-[22rem]")}
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {category && <Badge className="bg-paper text-ink">{category.name}</Badge>}
          {featured && (
            <Badge className="bg-ink text-paper">
              <span className="size-1.5 rounded-full bg-volt" /> Featured
            </Badge>
          )}
        </div>
      </div>

      <div className={cn("flex flex-1 flex-col p-4 pt-5", featured && "lg:justify-center lg:p-8")}>
        <PostMeta post={post} />
        <h3
          className={cn(
            "mt-3 font-semibold tracking-tight text-balance",
            featured ? "type-title" : "type-h3",
          )}
        >
          <Link href={postHref(post.slug)} className="outline-none after:absolute after:inset-0 after:rounded-[2rem]">
            {post.title}
          </Link>
        </h3>
        <p className={cn("mt-3 text-muted", featured ? "type-lead" : "line-clamp-3 type-body")}>{post.description}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-6">
          <ul className="flex flex-wrap gap-1.5">
            {post.tags.slice(0, featured ? 3 : 2).map((tag) => (
              <li key={tag}>
                <Badge className="border border-line text-muted">{tag}</Badge>
              </li>
            ))}
          </ul>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
            Read <ArrowIcon className="size-3.5" />
          </span>
        </div>
      </div>
    </PlayArea>
  );
}
