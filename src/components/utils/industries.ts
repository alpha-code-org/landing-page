export type IndustryType = {
  slug: string;
  name: string;
  automation: string; // one line for the home page card
  pain: string; // where the working day goes
  solutions: Array<string>; // what AI automation does about it
};

export const industries: Array<IndustryType> = [
  {
    slug: "accounting",
    name: "Accounting firms",
    automation: "Invoices entered and bank statements matched for you.",
    pain: "In accounting offices most of the day goes on typing invoices and receipts into the software, matching bank statements and chasing clients for missing documents.",
    solutions: [
      "Invoices and receipts are read as they arrive and entered into your accounting software.",
      "Bank statement lines are matched to invoices for you.",
      "Clients get automatic reminders about missing documents.",
    ],
  },
  {
    slug: "real-estate",
    name: "Real estate agencies",
    automation: "Instant replies to enquiries, viewings booked for you.",
    pain: "In estate agencies much of the day goes on answering the same enquiries, writing listings and arranging viewings back and forth.",
    solutions: [
      "Every enquiry gets an instant, accurate reply around the clock.",
      "Listing descriptions are written from a few notes and photos.",
      "Viewings are booked straight into your calendar.",
    ],
  },
  {
    slug: "medical-practices",
    name: "Medical and dental practices",
    automation: "Online booking and reminders that cut no-shows.",
    pain: "In medical and dental practices much of the day goes on booking appointments by phone, sending reminders, dealing with no-shows and retyping forms.",
    solutions: [
      "Patients book and reschedule online at any hour.",
      "Reminders go out on their own to cut no-shows.",
      "Intake forms arrive already filled in and filed.",
    ],
  },
  {
    slug: "law-offices",
    name: "Law offices",
    automation: "Standard documents drafted from your templates.",
    pain: "In law offices much of the day goes on drafting standard documents, taking on new clients and keeping track of deadlines.",
    solutions: [
      "Standard contracts and letters are drafted from your own templates in minutes.",
      "New client details are collected through a simple form.",
      "Deadlines are tracked and flagged automatically.",
    ],
  },
  {
    slug: "insurance",
    name: "Insurance brokers",
    automation: "Client details entered once, quotes compared for you.",
    pain: "In insurance brokerages much of the day goes on collecting client details, comparing quotes and filling in claims paperwork.",
    solutions: [
      "Client details are entered once and reused everywhere.",
      "Quotes from several insurers are compared side by side.",
      "Claims forms are pre-filled and followed up automatically.",
    ],
  },
  {
    slug: "recruitment",
    name: "Recruitment agencies",
    automation: "CVs ranked per role and interviews scheduled.",
    pain: "In recruitment much of the day goes on reading CVs, matching candidates to roles and scheduling interviews.",
    solutions: [
      "Incoming CVs are read and ranked against each role.",
      "The best matches are shortlisted for you.",
      "Interviews are scheduled without back-and-forth emails.",
    ],
  },
  {
    slug: "car-repair",
    name: "Car repair workshops",
    automation: "Quotes, parts orders and pickup messages.",
    pain: "In workshops much of the day goes on writing quotes, ordering parts and answering calls asking whether the car is ready.",
    solutions: [
      "Quotes are put together from the job and parts prices.",
      "Parts are ordered as soon as a job is booked.",
      "Customers get a message when their car is ready.",
    ],
  },
  {
    slug: "hospitality",
    name: "Hotels and guest houses",
    automation: "Guest replies and bookings synced in one calendar.",
    pain: "In hotels and guest houses much of the day goes on answering guest messages and keeping bookings in sync across booking sites.",
    solutions: [
      "Common guest questions are answered instantly in any language.",
      "Bookings from every site land in one calendar with no double bookings.",
      "Arrival details are sent automatically.",
    ],
  },
  {
    slug: "schools",
    name: "Schools and training centres",
    automation: "Online enrolment, scheduling and payment reminders.",
    pain: "In schools and training centres much of the day goes on enrolments, scheduling lessons and chasing payments.",
    solutions: [
      "Students enrol and pay online.",
      "Lessons are scheduled around everyone's availability.",
      "Payment reminders go out on their own.",
    ],
  },
  {
    slug: "logistics",
    name: "Logistics companies",
    automation: "Emailed orders entered and shipment updates sent.",
    pain: "In logistics much of the day goes on entering orders by hand, copying data from one program into another and tracking shipments by phone and email.",
    solutions: [
      "Orders arriving by email are entered into your system automatically.",
      "Customers get shipment updates without calling.",
      "Documents are filled in from data you already have.",
    ],
  },
];
