import { AuditHighlight } from "@/components/ui/audit-highlight";
import { pageMetadata } from "@/utils/seo";

export const metadata = pageMetadata({
  path: "/codebase-audit",
  title: "Codebase Audit | Alpha Code",
  description:
    "An independent review of your codebase that finds security vulnerabilities and areas for improvement.",
});

const checks = [
  {
    title: "Security",
    text: "Vulnerabilities, exposed secrets and risky dependencies.",
  },
  {
    title: "Performance",
    text: "Slow queries, heavy pages and the bottlenecks behind them.",
  },
  {
    title: "Maintainability",
    text: "The parts of the code that make every change slower and riskier.",
  },
];

export default function CodebaseAuditPage() {
  return (
    <main>
      <AuditHighlight as="h1" />

      <section className="dark:bg-dark-bg bg-stone-100 px-8 py-16 md:py-24">
        <div className="mx-auto flex max-w-3xl flex-col gap-6">
          <h2 className="text-2xl font-bold text-neutral-800 dark:text-white">What we look at</h2>
          <ul className="flex flex-col gap-4">
            {checks.map((check) => (
              <li
                key={check.title}
                className="border-t border-neutral-300 pt-4 dark:border-neutral-800"
              >
                <h3 className="font-bold text-neutral-800 dark:text-white">{check.title}</h3>
                <p className="mt-1 text-neutral-600 dark:text-neutral-400">{check.text}</p>
              </li>
            ))}
          </ul>
          <p className="text-neutral-600 dark:text-neutral-400">
            Everything we see stays with you, and we sign an NDA before we look at any code.
          </p>
        </div>
      </section>
    </main>
  );
}
