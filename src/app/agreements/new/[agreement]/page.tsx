import { getAgreement } from "~/data/agreements";
import { type FullContracts } from "~/types/contracts";
import NewAgreement from "~/components/agreements/ConductAgreement";
import { currentUser } from "@clerk/nextjs";
import { type User } from "@clerk/nextjs/dist/types/server";

const defaultErrorText = "Something went wrong. Please try again later.";

interface Params {
  [keys: string]: string;
}

export default async function Page({ params }: { params: Params }) {
  // check if params is null
  if (
    params === null ||
    typeof params !== "object" ||
    !params.hasOwnProperty("agreement") ||
    typeof params.agreement !== "string"
  ) {
    throw new Error(defaultErrorText);
  }

  const user: User | null = await currentUser();
  const contract: FullContracts | null = await getAgreement(params.agreement);

  //If we have no contract, throw an error
  if (!contract)
    throw new Error(
      "We couldn't find the Agreement data. Please try again later."
    );
  if (!user || user == null)
    throw new Error("You must be logged in to view this page.");

  return (
    <NewAgreement contract={contract} user={user} />
  );
}
