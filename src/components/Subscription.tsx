"use client"

import React, { useEffect, useState } from "react";
import { PricingPlans } from "./subscription/PricingPlans";

import Loading from "~/app/loading";
import { type FullProducts } from "~/types/subscription";

type ProductDataType = {
  product: FullProducts[];
};

export const Subscription: React.FC = () => {

    const[product, setProduct] = useState<FullProducts[] | null>(null);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
      async function fetchData() {
        const response = await fetch("/api/subscription/getProduct", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          }
        });
        const productData = await response.json() as ProductDataType;
        setLoading(false);
        setProduct(productData?.product);
      } 
      void fetchData();
    }, []);

    if(loading){
      return(
        <Loading />
      );
    }

    return (
        <>
          <PricingPlans products={product} />
        </>
    )
}