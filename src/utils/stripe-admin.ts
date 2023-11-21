import { toDateTime } from './request';
import { stripe } from './stripe';
import type Stripe from 'stripe';
import { prisma } from "~/utils/prisma";

import { clerkClient } from '@clerk/nextjs';

clerkClient.__unstable_options.secretKey = process.env.CLERK_SECRET_KEY;

const createOrRetrieveCustomer = async ({
  email,
  uuid
}: {
  email: string;
  uuid: string;
}) => {
  
  try {
    
    const alreadyCustomer = await prisma.customer.findFirst({
      where: {
        uuId: uuid,
      },
    });

    if (alreadyCustomer) {
      //confirm that buis
      return alreadyCustomer.stripeCustomerId;
    } else {
      const customerData: { metadata: { supabaseUUID: string }; email?: string } =
      {
        metadata: {
          supabaseUUID: uuid
        }
      };
      if (email) customerData.email = email;
      const customerRes = await stripe.customers.create(customerData);

      const insertData = {
        uuId : uuid,
        email : email,
        stripeCustomerId : customerRes.id
      };
      await prisma.customer.create({
        data: insertData,
      });
      return customerRes.id;
    }
  } catch (error) {
    console.error("Error saving agreement:", error);
    throw error;
  }
};

const deleteSubscriptionStatus = async (
  subscriptionId: string,
  customerId: string,
) => {

  const customerData = await prisma.customer.findFirst({
    where: {
      stripeCustomerId: customerId,
    },
  });

  console.log(customerData, "customerData");

  const { uuId: uuId } = customerData!;

  console.log(uuId, "uuId");

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ['default_payment_method']
  });

  const alreadySubscription = await prisma.subscription.findFirst({
    where: {
      userId: uuId,
      subscriptionId : subscription.id
    },
  });

  if(alreadySubscription) {
    await prisma.subscription.delete({
      where: {
        id : alreadySubscription.id
      }
    });
  }
};

const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false
) => {

  console.log(createAction, "createAction");

  try{
    console.log("manageSubscriptionStatusChange Start");
  
    const customerData = await prisma.customer.findFirst({
      where: {
        stripeCustomerId: customerId,
      },
    });

    console.log(customerData, "customerData");
  
    const { uuId: uuId } = customerData!;

    console.log(uuId, "uuId");
  
    const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
      expand: ['default_payment_method']
    });

    // Upsert the latest status of the subscription object.
    const subscriptionData =
      {
        subscriptionId: subscription.id,
        userId: uuId,
        metaData: subscription.metadata,
        status: subscription.status,
        price: {
          priceId : subscription?.items?.data?.[0]?.price.id ?? "",
          amount: subscription?.items?.data?.[0]?.price.unit_amount ?? "",
          inerval: subscription?.items?.data?.[0]?.price?.recurring?.interval ?? ""
        },
        //TODO check quantity on subscription
        quantity: 1,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
        cancelAt: subscription.cancel_at
          ? toDateTime(subscription.cancel_at).toISOString()
          : "",
        canceledAt: subscription.canceled_at
          ? toDateTime(subscription.canceled_at).toISOString()
          : "",
        currentPeriodStart: toDateTime(
          subscription.current_period_start
        ).toISOString(),
        currentPeriodEnd: toDateTime(
          subscription.current_period_end
        ).toISOString(),
        created: toDateTime(subscription.created).toISOString(),
        endedAt: subscription.ended_at
          ? toDateTime(subscription.ended_at).toISOString()
          : "",
        trialStart: subscription.trial_start
          ? toDateTime(subscription.trial_start).toISOString()
          : "",
        trialEnd: subscription.trial_end
          ? toDateTime(subscription.trial_end).toISOString()
          : ""
      };

      const alreadySubscription = await prisma.subscription.findFirst({
        where: {
          userId: uuId,
          subscriptionId : subscription.id
        },
      });

      if(alreadySubscription){
        await prisma.subscription.update({
          where: {
            id : alreadySubscription.id
          },
          data: subscriptionData
        });
      }
      else{
        await prisma.subscription.create({
          data: subscriptionData,
        });
      }

  }
  catch(err) {
    console.error("Error saving subscription agreement:", err);
    throw err;
  }

  
};

