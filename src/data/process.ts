import { ClipboardList, Search, Wrench, type LucideIcon } from "lucide-react";

type ProcessStepType = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const processSteps: Array<ProcessStepType> = [
  {
    icon: Search,
    title: "Free review",
    description: "We find your time leaks.",
  },
  {
    icon: ClipboardList,
    title: "Clear plan",
    description: "We calculate your savings.",
  },
  {
    icon: Wrench,
    title: "We build it",
    description: "It plugs into your tools.",
  },
];
