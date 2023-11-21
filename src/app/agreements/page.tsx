// import Link from "next/link";
import { redirect } from "next/navigation";

import { type LiteSavedAgreements } from "~/types/agreements";
import { getUsersSavedAgreements } from "~/data/savedAgreements";
import SavedAgreementsComp from "./savedAgreements";

export const metadata = {
  title: "Agreements - Plainly Legal",
  description: "See all your saved agreements here.",
};

export default async function Page() {
  const savedAgreements =
    (await getUsersSavedAgreements()) as LiteSavedAgreements[];

  //redirect the user to the new agreement page if they have no saved agreements
  if (savedAgreements === null) {
    throw new Error(
      "Could not fetch agreements. Please try again in a moment.",
    );
  }

  //redirect the user to the new agreement page if they have no saved agreements
  if (savedAgreements.length === 0) {
    redirect("/agreements/new");
  }

  return (
    <>
      <section id="content" className="justify-center py-16">
        <div className="w-full max-w-xl px-6 header:max-w-screen-xl">
          <SavedAgreementsComp savedAgreementsData={savedAgreements} />
        </div>
      </section>
    </>
  );
}
