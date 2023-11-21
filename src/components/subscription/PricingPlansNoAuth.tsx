import React, { useState } from "react";
import { type Product, type Prices } from "@prisma/client";
import Button from "../Button";
import { type FullProducts } from "~/types/subscription";

import { getStripe } from "~/utils/stripe-client";
import { postData } from "~/utils/request";
import { cn } from "~/utils/cn";

interface CheckoutPlanProps {
  products: FullProducts[];
}

export const PricingPlansNoAuth: React.FC<CheckoutPlanProps> = (
  { products },
) => {
  const [priceIdLoading, setPriceIdLoading] = useState<string>();

  const handleCheckout = async (product: Product, price: Prices) => {
    setPriceIdLoading(price.priceId);
    try {
      console.log("request here");
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
