"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function Comments() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch by not rendering until mounted
  if (!mounted) {
    return <section className="mt-10 h-64 border-t border-stone-200 pt-8 dark:border-neutral-700" />;
  }

  return (
    <section className="mt-10 border-t border-stone-200 pt-8 dark:border-neutral-700">
      <Giscus
        repo="alpha-code-org/landing-page"
        repoId="R_kgDOLVOzEQ"
        category="General"
        categoryId="DIC_kwDOLVOzEc4Cr1_U"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={resolvedTheme === "dark" ? "noborder_dark" : "noborder_light"}
        lang="en"
        loading="lazy"
      />
    </section>
  );
}
