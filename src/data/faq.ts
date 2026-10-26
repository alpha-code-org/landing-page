export type FaqType = {
  question: string;
  answer: string;
};

export const faq: Array<FaqType> = [
  {
    question: "What is AI automation for small businesses?",
    answer:
      "AI automation takes over the repetitive work that fills a small team's day: retyping invoices into accounting software, answering the same enquiries, booking appointments and filling in paperwork. The work runs on its own, so your team saves hours every week and makes fewer mistakes.",
  },
  {
    question: "What does the free review include?",
    answer:
      "We go through your daily work with you and write down what could run on its own. You get a list of the specific places where time is being lost, with no obligation.",
  },
  {
    question: "How much does AI automation cost?",
    answer:
      "The review is free. After that we use outcome-based pricing: before we start, we agree on a measurable result, such as hours saved each week, and our fee is 50% of the proven savings for the first year. After that, all the savings are yours. Running costs such as AI usage and hosting are passed on at cost.",
  },
  {
    question: "Is our business data safe with you?",
    answer:
      "Yes. Everything we see stays with you, and we gladly sign an NDA before we look at anything.",
  },
  {
    question: "Do we have to change the software we use?",
    answer:
      "No. We build the automation around the tools you already use, such as your accounting software, calendar, email and booking sites.",
  },
  {
    question: "Do you work with businesses outside Croatia?",
    answer:
      "Yes. We are a software studio from Zagreb, Croatia, and work with small and medium businesses across Europe and the US. Outside Zagreb we meet on a short video call.",
  },
];
