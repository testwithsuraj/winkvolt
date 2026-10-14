import { JsonLd } from "@/components/json-ld";
import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Statement } from "@/components/sections/statement";
import { Stats } from "@/components/sections/stats";
import { faqs } from "@/lib/site";

export default function Home() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <Hero />
      <Marquee />
      <Stats />
      <Services />
      <Capabilities />
      <Process />
      <Statement />
      <Faq />
      <Contact />
    </>
  );
}
