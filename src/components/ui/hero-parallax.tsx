"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./moving-border-button";
import { useRef, memo, useEffect, useState } from "react";
import { products } from "../utils/products";

const dotPatterns = {
  light: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23a8a29e' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
  dark: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23404040' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E")`,
};

const HeroParallax = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
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

          setScrollProgress(progress);
          setScrollY(Math.max(0, scrollTop));
          ticking = false;
        });
      }
    };

    // passive improves scrolling on Android
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // initial
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="hero-parallax relative mx-auto flex h-full w-screen max-w-[1600px] flex-col self-auto overflow-hidden pb-80 antialiased perspective-near transform-3d md:pb-96"
    >
      <div
        className="pointer-events-none absolute inset-0 dark:hidden opacity-50 -z-10"
        style={{ backgroundImage: dotPatterns.light }}
      />
      <div
        className="pointer-events-none absolute inset-0 hidden dark:block opacity-50 -z-10"
        style={{ backgroundImage: dotPatterns.dark }}
      />
      <Title scrollY={scrollY} />
      <ProductList scrollProgress={scrollProgress} />
    </div>
  );
};

const Title = memo(({ scrollY }: { scrollY: number }) => {
  return (
    <div
      className="title-fade relative left-[5%] top-[50vh] z-20 w-full md:top-[40vh]"
      style={{
        opacity: Math.max(0, 1 - scrollY / 200),
        willChange: "opacity",
      }}
    >
      <h1 className="relative flex items-center gap-2 text-4xl font-bold text-neutral-900 dark:text-white sm:text-6xl md:text-7xl lg:text-8xl">
        <Image
          alt="ac-logo"
          src="/logo.png"
          width={80}
          height={77}
          className="mr-2 hidden w-10 dark:block sm:w-16 md:w-20"
          fetchPriority="high"
        />
        <Image
          alt="ac-logo"
          src="/logo-dark.png"
          width={80}
          height={77}
          className="mr-2 block w-10 dark:hidden sm:w-16 md:w-20"
          fetchPriority="high"
        />
        <span className="text-brand-alpha dark:text-brand-alpha-dark">Alpha</span>{" "}
        <span className="text-brand-code">Code</span>
      </h1>
      <p className="relative z-20 mb-4 mt-4 max-w-2xl text-xl text-neutral-600 dark:text-neutral-200 sm:text-3xl md:text-4xl md:font-bold">
        We craft beautiful software.
      </p>
      <Link href="https://calendly.com/alphacode/alpha-code" target="__blank">
        <Button
          borderRadius="1.75rem"
          className="z-20 border-slate-800 bg-brand-code font-bold text-white transition-colors hover:bg-white hover:text-brand-code"
        >
          Book a meeting
        </Button>
      </Link>
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
  // Use desktop width as default for SSR to avoid hydration mismatch
  const [singleSetWidth, setSingleSetWidth] = useState(products.length * DESKTOP_CARD_WIDTH);
  const [translateX, setTranslateX] = useState(-products.length * DESKTOP_CARD_WIDTH);
  const [isSnapping, setIsSnapping] = useState(false);
  const isHovering = useRef(false);
  const lastTouchX = useRef(0);
  const lastTouchY = useRef(0);
  const touchDirection = useRef<"horizontal" | "vertical" | null>(null);

  // Update card width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      const newSingleSetWidth = products.length * getCardWidth();
      setSingleSetWidth(newSingleSetWidth);
      setTranslateX(-newSingleSetWidth);
    };

    updateWidth(); // Set correct width on mount
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Handle wheel scrolling with infinite loop using transform (only when hovering)
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onMouseEnter = () => {
      isHovering.current = true;
    };
    const onMouseLeave = () => {
      isHovering.current = false;
    };

    const onWheel = (e: WheelEvent) => {
      if (!isHovering.current) return;
      // Only capture horizontal wheel; let vertical scroll pass through
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;

      e.preventDefault();

      setTranslateX((prev) => {
        let next = prev - e.deltaX * 1.5;

        // Wrap around for infinite scroll
        if (next > 0) {
          next = next - singleSetWidth;
        } else if (next < -singleSetWidth * 2) {
          next = next + singleSetWidth;
        }

        return next;
      });
    };

    const cardWidth = getCardWidth();

    const snapToCard = () => {
      setIsSnapping(true);
      setTranslateX((prev) => {
        const snapped = Math.round(prev / cardWidth) * cardWidth;
        let next = snapped;
        if (next > 0) next -= singleSetWidth;
        else if (next < -singleSetWidth * 2) next += singleSetWidth;
        return next;
      });
      setTimeout(() => setIsSnapping(false), 300);
    };

    // Touch handlers for mobile
    const onTouchStart = (e: TouchEvent) => {
      setIsSnapping(false);
      lastTouchX.current = e.touches[0].clientX;
      lastTouchY.current = e.touches[0].clientY;
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
        if (next > 0) {
          next = next - singleSetWidth;
        } else if (next < -singleSetWidth * 2) {
          next = next + singleSetWidth;
        }

        return next;
      });
    };

    const onTouchEnd = () => {
      if (touchDirection.current === "horizontal") {
        snapToCard();
      }
    };

    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("wheel", onWheel);
    };
  }, [singleSetWidth]);

  return (
    <div
      className="product-list relative z-10 overflow-hidden"
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
        className="product-container mb-20 flex w-max cursor-grab gap-20 active:cursor-grabbing"
        style={{
          transform: `translateX(${translateX}px)`,
          willChange: "transform",
          transition: isSnapping ? "transform 0.3s ease-out" : "none",
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
      <div
        key={product.title}
        className="product-card group/product relative h-60 w-md shrink-0 transition-transform duration-500 ease-out hover:-translate-y-5 md:h-80 md:w-xl"
        style={{
          willChange: "transform",
        }}
      >
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
            alt={product.title}
            sizes="(max-width: 768px) 28rem, 36rem"
            fetchPriority={index < 3 ? "high" : "auto"}
            loading={index < 6 ? "eager" : "lazy"}
          />
        </Link>
        <div
          className="pointer-events-none absolute inset-0 h-full w-full bg-neutral-900 opacity-0 transition-opacity duration-300 group-hover/product:opacity-40 dark:bg-black dark:group-hover/product:opacity-50"
          style={{ willChange: "opacity" }}
        ></div>
        <h2
          className="absolute bottom-4 left-4 text-white opacity-0 transition-opacity duration-300 group-hover/product:opacity-100"
          style={{ willChange: "opacity" }}
        >
          {product.title}
        </h2>
      </div>
    );
  },
);

ProductCard.displayName = "ProductCard";

export default HeroParallax;
