import { ClipboardList, Coins, Plug, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";

type FaqType = {
  icon: LucideIcon;
  question: string;
  answer: string;
};

export const faq: Array<FaqType> = [
  {
    icon: Sparkles,
    question: "What is AI automation?",
    answer:
      "It means software handles your repetitive tasks for you, like copying invoices into your accounting system, answering common enquiries and booking appointments. Your team saves hours every week and makes fewer mistakes.",
  },
  {
    icon: ClipboardList,
    question: "What is the free review?",
    answer:
      "We look at your daily work together, then show you where time is being lost and which tasks could run on their own.",
  },
  {
    icon: Coins,
    question: "How much does it cost?",
    answer:
      "The review is free. Before any work starts, we agree on a clear goal, such as hours saved each week. You pay us 50% of the proven savings for the first year, and after that all the savings are yours. You also cover running costs, such as AI usage and hosting, at the price we pay.",
  },
  {
    icon: ShieldCheck,
    question: "Is our data safe?",
    answer:
      "Yes. Everything we see stays with you, and we gladly sign a confidentiality agreement (NDA) before we look at anything.",
  },
  {
    icon: Plug,
    question: "Do we need to change our software?",
    answer:
      "No. We connect everything to the tools you already use, such as your accounting software, calendar, email and booking sites.",
  },
];
