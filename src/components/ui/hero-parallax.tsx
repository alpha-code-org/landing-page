"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./moving-border-button";
import { useRef, memo, useEffect } from "react";
import { products } from "../utils/products";

const HeroParallax = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      // Calculate scroll progress (0 to 1)
      const scrollTop = -rect.top;
      const maxScroll = elementHeight - windowHeight;
      const progress = Math.max(0, Math.min(1, scrollTop / maxScroll));

      // Update CSS custom properties for animations on the component itself
      ref.current.style.setProperty("--scroll-progress", progress.toString());
      ref.current.style.setProperty("--scroll-y", Math.max(0, scrollTop).toString());
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="hero-parallax relative mx-auto flex h-full w-[100vw] max-w-[1600px] flex-col self-auto overflow-hidden bg-black pb-80 antialiased [perspective:300px] [transform-style:preserve-3d] md:pb-96"
      style={
        {
          "--scroll-progress": "0",
          "--scroll-y": "0",
        } as React.CSSProperties
      }
    >
      <Title />
      <ProductList />
    </div>
  );
};

const Title = memo(() => {
  return (
    <div
      className="title-fade relative left-[5%] top-[50vh] z-20 w-full md:top-[40vh]"
      style={{
        opacity: "calc(max(0, 1 - var(--scroll-y) / 200))",
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

const ProductList = memo(() => {
  return (
    <div
      className="product-list relative z-10"
      style={{
        transform: `
          rotateX(calc(15deg - 15deg * min(var(--scroll-progress) / 0.2, 1)))
          rotateZ(calc(20deg - 20deg * min(var(--scroll-progress) / 0.2, 1)))
          translateY(calc(-100px + 420px * min(var(--scroll-progress) / 0.1, 1)))
        `,
        opacity: "calc(0.6 + 0.4 * min(var(--scroll-progress) / 0.6, 1))",
        willChange: "transform, opacity",
        transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
      }}
    >
      <div
        className="product-container mb-20 flex flex-row-reverse space-x-20 space-x-reverse"
        style={{
          transform: "translateX(calc(400px * var(--scroll-progress)))",
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