const upsertProductRecord = async (product: Stripe.Product) => {

  const productData = {
    active: product.active,
    name: product.name,
    description: product.description ?? "",
    priceId: typeof product.default_price === "string" ? product.default_price : product.default_price?.id ?? "",
    productId : product.id
  };

  const alreadyExistProduct = await prisma.product.findFirst({
    where: {
      productId : product.id
    }
  });

  if(alreadyExistProduct){
    await prisma.product.update({
      where:{
        id : alreadyExistProduct.id
      },
      data : productData
    })
  }
  else{
    await prisma.product.create({
      data: productData
    });
  }
};

const upsertPriceRecord = async (price: Stripe.Price) => {

    //Get the id of the product based on the passed productId
    const product = await prisma.product.findFirst({
      where: {
        productId: typeof price.product === 'string' ? price.product : '',
      },
    });
  
    if (!product) throw new Error('A price was edited for a product that does not exist in the database.');

    
  const priceData = {
    priceId: price.id,
    productId: typeof price.product === 'string' ? price.product : '',
    active: price.active,
    currency: price.currency,
    unitAmount: price.unit_amount ?? 0,
    interval: price.recurring?.interval ?? "",
    products: {
      connect: {
        id: product.id,
      },
    },
  };

  const alreadyExistPrice = await prisma.prices.findFirst({
    where: {
      priceId : price.id
    }
  });

  if(alreadyExistPrice){
    await prisma.prices.update({
      where:{
        id : alreadyExistPrice.id
      },
      data : priceData
    })
  }
  else{
    await prisma.prices.create({
      data: priceData
    });
  }

};

