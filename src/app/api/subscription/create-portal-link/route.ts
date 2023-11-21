import { stripe } from '@/utils/stripe';
import { createOrRetrieveCustomer } from '~/utils/stripe-admin';
import { getURL } from '~/utils/request';
import { currentUser } from "@clerk/nextjs";

export async function POST(req: Request) {
  if (req.method === 'POST') {
    try {
      const user = await currentUser();

      // 3. Retrieve or create the customer in Stripe
      const customer = await createOrRetrieveCustomer({
        uuid: user?.id || '',
        email: user?.emailAddresses[0]?.emailAddress || ''
      });

      console.log(customer, "customer");

      if (!customer) throw Error('Could not get customer');
      const { url } = await stripe.billingPortal.sessions.create({
        customer,
        return_url: `${getURL()}/account`
      });
      return new Response(JSON.stringify({ url }), {
        status: 200
      });
    } catch (err) {
      console.log(err);
      return new Response(
        JSON.stringify({ error: { statusCode: 500, message: "error" } }),
        {
          status: 500
        }
      );
    }
  } else {
    return new Response('Method Not Allowed', {
      headers: { Allow: 'POST' },
      status: 405
    });
  }
}
