import { getAgreement } from "~/data/agreements";
import { type FullContracts } from "~/types/contracts";
import { ContinueAgreement } from "~/components/agreements/ConductAgreement";
import { currentUser } from "@clerk/nextjs";
import { type User } from "@clerk/nextjs/dist/types/server";
import { getSavedAgreement } from "~/data/savedAgreements";
import { type SavedAgreements } from "@prisma/client";

const defaultErrorText = "Could not continue with the agreement. Please try again later.";

interface Params {
  [keys: string]: string;
}

export default async function Page({ params }: { params: Params }) {
  // check if params is null
  
  if (
    params === null ||
    typeof params !== "object" ||
    !params.hasOwnProperty("id") ||
    typeof params.id !== "string"
  ) {
    throw new Error(defaultErrorText);
  }


  //Get the savedAgreement based on the id
  const savedAgreement: SavedAgreements | null = await getSavedAgreement(params.id);
  //If we have no savedAgreement, throw an error
  if (!savedAgreement)
    throw new Error(defaultErrorText);


  const user: User | null = await currentUser();
  // If there is no user, throw an error
  if (!user || user == null)
    throw new Error("You must be logged in to view this page.");


  const contract: FullContracts | null = await getAgreement(savedAgreement.agreement);
  //If we have no contract, throw an error
  if (!contract)
    throw new Error(defaultErrorText);


  return (
    <ContinueAgreement contract={contract} user={user} savedAgreement={savedAgreement} />
  );
}
