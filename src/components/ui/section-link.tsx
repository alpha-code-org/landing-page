"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Links to a homepage section. Next.js ignores a click when the URL already ends in the same
// hash, so on the homepage we scroll to the section ourselves to make every click work
export function SectionLink({
  id,
  children,
  className,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
}) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  return (
    <Link
      href={`/#${id}`}
      className={className}
      onClick={(event) => {
        const section = document.getElementById(id);
        if (pathname !== "/" || !section) return;

        event.preventDefault();
        section.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
        window.history.replaceState(null, "", `#${id}`);
      }}
    >
      {children}
    </Link>
  );
}
