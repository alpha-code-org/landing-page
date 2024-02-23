import HeroParallax from "@/components/ui/hero-parallax";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { services } from "@/components/utils/services";
import { products } from "@/components/utils/products";

export default function Home() {
  return (
    <main className="flex flex-col gap-20">
      <HeroParallax products={products} />
      <StickyScroll services={services} />
      <div style={{ height: "50vh" }} />
    </main>
  );
}
