import { Plus } from "lucide-react";
import { faq } from "@/data/faq";
import { EmailLink } from "./email-link";

export const Faq = () => {
  return (
    <section className="relative px-8 py-20 md:py-32">
      <div className="mx-auto grid max-w-5xl items-start gap-10 md:grid-cols-[2fr_3fr] md:gap-16">
        <div className="flex flex-col gap-4 text-center md:sticky md:top-24 md:text-left">
          <p className="text-sm font-medium tracking-widest text-neutral-600 uppercase dark:text-neutral-400">
            FAQ
          </p>
          <h2 className="text-3xl font-bold text-neutral-800 md:text-5xl dark:text-white">
            Common questions
          </h2>
          <p className="text-neutral-600 dark:text-neutral-400">
            Anything we missed? Ask us directly.
          </p>
          <EmailLink />
        </div>

        <div className="flex flex-col gap-3">
          {faq.map((item, index) => (
            <details
              key={item.question}
              open={index === 0}
              className="group smooth-details open:border-brand-code/40 open:bg-brand-code/5 dark:bg-dark-bg rounded-2xl border border-neutral-300 bg-white transition-colors duration-300 hover:border-neutral-400 dark:border-neutral-800 dark:open:border-blue-400/40 dark:open:bg-blue-400/5 dark:hover:border-neutral-600"
            >
              <summary className="flex cursor-pointer list-none items-center gap-4 p-4 md:p-5 [&::-webkit-details-marker]:hidden">
                <span className="bg-brand-code/10 text-brand-code group-open:bg-brand-code flex size-10 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 group-open:text-white dark:bg-blue-400/10 dark:text-blue-400 dark:group-open:bg-blue-400 dark:group-open:text-neutral-900">
                  <item.icon className="size-5" aria-hidden />
                </span>
                <h3 className="flex-1 font-bold text-neutral-800 dark:text-white">
                  {item.question}
                </h3>
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-neutral-300 text-neutral-500 transition-transform duration-300 group-open:rotate-45 dark:border-neutral-700 dark:text-neutral-400">
                  <Plus className="size-4" aria-hidden />
                </span>
              </summary>
              <p className="px-4 pb-5 leading-relaxed text-neutral-600 md:pr-5 md:pl-[4.75rem] dark:text-neutral-400">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
