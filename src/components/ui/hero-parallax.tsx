"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./moving-border-button";
import { useRef, memo, useEffect, useState, useCallback } from "react";
import { products } from "../utils/products";

// Throttle utility function
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout | null = null;
  let lastExecTime = 0;

  return (...args: any[]) => {
    const currentTime = Date.now();

    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => {
          func(...args);
          lastExecTime = Date.now();
        },
        delay - (currentTime - lastExecTime),
      );
    }
  };
};

const HeroParallax = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height;

    // Calculate scroll progress (0 to 1)
    const scrollTop = -rect.top;
    const maxScroll = elementHeight - windowHeight;
    const progress = Math.max(0, Math.min(0.5, scrollTop / maxScroll));

    // Update state instead of CSS custom properties
    setScrollProgress(progress);
    setScrollY(Math.max(0, scrollTop));
  }, []);

  useEffect(() => {
    // Throttle scroll handler to improve performance (16ms ≈ 60fps)
    const throttledScrollHandler = throttle(handleScroll, 16);

    window.addEventListener("scroll", throttledScrollHandler, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", throttledScrollHandler);
  }, [handleScroll]);

  return (
    <div
      ref={ref}
      className="hero-parallax relative mx-auto flex h-full w-[100vw] max-w-[1600px] flex-col self-auto overflow-hidden bg-black pb-80 antialiased [perspective:300px] [transform-style:preserve-3d] md:pb-96"
    >
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
      <h1 className="relative flex items-center gap-2 text-4xl font-bold text-white sm:text-6xl md:text-7xl lg:text-8xl">
        <Image
          alt="ac-logo"
          src="/logo.png"
          width={80}
          height={77}
          className="mr-2 w-10 sm:w-16 md:w-20"
          fetchPriority="high"
        />
        <span className="text-brand-alpha-dark">Alpha</span>{" "}
        <span className="text-brand-code">Code</span>
      </h1>
      <p className="relative z-20 mb-4 mt-4 max-w-2xl text-xl text-neutral-200 sm:text-3xl md:text-4xl md:font-bold">
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

const ProductList = memo(({ scrollProgress }: { scrollProgress: number }) => {
  return (
    <div
      className="product-list relative z-10"
      style={{
        transform: `
          rotateX(${15 - 15 * Math.min(scrollProgress / 0.2, 1)}deg)
          rotateZ(${20 - 20 * Math.min(scrollProgress / 0.2, 1)}deg)
          translateY(${-100 + 480 * Math.min(scrollProgress / 0.1, 1)}px)
          translateX(${400 * scrollProgress}px)
        `,
        opacity: 0.6 + 0.4 * Math.min(scrollProgress / 0.6, 1),
        willChange: "transform, opacity",
        transition: "transform 0.4s ease-out, opacity 0.4s ease-out",
      }}
    >
      <div
        className="product-container mb-20 flex flex-row-reverse space-x-20 space-x-reverse"
        style={{
          transform: `translateX(${400 * scrollProgress}px)`,
          willChange: "transform",
          transition: "transform 0.3s ease-out",
        }}
      >
        {products.map((product, index) => (
          <ProductCard product={product} key={product.title} index={index} />
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
        className="product-card group/product relative h-60 w-[28rem] flex-shrink-0 transition-transform duration-500 ease-out hover:-translate-y-5 md:h-80 md:w-[36rem]"
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
            loading={index < 3 ? "eager" : "lazy"}
          />
        </Link>
        <div
          className="pointer-events-none absolute inset-0 h-full w-full bg-black opacity-0 transition-opacity duration-300 group-hover/product:opacity-50"
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
