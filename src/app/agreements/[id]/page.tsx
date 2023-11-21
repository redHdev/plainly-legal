import { getAgreement } from "~/data/agreements";
import { type FullContracts } from "~/types/contracts";
import { currentUser } from "@clerk/nextjs";
import { type User } from "@clerk/nextjs/dist/types/server";
import { getSavedAgreement } from "~/data/savedAgreements";
import { type SavedAgreements } from "@prisma/client";
import ConductAgreement from "~/components/agreements/ConductAgreement";

const defaultErrorText =
  "Could not continue with the agreement. Please try again later.";

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
  )
    throw new Error(defaultErrorText);

  //If we have no savedAgreement, throw an error
  const fetchedUserAgreement = (await getSavedAgreement(
    params.id,
  )) as SavedAgreements;

  // If there is no user, throw an error
  const user = (await currentUser()) as User;

  const contract = (await getAgreement(
    fetchedUserAgreement.agreement,
  )) as FullContracts;

  return (
    <section
      id="content"
      className="flex-grow py-0 print:block print:flex-none"
    >
      <ConductAgreement
        agreement={contract}
        userId={user?.id}
        savedAgreement={fetchedUserAgreement}
      />
    </section>
  );
}
