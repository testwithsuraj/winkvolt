import { Capabilities } from "@/components/sections/capabilities";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Navbar } from "@/components/sections/navbar";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Statement } from "@/components/sections/statement";
import { Stats } from "@/components/sections/stats";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="main">
        <Hero />
        <Marquee />
        <Stats />
        <Services />
        <Capabilities />
        <Process />
        <Statement />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
