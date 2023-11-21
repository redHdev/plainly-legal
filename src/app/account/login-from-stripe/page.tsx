"use client";

import { useSignIn } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { SpinnerLoader } from "~/components/ui/loaders/Loaders";
import { getURL } from '~/utils/request';
import { useRouter } from 'next/navigation'

export default function SignInStep() {
    const { isLoaded, signIn } = useSignIn();
    const [ requestingEmailLink, setRequestingEmailLink ] = useState(false);
    const router = useRouter()

    //Get either the base site url, or the url from the request
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? getURL();

    //Run an effect to trigger the login process when the component is loaded and only on the frontend when we have access to the window object
    useEffect(() => {

        //Get the session_id from the url
        const urlParams = new URLSearchParams(window.location.search);
        const email = decodeURIComponent(urlParams.get('email') ?? '');

        //If the session_id is not present, redirect to the home page
        if(!email) throw new Error('A email GET url param is required to login from Stripe Checkout');

        //If the clerk session isn't loaded yet, or we are already requesting an email link, don't do anything
        if (!isLoaded || requestingEmailLink) return;

        //If the user is already signed in, redirect them to the home page
        if (signIn.status === 'complete') window.location.href = window.location.origin;

        //Create an async function to trigger the clerk session creation and send an email link
        const triggerLoginProcess = async () => {

            //Set the requesting email link state to true so we don't trigger this again
            setRequestingEmailLink(true);


            try{

                //Create the clerk session and send the email link
                console.log('sending email');
                await signIn.create({
                    identifier: email,
                });

            }catch(e){
                throw new Error('Could not find the user that is trying to login, please contact support at support@plainlylegal.com');
            }

            //push the user to the next step in the login process that shows the loading screen
            router.push("/account/login#/factor-one?redirect_url=/account/onboard")


        };

        void triggerLoginProcess();

    }, [isLoaded, signIn, requestingEmailLink, baseUrl, router]);

    return <SpinnerLoader/>;
}
