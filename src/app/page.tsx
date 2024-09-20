import HeroParallax from "@/components/ui/hero-parallax";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { services } from "@/components/utils/services";
import { products } from "@/components/utils/products";
import { Typewriter } from "@/components/ui/typewritter";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroParallax products={products} />
      <StickyScroll services={services} />
      <Typewriter />
      <Footer />
    </main>
  );
}
