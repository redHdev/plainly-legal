import { type BusinessProfile } from "@prisma/client";
import { currentUser } from "@clerk/nextjs";
import { prisma } from "~/utils/prisma";

// Get BusinessProfile - Returns BusinessProfile or null if none exist
export async function getUsersBusinessProfile(): Promise<BusinessProfile[] | null> {
  const user = await currentUser();
  if (!user) return null;

  try {
    const businessProfile = await prisma.businessProfile.findMany({
      where: {
        userId: user.id,
      },
    });
    return businessProfile;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

// Save BusinessProfile to the database using Prisma
export async function createBusinessProfile(data: BusinessProfile): Promise<BusinessProfile | null> {
  const user = await currentUser();
  if (!user) return null;

  try {

    const businessProfile = {
      userId: user.id,
      businessName: data.businessName,
      ownerName: data.ownerName,
      signerName: data.signerName,
      addressOne: data.addressOne,
      addressTwo: data?.addressTwo??"",
      city: data.city,
      state: data.state,
      zip: data.zip,
      website: data.website,
      choiceOfLaw: data.choiceOfLaw,
      choiceOfForum: data?.choiceOfForum??"Arbitration",
      enableFee: data.enableFee,
    };
    
    const alreadyBusinessProfile = await prisma.businessProfile.findMany({
      where: {
        userId: user.id,
      },
    });

    if (alreadyBusinessProfile && alreadyBusinessProfile.length > 0) {
      const businessSaved: BusinessProfile = await prisma.businessProfile.update({
        where: {
          id: alreadyBusinessProfile[0].id,
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
  } finally {
    await prisma.$disconnect();
  }
}

// Update businessProfile to the database using Prisma
export async function updateBusinessProfile(
  businessId: string,
  data: BusinessProfile
): Promise<BusinessProfile | null> {
  const user = await currentUser();
  if (!user) return null;

  if (!businessId) throw new Error("BusinessProfile ID is required.");

  const businessProfile = {
    userId: user.id,
    businessName: data.businessName,
    ownerName: data.ownerName,
    signerName: data.signerName,
    addressOne: data.addressOne,
    addressTwo: data?.addressTwo??"",
    city: data.city,
    state: data.state,
    zip: data.zip,
    website: data.website,
    choiceOfLaw: data.choiceOfLaw,
    choiceOfForum: data?.choiceOfForum??"Arbitration",
    enableFee: data.enableFee,
  };

  try {
    const businessSaved: BusinessProfile = await prisma.businessProfile.update({
      where: {
        id: businessId,
      },
      data: businessProfile,
    });
    return businessSaved;
  } catch (error) {
    console.error("Error saving agreement:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
