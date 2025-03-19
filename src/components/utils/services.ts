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
      "From concept to deployment, we build complete digital solutions that bring your vision to life.",
    imageSrc: "/services/full-stack.webp",
    sideTitle:
      "With over 10 years of experience, we build scalable software solutions for individuals and small businesses.",
    icon: Code2,
  },
  {
    title: "IT Consulting",
    description:
      "Where technology meets strategy, IT consulting turns obstacles into opportunities for innovation and growth.",
    imageSrc: "/services/consulting.webp",
    sideTitle:
      "Software development can sometimes be overwhelming, let us help you navigate the process.",
    icon: HandHelping,
  },
  {
    title: "AI Development",
    description:
      "Innovate with AI to streamline operations, enhance customer experiences, and drive growth.",
    imageSrc: "/services/blockchain.webp",
    sideTitle:
      "Save time and resources with simple AI solutions. Let your people focus on what they do best.",
    icon: Container,
  },
];
