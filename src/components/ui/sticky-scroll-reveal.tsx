"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import ServiceCard from "../cards/ServiceCard";
import { ServiceType } from "../utils/services";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CardItem } from "./3d-card";
import { cn } from "@/utils/cn";

export const StickyScroll = ({ services }: { services: ServiceType[] }) => {
  const [activeCard, setActiveCard] = useState(0);

  const Icon = services[activeCard].icon;

  return (
    <div className="mt-20 flex justify-center gap-4 md:px-20 xl:gap-16">
      <div className="relative flex items-start px-4">
        <div className="flex max-w-2xl flex-col gap-16">
          {services.map((item, index) => (
            <Card key={item.title} index={index} item={item} setActiveCard={setActiveCard} />
          ))}
        </div>
      </div>
      <div className="sticky top-[32%] hidden h-max min-w-[30rem] max-w-[40rem] grow rounded-md lg:block">
        <div className="w-full rounded-xl border border-neutral-200 bg-neutral-50 pb-8 shadow-xl dark:border-neutral-800 dark:bg-slate-800">
          <div className="flex w-full gap-1.5 rounded-t-xl bg-neutral-200 p-3 dark:bg-slate-900">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div className="p-2">
            <p className="font-mono text-lg text-neutral-700 dark:text-slate-200">
              <span className="text-green-600 dark:text-green-400">~</span>{" "}
              {services[activeCard].sideTitle}
            </p>
          </div>
          <Icon className="mx-auto h-20 w-20 text-neutral-400 dark:text-slate-600" />
        </div>
      </div>
    </div>
  );
};

const Card = ({
  item,
  index,
  setActiveCard,
}: {
  item: ServiceType;
  index: number;
  setActiveCard: Dispatch<SetStateAction<number>>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(ref, {
    amount: 0,
    margin: "-45% 0px -45% 0px",
  });

  useEffect(() => {
    if (isInView) {
      setActiveCard(index);
    }
  }, [isInView, index, setActiveCard]);

  return (
    <div
      ref={ref}
      key={item.title}
      className={cn("max-h-[100vh] transition-opacity duration-300")}
      style={{ opacity: isInView ? 1 : 0.8 }}
    >
      <Link
        href="https://calendly.com/alphacode/alpha-code"
        target="__blank"
        aria-label={`Schedule a consultation for ${item.title}`}
      >
        <ServiceCard
          title={item.title}
          description={item.description}
          imageSrc={item.imageSrc}
          width="w-[24rem] max-w-[90vw]"
        >
          <div className="mt-4 flex items-center justify-between md:mt-20">
            <CardItem
              translateZ={20}
              className="rounded-xl px-4 py-2 text-base font-normal text-neutral-900 dark:text-white"
            >
              Try now →
            </CardItem>
          </div>
        </ServiceCard>
      </Link>
    </div>
  );
};
