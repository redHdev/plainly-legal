"use client";

import * as React from "react";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

// import { cn } from "@/utils/cn";
// import { Icons } from "@/components/icons"
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
        <NavigationMenuItem>
          {/* What signed in users see */}
          <SignedIn>
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
          </SignedIn>
          {/* Signed out users get sign in button */}
          <SignedOut>
            <Link href="/account/login" passHref>
              Login
            </Link>
          </SignedOut>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuViewportFromRight />
    </NavigationMenu>
  );
}
