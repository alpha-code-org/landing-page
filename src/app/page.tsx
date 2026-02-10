import HeroParallax from "@/components/ui/hero-parallax";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { services } from "@/components/utils/services";
import { Typewriter } from "@/components/ui/typewritter";
import Blog from "@/components/ui/blog";
import { ChecklistTerminal } from "@/components/ui/checklist-terminal";
import { AuditHighlight } from "@/components/ui/audit-highlight";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Companies } from "@/components/ui/companies";

export default function Home() {
  return (
    <main>
      <HeroParallax />
      <Companies />
      <div className="bg-stone-200/30 dark:bg-transparent py-20 md:py-32">
        <StickyScroll services={services} />
      </div>
      <MacbookScroll src="/business.webp" />
      <AuditHighlight />
      <ChecklistTerminal />
      <div className="bg-stone-200/30 dark:bg-transparent">
        <Typewriter />
      </div>
      <Blog />
    </main>
  );
}
