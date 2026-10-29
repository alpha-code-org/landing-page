import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { industries } from "@/data/industries";
import { processSteps } from "@/data/process";
import { BookingButton } from "@/components/ui/booking-button";
import { SITE_URL, pageMetadata } from "@/utils/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

function findIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const industry = findIndustry((await params).slug);
  if (!industry) return {};

  const titleName = industry.name.replace(/\b(?!and\b)\w/g, (c) => c.toUpperCase());

  return pageMetadata({
    path: `/ai-automation/${industry.slug}`,
    title: `AI Automation for ${titleName} | Alpha Code`,
    description: `${industry.metaDescription} AI automation for ${industry.name.toLowerCase()}, starting with a free review.`,
  });
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
  const industry = findIndustry((await params).slug);
  if (!industry) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `AI automation for ${industry.name.toLowerCase()}`,
    serviceType: "AI automation",
    description: `${industry.pain} ${industry.solutions.join(" ")}`,
    url: `${SITE_URL}/ai-automation/${industry.slug}`,
    audience: { "@type": "BusinessAudience", name: industry.name },
    provider: {
      "@type": "ProfessionalService",
      name: "Alpha Code",
      url: "https://alpha-code.hr",
      address: { "@type": "PostalAddress", addressLocality: "Zagreb", addressCountry: "HR" },
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
      name: "Free AI automation review",
    },
  };

  return (
    <main className="dark:bg-dark-bg bg-stone-100 py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <article className="mx-auto flex max-w-3xl flex-col gap-16 px-8">
        <header className="flex flex-col gap-6">
          <p className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
            AI automation by industry
          </p>
          <h1 className="text-3xl font-bold text-neutral-900 md:text-5xl dark:text-white">
            AI automation for {industry.name.toLowerCase()}
          </h1>
          <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
            {industry.pain}
          </p>
        </header>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">
            What AI automation does for you
          </h2>
          <ul className="flex flex-col gap-4">
            {industry.solutions.map((solution) => (
              <li
                key={solution}
                className="border-t border-neutral-300 pt-4 text-neutral-700 md:text-lg dark:border-neutral-800 dark:text-neutral-300"
              >
                {solution}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-6">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">How it works</h2>
          <ol className="flex flex-col gap-6">
            {processSteps.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="text-brand-code text-lg font-bold md:text-xl">{i + 1}.</span>
                <div>
                  <h3 className="text-lg font-bold text-neutral-800 md:text-xl dark:text-white">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-neutral-600 md:text-lg dark:text-neutral-400">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
          <p className="text-neutral-600 md:text-lg dark:text-neutral-400">
            Our fee is a share of the savings the automation proves, and we sign an NDA before we
            look at anything.{" "}
            <Link
              href="/#pricing"
              className="text-brand-code font-semibold underline-offset-4 hover:underline dark:text-blue-400"
            >
              How pricing works
            </Link>
          </p>
        </section>

        <div className="self-start">
          <BookingButton className="bg-brand-code hover:text-brand-code z-20 border-slate-800 font-bold text-white transition-colors hover:bg-white">
            Book a free review
          </BookingButton>
        </div>

        <nav aria-label="Other industries" className="flex flex-col gap-4">
          <h2 className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
            Other industries
          </h2>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {industries
              .filter((other) => other.slug !== industry.slug)
              .map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/ai-automation/${other.slug}`}
                    className="text-neutral-600 underline-offset-4 hover:underline dark:text-neutral-400"
                  >
                    {other.name}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </article>
    </main>
  );
}
