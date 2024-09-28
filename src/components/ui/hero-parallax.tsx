"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./moving-border-button";
import { useRef } from "react";
import { products } from "../utils/products";

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
    </div>
  );
};

const Title = ({ scrollY }: { scrollY: MotionValue<number> }) => {
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <motion.div
      style={{ opacity }}
      className="relative left-[5%] top-[50vh] w-full md:top-[40vh]"
    >
      <h1 className="relative z-10 flex items-center gap-2 text-4xl font-bold dark:text-white sm:text-6xl md:text-7xl lg:text-8xl">
        <Image
          alt="ac-logo"
          src="/logo.png"
          width={80}
          height={80}
          className="mr-2 h-10 w-10 sm:h-16 sm:w-16 md:h-20 md:w-20"
        />
        <span className="text-brand-alpha dark:text-brand-alpha-dark">
          Alpha
        </span>{" "}
        <span className="text-brand-code">Code</span>
      </h1>
      <p className="relative z-10 mb-4 mt-4 max-w-2xl text-xl dark:text-neutral-200 sm:text-3xl md:text-4xl md:font-bold">
        We build beautiful products.
      </p>
      <Link href="https://calendly.com/alphacode/alpha-code" target="__blank">
        <Button
          borderRadius="1.75rem"
          className="z-10 border-neutral-200 bg-brand-code font-bold text-white transition-colors hover:bg-white hover:text-brand-code dark:border-slate-800"
        >
          Book a meeting
        </Button>
      </Link>
    </motion.div>
  );
};

const ProductList = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 700]),
    springConfig,
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig,
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig,
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig,
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.1], [-100, 320]),
    springConfig,
  );

  return (
    <motion.div
      style={{
        rotateX,
        rotateZ,
        translateY,
        opacity,
      }}
      className=""
    >
      <motion.div className="mb-20 flex flex-row-reverse space-x-20 space-x-reverse">
        {products.map((product) => (
          <ProductCard
            product={product}
            translate={translateX}
            key={product.title}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

const ProductCard = ({
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
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product relative h-60 w-[28rem] flex-shrink-0 md:h-80 md:w-[36rem]"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl"
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="absolute inset-0 h-full w-full object-cover object-center"
          alt={product.title}
        />
      </Link>
      <div className="pointer-events-none absolute inset-0 h-full w-full bg-black opacity-0 group-hover/product:opacity-80"></div>
      <h2 className="absolute bottom-4 left-4 text-white opacity-0 group-hover/product:opacity-100">
        {product.title}
      </h2>
    </motion.div>
  );
};

export default HeroParallax;
