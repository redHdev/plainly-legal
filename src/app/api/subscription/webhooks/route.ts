import type Stripe from 'stripe';
import { stripe } from '@/utils/stripe';
import {
  manageSubscriptionStatusChange,
  upsertProductRecord,
  upsertPriceRecord,
  createNewUser,
  deletePriceRecord,
  deleteSubscriptionStatus
} from '~/utils/stripe-admin';
import { headers } from 'next/headers';

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'price.deleted',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted'
]);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = headers().get('Stripe-Signature') as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  console.log('webhookSecret', webhookSecret);

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.log(`❌ Error message:`, err);
    return new Response(`Webhook Error`, { status: 400 });
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'product.created':
          await upsertProductRecord(event.data.object);
          break;
        case 'product.updated':
          await upsertProductRecord(event.data.object);
          break;
        case 'price.created':
        case 'price.updated':
          await upsertPriceRecord(event.data.object);
          break;
        case 'price.deleted':
          await deletePriceRecord(event.data.object);
        case 'customer.subscription.created':
          console.log('customer.subscription.created', event.type);
          const subscriptionCreate = event.data.object as Stripe.Subscription;
          await manageSubscriptionStatusChange(
            subscriptionCreate.id,
            subscriptionCreate.customer as string,
            true
          );
          break;
        case 'customer.subscription.updated':
          console.log('customer.subscription.updated', event.type);
          const subscription = event.data.object;
          await manageSubscriptionStatusChange(
            subscription.id,
            subscription.customer as string,
            event.type === 'customer.subscription.updated'
          );
          break;
        case 'customer.subscription.deleted':
          console.log('customer.subscription.deleted', event.type);
          const subscriptionDelete = event.data.object;
          await deleteSubscriptionStatus(
            subscriptionDelete.id,
            subscriptionDelete.customer as string
          );
          break;
        case 'checkout.session.completed':
          console.log('checkout.session.complete', event.type);
          const checkoutSession = event.data.object;
          console.log(checkoutSession.custom_fields[0]?.text?.value, "custom_detail");
          if (checkoutSession.mode === 'subscription') {
            const subscriptionId = checkoutSession.subscription;
            await createNewUser(
              checkoutSession.customer_details?.email as string, 
              checkoutSession.custom_fields[0]?.text?.value as string, 
              checkoutSession.custom_fields[1]?.text?.value as string,
              checkoutSession.customer as string,
              subscriptionId as string,
              );
          }
          break;
        default:
          throw new Error('Unhandled relevant event!');
      }
    } catch (error) {
      console.log(error);
      return new Response(
        'Webhook handler failed. View your nextjs function logs.',
        {
          status: 400
        }
      );
    }
  }
  return new Response(JSON.stringify({ received: true }));
}
