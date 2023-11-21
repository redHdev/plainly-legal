"use client";

import * as React from "react";

import { useState } from "react";
import Link from "next/link";
import { motion as m, AnimatePresence } from "framer-motion";

import { ChevronDown } from "lucide-react";

import { mainMenuData, type MenuLinks, LoopItemPreGuard } from "./mainMenuData";
import { cn } from "@/utils/cn";

// Main Component
export const MobileNav = ({ className }: { className?: string }) => {
  const menuItems = mainMenuData();

  // Init State
  const [menuOpen, setMenuOpen] = useState(false);

  // State handler
  const menuHandler = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div
      key="mobile-nav-area"
      className={cn(menuOpen && "mobile_active", className)}
    >
      <button
        className="relative flex h-8 w-8 flex-col justify-center text-white focus:ring-0 focus-visible:outline-0 focus-visible:ring-0 active:ring-0"
        id="mobile-nav"
        aria-expanded={menuOpen ? "true" : "false"}
        aria-label="Toggle navigation"
        onClick={menuHandler}
      >
        <span className="burger">
          <span className="hidden">
            {menuOpen ? "Close Menu" : "Open Menu"}
          </span>
        </span>
      </button>
      <AnimatePresence>
        {menuOpen && (
          <m.div
            key="mobile-nav"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-2 top-[calc(70px+.5rem)] z-[999] w-[calc(100vw-1rem)] max-w-lg rounded-xl bg-purple-900/80 p-6 backdrop-blur-sm"
          >
            <div className="flex flex-col gap-2">
              <NavLoop
                menuLinks={menuItems}
                setParentMenuOpen={(value) => {
                  setMenuOpen(value);
                }}
              />
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Nav Loop Component
const NavLoop = ({
  menuLinks,
  setParentMenuOpen,
}: {
  menuLinks: MenuLinks;
  setParentMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const menuItems = Object.entries(menuLinks).map(([key, value]) => {
    return (
      <LoopItemPreGuard roles={value.roles} key={key}>
        {value.showSepBefore && (
          <div className="my-2 flex h-px w-full bg-white/20"></div>
        )}
        <MobileNavLoopItem
          title={key}
          value={value}
          setParentMenuOpen={(value) => setParentMenuOpen(value)}
        />
      </LoopItemPreGuard>
    );
  });
  return menuItems;
};

// Loop Item Component
const MobileNavLoopItem = ({
  title,
  value,
  setParentMenuOpen,
}: {
  title: string;
  value: MenuLinks[keyof MenuLinks];
  setParentMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // Submenu state
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  // Submenu handler
  const subMenuHandler = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const parentMenuHandler = () => {
    setParentMenuOpen(false);
  };

  if (value.children) {
    return (
      <div key={title} data-item={title}>
        <button
          className="flex w-full items-center justify-between rounded-md bg-white/10 px-2.5 py-1.5 text-lg leading-5"
          aria-expanded={subMenuOpen ? "true" : "false"}
          aria-label="Toggle sub-navigation"
          onClick={subMenuHandler}
        >
          <div className="flex items-baseline">
            {value.icon}
            {title}
          </div>
          <ChevronDown
            className={cn(
              "h-4 w-4 scale-[1.2] transform transition-transform duration-300",
              subMenuOpen && "rotate-180",
            )}
          />
        </button>
        <AnimatePresence>
          {subMenuOpen && (
            <m.div
              key={title + "-submenu"}
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className={cn("grid gap-1 p-2 text-purple-800 md:w-[450px]")}
            >
              {Object.entries(value.children).map(([childKey, childValue]) => (
                <>
                  <Link
                    href={!childValue.comingSoon ? childValue.link : ""}
                    target={childValue.newTab ? "_blank" : ""}
                    className={cn(
                      "flex flex-row flex-nowrap items-baseline gap-2.5",
                      childValue.comingSoon && "cursor-not-allowed opacity-40",
                    )}
                    prefetch={value.prefetch}
                    onClick={parentMenuHandler}
                  >
                    <span style={{ filter: "contrast(1) brightness(10)" }}>
                      {childValue.icon}
                    </span>
                    <div className="flex flex-col">
                      <strong className="text-white">
                        {childKey +
                          (childValue.comingSoon ? " - Coming Soon" : "")}
                      </strong>
                      <div className="text-white/70">
                        {childValue.description}
                      </div>
                    </div>
                  </Link>
                </>
              ))}
            </m.div>
          )}
        </AnimatePresence>
      </div>
    );
  } else {
    return (
      <div key={title} data-item={title}>
        {value.link !== "" && (
          <Link
            href={value.link || "#"}
            className="flex w-full rounded-md bg-white/10 px-2.5 py-1.5 text-lg leading-5"
            passHref
            target={value.newTab ? "_blank" : "_self"}
            prefetch={value.prefetch}
            onClick={parentMenuHandler}
          >
            {value.icon}
            <span>{title}</span>
          </Link>
        )}
      </div>
    );
  }
};

export default MobileNav;
