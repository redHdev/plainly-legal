"use client"
import {useEffect} from "react";
import { getStripe } from '~/utils/stripe-client';
import Loading from "~/app/loading";


const defaultErrorText =
  "Could not continue with the subscription. Please try again later.";

interface Params {
    [keys: string]: string;
  }
  
  export default function Page({ params }: { params: Params }) {
      // check if params is null
    if (
        params === null ||
        typeof params !== "object" ||
        !params.hasOwnProperty("id") ||
        typeof params.id !== "string"
    )
        throw new Error(defaultErrorText);

    useEffect(() => {

      console.log(params.id);

      async function fetchData() {
        const response = await fetch(`/api/subscription/create-checkout-session/${params.id}`, {
                      method: "GET",
                      headers: {
                        "Content-Type": "application/json",
                      }
        });

        const { sessionId } = await response.json() as {sessionId : string};

        const stripe = await getStripe();
        void stripe?.redirectToCheckout({ sessionId });
      }

      void fetchData();
    });
    
    return (
        //Return the loader
        <Loading />
    );
  }