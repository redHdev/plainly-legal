import Link from "next/link";
import { currentUser } from "@clerk/nextjs";



export const metadata = {
  title: "Plainly Legal",
  description: "Plainly Legal",
};

import { WelcomeUser } from "~/components/welcomeArea";
import ServiceTiles from "./serviceTiles";
import HomeSlider from "./homeSlider";

export default async function Page() {
  const user = await currentUser();

  return (

    <section id="content" className="flex-grow py-0">
      <div className="grid w-full flex-grow gap-6 md:grid-cols-7">
        <div className="order-1 mx-auto flex w-full max-w-xl flex-col gap-6 px-6 py-10 md:-order-none md:col-span-3 md:ml-auto md:mr-0 md:justify-center">
          {!!user ? (
            <>
              <WelcomeUser showSettingsBtn={false} />
              <div className="my-4 h-[2px] w-full bg-light_purple-500"></div>
              <div>
                <h3 className="!mb-3 text-xl md:text-2xl">
                  What can we get started for you?
                </h3>
                <ServiceTiles />
              </div>
            </>
          ) : (
            <>
              <div>
                <h2 className="mb-2">Our Services</h2>
                <p className="!mb-0 text-purple-500 md:text-lg">
                  Start benefiting from our legal tools today!
                </p>
              </div>
              <ServiceTiles />
              <span className="text-lg text-purple-500">
                {"Already have an account? "}
                <Link
                  className="text-lg font-semibold text-purple-900"
                  href="/account/login"
                >
                  Log In
                </Link>
              </span>
            </>
          )}
        </div>
        <HomeSlider />
      </div>
    </section>
  );
}
