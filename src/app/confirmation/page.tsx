import React from "react";
import { stripe } from "@/utils/stripe";
import Link from "next/link";
import { Checkmark } from "~/components/icons";
import { SignedIn, SignedOut, currentUser } from "@clerk/nextjs";

export const metadata = {
  title: "Confirmation - Plainly Legal",
  description: "Thank you for your purchase!",
};

interface Params {
  [keys: string]: string;
}

export default async function Page({ searchParams }: { searchParams: Params }) {
  // Check if params has session_id
  if (typeof searchParams?.session_id !== "string")
    throw new Error("Could not find session id.");

  const session = await stripe.checkout.sessions.retrieve(
    searchParams.session_id,
  );

  // Confirm the session is valid
  if (typeof session.customer !== "string")
    throw new Error("Could not find a valid customer id");

  // Retrieve the invoice information from stripe
  const invoice = await stripe.invoices.retrieve(session.invoice as string);
  if (!invoice) throw new Error("Could not find invoice");

  // Check to see if invoice is for a subscription
  const subscription = !!invoice.subscription
    ? await stripe.subscriptions.retrieve(session.subscription as string)
    : null;
  if (!subscription) throw new Error("Order is not a subscription");

  //Get the first price and item, we will only ever have one item purchased per subscription
  const price = subscription.items.data[0]?.price;
  if (!price) throw new Error("Could not find a price for this subscription.");

  const actuallyPaid = ( invoice.total / 100 ).toFixed(2);

  //Get the correct price and interval
  const priceString = `$${actuallyPaid} / ${
    price.recurring?.interval as string
  }`;

  // If the user is logged in, get their clerk first name and last name using currentUser();
  const clerkUser = await currentUser();

  return (
    <>
      <section id="content" className="gap-12 py-10 md:py-16">
        <div className="w-full max-w-xl px-6 md:max-w-screen-xl">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-full">
              <div className="flex flex-row items-center gap-4">
                <div className="aspect-square rounded border-4 border-green p-1">
                  <Checkmark className="h-5 w-5 fill-green" />
                </div>
                <div className="heading-area">
                  <h2 className="mb-2 font-semibold">
                    Thank you for your order!
                  </h2>
                  <p className="">
                    An email confirmation has been sent to{" "}
                    <span className="border-b border-light_purple-900">
                      {invoice.customer_email}
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>

            <div className="col-span-full rounded-xl border border-gray-300 p-5 md:col-span-7 md:p-8">
              <div className="order-title mb-4 flex flex-row flex-wrap items-center justify-between gap-2">
                <h4 className="mb-0">Order Details:</h4>
                <Link
                  href={invoice.hosted_invoice_url as string}
                  className="inline-flex cursor-pointer items-center justify-center rounded border border-light_purple-900 bg-white px-6 py-2 text-center leading-5 text-light_purple-900 transition-all duration-200 focus:border-purple-400 focus:bg-light_purple-100 focus:text-purple-900"
                  target="_blank"
                >
                  View Receipt
                </Link>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-row flex-wrap gap-2">
                  <div className="min-w-[150px] text-gray-400">
                    Invoice ID:{" "}
                  </div>
                  <div className="font-semibold">{invoice.number}</div>
                </div>

                <div className="flex flex-row flex-wrap gap-2">
                  <div className="min-w-[150px] text-gray-400">
                    Order Total:{" "}
                  </div>
                  <div className="font-semibold">
                    ${actuallyPaid}
                  </div>
                </div>

                <div className="flex flex-row flex-wrap gap-2">
                  <div className="min-w-[150px] text-gray-400">
                    Plan Price:{" "}
                  </div>
                  <div className="font-semibold">{priceString}</div>
                </div>

                <div className="flex flex-row flex-wrap gap-2">
                  <div className="min-w-[150px] text-gray-400">Product: </div>
                  <div className="flex flex-col">
                    <span
                      className="font-semibold"
                      title={price.nickname ?? 'Plainly Legal™ Subscription'}
                    >
                      Plainly Legal™ Subscription
                    </span>
                    <span className="text-gray-400">
                      The virtual legal department for your online business.
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-full rounded-xl border border-gray-300 p-5 md:col-span-5 md:p-8">
              <SignedOut>
                <h5 className="mb-4 font-medium">Log in to get started</h5>
                <p>
                  Begin using the software right away! We&apos;ll send a link to
                  your email so you can securely log in.
                </p>
                <Link
                  href={`/account/login-from-stripe?email=${encodeURIComponent(invoice.customer_email ?? '')}`}
                  className="inline-flex cursor-pointer items-center justify-center rounded border border-orange bg-orange px-6 py-2 text-center leading-5 text-white transition-all duration-200 hover:bg-orange/90 focus:border-[#C64236]"
                >
                  Send Login Link
                </Link>
              </SignedOut>
              <SignedIn>
                <h5 className="mb-4 font-medium">
                  Hello, {clerkUser?.firstName} {clerkUser?.lastName}!
                </h5>
                <p>
                  You can either begin using our software right away or head to
                  your account area.
                </p>
                <div className="flex flex-row flex-wrap gap-2">
                  <Link
                    href={`/`}
                    className="inline-flex cursor-pointer items-center justify-center rounded border border-orange bg-orange px-6 py-2 text-center leading-5 text-white transition-all duration-200 hover:bg-orange/90 focus:border-[#C64236]"
                  >
                    Get Started
                  </Link>
                  <Link
                    href={`/account/`}
                    className="inline-flex cursor-pointer items-center justify-center rounded border border-orange bg-white px-6 py-2 text-center leading-5 text-orange transition-all duration-200 hover:bg-orange/5 focus:border-[#C64236]"
                  >
                    Your Account
                  </Link>
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
