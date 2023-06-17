import { type Prisma, type SavedAgreements } from "@prisma/client";
import { currentUser } from "@clerk/nextjs";

import { prisma } from "~/utils/prisma";

// Get Agreements - Returns all agreements or null if none exist
export async function getSavedAgreements(): Promise<SavedAgreements[] | null> {
  try {
    const savedAgreements = await prisma.savedAgreements.findMany({});

    return savedAgreements;
  } catch (error) {
    // console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

// Get Agreements - Returns all agreements or null if none exist
export async function getUsersSavedAgreements(): Promise<
  SavedAgreements[] | null
> {
  const user = await currentUser();
  if (!user) return null;

  try {
    const savedAgreements = await prisma.savedAgreements.findMany({
      where: {
        user_id: user.id,
      },
      orderBy: {
        updatedAt: 'desc'
      }
    });

    return savedAgreements;
  } catch (error) {
    // console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

// Save agreement to the database using Prisma
export async function createSavedAgreement(
  agreement: Prisma.SavedAgreementsCreateInput
) {
  try {
    const agreementSaved: SavedAgreements = await prisma.savedAgreements.create(
      {
        data: agreement,
      }
    );
    return agreementSaved;
  } catch (error) {
    console.error("Error saving agreement:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Save agreement to the database using Prisma
export async function updateSavedAgreement(
  agreementId: string,
  agreement: Prisma.SavedAgreementsUpdateInput
) {
  if (!agreementId) throw new Error("Agreement ID is required.");
  try {
    const agreementSaved: SavedAgreements = await prisma.savedAgreements.update(
      {
        where: {
          id: agreementId,
        },
        data: agreement,
      }
    );
    return agreementSaved;
  } catch (error) {
    console.error("Error saving agreement:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

//Get a single agreement by ID
export async function getSavedAgreement(
  agreementId: string
): Promise<SavedAgreements | null> {
  if (!agreementId) throw new Error("Agreement ID is required.");
  try {
    const agreement: SavedAgreements | null = await prisma.savedAgreements.findUnique({
      where: {
        id: agreementId,
      },
    });
    return agreement;
  } catch (error) {
    console.error("Error getting agreement:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
export default getSavedAgreements;
