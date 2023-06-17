"use client";

import Link from "next/link";
import { motion as m } from "framer-motion";

import {
  AddDocument,
  Robot,
  SearchShield,
} from "~/components/icons";
import { cn } from "~/utils/cn";

const tileStyle =
  "col-span-full flex h-full w-full flex-row justify-start gap-4 rounded-2xl border border-solid border-purple-100 px-5 py-4 text-purple-800 shadow-md shadow-light_purple-500/25 transition hover:shadow-lg hover:shadow-light_purple-800/25";

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
          <div className="flex-grow">
            <h4 className="mb-0">Agreement Generator</h4>
            <p className="text-purple-500">
              A legal agreement generator for startups.
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
        <Link href="/legal-manager" className={tileStyle}>
          <div className="inline-flex aspect-square h-14 items-center justify-center self-center rounded-full border border-light_purple-100 bg-light_purple-800 text-xl ">
            <SearchShield className="h-8 fill-white" />
          </div>
          <div className="flex-grow">
            <h4 className="mb-0">Legal Manager</h4>
            <p className="text-purple-500">
              A legal auditing tool for startups.
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
          delay: 0.2,
        }}
        exit={{
          opacity: 0,
          y: -20,
        }}
      >
        <Link href="/chatlegal" className={tileStyle}>
          <div className="inline-flex aspect-square h-14 items-center justify-center self-center rounded-full border border-light_purple-100 bg-light_purple-800 text-xl ">
            <Robot className="h-8 fill-white" />
          </div>
          <div className="flex-grow">
            <h4 className="mb-0">ChatLegal™</h4>
            <p className="text-purple-500">A legal chatbot for startups.</p>
          </div>
        </Link>
      </m.div>
    </div>
  );
}

export default ServiceTiles;
