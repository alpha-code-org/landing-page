"use client";

import Giscus from "@giscus/react";

export function Comments() {
  return (
    <section className="mt-10">
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
        theme="dark"
        lang="en"
        loading="lazy"
      />
    </section>
  );
}
