"use server";

import { auth } from "@clerk/nextjs";
import type { UserTermsOfServiceAcceptance } from "@prisma/client";
import { z } from "zod";

import { prisma } from "~/utils/prisma";
import { action } from "~/utils/safe-action";

// If we want to validate the input, we can use Zod. However, it requires redefining the input type using zod's schema.
export const actionSaveTOS = action(
  z.object({
    id: z.string(),
  }),
  async (input) => {
    const { userId } = auth();
    if (!userId) return null;

    const newData: UserTermsOfServiceAcceptance =
      await prisma.userTermsOfServiceAcceptance.create({
        data: {
          userId: userId,
          termsOfService: {
            connect: {
              id: input.id,
            },
          },
        },
        include: {
          termsOfService: true,
        },
      });

    return newData;
  },
);
