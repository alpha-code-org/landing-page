import { Code2, Container, LucideIcon } from "lucide-react";

export type ServiceType = {
  title: string;
  description: string;
  imageSrc: string;
  sideTitle: string;
  icon: LucideIcon;
};

export const services: Array<ServiceType> = [
  {
    title: "AI Automation",
    description:
      "AI automation for small and medium businesses: invoices, bookings, enquiries and paperwork that run on their own.",
    imageSrc: "/services/blockchain.webp",
    sideTitle:
      "We review your daily work for free, then automate the repetitive tasks so your team can focus on growth.",
    icon: Container,
  },
  {
    title: "Custom Software Development",
    description:
      "Custom software, websites and integrations that connect the tools your business already uses.",
    imageSrc: "/services/full-stack.webp",
    sideTitle:
      "From concept to deployment, we build complete digital solutions that bring your vision to life.",
    icon: Code2,
  },
];
