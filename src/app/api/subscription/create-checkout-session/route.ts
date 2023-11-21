import { currentUser } from "@clerk/nextjs";
import { stripe } from '@/utils/stripe';
import { createOrRetrieveCustomer } from '~/utils/stripe-admin';
import { getURL } from '~/utils/request';
import { type Product, type Prices } from "@prisma/client";
import { type MetadataParam } from "@stripe/stripe-js";

export async function POST(req: Request) {
    if ( req.method !== 'POST' ) return new Response('Method Not Allowed', { headers: { Allow: 'POST' }, status: 405 });

    //Get the base site url
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    // 1. Destructure the price and quantity from the POST body
    const { price, quantity = 1, metadata = {} } = await req.json() as {product : Product, price: Prices, quantity : number, metadata : MetadataParam};

    // 2. Get the user from Clerk auth
    const user = await currentUser();

    // 3. Retrieve or create the customer in Stripe
    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || '',
      email: user?.emailAddresses[0]?.emailAddress || ''
    });

    //Get the correct place to send the user after they have paid depending on if they already have an account, or if they are a new user
    const success_url = user?.id ? `${baseUrl}/account` : `${baseUrl}/account/login-from-stripe?customer_id=${customer}`;

    if(!customer) throw new Error("Stripe customer could not be found nor created");

    // 4. Create a checkout session in Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      customer,
      customer_update: { address: 'auto' },
      line_items: [
        {
          price: price.priceId,
          quantity,
        }
      ],
      mode: 'subscription',
      allow_promotion_codes: true,
      subscription_data: {
        metadata
      },
      success_url,
      cancel_url: `${getURL()}/`,
      custom_fields: !user?.id ? [
        {
          key: 'firstname',
          label: {
            type: 'custom',
            custom: 'First Name',
          },
          type: 'text',
          optional: false,
        },
        {
          key: 'lastname',
          label: {
            type: 'custom',
            custom: 'Last Name',
          },
          type: 'text',
          optional: false,
        },
      ] : undefined,
    });


    // If we have a successful session, return the session ID
    if (session) return new Response(JSON.stringify({ sessionId: session.id }), { status: 200 });


    //If all else fails, return a 500 error
    return new Response( JSON.stringify({ error: { statusCode: 500, message: 'Session could not be defined' } }), { status: 500 } );

}

