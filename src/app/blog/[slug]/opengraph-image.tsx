import { ImageResponse } from "next/og";

import { blogPosts, getCategory, getPost, readingMinutes } from "@/lib/blog";

export const alt = "WinkVolt blog post";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

const tones = {
  volt: ["#dcff3b", "#0e0e0c"],
  cobalt: ["#2f4bff", "#f2efe8"],
  signal: ["#ff5b2e", "#0e0e0c"],
  ink: ["#0e0e0c", "#f2efe8"],
  paper: ["#e8e4d9", "#0e0e0c"],
} as const;

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug)!;
  const [bg, fg] = tones[post.cover.tone];
  const category = getCategory(post.category)?.name ?? "Blog";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f2efe8", padding: 40 }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: bg,
            color: fg,
            borderRadius: 40,
            padding: 56,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <svg width="56" height="56" viewBox="0 0 40 40">
                <rect width="40" height="40" rx="12" fill={bg === "#0e0e0c" ? "#2a2a26" : "#0e0e0c"} />
                <path
                  d="M9 13.5 14.5 27.5 20 17 25.5 27.5 31 13.5"
                  fill="none"
                  stroke="#dcff3b"
                  strokeWidth="3.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="31" cy="8" r="2.9" fill="#ff5b2e" />
              </svg>
              <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1.5 }}>winkvolt</div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 22,
                padding: "10px 22px",
                borderRadius: 999,
                background: fg,
                color: bg,
              }}
            >
              {category}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: post.title.length > 60 ? 62 : 72, lineHeight: 1.05, letterSpacing: -3 }}>
            {post.title}
          </div>
          <div style={{ display: "flex", fontSize: 24, opacity: 0.75 }}>
            WinkVolt Blog · {readingMinutes(post)} min read
          </div>
        </div>
      </div>
    ),
    size,
  );
}
