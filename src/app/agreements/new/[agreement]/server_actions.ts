"use server";

import { type Prisma, type SavedAgreements } from "@prisma/client";
// import { z } from "zod";
import { zact } from "zact/server";
import {
  createSavedAgreement,
  updateSavedAgreement,
} from "~/data/savedAgreements";

// If we want to validate the input, we can use Zod. However, it requires redefining the input type using zod's schema.
export const zactUpsertAgreement = zact()(
  async (input: Prisma.SavedAgreementsCreateInput) => {
    // Either Creates or Updates the SavedAgreement
    try {
      const newData: SavedAgreements =
        input.id != "" && input.id != undefined
          ? await updateSavedAgreement(input.id, input)
          : await createSavedAgreement(input);
      return { message: newData };
    } catch (error) {
      throw new Error("Something went wrong when saving data to the database.");
    }
  }
);
