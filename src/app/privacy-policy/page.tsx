import {
  COMPANY_ADDRESS,
  COMPANY_COURT,
  COMPANY_MBS,
  COMPANY_VAT,
  CONTACT_EMAIL,
} from "@/utils/links";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  path: "/privacy-policy",
  title: "Privacy Policy | Alpha Code",
  description:
    "How Alpha Code handles personal data on this website: what is collected, why, who processes it and what your rights are.",
});

const linkClassName =
  "text-brand-code font-semibold underline-offset-4 hover:underline dark:text-blue-400";

const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
    {children}
  </a>
);

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="flex flex-col gap-3 border-t border-neutral-300 pt-6 dark:border-neutral-800">
    <h2 className="text-xl font-bold text-neutral-800 md:text-2xl dark:text-white">{title}</h2>
    <div className="flex flex-col gap-3 text-neutral-600 md:text-lg dark:text-neutral-400">
      {children}
    </div>
  </section>
);

const rights = [
  "Access the personal data we hold about you",
  "Have inaccurate data corrected",
  "Have your data deleted",
  "Restrict or object to how we use it",
  "Receive your data in a portable format",
  "Withdraw consent at any time, where we rely on it",
];

export default function PrivacyPolicyPage() {
  return (
    <main className="px-8 pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto flex max-w-3xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold text-neutral-800 md:text-5xl dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">Last updated: October 31, 2026</p>
        </header>

        <Section title="Who we are">
          <p>
            Alpha Code d.o.o., {COMPANY_ADDRESS} (MBS: {COMPANY_MBS}, {COMPANY_COURT}, VAT:{" "}
            {COMPANY_VAT}), is the data controller for this website. For anything related to your
            personal data, email us at{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className={linkClassName}>
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>

        <Section title="Hosting">
          <p>
            This website is hosted by Vercel. Like any web server, it receives technical information
            with each request, such as your IP address and browser details, in order to deliver the
            page and keep the site secure. We rely on our legitimate interest in running a secure
            website.
          </p>
        </Section>

        <Section title="Analytics">
          <p>
            We use Vercel Web Analytics to see how the site is used. It records the page visited,
            the referring site, your approximate location, and your browser, operating system and
            device type. We only see aggregated statistics.
          </p>
          <p>
            It does not use cookies. Visits are counted with a hash created from the incoming
            request, which is discarded after 24 hours. We rely on our legitimate interest in
            understanding and improving the site.{" "}
            <ExternalLink href="https://vercel.com/docs/analytics/privacy-policy">
              Read Vercel&apos;s analytics privacy information
            </ExternalLink>
            .
          </p>
        </Section>

        <Section title="When you contact us">
          <p>
            If you email us, we receive your email address and whatever you include in your message.
            We use it to reply and to prepare or carry out any work we agree on. We keep it for as
            long as needed for that, and longer where accounting or tax law requires it. We rely on
            taking steps toward a contract with you, our legitimate interest in answering enquiries,
            and our legal obligations.
          </p>
        </Section>

        <Section title="Booking a call">
          <p>
            Our booking links take you to Calendly, which handles the details you enter there under
            its own <ExternalLink href="https://calendly.com/privacy">privacy policy</ExternalLink>.
            We receive your booking details and use them to hold the call, on the same basis and for
            the same period as other enquiries.
          </p>
        </Section>

        <Section title="Blog comments">
          <p>
            Blog posts load a comment section from{" "}
            <ExternalLink href="https://giscus.app">giscus</ExternalLink>, an independent
            open-source service. To comment, you sign in with GitHub, and giscus keeps you signed in
            with a token stored in your browser. We rely on your consent, given when you choose to
            sign in and post.
          </p>
          <p>
            Comments are published as GitHub Discussions, so they are public and tied to your GitHub
            account. GitHub handles that data under its{" "}
            <ExternalLink href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
              privacy statement
            </ExternalLink>
            .
          </p>
        </Section>

        <Section title="Cookies and browser storage">
          <p>
            We don&apos;t set cookies and don&apos;t use advertising or cross-site tracking. If you
            switch between light and dark mode, your choice is saved in your browser so it stays the
            same on your next visit.
          </p>
        </Section>

        <Section title="Other websites">
          <p>
            Links to services such as LinkedIn, GitHub and X take you to sites with their own
            privacy policies. Nothing is shared with them unless you follow a link.
          </p>
        </Section>

        <Section title="International transfers">
          <p>
            Some of the providers above are based in the United States. Where your data leaves the
            European Economic Area, the transfer relies on safeguards such as the EU-US Data Privacy
            Framework or the European Commission&apos;s standard contractual clauses.
          </p>
        </Section>

        <Section title="Your rights">
          <p>Under the GDPR, you can ask us to:</p>
          <ul className="flex list-disc flex-col gap-1 pl-5">
            {rights.map((right) => (
              <li key={right}>{right}</li>
            ))}
          </ul>
          <p>
            To use any of these rights, email us. You can also complain to the Croatian data
            protection authority, <ExternalLink href="https://azop.hr">AZOP</ExternalLink>.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            If how we handle personal data changes, we will update this page and the date at the
            top.
          </p>
        </Section>
      </div>
    </main>
  );
}
