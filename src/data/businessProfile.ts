'use server';
import { type BusinessProfile } from "@prisma/client";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "~/utils/prisma";

// Get BusinessProfile - Returns BusinessProfile or null if none exist
export async function getUsersBusinessProfile(userId: string | null = null): Promise<BusinessProfile | null> {
      
  try {

    // If no userId is passed, get the current user
    if(!userId){
      const user = await currentUser();
      userId = user?.id || null;
    }

    if (!userId) return null;

    const businessProfile = await prisma.businessProfile.findFirst({
      where: {
        userId: userId,
      },
    });
    return businessProfile;
  } catch (error) {
    console.error(error);
    return null;
  }
}

// Save BusinessProfile to the database using Prisma
export async function upsertBusinessProfile(data: BusinessProfile): Promise<BusinessProfile | null> {
  const user = await currentUser();
  if (!user) return null;

  try {
    const businessProfile = {
      ...data,
      userId: user.id,
      disclaimersIncluded: data.disclaimersIncluded !== null ? data.disclaimersIncluded as string[] : undefined,
    };
    
    const alreadyBusinessProfile = await prisma.businessProfile.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (alreadyBusinessProfile) {
      //confirm that buis
      const businessSaved: BusinessProfile = await prisma.businessProfile.update({
        where: {
          id: alreadyBusinessProfile.id,
        },
        data: businessProfile,
      });
      return businessSaved;
    } else {

      const businessSaved: BusinessProfile = await prisma.businessProfile.create({
        data: businessProfile,
      });
      return businessSaved;
    }
  } catch (error) {
    console.error("Error saving agreement:", error);
    throw error;
  }
}
