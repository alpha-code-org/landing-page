"use client";

import { Brush, Code2, Container, HandHelping, LucideIcon } from "lucide-react";

export type ServiceType = {
  title: string;
  description: string;
  imageSrc: string;
  sideTitle: string;
  icon: LucideIcon;
};

export const services: Array<ServiceType> = [
  {
    title: "UI/UX Design",
    description:
      "UI/UX is the bridge between users and your digital world, where first impressions become lasting engagements.",
    imageSrc: "https://source.unsplash.com/qC2n6RQU4Vw",

    sideTitle:
      "Blending creativity with functionality, ensuring every pixel serves both beauty and purpose.",
    icon: Brush,
  },
  {
    title: "Full Stack Development",
    description:
      "Ensuring every line of code not only solves today's challenges but paves the way for tomorrow's success.",

    imageSrc: "https://source.unsplash.com/kpGj50PWAG0",

    sideTitle:
      "Where code meets creativity, building the digital foundations from the ground up to sky-high innovations.",
    icon: Code2,
  },
  {
    title: "Blockchain Development",
    description:
      "Empower your business with smart contracts, turning complex agreements into automated protocols.",
    imageSrc: "https://source.unsplash.com/_rZnChsIFuQ",
    sideTitle:
      "Where trust is coded  and every transaction paves the way for a revolution in security and efficiency.",
    icon: Container,
  },
  {
    title: "IT Consulting",
    description:
      "Transform your tech challenges into victories with our IT consulting services to propel your business forward.",
    imageSrc: "https://source.unsplash.com/yapBRdPWxik",
    sideTitle:
      "Where technology meets strategy, IT consulting turns obstacles into opportunities for innovation and growth.",
    icon: HandHelping,
  },
];
