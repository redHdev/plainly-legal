"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "~/utils/cn";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "text-purple-70 inline-flex items-center justify-center rounded-md bg-purple-50 p-1 data-[orientation=vertical]:flex-col",
      className,
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-sm bg-transparent px-3 py-1.5 text-sm font-medium transition-colors duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-light_purple-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      "text-purple-600 [&_svg.custom]:fill-purple-600",
      "data-[state=active]:bg-white data-[state=active]:text-purple-800 data-[state=active]:shadow-sm [&_svg.custom]:data-[state=active]:fill-purple-800",
      className,
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "focus-visible:ring-ring mt-2 animate-fadeInUp_50 flex-col ring-offset-purple-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 data-[state=active]:flex",
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
