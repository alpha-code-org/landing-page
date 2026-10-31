import { WebsiteDesignHighlight } from "@/components/ui/website-design-highlight";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  path: "/modern-website-design",
  title: "Modern Website Design | Alpha Code",
  description:
    "Custom websites for small and medium businesses: a clean design that fits your brand, fast pages, and a layout that works on every device.",
});

const features = [
  {
    title: "Custom design",
    text: "A clean design built around your brand instead of a template.",
  },
  {
    title: "Speed",
    text: "Pages that load quickly, so visitors stay long enough to get in touch.",
  },
  {
    title: "Mobile",
    text: "A layout that works just as well on a phone as it does on a desktop.",
  },
  {
    title: "Search",
    text: "A clean structure and metadata that help search engines understand your site.",
  },
];

export default function ModernWebsiteDesignPage() {
  return (
    <main>
      <WebsiteDesignHighlight />

      <section className="dark:bg-dark-bg bg-stone-100 px-8 py-16 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">What you get</h2>
          <ul className="flex flex-col gap-4">
            {features.map((feature) => (
              <li
                key={feature.title}
                className="border-t border-neutral-300 pt-4 dark:border-neutral-800"
              >
                <h3 className="text-lg font-bold text-neutral-800 md:text-xl dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-1 text-neutral-600 md:text-lg dark:text-neutral-400">
                  {feature.text}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
