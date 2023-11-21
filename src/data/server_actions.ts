"use server";

import { type Prisma } from "@prisma/client";
import { z } from "zod";
import {
  type SavedAgreements,
  SavedAgreementsCreateInputSchema,
} from "prisma/generated/zod";

import { action } from "~/utils/safe-action";

import {
  getSavedAgreement,
  createSavedAgreement,
  updateSavedAgreement,
  deleteSavedAgreement,
  archiveSavedAgreement,
} from "~/data/savedAgreements";

// If we want to validate the input, we can use Zod. However, it requires redefining the input type using zod's schema.

// In Zod, create a schema for the input that is reflective of Prisma.SavedAgreementsCreateInput
// Previously zactUpsertAgreement
export const actionUpsertAgreement = action(
  SavedAgreementsCreateInputSchema,
  async (input) => {
    // Either Creates or Updates the SavedAgreement
    try {
      const newData: SavedAgreements | false =
        input.id != "" && input.id != undefined
          ? await updateSavedAgreement(input.id, input)
          : await createSavedAgreement(input);
      return { message: newData };
    } catch (error) {
      throw new Error("Something went wrong when saving data to the database.");
    }
  },
);

// Rename the agreement
// Previously zactRenameSavedAgreement
export const actionRenameSavedAgreement = action(
  z.object({
    agreementId: z.string(),
    new_name: z.string().min(4),
  }),
  async (input) => {
    console.log("[SERVER ACTION] - Received Input:", input);

    const agreementData = (await getSavedAgreement(
      input.agreementId,
    )) as Prisma.SavedAgreementsCreateInput;

    if (!agreementData || agreementData == null || agreementData.id == null)
      throw new Error("Agreement not found.");

    agreementData.user_defined_name = input.new_name;

    const freshAgreementData = await updateSavedAgreement(
      agreementData.id,
      agreementData,
    );

    return {
      status: "success",
      message: freshAgreementData,
    };
  },
);

// Create a duplicate of the agreement
// Previously zactDuplicateSavedAgreement
export const actionDuplicateSavedAgreement = action(
  z.object({
    agreementId: z.string(),
    new_name: z.string().min(4),
  }),
  async (input) => {
    console.log("[SERVER ACTION] - Received Input:", input);

    const agreementData = (await getSavedAgreement(
      input.agreementId,
    )) as Prisma.SavedAgreementsCreateInput;

    if (!agreementData || agreementData == null || agreementData.id == null)
      throw new Error("Agreement not found.");

    //Remove the data that's unique and add the new names
    agreementData.id = undefined;
    agreementData.user_defined_name = input.new_name;
    agreementData.completedClauses = {};
    agreementData.completed = false;
    agreementData.text = null;
    agreementData.createdAt = new Date();

    const freshAgreementData = await createSavedAgreement(agreementData);

    return {
      status: "success",
      message: freshAgreementData,
    };
  },
);

// Move the agreement back to edit state
// Previously zactEditSavedAgreement
export const actionEditSavedAgreement = action(
  z.object({
    agreementId: z.string(),
  }),
  async (input) => {
    console.log("[SERVER ACTION] - Received Input:", input);

    const agreementData = (await getSavedAgreement(
      input.agreementId,
    )) as Prisma.SavedAgreementsCreateInput;

    if (!agreementData || agreementData == null || agreementData.id == null)
      throw new Error("Agreement not found.");

    //Remove the data that's unique and add the new names
    agreementData.completedClauses = {};
    agreementData.completed = false;
    agreementData.text = null;

    const freshAgreementData = await updateSavedAgreement(
      agreementData.id,
      agreementData,
    );

    return {
      status: "success",
      message: freshAgreementData,
    };
  },
);

// Previously zactDeleteSavedAgreement
export const actionDeleteSavedAgreement = action(
  z.object({
    agreementId: z.string(),
  }),
  async (input) => {
    console.log("[SERVER ACTION] - Received SavedAgreement ID:", input);

    if (!input.agreementId || input.agreementId == null)
      throw new Error("Agreement not found.");

    const agreementDeleted = await deleteSavedAgreement(input.agreementId);

    return {
      message: agreementDeleted,
    };
  },
);

export const actionArchiveSavedAgreement = action(
  z.object({
    agreementId: z.string(),
  }),
  async (input) => {
    console.log("[SERVER ACTION] - Received SavedAgreement ID:", input);

    if (!input.agreementId || input.agreementId == null)
      throw new Error("Agreement not found.");

    const agreementDeleted = await archiveSavedAgreement(input.agreementId);

    return {
      message: agreementDeleted,
    };
  },
);
