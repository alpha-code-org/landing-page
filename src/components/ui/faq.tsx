import { faq } from "@/data/faq";

export const Faq = () => {
  return (
    <section className="relative px-8 py-20 md:py-32">
      <div className="mx-auto flex max-w-3xl flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium tracking-widest text-neutral-500 uppercase">FAQ</p>
          <h2 className="text-2xl font-bold text-neutral-800 md:text-4xl dark:text-white">
            Common questions
          </h2>
        </div>

        <div className="flex flex-col">
          {faq.map((item) => (
            <details
              key={item.question}
              className="group border-t border-neutral-300 py-4 last:border-b dark:border-neutral-800"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-neutral-800 dark:text-white [&::-webkit-details-marker]:hidden">
                <h3>{item.question}</h3>
                <span className="text-neutral-500 transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
