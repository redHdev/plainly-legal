"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/utils/cn";
// import { s } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  // NavigationMenuViewport,
  NavigationMenuViewportFromRight,
} from "@/components/ui/navigation-menu";

import { Help } from "@/components/icons";
import { AddDocument } from "~/components/icons";
import { SearchShield } from "~/components/icons";
import { Robot } from "~/components/icons";

export function MainNav({ className }: { className?: string }) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link
            href="https://plainlylegal.com/#learn-more"
            passHref
            prefetch={true}
            target="_blank"
            className={navigationMenuTriggerStyle()}
          >
            About
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div className="flex flex-grow"></div>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/beta-dashboard" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Help className="mr-2.5 h-auto w-4 fill-white" />
              <span className="whitespace-nowrap">Beta Dashboard</span>
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-5 p-5 text-purple-800 md:w-[500px] md:grid-cols-2">
              <div className="flex flex-row flex-nowrap items-start gap-1.5">
                <span>
                  <AddDocument className="block h-4 w-4 fill-purple-800" />
                </span>
                <ListItem href="/agreements" title="Agreement Generator">
                  <span className="text-purple-500">
                    A legal agreement generator for startups.
                  </span>
                </ListItem>
              </div>

              <div className="flex flex-row flex-nowrap items-start gap-1.5">
                <span>
                  <SearchShield className="h-4 w-4 fill-purple-800" />
                </span>
                <ListItem href="/legal-manager" title="Legal Manager">
                  <span className="text-purple-500">
                    A legal auditing tool for startups.
                  </span>
                </ListItem>
              </div>

              <div className="flex flex-row flex-nowrap items-start gap-1.5">
                <span>
                  <Robot className="h-4 w-4 fill-purple-800" />
                </span>
                <ListItem href="/chatlegal" title="ChatLegal™">
                  <span className="text-purple-500">
                    A legal chatbot for startups.
                  </span>
                </ListItem>
              </div>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewportFromRight />
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700 block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
        >
          <div className="font-bold leading-none">{title}</div>
          <p className="text-slate-500 dark:text-slate-400 line-clamp-2 leading-snug">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
