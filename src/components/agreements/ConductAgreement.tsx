"use client";

// Import Node Modules
import { useState } from "react";
import { type FullContracts } from "~/types/contracts";
import { type SavedAgreements } from "@prisma/client";

// Import Components
import AgreementGenerator from "~/components/agreements/AgreementGenerator";
import DisplayAgreement from "~/components/agreements/DisplayAgreement";
// import ComingSoon from "../ComingSoon";

interface ConductAgreementProps {
  agreement: FullContracts;
  userId: string;
  savedAgreement?: SavedAgreements;
}

export const ConductAgreement: React.FC<ConductAgreementProps> = ({
  agreement,
  userId,
  savedAgreement,
}) => {
  const [userAgreement, setUserAgreement] = useState<SavedAgreements | undefined>(savedAgreement);

  //If we get a new saved, agreement, show the displayAgreement component
  function onChange(agreement: SavedAgreements) {
    setUserAgreement(agreement);
  }

  // //Temp Messaging show coming soon component
  // return (
  //   <ComingSoon heading="In Maintenance">
  //     <div className="text-center">We are currently updating the Agreement Generator. Please check back in a moment.</div>
  //   </ComingSoon>
  // );

  //Check if the userAgreement is complete and if so return the DisplayAgreement in this client component
  if (userAgreement?.completed) return <DisplayAgreement agreement={userAgreement} onChange={onChange} />;

  return (
    <AgreementGenerator
      agreement={agreement}
      userId={userId}
      savedAgreement={userAgreement}
      onComplete={onChange}
    />
  );
};

export default ConductAgreement;
