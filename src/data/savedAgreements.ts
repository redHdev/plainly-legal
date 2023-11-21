import { type Prisma, type SavedAgreements } from "@prisma/client";
import { currentUser } from "@clerk/nextjs";

import { prisma } from "~/utils/prisma";
import { type LiteSavedAgreements } from "~/types/agreements";

// Get Agreements - Returns all agreements or null if none exist
export async function getSavedAgreements(): Promise<SavedAgreements[] | null> {
  try {
    const savedAgreements = await prisma.savedAgreements.findMany({});

    return savedAgreements;
  } catch (error) {
    // console.error(error);
    return null;
  }
}

// Get Agreements - Returns all agreements or null if none exist
export async function getUsersSavedAgreements(): Promise<
  SavedAgreements[] | null
> {
  const user = await currentUser();
  if (!user) return null;

  try {
    //start a clock to time the query
    const start = new Date();
    const savedAgreements = await prisma.savedAgreements.findMany({
      where: {
        user_id: user.id,
        archived: false,
      },
      select: { 
        id: true,
        user_id: true,
        archived: true,
        createdAt: true,
        updatedAt: true,
        completed: true,
        user_defined_name: true,
        agreement: true,
        data_questions: true,
        data_clause_answers: true,
      },
      orderBy: {
        updatedAt: "desc",
      },
    }) as LiteSavedAgreements[];
    const end = new Date();
    const time = end.getTime() - start.getTime();
    console.log("Query time: ", time);

    return savedAgreements;
  } catch (error) {
    // console.error(error);
    return null;
  }
}

// Get a single agreement by ID
export async function getSavedAgreement(
  agreementId: string,
  ignoreUserPermissions?: boolean
): Promise<SavedAgreements | null> {
  if (!agreementId) throw new Error("Agreement ID is required.");
  try {
    const agreement: SavedAgreements | null =
      await prisma.savedAgreements.findUnique({
        //Find where the id is equal to the agreementId and is not archived
        where: {
          id: agreementId,
        },
      });

    //Confirm that the agreement is not archived
    if (agreement?.archived === true) return null;

    //Confirm that the current user is the owner of the agreement
    if (ignoreUserPermissions === true) return agreement;

    const user = await currentUser();
    if (!user) return null;
    if (agreement?.user_id === user.id) return agreement;

    // Otherwise, return null
    return null;
  } catch (error) {
    console.error("getSavedAgreement() ERROR: ", error);
    throw error;
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
    console.error("createSavedAgreement() ERROR: ", error);
    throw error;
  }
}

// Save agreement to the database using Prisma
export async function updateSavedAgreement(
  agreementId: string,
  agreement: Prisma.SavedAgreementsUpdateInput
) {
  if (!agreementId) throw new Error("Agreement ID is required.");
  // NOTE::

  // // NEED TO RESTRICT USER TO ONLY UPDATE THEIR OWN AGREEMENTS
  // const user = await currentUser();
  // console.log(user?.id, agreement?.user_id);
  // if (agreement?.user_id != user?.id) {
  //   // throw Error("You do not have permission to update this agreement.");
  //   return false;
  // }

  // END NOTE.
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
    console.error("updateSavedAgreement() ERROR: ", error);
    throw error;
  }
}

// Delete a single agreement by ID
export async function deleteSavedAgreement(
  agreementId: string
): Promise<SavedAgreements | null> {
  if (!agreementId) throw new Error("Agreement ID is required.");
  try {
    const agreement: SavedAgreements | null =
      await prisma.savedAgreements.delete({
        where: {
          id: agreementId,
        },
      });
    return agreement;
  } catch (error) {
    console.error("deleteSavedAgreement() ERROR: ", error);
    throw error;
  }
}

// Archive a single agreement by ID
export async function archiveSavedAgreement(
  agreementId: string
): Promise<SavedAgreements | null> {
  if (!agreementId) throw new Error("Agreement ID is required.");
  try {
    const agreement: SavedAgreements | null =
      await prisma.savedAgreements.update({
        where: {
          id: agreementId,
        },
        data: {
          archived: true,
        },
      });
    return agreement;
  } catch (error) {
    console.error("deleteSavedAgreement() ERROR: ", error);
    throw error;
  }
}

// Default export
export default getSavedAgreements;
