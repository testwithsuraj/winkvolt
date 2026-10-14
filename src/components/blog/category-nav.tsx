import Link from "next/link";

import { blogCategories, blogPosts, categoryHref } from "@/lib/blog";
import { cn } from "@/lib/utils";

/** Category filter. Each chip is a real, crawlable page. */
export function CategoryNav({ active }: { active?: string }) {
  const items = [
    { slug: undefined, name: "All posts", href: "/blog", count: blogPosts.length },
    ...blogCategories.map((c) => ({
      slug: c.slug,
      name: c.name,
      href: categoryHref(c.slug),
      count: blogPosts.filter((p) => p.category === c.slug).length,
    })),
  ];
  return (
    <nav aria-label="Blog categories" className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" data-lenis-prevent-horizontal="">
      <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
        {items.map((item) => {
          const isActive = item.slug === active;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors duration-300",
                  isActive ? "border-ink bg-ink text-paper" : "border-line hover:border-ink",
                )}
              >
                {item.name}
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.5 font-mono text-[0.65rem] leading-none",
                    isActive ? "bg-volt text-ink" : "bg-paper-2 text-muted",
                  )}
                >
                  {item.count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
