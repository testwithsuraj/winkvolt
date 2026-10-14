import { ImageResponse } from "next/og";

import { site } from "@/lib/site";

export const alt = `${site.name}: ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f2efe8",
          color: "#0e0e0c",
          padding: 72,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="72" height="72" viewBox="0 0 40 40">
            <rect width="40" height="40" rx="12" fill="#0e0e0c" />
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
          <div style={{ fontSize: 44, fontWeight: 700, letterSpacing: -2 }}>winkvolt</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>We build things</div>
          <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -5, lineHeight: 1 }}>people play with.</div>
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 24 }}>
          {[
            ["#0e0e0c", "#f2efe8", "Snapchat Lenses"],
            ["#2f4bff", "#f2efe8", "Roblox Games"],
            ["#ff5b2e", "#0e0e0c", "Mobile Apps"],
            ["#dcff3b", "#0e0e0c", "150+ lenses · 500M+ views"],
          ].map(([bg, fg, label]) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                height: 64,
                padding: "0 24px",
                whiteSpace: "nowrap",
                flexShrink: 0,
                background: bg,
                color: fg,
                borderRadius: 999,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
