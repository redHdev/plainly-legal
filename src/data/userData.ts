"use server";
import type { UserMeta, UserTermsOfServiceAcceptance, Subscription } from "@prisma/client";
import { currentUser } from "@clerk/nextjs";

import { prisma } from "~/utils/prisma";
import { type KeyedUserMeta } from "~/types/user";
import { getUsersBusinessProfile } from "./businessProfile";
import { formatUserMeta } from "~/utils/formatUserMeta";

// Get Agreements - Returns all agreements or null if none exist
export async function getUserMetaRaw(userId: string | null = null): Promise<UserMeta[] | null> {

  try {

    // If no userId is passed, get the current user
    if(!userId){
      const user = await currentUser();
      userId = user?.id || null;
    }

    if (!userId) return null;

    const userMeta = await prisma.userMeta.findMany({
      where: {
        userId: userId,
      },
    });

    return userMeta;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Get all TOS acceptance agreements for a user
export async function getUserTOSAcceptance(userId: string | null = null): Promise<UserTermsOfServiceAcceptance[] | null> {
  try {

    // If no userId is passed, get the current user
    if(!userId){
      const user = await currentUser();
      userId = user?.id || null;
    }

    if (!userId) return null;

    const userTOS = await prisma.userTermsOfServiceAcceptance.findMany({
      where: {
        userId: userId,
      },
      include: {
        termsOfService: true,
      },
    });

    return userTOS;
  } catch (error) {
    console.error(error);
    return null;
  }
}

//GET Subscription status for a use
export async function getSubscription(userId: string | null = null): Promise<Subscription | null> {

  try{

    // If no userId is passed, get the current user
    if(!userId){
      const user = await currentUser();
      userId = user?.id || null;
    }

    if (!userId) return null;

    const userSubscription = await prisma.subscription.findFirst({
      where: {
        userId: userId,
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


// Get Agreements - Returns all agreements or null if none exist
export default async function getUserMeta(userId: string | null = null, type: 'full' | 'limited' = 'full'): Promise<KeyedUserMeta | null> {

  const userMeta = await getUserMetaRaw(userId);
  const userSubscription = await getSubscription(userId);
  const userTOS = type === 'full' ? await getUserTOSAcceptance(userId) : null;
  const userBusinessProfile = type === 'full' ? await getUsersBusinessProfile(userId) : null;

  if (!userMeta) return null;

  // Create an array with the keys and values
  const userMetaFormatted = formatUserMeta(userMeta);

  // Add the Additional User Meta from the other tables
  userMetaFormatted.termsOfServiceAcceptance = userTOS || null;
  userMetaFormatted.businessProfile = userBusinessProfile || null;
  userMetaFormatted.subscription = userSubscription || null;

  return userMetaFormatted;
}
