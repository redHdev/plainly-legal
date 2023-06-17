"use client";

import Image from "next/image";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { motion as m } from "framer-motion";

import { Cog } from "~/components/icons";

export const WelcomeUser = ({
  showSettingsBtn = true,
}: {
  showSettingsBtn?: boolean;
}) => {
  // Use the useUser hook to get the Clerk.user object
  // This hook causes a re-render on user changes
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    // You can handle the loading or signed state separately
    return (
      <m.div
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.25,
          ease: "easeOut",
        }}
        exit={{
          opacity: 0,
        }}
        className="flex flex-row items-center gap-3 "
      >
        <div className="image-container">
          <div className="aspect-square h-16 overflow-hidden rounded-full bg-purple-100"></div>
        </div>
        <div className="flex-grow">
          <h6 className="loading subtitle mb-1 inline-flex text-xl leading-none">
            Welcome back
          </h6>
          <h2 className="loading mb-0 text-4xl font-semibold">_</h2>
        </div>
      </m.div>
    );
  } else {
    return (
      <m.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
          ease: "easeOut",
        }}
        exit={{
          opacity: 0,
        }}
        className="flex flex-row items-center gap-3"
      >
        <div className="image-container">
          <div className="aspect-square h-16 overflow-hidden rounded-full bg-purple-100">
            <Image
              src={user?.profileImageUrl}
              width={70}
              height={70}
              alt="Profile Image"
              className="h-full w-full rounded-full border border-light_purple-200 object-cover"
            />
          </div>
        </div>
        <div className="flex-grow">
          <h6 className="subtitle mb-1 text-xl leading-none">Welcome back</h6>
          <h2 className="mb-0 text-4xl font-semibold">
            {user?.firstName} {user?.lastName}
          </h2>
        </div>
        {showSettingsBtn && (
          <Link
            href="/account"
            className="relative inline-flex aspect-square h-12 items-center justify-center self-center rounded-full border border-light_purple-200 bg-purple-50 text-xl [&_div]:hover:-translate-y-0 [&_div]:hover:opacity-100"
          >
            <Cog className="h-6 fill-light_purple-900" />
            <div className="absolute -bottom-2 left-1/2 inline-flex -translate-x-1/2 translate-y-3 items-center justify-center rounded-full bg-purple-900/70 px-3 py-1 text-center text-xs leading-4 text-white opacity-0 transition duration-300">
              Settings
            </div>
          </Link>
        )}
      </m.div>
    );
  }
};
