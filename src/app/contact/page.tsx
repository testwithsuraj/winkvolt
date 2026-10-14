import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Start a project with WinkVolt. Book a 15-minute call or email info@winkvolt.com about your Snapchat Lens idea.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <div className="bg-volt pt-16 sm:pt-20">
        <Contact index="01" />
      </div>
      <Faq index="02" />
    </>
  );
}
