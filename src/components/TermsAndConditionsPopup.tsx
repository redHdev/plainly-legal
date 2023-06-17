"use client";
import { useUserMeta } from "~/providers/UserMetaProvider";
import { useOptions } from "~/providers/OptionsProvider";
import type { TermsOfService } from "@prisma/client";
import type { FullUserTermsOfServiceAcceptance } from "~/types/user";
import type { UserTermsOfServiceAcceptance } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/shadcdn/dialog";

import "~/styles/termsOfService.css";
import type { ZactAction } from "zact/server";
import type { ZodTypeAny } from "zod";
import { useZact } from "zact/client";
interface TermsAndConditionsPopupProps {
  saveTOS: ZactAction<ZodTypeAny, UserTermsOfServiceAcceptance | null>
}

export const TermsAndConditionsPopup = ({ saveTOS }: TermsAndConditionsPopupProps) => {
  const { mutate, data, isLoading } = useZact(saveTOS);
  const { userMeta } = useUserMeta();
  const { options } = useOptions();

  console.log('userMeta', userMeta);
  console.log('options', options);


  //Return null while we are loading
  if( !userMeta || !options ){
    return null;
  }

  //Throw on major issues that would prevent us from checking if the user has agreed to the latest terms of service
  if(!options.termsOfService) throw new Error('No latest terms of service found, cannot check if the latest terms of service have been agreed to.');
  if(!userMeta) throw new Error('No latest terms of service found, cannot check if the latest terms of service have been agreed to.');

  const userAcceptance = userMeta?.termsOfServiceAcceptance as FullUserTermsOfServiceAcceptance[];
  const latestTos = options.termsOfService as TermsOfService;

  //Check if any of the userAcceptance records match the latestTos
  const hasAgreedToLatestTerms = userAcceptance.some( (userAcceptance) => {
    //Get the termsOfServiceId from the userAcceptance record
    const userAcceptanceTermsOfServiceId = userAcceptance.termsOfService[0]?.id ?? null;

    //Return true if the user has agreed to the latest terms of service
    return userAcceptanceTermsOfServiceId === latestTos.id;
  });


  //Check if the user has agreed to the latest terms and conditions - If they have, return null
  if(hasAgreedToLatestTerms){
    return null;
  }

  async function acceptTos(event: React.MouseEvent<HTMLButtonElement>){
    event.preventDefault();

    //ensure that the input is checked
    const checkbox = event.currentTarget.form?.querySelector('input[type="checkbox"]') as HTMLInputElement;
    if(!checkbox.checked){
      checkbox.focus();
      return;
    }

    //Save the new terms of service acceptance record
    await mutate({
      createdAt: new Date(),
      termsOfService: {
        connect:{
          id: latestTos.id
        }
      }
    });

  }

  //Create a popup 
  return (
    <Dialog open={data?.id ? false : true}>
      <DialogContent className="tos-dialog bg-white h-5/6 gap-0">
        <DialogHeader className="border-b-2">
          <DialogTitle>Please Accept the Latest Terms Of Service</DialogTitle>
        </DialogHeader>

        <div className="dialog-description overflow-y-scroll py-2" dangerouslySetInnerHTML={{ __html: latestTos.text }}></div>

        <form className="flex flex-col gap-4 border-t-2 border-b-purple-600 py-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" required />
            <span>I agree to the terms of service</span>
          </label>
          {isLoading ? <button className="tos-submit-button btn btn-primary pointer-events-none cursor-pointer opacity-80">Saving...</button> : <button onClick={acceptTos} className="tos-submit-button btn btn-primary">Submit</button>}
        </form>

      </DialogContent>
    </Dialog>
  );
}

export default TermsAndConditionsPopup;