"use client";

import Image from "next/image";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  imageSrc: string;
}

function ServiceCard({ title, description, imageSrc }: Props) {
  return (
    <CardContainer className="inter-var max-w-[28rem]">
      <CardBody className="group/card relative h-auto w-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] sm:w-[30rem]">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white md:text-3xl"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300 md:text-lg"
        >
          {description}
        </CardItem>
        <CardItem translateZ="100" className="mt-4 w-full">
          <Image
            src={imageSrc}
            height="1000"
            width="1000"
            className="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="mt-20 flex items-center justify-between">
          <Link
            href="https://calendly.com/alphacode/alpha-code"
            target="__blank"
          >
            <CardItem
              translateZ={20}
              as="button"
              className="rounded-xl px-4 py-2 text-base font-normal dark:text-white"
            >
              Try now →
            </CardItem>
          </Link>
        </div>
      </CardBody>
    </CardContainer>
  );
}

export default ServiceCard;
