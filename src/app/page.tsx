import HeroParallax from "@/components/ui/hero-parallax";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { content } from "@/components/utils/content";
import { products } from "@/components/utils/products";

export default function Home() {
  return (
    <main className="flex flex-col gap-20">
      <HeroParallax products={products} />
      <StickyScroll content={content} />
      <div style={{ height: "50vh" }} />
    </main>
  );
}
