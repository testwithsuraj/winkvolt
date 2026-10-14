import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { JsonLd } from "@/components/json-ld";
import { Capabilities } from "@/components/sections/capabilities";
import { ComingSoon, ServicePanel } from "@/components/sections/coming-soon";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { LensTypes } from "@/components/sections/lens-types";
import { PageHero } from "@/components/sections/page-hero";
import { Process } from "@/components/sections/process";
import { Stats } from "@/components/sections/stats";
import { Button } from "@/components/ui/button";
import { ArrowIcon } from "@/components/ui/arrow-icon";
import { CalendarIcon } from "@/components/ui/calendar-icon";
import { PlayArea } from "@/components/ui/play-area";
import { pageMetadata } from "@/lib/metadata";
import { serviceHref, services, site } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

const copy = {
  lenses: {
    title: "Snapchat Lenses people",
    accent: "play.",
    description:
      "Face, world and game lenses built in Lens Studio, from first concept to launch. 150+ lenses built and 500M+ total views so far.",
    meta: "Snapchat Lens studio: face, world and game lenses and sponsored brand lenses built in Lens Studio. 150+ lenses built, 500M+ total views.",
  },
  roblox: {
    title: "Roblox games are",
    accent: "on the way.",
    description:
      "We're bringing our play-first approach to Roblox. Tell us about your idea now and you'll be first in line when we open up.",
    meta: "WinkVolt Roblox game development is coming soon: game design, Luau, UGC and live ops. Get in touch to hear first.",
  },
  apps: {
    title: "Mobile apps are",
    accent: "on the way.",
    description:
      "iOS and Android apps with camera-first features are next on our roadmap. Get in touch and we'll let you know as soon as we start.",
    meta: "WinkVolt mobile app development for iOS and Android is coming soon. Get in touch to hear first.",
  },
} as const;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return pageMetadata({
    title: service.status === "soon" ? `${service.title} (Coming soon)` : service.title,
    description: copy[service.key].meta,
    path: serviceHref(service.slug),
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const c = copy[service.key];
  const soon = service.status === "soon";

  const notify = `mailto:${site.email}?subject=${encodeURIComponent(`Notify me: ${service.title}`)}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          serviceType: service.title,
          description: c.meta,
          url: `${site.url}${serviceHref(service.slug)}`,
          provider: { "@id": `${site.url}/#organization` },
          ...(soon ? {} : { areaServed: "Worldwide" }),
        }}
      />
      <PageHero
        eyebrow={soon ? `${service.title} · Coming soon` : `Services · ${service.title}`}
        title={c.title}
        accent={c.accent}
        description={c.description}
        actions={
          <>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href={soon ? notify : site.bookingUrl} {...(soon ? {} : { target: "_blank", rel: "noopener noreferrer" })}>
                {soon ? (
                  <>
                    Get notified <ArrowIcon />
                  </>
                ) : (
                  <>
                    <CalendarIcon /> Book a 15-min call
                  </>
                )}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              {soon ? (
                <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer">
                  <CalendarIcon /> Book a 15-min call
                </a>
              ) : (
                <a href={`mailto:${site.email}?subject=${encodeURIComponent("New lens project")}`}>Email us</a>
              )}
            </Button>
          </>
        }
        aside={
          <PlayArea amount={0.4}>
            <ServicePanel service={service} />
          </PlayArea>
        }
      />

      {soon ? (
        <ComingSoon service={service} />
      ) : (
        <>
          <Stats index="01" />
          <LensTypes index="02" />
          <Capabilities index="03" />
          <Process index="04" />
          <Faq index="05" />
        </>
      )}
      <Contact index={soon ? "02" : "06"} />
    </>
  );
}
