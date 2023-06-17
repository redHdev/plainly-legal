'use server'
import { auth } from '@clerk/nextjs';
import type { UserTermsOfServiceAcceptance } from "@prisma/client";
import { prisma } from "~/utils/prisma";
import type { saveTOSInput } from "~/types/user";
import { zact } from 'zact/server';

// If we want to validate the input, we can use Zod. However, it requires redefining the input type using zod's schema.
export const zactSaveTOS = zact()(
    async (input: saveTOSInput) => {

      const { userId } = auth();
      if (!userId) return null;

      const newData: UserTermsOfServiceAcceptance = await prisma.userTermsOfServiceAcceptance.create({
        data: {
          userId: userId,
          ...input
        }
      });

      return newData;
    }
  );
