"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Highlight } from "./audit-highlight";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const MacbookScroll = ({
  src,
  animationDelay = 0.35,
}: {
  src?: string;
  animationDelay?: number;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const isMobileRef = useRef(false);
  const reducedMotion = useReducedMotion();

  // Track mobile state in ref to avoid re-renders
  useEffect(() => {
    const check = () => {
      isMobileRef.current = window.innerWidth < 768;
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Scroll-driven animation via refs — no state, no re-renders
  useEffect(() => {
    if (!containerRef.current) return;

    let ticking = false;

    const updateTransforms = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const elementHeight = rect.height;

      const rawProgress = (windowHeight - rect.top) / (windowHeight + elementHeight);
      const progress = Math.max(
        0,
        Math.min(1, (rawProgress - animationDelay) / (1 - animationDelay)),
      );

      const isMobile = isMobileRef.current;
      const scaleX = 1.2 + progress * (isMobile ? -0.2 : 0.1);
      const scaleY = Math.min(1.1, 0.6 + progress * (isMobile ? 0.4 : 1.5));
      const translateY = progress * 750;
      const rotateX = progress < 0.3 ? -28 + progress * 93.33 : 0;
      const textTranslateY = progress * 200;
      const textOpacity = Math.max(0, 1 - progress * 5);

      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(${textTranslateY}px)`;
        titleRef.current.style.opacity = String(textOpacity);
      }

      if (screenRef.current) {
        screenRef.current.style.transform = `scaleX(${scaleX}) scaleY(${scaleY}) rotateX(${rotateX}deg) translateY(${translateY}px) translateZ(0px)`;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateTransforms);
        ticking = true;
      }
    };

    updateTransforms();
    // With reduced motion, keep the initial frame and skip scroll-driven updates
    if (reducedMotion) return;

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [animationDelay, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="mb-20 flex h-[1000px] shrink-0 flex-col items-center py-40 md:h-[1680px] md:py-80"
      style={{
        // Force hardware acceleration and optimize rendering
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
        perspective: "1000px",
      }}
    >
      <h2
        ref={titleRef}
        className="text-center text-3xl font-bold text-neutral-800 will-change-transform md:mb-20 dark:text-white"
      >
        <span className="scale-200 md:scale-100">
          Automate repetitive business tasks
          <br />
          with <Highlight className="whitespace-nowrap text-white">AI workflows</Highlight>
        </span>
      </h2>
      <div className="flex shrink-0 scale-[0.5] transform flex-col items-center justify-start py-0 will-change-transform backface-hidden perspective-midrange sm:scale-50 md:scale-100">
        {/* Lid */}
        <CSSLid src={src} screenRef={screenRef} />
        {/* Base area: the keyboard, speakers and trackpad are a static image (they look the same
            in both themes) — as markup they were ~420 DOM nodes of purely decorative detail */}
        <div className="relative -z-10 h-88 w-lg overflow-hidden rounded-2xl bg-gray-200 dark:bg-[#272729]">
          <Image
            src="/macbook-base.webp"
            alt=""
            width={1024}
            height={704}
            className="h-full w-full"
            // The base is scaled to half size below md
            sizes="(max-width: 768px) 256px, 512px"
            loading="lazy"
            // Lower qualities smudge the soft key glow
            quality={100}
          />
        </div>
      </div>
    </div>
  );
};

export const CSSLid = React.memo(
  ({ src, screenRef }: { src?: string; screenRef: React.RefObject<HTMLDivElement | null> }) => {
    return (
      <div className="relative will-change-transform perspective-midrange">
        <div
          style={{
            transform: "perspective(800px) rotateX(-25deg) translateZ(0px)",
            transformOrigin: "bottom",
            transformStyle: "preserve-3d",
          }}
          className="relative h-48 w-lg rounded-2xl bg-[#010101] p-2 will-change-transform backface-hidden"
        >
          <div
            style={{
              boxShadow: "0px 2px 0px 2px #171717 inset",
            }}
            className="absolute inset-0 flex items-center justify-center rounded-lg bg-[#010101]"
          >
            <Image
              src="/logo-white.png"
              alt="Alpha Code logo"
              width={66}
              height={65}
              style={{ objectFit: "cover" }}
              loading="lazy"
            />
          </div>
        </div>
        <div
          ref={screenRef}
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "top",
          }}
          className="absolute inset-0 h-96 w-lg rounded-2xl bg-[#010101] p-2 will-change-transform backface-hidden"
        >
          <div className="absolute inset-0 rounded-lg bg-[#272729]" />
          {src && (
            <Image
              src={src}
              alt="Two business owners high-fiving at a desk with an Alpha Code laptop"
              className="absolute inset-0 h-full w-full rounded-lg object-cover object-top-left"
              width={1536}
              height={1024}
              sizes="(max-width: 768px) 320px, 640px"
              loading="lazy"
              quality={90}
            />
          )}
        </div>
      </div>
    );
  },
);
CSSLid.displayName = "CSSLid";
