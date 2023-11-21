"use client";

import * as React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

import { KeyRound } from "lucide-react";

import {
  NavigationMenu,
  // NavigationMenuContent,
  NavigationMenuItem,
  // NavigationMenuLink,
  NavigationMenuList,
  // NavigationMenuTrigger,
  // navigationMenuTriggerStyle,
  // NavigationMenuViewport,
  NavigationMenuViewportFromRight,
} from "@/components/ui/navigation-menu";

export function AccountNav({ className }: { className?: string }) {
  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        {/* What signed in users see */}
        <SignedIn>
          <NavigationMenuItem>
            <div className="ml-4 aspect-square h-9 w-9 rounded-full bg-purple-500">
              <UserButton
                userProfileMode="navigation"
                userProfileUrl={
                  typeof window !== "undefined"
                    ? `${window.location.origin}/account`
                    : undefined
                }
                appearance={{
                  elements: {
                    /* The key below is a class associated with the users name */
                    // userPreviewMainIdentifier__userButton: "!text-lg",
                    avatarBox: "h-9 w-9",
                  },
                }}
              />
            </div>
          </NavigationMenuItem>
        </SignedIn>
        {/* Signed out users get sign in button */}
        <SignedOut>
          <div className="mx-4 flex items-center justify-center">
            <div className="inline-flex h-5 w-px bg-white/50"></div>
          </div>
          <NavigationMenuItem>
            <Link
              href="/account/login"
              className="-mr-3 inline-flex items-center gap-2.5 px-3 py-1 font-medium"
            >
              <KeyRound className="h-4 w-4" />
              <span>Login</span>
            </Link>
          </NavigationMenuItem>
        </SignedOut>
      </NavigationMenuList>
      <NavigationMenuViewportFromRight />
    </NavigationMenu>
  );
}
