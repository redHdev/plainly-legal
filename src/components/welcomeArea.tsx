import Image from "next/image";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs";

import { Cog } from "~/components/icons";
import { cn } from "~/utils/cn";

export const WelcomeUser = async ({
  showSettingsBtn = true,
  text,
  children,
  className,
}: {
  showSettingsBtn?: boolean;
  text?: string;
  children?: React.ReactNode;
  className?: string;
}) => {
  //Grab the user from the server state
  const user = await currentUser();

  if (!user) {
    // You can handle the loading or signed state separately
    return (
      <div className={cn("flex flex-row items-center gap-3", className)}>
        <div className="image-container">
          <div className="aspect-square h-14 overflow-hidden rounded-full bg-purple-100 sm:h-16"></div>
        </div>
        <div className="flex-grow">
          <h6 className="loading subtitle mb-1 inline-flex text-xl leading-none">
            {text ?? "Welcome back"}
          </h6>
          <h2 className="loading mb-0 text-4xl font-semibold">_</h2>
          {children}
        </div>
      </div>
    );
  } else {
    return (
      <div className={cn("flex flex-row items-center gap-3", className)}>
        <div className="image-container">
          <div className="aspect-square h-14 overflow-hidden rounded-full bg-purple-100 sm:h-16">
            <Image
              src={user?.imageUrl.replace("w=96", "w=128")}
              width={120}
              height={120}
              alt="Profile Image"
              className="h-full w-full rounded-full border border-light_purple-200 object-cover"
            />
          </div>
        </div>
        <div className="flex-grow">
          <h6 className="subtitle mb-1 leading-none sm:text-xl">
            {text ?? "Welcome back"}
          </h6>
          <h2 className="mb-0 text-3xl font-semibold sm:text-4xl">
            {user?.firstName} {user?.lastName}
          </h2>
          {children}
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
      </div>
    );
  }
};
