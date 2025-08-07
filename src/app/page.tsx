import HeroParallax from "@/components/ui/hero-parallax";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { services } from "@/components/utils/services";
import { Typewriter } from "@/components/ui/typewritter";
import Blog from "@/components/ui/blog";
import { GlobeDemo } from "@/components/ui/globe-demo";
import { ChecklistTerminal } from "@/components/ui/checklist-terminal";
import { AuditHighlight } from "@/components/ui/audit-highlight";
import { MacbookScroll } from "@/components/ui/macbook-scroll";

// TODO: Add animated testimonials section
export default function Home() {
  return (
    <main>
      <HeroParallax />
      <StickyScroll services={services} />
      <MacbookScroll src="/business.webp" />
      <AuditHighlight />
      <ChecklistTerminal />
      <GlobeDemo />
      <Typewriter />
      <Blog />
    </main>
  );
}
