"use client";

import Link from "next/link";
import { Button } from "./moving-border-button";
import { BOOKING_URL } from "@/utils/links";

// Call-to-action that opens the booking page in a new tab
export function BookingButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Button
      as={Link}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      borderRadius="1.75rem"
      className={className}
    >
      {children}
    </Button>
  );
}
