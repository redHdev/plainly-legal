import { loadStripe } from '@stripe/stripe-js';

export const getStripe = async () => {

  let stripePromise;

  if (!stripePromise) {
    stripePromise = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ??
          process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
          ''
      );
  }
  
  return stripePromise;

  // const stripePromise = await loadStripe(
  //   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE ??
  //     process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ??
  //     ''
  // );

  // return stripePromise;

};
