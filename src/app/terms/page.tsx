import { LegalPage } from "@/components/sections/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms of Service",
  description: `The terms that apply when you use the ${site.name} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      updated="October 14, 2026"
      intro={
        <p>
          These terms apply to your use of the {site.name} website. Client projects are covered by a separate
          agreement that we sign together before work begins.
        </p>
      }
      sections={[
        {
          heading: "Using this website",
          body: (
            <p>
              You may browse and share this website for personal and business purposes. Please don&apos;t misuse it,
              attempt to disrupt it or access it in ways it isn&apos;t designed for.
            </p>
          ),
        },
        {
          heading: "Our content",
          body: (
            <p>
              The text, graphics, logos and illustrations on this website belong to {site.name} unless stated
              otherwise. Please ask before reusing them.
            </p>
          ),
        },
        {
          heading: "Third-party platforms",
          body: (
            <p>
              Snapchat, Lens Studio and Roblox are trademarks of their respective owners. {site.name} is an
              independent studio and is not affiliated with or endorsed by them.
            </p>
          ),
        },
        {
          heading: "No warranty",
          body: (
            <p>
              We work hard to keep this website accurate and available, but it is provided &quot;as is&quot;, and
              information here may change without notice. Nothing on this site is a binding offer.
            </p>
          ),
        },
        {
          heading: "Changes and contact",
          body: (
            <p>
              We may update these terms from time to time; the date above shows the latest version. Questions? Email{" "}
              <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
          ),
        },
      ]}
    />
  );
}
