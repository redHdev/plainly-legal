"use client";

import {
  // useEffect,
  useState,
} from "react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { cn } from "~/utils/cn";

export function MobileNav({ className }: { className?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuHandler = () => {
    setMenuOpen(!menuOpen);
  };

  interface MenuLinks {
    [key: string]: {
      link: string;
      icon: boolean;
      prefetch: boolean;
      newTab?: boolean;
    };
  }

  const menuLinks: MenuLinks = {
    Main: {
      link: "",
      icon: false,
      prefetch: true,
    },
    Home: {
      link: "/",
      icon: false,
      prefetch: true,
    },
    About: {
      link: "https://plainlylegal.com/#learn-more",
      icon: false,
      prefetch: false,
      newTab: true,
    },
    "Beta Dashboard": {
      link: "/beta-dashboard",
      icon: false,
      prefetch: true,
    },
    "Getting Started": {
      link: "",
      icon: false,
      prefetch: true,
    },
    "Agreement Generator": {
      link: "/agreements",
      icon: false,
      prefetch: true,
    },
    "Legal Auditing Tool": {
      link: "/legal-auditing-tool",
      icon: false,
      prefetch: true,
    },
    "ChatLegal": {
      link: "/chatlegal",
      icon: false,
      prefetch: true,
    },
  };

  return (
    <div className={cn(`${menuOpen ? "mobile_active" : ""}`, className)}>
      <DropdownMenu onOpenChange={menuHandler} open={menuOpen} modal={false}>
        <DropdownMenuTrigger
          className="relative flex h-24 w-8 flex-col justify-center text-white focus:ring-0 focus-visible:outline-0 focus-visible:ring-0 active:ring-0"
          id="mobile-nav"
          aria-expanded={menuOpen ? "true" : "false"}
          aria-label="Toggle navigation"
        >
          <span className="burger">
            <span className="hidden">
              {menuOpen ? "Close Menu" : "Open Menu"}
            </span>
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="right-0 w-[100vw] max-w-lg rounded-none bg-white p-8 text-right"
          sideOffset={0}
          alignOffset={-24}
          align="end"
        >
          {Object.keys(menuLinks).map((item) => (
            <div key={item}>
              {menuLinks[item]?.link === "" && (
                <DropdownMenuLabel className="text-xl">
                  {item}
                </DropdownMenuLabel>
              )}
              {menuLinks[item]?.link !== "" && (
                <DropdownMenuItem className="justify-end text-lg">
                  <Link
                    href={menuLinks[item]?.link || "#" }
                    passHref
                    target={menuLinks[item]?.newTab ? "_blank" : "_self"}
                    prefetch={menuLinks[item]?.prefetch}
                    onClick={() => setMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </DropdownMenuItem>
              )}
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
