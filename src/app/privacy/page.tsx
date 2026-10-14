import { LegalPage } from "@/components/sections/legal-page";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal information.`,
  path: "/privacy",
});

const mail = (
  <a href={`mailto:${site.email}`} className="text-ink underline underline-offset-4">
    {site.email}
  </a>
);

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 14, 2026"
      intro={
        <p>
          This policy explains what information {site.name} collects when you visit {site.url.replace("https://", "")}{" "}
          or contact us, and how we use it. We keep it simple: we only collect what we need to reply to you and run
          this website.
        </p>
      }
      sections={[
        {
          heading: "Information we collect",
          body: (
            <>
              <p>
                When you email us or book a call, we receive the details you choose to share, such as your name,
                email address, company and project information.
              </p>
              <p>
                Like most websites, our hosting provider may automatically log technical data such as your IP
                address, browser type and the pages you visit, to keep the site secure and working.
              </p>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <p>
              We use your information to respond to enquiries, discuss and deliver projects, and improve this
              website. We do not sell your personal information.
            </p>
          ),
        },
        {
          heading: "Third-party services",
          body: (
            <p>
              We rely on trusted providers to host this website, handle email and schedule calls. When you book a
              call, the scheduling provider processes your booking under its own privacy policy.
            </p>
          ),
        },
        {
          heading: "Cookies",
          body: (
            <p>
              This website does not use advertising or tracking cookies. If that changes, we will update this
              policy and ask for consent where required.
            </p>
          ),
        },
        {
          heading: "Retention and your rights",
          body: (
            <p>
              We keep enquiry and project correspondence only as long as needed for the purposes above. You can ask
              us to access, correct or delete your personal information at any time by emailing {mail}.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: <p>Questions about this policy? Email {mail}.</p>,
        },
      ]}
    />
  );
}
