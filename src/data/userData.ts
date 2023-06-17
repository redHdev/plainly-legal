"use server";
import type { UserMeta, UserTermsOfServiceAcceptance } from "@prisma/client";
import { currentUser } from "@clerk/nextjs";

import { prisma } from "~/utils/prisma";
import { type KeyedUserMeta } from "~/types/user";

// Get Agreements - Returns all agreements or null if none exist
export async function getUserMetaRaw(): Promise<UserMeta[] | null> {
  try {
    const user = await currentUser();
    if (!user) return null;

    const userMeta = await prisma.userMeta.findMany({
      where: {
        userId: user.id,
      },
    });

    return userMeta;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

// Get all TOS acceptance agreements for a user
export async function getUserTOSAcceptance(): Promise<UserTermsOfServiceAcceptance[] | null> {
  try {
    const user = await currentUser();
    if (!user) return null;

    const userTOS = await prisma.userTermsOfServiceAcceptance.findMany({
      where: {
        userId: user.id,
      },
      include: {
        termsOfService: true,
      },
    });

    return userTOS;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}


// Get Agreements - Returns all agreements or null if none exist
export async function getUserMeta(): Promise<KeyedUserMeta | null> {

  const userMeta = await getUserMetaRaw();
  const userTOS = await getUserTOSAcceptance();

  if (!userMeta) return null;

  // Create an array with the keys and values
  const userMetaFormatted = userMeta.reduce((acc: KeyedUserMeta, meta) => {

    // If the value string is a number, convert it to a number
    if (!isNaN(Number(meta.value))) {
      acc[meta.key] = Number(meta.value);
      return acc;
    }

    // If the value string is a boolean, convert it to a boolean
    if (meta.value === 'true') {
      acc[meta.key] = true;
      return acc;
    }

    // Otherwise, just return the value as a string
    acc[meta.key] = meta.value;
    return acc;
  }, {});

  // Add the TOS to the options
  userMetaFormatted.termsOfServiceAcceptance = userTOS || [];
  // userMetaFormatted.userID = user.id;

  return userMetaFormatted;
}

export default getUserMeta;