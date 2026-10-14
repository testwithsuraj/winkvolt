import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { MotionConfig } from "motion/react";

import { JsonLd } from "@/components/json-ld";
import { Footer } from "@/components/sections/footer";
import { Navbar } from "@/components/sections/navbar";
import { SmoothScroll } from "@/components/smooth-scroll";
import { site } from "@/lib/site";
import "lenis/dist/lenis.css";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Snapchat Lens Studio`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "technology",
  keywords: [
    "Snapchat Lenses",
    "Snapchat Lens developer",
    "Lens Studio",
    "AR filters",
    "AR lens agency",
    "sponsored lenses",
    "face filters",
    "Roblox games",
    "mobile app development",
    "creative technology studio",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: site.name,
    title: `${site.name} | We build things people play with`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | We build things people play with`,
    description: site.description,
  },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#f2efe8",
  width: "device-width",
  initialScale: 1,
};

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  email: site.email,
  description: site.description,
  knowsAbout: ["Snapchat Lenses", "Lens Studio", "Augmented reality", "Roblox", "Mobile apps"],
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  name: site.name,
  url: site.url,
  description: site.description,
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}>
      <body>
        <div id="top" aria-hidden />
        <JsonLd data={organization} />
        <JsonLd data={website} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-paper"
        >
          Skip to content
        </a>
        <MotionConfig reducedMotion="user">
          <SmoothScroll>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </SmoothScroll>
        </MotionConfig>
      </body>
    </html>
  );
}
