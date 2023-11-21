"use client";
import { useUserMeta } from "~/UserMetaProvider";
import { useOptions } from "~/OptionsProvider";
import type { TermsOfService } from "@prisma/client";
import type { FullUserTermsOfServiceAcceptance } from "~/types/user";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/shadcn/dialog";

import "~/styles/termsOfService.css";
import { useEffect, useState } from "react";
import { cn } from "~/utils/cn";
import { SpinnerLoader } from "./ui/loaders/Loaders";

import { useAction } from "next-safe-action/hook";

import type { actionSaveTOS } from "~/utils/tos";

interface TermsAndConditionsPopupProps {
  saveTOS: typeof actionSaveTOS;
}

const TermsAndConditionsPopupInternal = ({
  saveTOS,
}: TermsAndConditionsPopupProps) => {
  const { userMeta } = useUserMeta();
  const { options } = useOptions();
  const [isOpen, setIsOpen] = useState<boolean>(true);

  //Check if we are on the /account/onboard page and bail if so, this is the only page where we don't want to force the terms of service popup
  if (
    typeof window !== "undefined" &&
    window?.location?.pathname.includes("/account")
  )
    return null;

  //Return null while we are loading
  if (!userMeta || !options) {
    return null;
  }

  //Throw on major issues that would prevent us from checking if the user has agreed to the latest terms of service
  if (!options.termsOfService)
    throw new Error(
      "No latest terms of service found, cannot check if the latest terms of service have been agreed to.",
    );
  if (!userMeta)
    throw new Error(
      "No latest terms of service found, cannot check if the latest terms of service have been agreed to.",
    );

  const userAcceptance =
    userMeta?.termsOfServiceAcceptance as FullUserTermsOfServiceAcceptance[];
  const latestTos = options.termsOfService as TermsOfService;

  //Check if any of the userAcceptance records match the latestTos
  const hasAgreedToLatestTerms = userAcceptance.some((userAcceptance) => {
    //Get the termsOfServiceId from the userAcceptance record
    const userAcceptanceTermsOfServiceId =
      userAcceptance.termsOfService[0]?.id ?? null;

    //Return true if the user has agreed to the latest terms of service
    return userAcceptanceTermsOfServiceId === latestTos.id;
  });

  //Check if the user has agreed to the latest terms and conditions - If they have, return null
  if (hasAgreedToLatestTerms) {
    return null;
  }

  //Create a popup
  return (
    <Dialog open={isOpen}>
      <DialogContent className="tos-dialog h-[calc(100%-2rem)] gap-0 bg-white sm:h-5/6">
        <DialogHeader className="border-b-2">
          <DialogTitle>Please Accept Our Updated Terms of Service</DialogTitle>
        </DialogHeader>
        {/* 
          Ideally, this would use DialogDescription but I'm fairly sure the <TermsAndConditions/>
          component already has max-height scrollability tweaks applied to it. - Joe 10/27/2023
        */}
        <TermsAndConditions
          saveTOS={saveTOS}
          onComplete={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

interface TermsAndConditionsProps {
  saveTOS: typeof actionSaveTOS;
  onComplete?: () => void;
  className?: string;
}

const TermsAndConditionsInternal = ({
  saveTOS,
  onComplete,
  className,
}: TermsAndConditionsProps) => {
  const { execute, result, status } = useAction(saveTOS);

  const { options } = useOptions();
  const { refreshUserMeta } = useUserMeta();

  const [tosCheck, setTosCheck] = useState<boolean>(false);

  //Run the onComplete callback when the terms of service acceptance record has been saved
  useEffect(() => {
    if (!result?.data?.id) return;

    //Update the userMeta provider to include the new terms of service acceptance record
    void refreshUserMeta();
    onComplete?.();
  }, [result, onComplete, refreshUserMeta]);

  //Return null while we are loading
  if (!options) return <SpinnerLoader />;

  const latestTos = options.termsOfService as TermsOfService;

  const acceptTos = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    //ensure that the input is checked
    const checkbox = event.currentTarget.form?.querySelector(
      'input[type="checkbox"]',
    ) as HTMLInputElement;
    if (!checkbox.checked) {
      checkbox.focus();
      return;
    }

    //Call a new function to handle the asynchronous operation
    void handleMutation();
  };

  const handleMutation = () => {
    //Save the new terms of service acceptance record
    try {
      execute({
        id: latestTos.id,
      });
    } catch (err) {
      console.error(err);
      // handle error accordingly
    }
  };

  return (
    <div
      className={cn(
        "terms-and-conditions flex flex-col overflow-auto",
        className,
      )}
    >
      <div
        className="dialog-description overflow-y-scroll pb-2 pt-6"
        dangerouslySetInnerHTML={{ __html: latestTos.text }}
      ></div>

      <form className="flex flex-col items-center gap-4 border-t-2 border-b-purple-600 py-4">
        <label className="inline-flex cursor-pointer items-center justify-center gap-2">
          <input
            type="checkbox"
            checked={tosCheck}
            onChange={() => setTosCheck(!tosCheck)}
            required
          />
          <span>I agree to the terms of service</span>
        </label>
        {status == "executing" ? (
          <button className="tos-submit-button btn btn-primary pointer-events-none cursor-pointer opacity-80">
            Saving...
          </button>
        ) : (
          <button
            onClick={acceptTos}
            className="tos-submit-button btn btn-primary disabled:opacity-50"
            disabled={tosCheck == false}
          >
            Accept Terms & Conditions
          </button>
        )}
      </form>
    </div>
  );
};

//Export the components
export const TermsAndConditionsPopup = TermsAndConditionsPopupInternal;
export const TermsAndConditions = TermsAndConditionsInternal;

export default TermsAndConditionsPopup;
