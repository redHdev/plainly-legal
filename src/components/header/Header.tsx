import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import logoObj from "public/assets/logo.svg";

import { MainNav } from "./MainNav";
import { AccountNav } from "./AccountNav";
import { MobileNav } from "./MobileNav";
import { cn } from "~/utils/cn";

interface ImageType {
  src: string;
  height: number;
  width: number;
}
const logo: ImageType = logoObj as ImageType;

//create a header with an optional classname
export function Header({ className }: { className?: string }) {
  return (
    <header className={cn("relative bg-purple-900 text-white", className)}>
      {/* <div className="mx-auto flex h-24 max-w-screen-2xl items-center px-6"> */}
      <div className="mx-auto grid h-[70px] max-w-screen-2xl grid-cols-[auto,1fr,auto,auto] items-center px-6 header:h-24">
        <Link href="/" passHref className="mr-4 h-[inherit] w-28 md:w-32">
          <Image
            src={logo}
            alt="Plainly Legal"
            className="h-full w-full"
            width={logo.width}
            height={logo.height}
            priority
          />
        </Link>
        <MainNav className="hidden flex-[1] justify-start text-lg header:flex" />
        <AccountNav className="flex-[1] justify-end text-lg" />
        <MobileNav className="ml-6 flex-[1] justify-end header:hidden" />
      </div>
    </header>
  );
}
