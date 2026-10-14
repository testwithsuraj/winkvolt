import { Contact } from "@/components/sections/contact";
import { PageHero } from "@/components/sections/page-hero";
import { Services } from "@/components/sections/services";
import { Statement } from "@/components/sections/statement";
import { Stats } from "@/components/sections/stats";
import { Values } from "@/components/sections/values";
import { LogoMark } from "@/components/svg/logo";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "WinkVolt is a creative technology studio building Snapchat Lenses people play and share, with 150+ lenses built and 500M+ total views. Roblox games and mobile apps are next.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About WinkVolt"
        title="A studio for things people"
        accent="play with."
        description="We started with Snapchat Lenses because they're the fastest way to put play in people's hands. 150+ lenses and 500M+ views later, we're bringing the same thinking to Roblox and mobile apps."
        aside={
          <div className="grid aspect-square place-items-center rounded-[2rem] bg-volt">
            <LogoMark className="size-[45%]" interval={3500} />
          </div>
        }
      />
      <Stats index="01" />
      <Values index="02" />
      <Services index="03" />
      <Statement />
      <Contact index="04" />
    </>
  );
}
