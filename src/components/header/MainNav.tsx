"use client";

import * as React from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewportFromRight,
} from "@/components/ui/navigation-menu";

import { mainMenuData, type MenuLinks, LoopItemPreGuard } from "./mainMenuData";
import { cn } from "@/utils/cn";

// Main Component
// Main Component
export const MainNav = ({ className }: { className?: string }) => {
  const menuItems = mainMenuData();

  return (
    <NavigationMenu className={className}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
      <div className="flex flex-grow"></div>
      <NavigationMenuList>
        <NavLoop menuLinks={menuItems} />
      </NavigationMenuList>
      <NavigationMenuViewportFromRight />
    </NavigationMenu>
  );
};

// Child components below
// Child components below
// Child components below

// Modified "ShadCN" List Item
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <NavigationMenuLink asChild>
      <a
        ref={ref}
        className={cn(
          "hover:bg-slate-100 focus:bg-slate-100 dark:hover:bg-slate-700 dark:focus:bg-slate-700 block select-none space-y-1 rounded-md leading-none no-underline outline-none transition-colors",
          className,
        )}
        {...props}
      >
        <div className="font-bold leading-none">{title}</div>
        <p className="text-slate-500 dark:text-slate-400 line-clamp-2 leading-snug">
          {children}
        </p>
      </a>
    </NavigationMenuLink>
  );
});
ListItem.displayName = "ListItem";

// Loop through menu items
const NavLoop = ({ menuLinks }: { menuLinks: MenuLinks }) => {
  const menuItems = Object.entries(menuLinks).map(([key, value]) => {
    return (
      <LoopItemPreGuard roles={value.roles} key={key}>
        {value.showSepBefore && (
          <div className="mx-4 flex items-center justify-center">
            <div className="inline-flex h-5 w-px bg-white/50"></div>
          </div>
        )}
        {!value.mobileOnly && <NavLoopItem key={key} title={key} value={value} />}
      </LoopItemPreGuard>
    );
  });
  return menuItems;
};

// Loop Item
const NavLoopItem = ({
  title,
  value,
}: {
  title: string;
  value: MenuLinks[keyof MenuLinks];
}) => {
  if (value.children) {
    return (
      <NavigationMenuItem >
        <NavigationMenuTrigger>
          {value.icon}
          {title}
        </NavigationMenuTrigger>
        <NavigationMenuContent>
          {/* Loop through children */}
          <div className="grid gap-0 text-purple-800 md:w-[450px]">
            {Object.entries(value.children).map(([childKey, childValue]) => (
              <div
                className={cn(
                  "flex flex-row flex-nowrap items-start gap-1.5 p-4",
                  childValue.comingSoon && "pointer-events-none opacity-50",
                )}
                key={childKey}
              >
                <span>{childValue.icon}</span>
                <ListItem
                  href={childValue.link}
                  target={childValue.newTab ? "_blank" : ""}
                  title={
                    childKey + (childValue.comingSoon ? " - Coming Soon" : "")
                  }
                >
                  <span className="text-purple-500">
                    {childValue.description}
                  </span>
                </ListItem>
              </div>
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  } else {
    return (
      <NavigationMenuItem>
        <NavigationMenuLink
          href={value.link}
          target={value.newTab ? "_blank" : ""}
          className={navigationMenuTriggerStyle()}
        >
          {value.icon}
          <span className="whitespace-nowrap">{title}</span>
        </NavigationMenuLink>
      </NavigationMenuItem>
    );
  }
};

export default MainNav;
