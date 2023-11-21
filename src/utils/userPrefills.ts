import { type BusinessProfile } from "@prisma/client";
import type { completionData, liveFormData } from "~/types/forms";
import type KeyedUserMeta from "~/types/user";
import { disclaimers } from "~/components/prefills/BusinessQuestions";
import * as defaultDisclaimers from "~/data/disclaimers";

export function getPrefills(userMeta: KeyedUserMeta) {
  //get the businessProfile from the userMeta
  const businessProfile = userMeta?.businessProfile as BusinessProfile ?? {};

  //Create a prefills object to hold liveFormData we will return
  const prefills = {} as liveFormData;

  //Company Name
  if (businessProfile.prefillBusinessName === true) {
    (prefills["company_name"] = businessProfile?.businessName ?? undefined),
      (prefills["coach_name"] = businessProfile?.businessName ?? undefined),
      (prefills["service_provider_name"] =
        businessProfile?.businessName ?? undefined);
  }

  //Signer Name
  if (businessProfile.prefillSignerName === true) {
    prefills["signer_name"] = businessProfile?.signerName ?? undefined;
  }

  //Contact Email
  if (businessProfile.prefillContactEmail === true) {
    prefills["website_policy_email"] =
      businessProfile?.contactEmail !== null
        ? businessProfile.contactEmail
        : undefined;
  }

  //Business Address
  if (businessProfile.prefillAddress === true) {
    (prefills["company_street_address"] =
      businessProfile?.addressOne ?? undefined),
      (prefills["company_street_address_two"] =
        businessProfile?.addressTwo ?? undefined),
      (prefills["company_city"] = businessProfile?.city ?? undefined),
      (prefills["company_state"] = businessProfile?.state ?? undefined),
      (prefills["company_zip"] = businessProfile?.zip ?? undefined);
  }

  //Choice of Law
  if (businessProfile.prefillChoiceOfLaw === true) {
    prefills["choice_of_law"] = businessProfile?.choiceOfLaw ?? undefined;
  }

  //Choice of Forum Arbitration vs. Court Proceeding
  if (businessProfile.prefillChoiceOfForum === true) {
    const choiceOfForum =
      businessProfile?.choiceOfForum === "Arbitration"
        ? "opt_1|Arbitration"
        : businessProfile?.choiceOfForum === "Court"
        ? "opt_3|Court"
        : undefined;
    prefills["dispute_forum"] = choiceOfForum ?? undefined;
  }

  //Dispute Location
  if (businessProfile.prefillDisputeLocation === true) {
    prefills["dispute_location"] =
      businessProfile?.disputeLocation ?? undefined;
  }

  //Fee Shifting
  if (businessProfile.prefillEnableFee === true) {
    prefills["fee_shifting_choice"] =
      businessProfile?.enableFee === true
        ? "true|Yes"
        : businessProfile?.enableFee === false
        ? "false|No"
        : undefined;
  }

  //Disclaimer Checkboxes
  const disclamersIncluded =
    businessProfile?.disclaimersIncluded != null
      ? (businessProfile?.disclaimersIncluded as string[])
      : undefined;

  const fancyKeyDisclaimers = [] as string[];

  //If the disclaimersIncluded array exists, get the disclaimers from the disclaimers object and merge them into the prefills object with | as the separator
  if (disclamersIncluded) {
    Object.keys(disclaimers).forEach((key) => {
      //Find the numbered index of the disclaimer in the disclaimersIncluded array
      const index = disclamersIncluded.findIndex((element) => element === key);

      if (index === -1) return;

      fancyKeyDisclaimers[
        index
      ] = `${disclamersIncluded[index]}|${disclaimers[key]}`;
    });
  }

  prefills["disclaimers_topics_prefill"] = fancyKeyDisclaimers;

  //Fill the default disclaimers
  prefills["legal_disclaimer"] = defaultDisclaimers.disclaimerLegal;
  prefills["medical_disclaimer"] = defaultDisclaimers.disclaimerMedical;
  prefills["fitness_disclaimer"] = defaultDisclaimers.disclaimerFitness;
  prefills["financial_disclaimer"] = defaultDisclaimers.disclaimerFinancial;
  prefills["tax_disclaimer"] = defaultDisclaimers.disclaimerTax;

  //If we have a disclaimersIncluded array, fill the disclaimers from the businessProfile in the my account page
  if (disclamersIncluded) {
    if (
      disclamersIncluded.includes("disclaimerLegal") === true &&
      businessProfile?.disclaimerLegal !== null
    )
      prefills["legal_disclaimer"] = businessProfile?.disclaimerLegal;
    if (
      disclamersIncluded.includes("disclaimerMedical") === true &&
      businessProfile?.disclaimerMedical !== null
    )
      prefills["medical_disclaimer"] = businessProfile?.disclaimerMedical;
    if (
      disclamersIncluded.includes("disclaimerFitness") === true &&
      businessProfile?.disclaimerFitness !== null
    )
      prefills["fitness_disclaimer"] = businessProfile?.disclaimerFitness;
    if (
      disclamersIncluded.includes("disclaimerFinancial") === true &&
      businessProfile?.disclaimerFinancial !== null
    )
      prefills["financial_disclaimer"] = businessProfile?.disclaimerFinancial;
    if (
      disclamersIncluded.includes("disclaimerTax") === true &&
      businessProfile?.disclaimerTax !== null
    )
      prefills["tax_disclaimer"] = businessProfile?.disclaimerTax;
  }

  return prefills;
}

export function getPrefillCompletion(userMeta: KeyedUserMeta) {
  const prefills = getPrefills(userMeta);

  //get the array keys of all the prefills
  const prefillKeys = Object.keys(prefills);
  //create an array with all the prefill keys with value boolean true
  const prefillKeysTrue = prefillKeys.reduce((obj, key) => {
    obj[key] = true;
    return obj;
  }, {} as completionData);

  return prefillKeysTrue;
}
