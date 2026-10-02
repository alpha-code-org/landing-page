import { pageMetadata, homeDescription, homeTitle } from "@/utils/seo";
import HeroParallax from "@/components/ui/hero-parallax";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { Typewriter } from "@/components/ui/typewriter";
import Blog from "@/components/ui/blog";
import { ChecklistTerminal } from "@/components/ui/checklist-terminal";
import { AuditHighlight } from "@/components/ui/audit-highlight";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Companies } from "@/components/ui/companies";
import { Industries } from "@/components/ui/industries";
import { industries } from "@/data/industries";
import { Faq } from "@/components/ui/faq";
import { faq } from "@/data/faq";

export const metadata = pageMetadata({ path: "", title: homeTitle, description: homeDescription });

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Alpha Code",
  url: "https://alpha-code.hr",
  logo: "https://alpha-code.hr/logo.png",
  description:
    "AI automation and custom software for small and medium businesses, starting with a free review of what can be automated.",
  address: { "@type": "PostalAddress", addressLocality: "Zagreb", addressCountry: "HR" },
  areaServed: "Europe",
  knowsAbout: ["AI automation", "Business process automation", "Custom software development"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI automation for small and medium businesses",
    itemListElement: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        itemOffered: {
          "@type": "Service",
          name: "Free AI automation review",
          description: "A review of the everyday tasks in your business that could be automated.",
        },
      },
      ...industries.map((industry) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: `AI automation for ${industry.name.toLowerCase()}`,
          description: industry.solutions.join(" "),
          url: `https://alpha-code.hr/ai-automation/${industry.slug}`,
        },
      })),
    ],
  },
};

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function Home() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <HeroParallax />
      <Companies />
      <div className="bg-stone-200/30 py-20 md:py-32 dark:bg-transparent">
        <StickyScroll />
      </div>
      <MacbookScroll src="/business.webp" />
      <Industries />
      <AuditHighlight />
      <ChecklistTerminal />
      <div className="bg-stone-200/30 dark:bg-transparent">
        <Typewriter />
      </div>
      <Faq />
      <Blog />
    </main>
  );
}
