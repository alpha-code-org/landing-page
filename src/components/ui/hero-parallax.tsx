"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, memo, useEffect, useState } from "react";
import { products } from "@/data/products";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { dotPatterns } from "@/utils/dot-patterns";
import { BookingButton } from "./booking-button";
import { ThemedLogo } from "./themed-logo";

const HeroParallax = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          if (!ref.current) return;

          const rect = ref.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const elementHeight = rect.height;

          const scrollTop = -rect.top;
          const maxScroll = Math.max(1, elementHeight - windowHeight); // avoid 0
          const progress = Math.max(0, Math.min(0.5, scrollTop / maxScroll));

          // Values are clamped so state settles (and re-renders stop) once the hero is scrolled past
          setScrollProgress(progress);
          setScrollY(Math.min(TITLE_FADE_DISTANCE, Math.max(0, scrollTop)));
          ticking = false;
        });
      }
    };

    // passive improves scrolling on Android
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial
    return () => window.removeEventListener("scroll", onScroll);
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className="relative mx-auto flex h-full w-screen max-w-[1600px] flex-col self-auto overflow-hidden pb-80 antialiased perspective-near transform-3d md:pb-96"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-50 dark:hidden"
        style={{ backgroundImage: dotPatterns.light.default }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 hidden opacity-50 dark:block"
        style={{ backgroundImage: dotPatterns.dark.default }}
      />
      <Title scrollY={scrollY} />
      <ProductList scrollProgress={scrollProgress} />
    </div>
  );
};

const TITLE_FADE_DISTANCE = 200;

const Title = memo(({ scrollY }: { scrollY: number }) => {
  return (
    <div
      className="relative top-[50vh] left-[5%] z-20 w-full md:top-[40vh]"
      style={{
        opacity: Math.max(0, 1 - scrollY / TITLE_FADE_DISTANCE),
        willChange: "opacity",
      }}
    >
      <p className="relative flex items-center gap-2 text-4xl font-bold text-neutral-900 sm:text-6xl md:text-7xl lg:text-8xl dark:text-white">
        {/* Decorative: the text next to it already names the brand */}
        <ThemedLogo
          alt=""
          width={80}
          height={77}
          className="mr-2 w-10 sm:w-16 md:w-20"
          fetchPriority="high"
          loading="eager"
        />
        <span className="text-brand-alpha dark:text-brand-alpha-dark">Alpha</span>{" "}
        <span className="text-brand-code">Code</span>
      </p>
      <h1 className="relative z-20 mt-4 mb-4 max-w-2xl text-xl font-bold text-neutral-600 sm:text-3xl md:text-4xl md:font-extrabold dark:text-neutral-200">
        AI automation for your business.
      </h1>
      <BookingButton className="bg-brand-code hover:text-brand-code z-20 border-slate-800 font-bold text-white transition-colors hover:bg-white">
        Book a free review
      </BookingButton>
    </div>
  );
});

Title.displayName = "Title";

// Triple the products array for infinite scroll illusion
const infiniteProducts = [...products, ...products, ...products];

// Card widths: mobile (28rem + 5rem gap) vs desktop (36rem + 5rem gap)
const MOBILE_CARD_WIDTH = 528; // 28rem (448px) + 5rem gap (80px)
const DESKTOP_CARD_WIDTH = 656; // 36rem (576px) + 5rem gap (80px)
const MD_BREAKPOINT = 768;


const getCardWidth = () =>
  typeof window !== "undefined" && window.innerWidth < MD_BREAKPOINT
    ? MOBILE_CARD_WIDTH
    : DESKTOP_CARD_WIDTH;

