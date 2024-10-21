"use client";

import { Code2, Container, HandHelping, LucideIcon } from "lucide-react";

export type ServiceType = {
  title: string;
  description: string;
  imageSrc: string;
  sideTitle: string;
  icon: LucideIcon;
};

export const services: Array<ServiceType> = [
  {
    title: "Full Stack Development",
    description:
      "Ensuring every line of code not only solves today's challenges but paves the way for tomorrow's success.",
    imageSrc: "/services/full-stack.webp",
    sideTitle:
      "From concept to deployment, we build complete digital solutions that bring your vision to life.",
    icon: Code2,
  },
  {
    title: "IT Consulting",
    description:
      "Transform your tech challenges into victories with our IT consulting services to propel your business forward.",
    imageSrc: "/services/consulting.webp",
    sideTitle:
      "Where technology meets strategy, IT consulting turns obstacles into opportunities for innovation and growth.",
    icon: HandHelping,
  },
  {
    title: "Blockchain Development",
    description:
      "Empower your business with smart contracts, turning complex agreements into automated protocols.",
    imageSrc: "/services/blockchain.webp",
    sideTitle:
      "Building secure, decentralized solutions that redefine trust and transparency in the digital world.",
    icon: Container,
  },
];
