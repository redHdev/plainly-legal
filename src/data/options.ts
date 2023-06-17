"use server";
import type { TermsOfService } from "@prisma/client";

import { prisma } from "~/utils/prisma";
import { type KeyedOptions } from "~/types/options";

// Get TOS
export async function getTOS(): Promise<TermsOfService | null> {
    //Also get the most recent Terms of Service agreement
    const latestTermsOfServiceAgreement = await prisma.termsOfService.findFirst({
      orderBy: {
        version: 'desc',
      },
    });

    if(!latestTermsOfServiceAgreement) throw new Error('No Terms of Service agreement found');

    return latestTermsOfServiceAgreement;
}


// Get Agreements - Returns all agreements or null if none exist
export async function getOptions(): Promise<KeyedOptions | null> {
  const tos = await getTOS();

  // If there is no TOS, return null
  if (!tos) return null;

  const options = await prisma.options.findMany();

  // Create an array with the keys and values
  const optionsFormatted = options.reduce((acc: KeyedOptions, meta) => {
    // Otherwise, just return the value as a string
    acc[meta.key] = meta.value;
    return acc;
  }, {});

  // Add the TOS to the options
  optionsFormatted.termsOfService = tos;

  return optionsFormatted;
}

export default getOptions;