const ProductList = memo(({ scrollProgress }: { scrollProgress: number }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  // Only used for wrapping; the initial offset comes from CSS so SSR matches every breakpoint
  const [singleSetWidth, setSingleSetWidth] = useState(products.length * DESKTOP_CARD_WIDTH);
  // Offset relative to the start of the middle copy, kept within [-singleSetWidth, singleSetWidth]
  const [translateX, setTranslateX] = useState(0);
  const [isSnapping, setIsSnapping] = useState(false);
  const lastTouchX = useRef(0);
  const lastTouchY = useRef(0);
  const touchStartX = useRef(0);
  const touchDirection = useRef<"horizontal" | "vertical" | null>(null);

  // Update card width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      setSingleSetWidth(products.length * getCardWidth());
      setTranslateX(0); // Back to the start of the middle copy
    };

    updateWidth(); // Set correct width on mount
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Handle wheel scrolling with infinite loop using transform (container-scoped so it
  // doesn't block scrolling elsewhere on the page)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      // Only capture horizontal wheel; let vertical scroll pass through
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;

      e.preventDefault();

      setTranslateX((prev) => {
        let next = prev - e.deltaX * 1.5;

        // Wrap around for infinite scroll
        if (next > singleSetWidth) {
          next = next - singleSetWidth;
        } else if (next < -singleSetWidth) {
          next = next + singleSetWidth;
        }

        return next;
      });
    };

    const cardWidth = getCardWidth();

    const snapToCard = (swipedRight: boolean) => {
      setIsSnapping(true);
      setTranslateX((prev) => {
        // Snap in swipe direction so a small flick advances to next card
        const snapped = swipedRight
          ? Math.ceil(prev / cardWidth) * cardWidth
          : Math.floor(prev / cardWidth) * cardWidth;
        let next = snapped;
        if (next > singleSetWidth) next -= singleSetWidth;
        else if (next < -singleSetWidth) next += singleSetWidth;
        return next;
      });
      setTimeout(() => setIsSnapping(false), 300);
    };

    // Touch handlers for mobile
    const onTouchStart = (e: TouchEvent) => {
      setIsSnapping(false);
      lastTouchX.current = e.touches[0].clientX;
      lastTouchY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
      touchDirection.current = null;
    };

    const onTouchMove = (e: TouchEvent) => {
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const deltaX = currentX - lastTouchX.current;
      const deltaY = currentY - lastTouchY.current;

      // Lock direction on first significant movement (10px threshold)
      if (touchDirection.current === null) {
        if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) return;
        touchDirection.current = Math.abs(deltaX) > Math.abs(deltaY) ? "horizontal" : "vertical";
      }

      // Only handle horizontal swipes; let vertical scroll pass through
      if (touchDirection.current === "vertical") return;

      e.preventDefault();

      lastTouchX.current = currentX;
      lastTouchY.current = currentY;

      setTranslateX((prev) => {
        let next = prev + deltaX * 2;

        // Wrap around for infinite scroll
        if (next > singleSetWidth) {
          next = next - singleSetWidth;
        } else if (next < -singleSetWidth) {
          next = next + singleSetWidth;
        }

        return next;
      });
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (touchDirection.current === "horizontal") {
        const endX = e.changedTouches[0].clientX;
        const swipedRight = endX > touchStartX.current;
        snapToCard(swipedRight);
      }
    };

    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      container.removeEventListener("wheel", onWheel);
    };
  }, [singleSetWidth]);

  return (
    <div
      className="relative z-10 overflow-hidden"
      ref={containerRef}
      style={{
        touchAction: "pan-y",
        transform: `
          rotateX(${15 - 15 * Math.min(scrollProgress / 0.2, 1)}deg)
          rotateZ(${20 - 20 * Math.min(scrollProgress / 0.2, 1)}deg)
          translateY(${-100 + 480 * Math.min(scrollProgress / 0.1, 1)}px)
        `,
        opacity: 0.6 + 0.4 * Math.min(scrollProgress / 0.6, 1),
        willChange: "transform, opacity",
        transition: "transform 0.4s ease-out, opacity 0.4s ease-out",
      }}
    >
      <div
        // One set of cards is 5 × (card + gap): 5 × 33rem on mobile, 5 × 41rem on desktop
        className="mb-20 flex w-max cursor-grab gap-20 [--set-width:165rem] active:cursor-grabbing md:[--set-width:205rem]"
        style={{
          transform: `translateX(calc(-1 * var(--set-width) + ${translateX}px))`,
          willChange: "transform",
          transition: isSnapping ? "transform 0.25s cubic-bezier(0.25, 1, 0.5, 1)" : "none",
        }}
      >
        {infiniteProducts.map((product, index) => (
          <ProductCard product={product} key={`${product.title}-${index}`} index={index} />
        ))}
      </div>
    </div>
  );
});

ProductList.displayName = "ProductList";

const ProductCard = memo(
  ({
    product,
    index,
  }: {
    product: {
      title: string;
      link: string;
      thumbnail: string;
    };
    index: number;
  }) => {
    return (
      <div className="group/product relative h-60 w-md shrink-0 transition-transform duration-500 ease-out hover:-translate-y-5 md:h-80 md:w-xl">
        <Link
          href={product.link}
          className="block group-hover/product:shadow-2xl"
          aria-label={`View ${product.title} project`}
        >
          <Image
            src={product.thumbnail}
            height="600"
            width="600"
            className="absolute inset-0 h-full w-full object-cover object-center"
            alt={`${product.title} website built by Alpha Code`}
            sizes="(max-width: 768px) 28rem, 36rem"
            // Every copy shares the same 5 image URLs, so prioritizing them all costs nothing
            // extra — and the 3D perspective can project any copy into view as the LCP
            fetchPriority="high"
            loading="eager"
          />
        </Link>
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-neutral-900 opacity-0 transition-opacity duration-300 group-hover/product:opacity-40 dark:bg-black dark:group-hover/product:opacity-50"></div>
        <p className="absolute bottom-4 left-4 text-white opacity-0 transition-opacity duration-300 group-hover/product:opacity-100">
          {product.title}
        </p>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";

export default HeroParallax;
