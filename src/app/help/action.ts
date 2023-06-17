// action.ts
"use server";

import { type Contracts } from "@prisma/client";
import { z } from "zod";
import { zact } from "zact/server";
import getAgreements from "~/data/agreements";

export const validatedAction = zact(z.object({ stuff: z.string().min(6) }))(
  async () => {
    const contracts: Contracts[] | null = await getAgreements();
    if (!contracts) {
      return { message: "No contracts found" };
    }

    return { message: [contracts] };
  }
);
