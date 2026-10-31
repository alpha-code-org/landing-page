import { HeroHighlight, Highlight } from "./audit-highlight";
import { BookingButton } from "./booking-button";

export const WebsiteDesignHighlight = () => {
  return (
    <HeroHighlight>
      <div className="animate-fade-in-bounce mx-auto flex max-w-4xl flex-col items-center gap-12 px-4">
        <h1 className="text-center text-2xl leading-relaxed font-bold text-neutral-700 md:text-4xl lg:text-5xl lg:leading-snug dark:text-white">
          We design websites that make{" "}
          <Highlight className="whitespace-nowrap text-white">your business stand out</Highlight>
        </h1>

        <BookingButton className="bg-brand-alpha hover:text-brand-code z-20 border-slate-800 text-white transition-colors hover:bg-white">
          Talk to us
        </BookingButton>
      </div>
    </HeroHighlight>
  );
};
