"use client";

import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./moving-border-button";
import { useRef, useMemo, memo } from "react";
import { products } from "../utils/products";
import { BackgroundBeams } from "./background-beams";

const HeroParallax = () => {
  const ref = useRef(null);
  const { scrollYProgress, scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  return (
    <div
      ref={ref}
      className="relative mx-auto flex h-full w-[100vw] max-w-[1600px] flex-col self-auto overflow-hidden bg-black pb-80 antialiased [perspective:300px] [transform-style:preserve-3d] md:pb-96"
    >
      <Title scrollY={scrollY} />
      <ProductList scrollYProgress={scrollYProgress} />
      <BackgroundBeams />
    </div>
  );
};

const Title = memo(({ scrollY }: { scrollY: MotionValue<number> }) => {
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <motion.div
      style={{
        opacity,
        willChange: "opacity",
      }}
      className="relative left-[5%] top-[50vh] z-20 w-full md:top-[40vh]"
    >
      <h1 className="relative flex items-center gap-2 text-4xl font-bold text-white sm:text-6xl md:text-7xl lg:text-8xl">
        <Image
          alt="ac-logo"
          src="/logo.png"
          width={80}
          height={80}
          className="mr-2 h-10 w-10 sm:h-16 sm:w-16 md:h-20 md:w-20"
          priority
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
    </motion.div>
  );
});

Title.displayName = "Title";

const springConfig = {
  stiffness: 200,
  damping: 30,
  mass: 0.8,
};

const ProductList = memo(({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) => {
  // Transform hooks must be called directly, not inside useMemo
  const translateXTransform = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const rotateXTransform = useTransform(scrollYProgress, [0, 0.2], [15, 0]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.6], [0.6, 1]);
  const rotateZTransform = useTransform(scrollYProgress, [0, 0.2], [20, 0]);
  const translateYTransform = useTransform(scrollYProgress, [0, 0.1], [-100, 320]);

  const translateX = useSpring(translateXTransform, springConfig);
  const rotateX = useSpring(rotateXTransform, springConfig);
  const opacity = useSpring(opacityTransform, springConfig);
  const rotateZ = useSpring(rotateZTransform, springConfig);
  const translateY = useSpring(translateYTransform, springConfig);

  return (
    <motion.div
      style={{
        rotateX,
        rotateZ,
        translateY,
        opacity,
        willChange: "transform, opacity",
        transform: "translate3d(0, 0, 0)", // Force hardware acceleration
      }}
      className="relative z-10"
    >
      <motion.div
        className="mb-20 flex flex-row-reverse space-x-20 space-x-reverse"
        style={{ willChange: "transform" }}
      >
        {products.map((product) => (
          <ProductCard product={product} translate={translateX} key={product.title} />
        ))}
      </motion.div>
    </motion.div>
  );
});

ProductList.displayName = "ProductList";

const hoverAnimation = {
  y: -20,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 25,
  },
};

const ProductCard = memo(
  ({
    product,
    translate,
  }: {
    product: {
      title: string;
      link: string;
      thumbnail: string;
    };
    translate: MotionValue<number>;
  }) => {
    return (
      <motion.div
        style={{
          x: translate,
          willChange: "transform",
        }}
        whileHover={hoverAnimation}
        key={product.title}
        className="group/product relative h-60 w-[28rem] flex-shrink-0 md:h-80 md:w-[36rem]"
      >
        <Link href={product.link} className="block group-hover/product:shadow-2xl">
          <Image
            src={product.thumbnail}
            height="600"
            width="600"
            className="absolute inset-0 h-full w-full object-cover object-center"
            alt={product.title}
            loading="lazy"
            sizes="(max-width: 768px) 28rem, 36rem"
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
      </motion.div>
    );
  },
);

ProductCard.displayName = "ProductCard";

export default HeroParallax;
