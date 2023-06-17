import { type Contracts } from "@prisma/client";

import { prisma } from "~/utils/prisma";
import { type FullContracts } from "~/types/contracts";

// Revise the below code for caching on production using the method stated in Next 13's docs
// https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#segment-cache-configuration

//Get Agreements - Returns all agreements or null if none exist
export async function getAgreements(): Promise<Contracts[] | null> {
  try {
    const contracts = await prisma.contracts.findMany({
      // // Commented out for now - not required at this moment
      // include: {
      //   contractQuestions: true,
      //   clauses: true,
      // },
    });

    return contracts;
  } catch (error) {
    // console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getAgreement(
  identifier: number | string
): Promise<FullContracts | null> {
  //If id is a string, get by slug, otherwise get by id

  const whereType = typeof identifier === "string" ? "slug" : "id";

  try {
    const contract = await prisma.contracts.findUnique({
      where: {
        [whereType]: identifier,
      },
      include: {
        clauses: {
          include: {
            clauseConditionals: true,
            questions: true,
          },
        },
        contractQuestions: {
          include: {
            conditionals: true,
          },
        },
      },
    });

    // Ensure contract is not null
    if (!contract) return null;

    // Confirm that the clause order is not null and a json array
    if (!Array.isArray(contract?.clauseOrder)) {
      throw new Error("Clause order is not a JSON array.");
    }

    const clauseOrder = contract.clauseOrder;

    const sortedClauses = contract.clauses.sort(
      (a, b) => clauseOrder?.indexOf(a.key) - clauseOrder?.indexOf(b.key) || 0
    );

    return {
      ...contract,
      clauses: sortedClauses,
    };
  } catch (error) {
    // console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export default getAgreements;
