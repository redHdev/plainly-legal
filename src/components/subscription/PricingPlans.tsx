import React, { useState } from "react";
import { type Product, type Subscription, type Prices } from "@prisma/client";
import Button from "../Button";
import { type FullProducts } from "~/types/subscription";

import { useUserMeta, hasSubscription, hasRole } from "~/UserMetaProvider";
import { useRouter } from "next/navigation";

import { getStripe } from "~/utils/stripe-client";
import { postData } from "~/utils/request";
import { humanReadableDate } from "~/utils/date";
import { cn } from "~/utils/cn";

interface CheckoutPlanProps {
  products: FullProducts[] | null;
}

interface Price {
  amount: number;
  inerval: string;
  priceId: string;
}

interface HasPlanProps {
  subscription: Subscription | null;
}


export const HasPlan: React.FC<HasPlanProps> = ({ subscription }) => {
  console.log(subscription);
  //For now, we will just return a update message:
  return (
    <section className="bg-gray">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-4 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h2 className="text-2xl font-extrabold text-black sm:text-center sm:text-3xl">
            Your Plainly Legal™ Subscription
          </h2>
          <p className="text-zinc-200 m-auto mt-5 max-w-2xl text-xl sm:text-center sm:text-2xl">
            Need to update your billing or have a question about your subscription? Contact support at support@plainlylegal.com.
          </p>
        </div>
      </div>
    </section>
  );
}

export const PricingPlans: React.FC<CheckoutPlanProps> = ({ products }) => {

  console.log(products);
  //For now, we will just return a update message:
  return (
    <section className="bg-gray">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-4 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h2 className="text-2xl font-extrabold text-black sm:text-center sm:text-3xl">
            Your Plainly Legal™ Subscription
          </h2>
          <p className="text-zinc-200 m-auto mt-5 max-w-2xl text-xl sm:text-center sm:text-2xl">
            Need to update your billing or have a question about your subscription? Contact support at support@plainlylegal.com.
          </p>
        </div>
      </div>
    </section>
  );
}



