"use client";

import Link from "next/link";
import { motion as m } from "framer-motion";

import { AddDocument, Robot, SearchShield } from "~/components/icons";
import { cn } from "~/utils/cn";

const tileStyle =
  "col-span-full flex h-full w-full flex-row justify-start gap-2.5 sm:gap-4 rounded-2xl border border-solid border-purple-100 px-4 py-3 sm:px-5 sm:py-4 text-purple-800 shadow-md shadow-light_purple-500/25 transition hover:shadow-lg hover:shadow-light_purple-800/25";

  const tileGrayed =
  "col-span-full flex h-full w-full flex-row justify-start gap-2.5 sm:gap-4 rounded-2xl border border-solid border-gray-200 px-4 py-3 sm:px-5 sm:py-4 text-gray-500 shadow-md shadow-gray-500/25 transition bg-gray-200/50 text-gray-500";

export function ServiceTiles({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-y-3", className)}>
      <m.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        exit={{
          opacity: 0,
          y: -20,
        }}
      >
        <Link href="/agreements" className={tileStyle}>
          <div className="inline-flex aspect-square h-14 items-center justify-center self-center rounded-full border border-light_purple-100 bg-light_purple-800 text-xl ">
            <AddDocument className="h-8 w-8 fill-white" />
          </div>
          <div className="flex-grow self-center">
            <h4 className="text-gray-500 mb-0">Legal Doc Generator</h4>
            <p className="text-sm text-gray-500 sm:text-base">
              Generate and manage your legal documents.
            </p>
          </div>
        </Link>
      </m.div>

      <m.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: 0.1,
        }}
        exit={{
          opacity: 0,
          y: -20,
        }}
      >
        <div className={tileGrayed}>
          <div className="inline-flex aspect-square h-14 items-center justify-center self-center rounded-full border border-gray-400 bg-gray-300 text-xl ">
            <SearchShield className="h-8 fill-gray-400" />
          </div>
          <div className="flex-grow self-center">
            <div className="coming-soon-heading">
              <h4 className="inline-block text-gray-500 mb-0">Legal Manager</h4><div className="inline-block coming-soon-tag">Coming Soon</div>
            </div>
            <p className="text-sm text-gray-500 sm:text-base">
             Perform a legal audit and manage your tasks.
            </p>
          </div>
        </div>
      </m.div>

      <m.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
          delay: 0.2,
        }}
        exit={{
          opacity: 0,
          y: -20,
        }}
      >
        <div className={tileGrayed}>
          <div className="inline-flex aspect-square h-14 items-center justify-center self-center rounded-full border border-gray-400 bg-gray-300 text-xl ">
            <Robot className="h-8 fill-gray-400" />
          </div>
          <div className="flex-grow self-center">
          <div className="coming-soon-heading">
              <h4 className="inline-block text-gray-500 mb-0">ChatLegal&trade;</h4><div className="inline-block coming-soon-tag">Coming Soon</div>
            </div>
            <p className="text-sm text-gray-500 sm:text-base">
              Get your legal questions answered.
            </p>
          </div>
        </div>
      </m.div>
    </div>
  );
}

export default ServiceTiles;
