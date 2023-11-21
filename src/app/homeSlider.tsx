"use client";

import Image from "next/image";
import { motion as m } from "framer-motion";

import { cn } from "~/utils/cn";
import previewImage from "public/assets/agreement-generator-new-preview.jpg";

export function HomeSlider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "hidden h-full items-center rounded-b-3xl bg-light_purple-50 px-10 py-16 md:col-span-4 md:flex md:rounded-l-3xl md:rounded-br-none md:pr-0",
        className
      )}
    >
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
        className="h-full w-full max-h-[700px] home-preview-container"
      >
        <Image
          src={previewImage}
          alt="hero"
          width={previewImage.width}
          height={previewImage.height}
          className="home-preview-shadow h-full w-full rounded-3xl border-[5px] border-purple-900 object-cover object-left"
          priority
        />
      </m.div>
    </div>
  );
}

export default HomeSlider;
