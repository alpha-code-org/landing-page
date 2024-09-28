import HeroParallax from "@/components/ui/hero-parallax";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { services } from "@/components/utils/services";
import { Typewriter } from "@/components/ui/typewritter";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroParallax />
      <StickyScroll services={services} />
      <Typewriter />
    </main>
  );
}
