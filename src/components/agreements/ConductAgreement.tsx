import { type FullContracts } from "~/types/contracts";
import AgreementGenerator from "./AgreementGenerator";
import { type User } from "@clerk/nextjs/dist/types/server";
import { type SavedAgreements } from "@prisma/client";

interface NewAgreementProps {
  contract: FullContracts;
  user: User;
}
export const NewAgreement: React.FC<NewAgreementProps> = ({ contract, user }) => {
  return <StartAgreement contract={contract} user={user} />
}


interface ContinueAgreementProps {
  contract: FullContracts;
  user: User;
  savedAgreement: SavedAgreements;
}
export const ContinueAgreement: React.FC<ContinueAgreementProps> = ({ contract, user, savedAgreement }) => {
  return <StartAgreement contract={contract} user={user} savedAgreement={savedAgreement} />

}

interface StartAgreementProps {
  user: User;
  contract: FullContracts;
  savedAgreement?: SavedAgreements;
}
const StartAgreement: React.FC<StartAgreementProps> = ({ contract, user, savedAgreement }) => {

  if( !contract && !savedAgreement ) {
    throw new Error("You must provide either a contract or a saved agreement to start an agreement.");
  }

  return (
    <>
      <section id="content" className="flex-grow py-0">
        <AgreementGenerator agreement={contract} userId={user?.id} savedAgreement={savedAgreement} />
      </section>
    </>
  );

}
  
export default NewAgreement;
