import HeroParallax from "@/components/ui/hero-parallax";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { services } from "@/components/utils/services";
import { Typewriter } from "@/components/ui/typewritter";
import Blog from "@/components/ui/blog";
import { GlobeDemo } from "@/components/ui/globe-demo";
import { Terminal } from "@/components/ui/Terminal";

export default function Home() {
  return (
    <main>
      <HeroParallax />
      <StickyScroll services={services} />
      <Terminal />
      <GlobeDemo />
      <Typewriter />
      <Blog />
    </main>
  );
}
