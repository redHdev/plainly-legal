'use server';
import { type Product, type Subscription, type Customer } from "@prisma/client";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "~/utils/prisma";

// Get ProductList - Returns BusinessProfile or null if none exist
export async function getProduct(): Promise<Product[] | null> {

  try {
    const product = await prisma.product.findMany({
      include: {
        price: true
      }
    });
    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
}

//GET Subscription status for a use
export async function getSubscription(): Promise<Subscription | null> {

  try{
    const user = await currentUser();
    if (!user) return null;

    const userSubscription = await prisma.subscription.findFirst({
      where: {
        userId: user.id,
        status: "active",
        cancelAtPeriodEnd: false
      },
    });

    return userSubscription;
     
  }
  catch(error) {
    console.error(error);
    return null;
  }
}

export async function getCustomer(customerId : string): Promise<Customer | null>{

  try{
    const customer = prisma.customer.findFirst({
      where:{
        stripeCustomerId : customerId
      }
    });

    return customer;
  }
  catch(error){
    console.log(error);
    return null;
  }
}