const createNewUser = async (email: string, firstName : string, lastName : string, customerId : string, subscriptionId: string) => {

  console.log("---------createNewUser function Start----------");
  if (!email || typeof email !== 'string') {
    console.error("Email is required and should be a string.");
  }

  try {
    //------ Use the listUsers method and filter by email
    const emailAddress = [email];
    const users = await clerkClient.users.getUserList({
      emailAddress
    });
    
//------------------Validate if user is registered to our app-----------------
    if ( users.length > 0 ) {

        console.log("this user has already registered to our app");
        const currnetCustomer = await prisma.customer.findFirst({
          where: {
            stripeCustomerId : customerId
          }
        });
        console.log(users[0]?.id, "userId");
        if(currnetCustomer){

          const updateData = {
            ...currnetCustomer,
            uuId: users[0]?.id,
            email: email
          };

         await prisma.customer.update({
            where: {
              id: currnetCustomer.id,
            },
            data: updateData
          });
        }

        console.log("updateCustomer End");

        const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
          expand: ['default_payment_method']
        });
    
        // Upsert the latest status of the subscription object.
        const subscriptionData =
          {
            subscriptionId: subscription.id,
            userId: typeof users[0]?.id === "string" ? users[0]?.id : "",
            metaData: subscription.metadata,
            status: subscription.status,
            price: {
              priceId : subscription?.items?.data?.[0]?.price.id ?? "",
              amount: subscription?.items?.data?.[0]?.price.unit_amount ?? "",
              inerval: subscription?.items?.data?.[0]?.price?.recurring?.interval ?? ""
            },
            //TODO check quantity on subscription
            quantity: 1,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            cancelAt: subscription.cancel_at
              ? toDateTime(subscription.cancel_at).toISOString()
              : "",
            canceledAt: subscription.canceled_at
              ? toDateTime(subscription.canceled_at).toISOString()
              : "",
            currentPeriodStart: toDateTime(
              subscription.current_period_start
            ).toISOString(),
            currentPeriodEnd: toDateTime(
              subscription.current_period_end
            ).toISOString(),
            created: toDateTime(subscription.created).toISOString(),
            endedAt: subscription.ended_at
              ? toDateTime(subscription.ended_at).toISOString()
              : "",
            trialStart: subscription.trial_start
              ? toDateTime(subscription.trial_start).toISOString()
              : "",
            trialEnd: subscription.trial_end
              ? toDateTime(subscription.trial_end).toISOString()
              : ""
          };
    
          const alreadySubscription = await prisma.subscription.findFirst({
            where: {
              userId: users[0]?.id,
              subscriptionId : subscription.id
            },
          });
    
          if(alreadySubscription){
            await prisma.subscription.update({
              where: {
                id : alreadySubscription.id
              },
              data: subscriptionData
            });
          }
          else{
            await prisma.subscription.create({
              data: subscriptionData,
            });
          }
    } else {

      console.log("This user has not registered to our app");
      // ---------------------Create user start ----------------------
      try{
        
        const skipPasswordChecks = true;
        const skipPasswordRequirement = true;

        const newUser = await clerkClient.users.createUser({
          firstName,
          lastName,
          emailAddress,
          skipPasswordChecks,
          skipPasswordRequirement
        });

        //Immediatly give our new user the all-access role. We might adjust this in the future to give certain roles based on the subscription they purchased.
        await prisma.userMeta.upsert({
          where: {
            userId_key: {
              userId: newUser.id,
              key: "userRoles"
            },
          },
          create: {
            userId: newUser.id,
            key: "userRoles",
            value: "all-access"
          },
          update: {},
        });
      

        const currnetCustomer = await prisma.customer.findFirst({
          where: {
            stripeCustomerId : customerId
          }
        });

        if(currnetCustomer){
          const updateData = {
            ...currnetCustomer,
            uuId: newUser.id,
            email: email
          };

         await prisma.customer.update({
            where: {
              id: currnetCustomer.id,
            },
            data: updateData
          });
        }

        console.log("updateCustomer End");

        const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
          expand: ['default_payment_method']
        });
    
        // Upsert the latest status of the subscription object.
        const subscriptionData =
          {
            subscriptionId: subscription.id,
            userId: newUser.id,
            metaData: subscription.metadata,
            status: subscription.status,
            price: {
              priceId : subscription?.items?.data?.[0]?.price.id ?? "",
              amount: subscription?.items?.data?.[0]?.price.unit_amount ?? "",
              inerval: subscription?.items?.data?.[0]?.price?.recurring?.interval ?? ""
            },
            //TODO check quantity on subscription
            quantity: 1,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            cancelAt: subscription.cancel_at
              ? toDateTime(subscription.cancel_at).toISOString()
              : "",
            canceledAt: subscription.canceled_at
              ? toDateTime(subscription.canceled_at).toISOString()
              : "",
            currentPeriodStart: toDateTime(
              subscription.current_period_start
            ).toISOString(),
            currentPeriodEnd: toDateTime(
              subscription.current_period_end
            ).toISOString(),
            created: toDateTime(subscription.created).toISOString(),
            endedAt: subscription.ended_at
              ? toDateTime(subscription.ended_at).toISOString()
              : "",
            trialStart: subscription.trial_start
              ? toDateTime(subscription.trial_start).toISOString()
              : "",
            trialEnd: subscription.trial_end
              ? toDateTime(subscription.trial_end).toISOString()
              : ""
          };
    
          const alreadySubscription = await prisma.subscription.findFirst({
            where: {
              userId: newUser.id,
              subscriptionId : subscription.id
            },
          });
    
          if(alreadySubscription){
            await prisma.subscription.update({
              where: {
                id : alreadySubscription.id
              },
              data: subscriptionData
            });
          }
          else{
            await prisma.subscription.create({
              data: subscriptionData,
            });
          }
      }
      catch(error){
        console.error("Error saving subscription agreement:", error);
        throw error;
      }
    }
  } catch (error) {
    console.error("Error saving subscription agreement:", error);
    throw error;
  }
  console.log("---------createNewUser function End----------");
}


const deletePriceRecord = async (price: Stripe.Price) => {
  const alreadyExistPrice = await prisma.prices.findFirst({
    where: {
      priceId : price.id
    }
  });

  if(alreadyExistPrice){
    await prisma.prices.delete({
      where:{
        id : alreadyExistPrice.id
      }
    })
  }
};


export {
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange,
  upsertProductRecord,
  upsertPriceRecord,
  createNewUser,
  deletePriceRecord,
  deleteSubscriptionStatus
};
