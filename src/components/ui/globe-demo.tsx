import { promises as fs } from "fs";
import path from "path";
import { Suspense } from "react";
import { World } from "./globe";

export async function GlobeDemo() {
  const globeDataPath = path.join(process.cwd(), "src/data/globe.json");
  const fileContents = await fs.readFile(globeDataPath, "utf8");
  const countriesData = JSON.parse(fileContents);

  return (
    <div className="relative flex h-[560px] w-full flex-row items-center justify-center bg-white py-20 dark:bg-black md:h-[800px]">
      <div className="relative mx-auto h-full w-full max-w-7xl overflow-hidden px-4 md:h-[40rem]">
        <div>
          <h2 className="text-center text-xl font-bold text-black dark:text-white md:text-4xl">
            Providing <span className="text-blue-500">value</span> worldwide
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-base font-normal text-neutral-700 dark:text-neutral-200 md:text-lg">
            Helping businesses grow through software development, codebase audit, and AI.
          </p>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-40 w-full select-none bg-gradient-to-b from-transparent to-white dark:to-black" />
        <div className="absolute -bottom-20 z-10 h-72 w-full md:h-full">
          <Suspense
            fallback={
              <div className="flex h-72 w-full items-center justify-center md:h-full">
                <div className="flex flex-col items-center space-y-4">
                  {/* Spinner */}
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500" />

                  {/* Loading text */}
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">Loading globe...</p>
                </div>
              </div>
            }
          >
            <World countriesData={countriesData} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