export const NewHasPlan: React.FC<HasPlanProps> = ({ subscription }) => {
  const router = useRouter();

  const [protalLoading, setPortalLoading] = useState<boolean>(false);

  const price = subscription?.price as Price | null;

  const handlePortal = async () => {
    setPortalLoading(true);
    try {
      const { url } = (await postData({
        url: "/api/subscription/create-portal-link",
      })) as { url: string };
      router.push(url);
    } catch (error) {
      if (error) return alert((error as Error).message);
    } finally {
      setPortalLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-4 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0">
            <div className="divide-zinc-600 bg-zinc-900 divide-y rounded-lg border-2 border-gray-400 p-4 text-center shadow-sm">
              <h1 className="border-none font-bold">{"Your Plan"}</h1>
              <p className="m-auto max-w-md border-none">{`Your last payment was ${
                subscription
                  ? humanReadableDate(subscription?.currentPeriodStart)
                  : ""
              } and your next payment will process on ${
                subscription
                  ? humanReadableDate(subscription?.currentPeriodEnd)
                  : ""
              }`}</p>
              <h2 className="my-10 border-none font-bold">
                {price &&
                  new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    minimumFractionDigits: 0,
                  }).format(price?.amount / 100)}
                /{price?.inerval}
              </h2>
              <div>
                <Button
                  variant="slim"
                  type="button"
                  disabled={!subscription}
                  loading={protalLoading}
                  onClick={() => void handlePortal()}
                  className="hover:bg-zinc-900 mt-8 block w-full rounded-md border border-gray-400 py-2 text-center text-sm font-semibold text-black"
                >
                  {"Adjust your Plan"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const NewPricingPlans: React.FC<CheckoutPlanProps> = ({ products }) => {
  const { userMeta } = useUserMeta();
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const router = useRouter();

  const handleCheckout = async (product: Product, price: Prices) => {
    setPriceIdLoading(price.priceId);
    if (!userMeta) {
      return router.push("/signin");
    }
    try {
      const { sessionId } = (await postData({
        url: "/api/subscription/create-checkout-session",
        data: { product, price },
      })) as { sessionId: string };

      const stripe = await getStripe();
      void stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      return alert((error as Error)?.message);
    } finally {
      setPriceIdLoading(undefined);
    }
  };

  const subscription = userMeta?.subscription as Subscription | null;

  //If the users are in beta, they don't need to subscribe to a plan
  if (hasRole(userMeta, "beta") || userMeta?.isAdmin === true) {
    const privilegedUserMessage =
      userMeta?.isAdmin === true
        ? "You are an admin user. You do not need to subscribe to a plan."
        : hasRole(userMeta, "beta")
        ? "Your current access has been granted through the beta program. You do not need to subscribe to a plan."
        : "You are a privileged user. You do not need to subscribe to a plan.";

    return (
      <section className="bg-gray">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-4 lg:px-8">
          <div className="sm:align-center sm:flex sm:flex-col">
            <h1 className="text-2xl font-extrabold text-black sm:text-center sm:text-6xl">
              Plainly Legal Access
            </h1>
            <p className="text-zinc-200 m-auto mt-5 max-w-2xl text-xl sm:text-center sm:text-2xl">
              {privilegedUserMessage}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (hasSubscription(userMeta)) {
    return <HasPlan subscription={subscription} />;
  }

  //if products is null, return null
  if (!products) return null;

  // Find the product with the id prod_ODpK82bOfFwZ3O this is our plainly legal subscription
  const subscriptionProduct = products.find(
    (product) => product.productId === "prod_ODpK82bOfFwZ3O",
  );

  // Confirm that the subscription has prices
  if (!subscriptionProduct?.price) return null;

  return (
    <>
      <section
        id="hero"
        className="gap-12 rounded-b-[40px] bg-light_purple-50 pb-16 pt-10 lg:pb-28 lg:pt-14"
      >
        <div className="grid w-full max-w-xl gap-x-4 gap-y-10 px-4 lg:max-w-screen-xl">
          {/* full column */}
          <div className="align-center flex flex-col">
            <h1 className="text-center text-4xl sm:text-5xl">
              Subscription Plans
            </h1>
            <p className="text-center text-xl">
              Please select a plan to continue.
            </p>
          </div>
        </div>
      </section>
      <section
        id="content"
        className="gap-12 overflow-visible pb-10 pt-0 lg:pb-16"
      >
        <div className="-mt-10 grid w-full max-w-xl gap-4 px-4 lg:-mt-16 lg:max-w-screen-xl lg:grid-cols-3">
          {/* subscription tiers */}
          {subscriptionProduct?.price.map((productPrices) => {
            //If the price is not active, return null
            if (!productPrices.active) return null;

            const priceString = new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              minimumFractionDigits: 0,
            }).format(productPrices.unitAmount / 100);

            return (
              <div
                key={productPrices.id}
                className="flex flex-col rounded-lg border border-light_purple-500 bg-white p-6"
              >
                <div className="text-center">
                  <h2 className="!mb-1 text-2xl font-semibold leading-6">
                    {subscriptionProduct.name}
                  </h2>
                  <p className="!mb-0 text-purple-300">
                    {subscriptionProduct.description}
                  </p>
                </div>
                <div className="my-8 text-center">
                  <span className="text-5xl font-extrabold text-light_purple-900">
                    {priceString}
                  </span>
                  <span className="text-base font-medium text-light_purple-500">
                    /{productPrices.interval}
                  </span>
                </div>
                <Button
                  variant="slim"
                  type="button"
                  disabled={!userMeta}
                  loading={priceIdLoading === productPrices.priceId}
                  onClick={() =>
                    void handleCheckout(subscriptionProduct, productPrices)
                  }
                  className={cn(
                    "block w-full !rounded-md !border py-2 text-center text-sm font-semibold transition-all duration-300",
                    "!border-purple-500 !bg-white !text-purple-900",
                    "hover:!border-purple-700 hover:!bg-purple-700 hover:!text-white",
                  )}
                >
                  {"Subscribe"}
                </Button>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};
