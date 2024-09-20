"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
  useViewportScroll,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./moving-border-button";
import { useRef } from "react";

const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    link: string;
    thumbnail: string;
  }[];
}) => {
  const firstRow = products.slice(0, 5);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const { scrollY } = useViewportScroll();
  const headerOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 700]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.1], [-100, 256]),
    springConfig
  );
  return (
    <div
      ref={ref}
      className="bg-black h-full pb-20 lg:pb-60 overflow-hidden  antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header opacity={headerOpacity} />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-20 mb-20">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const Header = ({ opacity }: { opacity: MotionValue<number> }) => {
  return (
    <motion.div
      style={{ opacity }}
      className="max-w-7xl relative mx-auto  px-4 w-full left-0 top-[60vh] lg:top-[40vh]"
    >
      <h1 className="flex items-center gap-2 text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold dark:text-white relative z-10">
        <Image
          alt="ac-logo"
          src="/logo.png"
          width={80}
          height={80}
          className="mr-2 w-10 h-10 sm:h-16 sm:w-16 md:w-20 md:h-20"
        />
        <span className="text-brand-alpha dark:text-brand-alpha-dark">
          Alpha
        </span>{" "}
        <span className="text-brand-code">Code</span>
      </h1>
      <p className="max-w-2xl text-xl sm:text-3xl  md:text-4xl md:font-bold mt-4 mb-4 dark:text-neutral-200 relative z-10">
        We build beautiful products.
      </p>
      <Link href="https://calendly.com/alphacode/alpha-code" target="__blank">
        <Button
          borderRadius="1.75rem"
          className="bg-brand-code hover:bg-white hover:text-brand-code transition-colors font-bold text-white border-neutral-200 dark:border-slate-800 z-10"
        >
          Book a meeting
        </Button>
      </Link>
    </motion.div>
  );
};

export const ProductCard = ({
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
      className="group/product h-80 w-[36rem] relative flex-shrink-0"
    >
      <Link
        href={product.link}
        className="block group-hover/product:shadow-2xl "
      >
        <Image
          src={product.thumbnail}
          height="600"
          width="600"
          className="object-cover object-center absolute h-full w-full inset-0"
          alt={product.title}
        />
      </Link>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black pointer-events-none"></div>
      <h2 className="absolute bottom-4 left-4 opacity-0 group-hover/product:opacity-100 text-white">
        {product.title}
      </h2>
    </motion.div>
  );
};

export default HeroParallax;
