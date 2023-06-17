// import Link from "next/link";
import { type SavedAgreements } from "@prisma/client";

import { getUsersSavedAgreements } from "~/data/savedAgreements";
import SavedAgreementsComp from "./savedAgreements";
import { redirect } from 'next/navigation';
import getUserMeta from "~/data/userData";
import ComingSoon from "~/components/ComingSoon";

export default async function Page() {

  const savedAgreements = (await getUsersSavedAgreements()) as SavedAgreements[];
  const userData = await getUserMeta();

  //If the user does not have a flag set as admin, show them a coming soon message
  if (!userData?.isAdmin) {
    return <ComingSoon heading={"Agreement Generator Coming Soon"} />;
  }

  //redirect the user to the new agreement page if they have no saved agreements
  if (savedAgreements === null) {
    throw new Error("Could not fetch agreements. Please try again in a moment.");
  }

  //redirect the user to the new agreement page if they have no saved agreements
  if (savedAgreements.length === 0) {
    redirect("/agreements/new");
  }

  return (
    <>
      <section id="content" className="justify-center py-16">
        <div className="w-full max-w-xl px-6 md:max-w-screen-xl">
          <SavedAgreementsComp savedAgreementsData={savedAgreements} />
        </div>
      </section>
    </>
  );
}
