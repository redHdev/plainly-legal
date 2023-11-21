"use client";
import { type BusinessProfile } from "@prisma/client";
import React, { useState, useEffect, useRef } from "react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { states } from "tests/import/province";
import Select from "react-select";
import Loading from "~/app/loading";
import { useUserMeta } from "~/UserMetaProvider";
import { matchSorter } from "match-sorter";

import { Switch } from "../ui/switch";
import { Popup } from "../ui/popup";
import { cn } from "~/utils/cn";
import * as popupText from "~/data/prefillPopups";
import * as disclaimerDefaults from "~/data/disclaimers";
import Disclaimers from "./DisclaimersEditor";
import Link from "next/link";

export interface disclamerType {
  [key: string]: string;
}

//Checkbox options
export const disclaimers = {
  disclaimerLegal: "Legal Advice",
  disclaimerMedical: "Medical Advice",
  disclaimerFitness: "Fitness Advice",
  disclaimerFinancial: "Financial/Investment Advice",
  disclaimerTax: "Tax Advice",
} as disclamerType;

export type BusinessProfileFormValues = {
  businessName: string;
  ownerName: string;
  contactEmail: string;
  signerName: string;
  addressOne: string;
  addressTwo: string;
  city: string;
  state: { value: string; label: string };
  zip: string;
  website?: string;
  choiceOfLaw: { value: string; label: string };
  choiceOfForum: "Arbitration" | "Court";
  disputeLocation: string;
  enableFee: string;

  prefillBusinessName: boolean;
  prefillOwnerName: boolean;
  prefillSignerName: boolean;
  prefillContactEmail: boolean;
  prefillAddress: boolean;
  prefillWebsite: boolean;
  prefillChoiceOfLaw: boolean;
  prefillChoiceOfForum: boolean;
  prefillDisputeLocation: boolean;
  prefillEnableFee: boolean;

  disclaimersIncluded: string[];
  disclaimerLegal: string;
  disclaimerMedical: string;
  disclaimerFitness: string;
  disclaimerFinancial: string;
  disclaimerTax: string;
};

interface BusinessQuestionProps {
  onComplete?: () => void;
  submitText?: string;
}

export const BusinessQuestions: React.FC<BusinessQuestionProps> = ({
  onComplete,
  submitText,
}) => {
  //Set the default state options from the states array
  const defaultStateOptions = states.map((state) => ({
    value: state,
    label: state,
  }));

  const { userMeta, setUserMeta } = useUserMeta();
  const [saved, setSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const formref = useRef<HTMLFormElement>(null);
  const [stateOptions, setStateOptions] =
    useState<{ value: string; label: string }[]>(defaultStateOptions);
  const [stateLawOptions, setStateLawOptions] =
    useState<{ value: string; label: string }[]>(defaultStateOptions);

  const businessProfile = userMeta?.businessProfile as BusinessProfile | null;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
    watch,
  } = useForm<BusinessProfileFormValues>();

  //When the form changes, set saved to false
  watch(function () {
    setSaved(false);
  });

  //Subscribe to the form data
  const data = watch();

  useEffect(() => {
    // Loading / etc.
    if (businessProfile === undefined) return;
    if (loading === false) return;
    setLoading(false);

    // Base form values
    setValue("addressOne", businessProfile?.addressOne ?? "");
    setValue("businessName", businessProfile?.businessName ?? "");
    setValue("ownerName", businessProfile?.ownerName ?? "");
    setValue("signerName", businessProfile?.signerName ?? "");
    setValue("contactEmail", businessProfile?.contactEmail ?? "");
    setValue("addressTwo", businessProfile?.addressTwo ?? "");
    setValue("city", businessProfile?.city ?? "");
    setValue("state", {
      value: businessProfile?.state ?? "",
      label: businessProfile?.state ?? "",
    });
    setValue("zip", businessProfile?.zip ?? "");
    setValue("website", businessProfile?.website ?? "");
    setValue("choiceOfLaw", {
      value: businessProfile?.choiceOfLaw ?? "",
      label: businessProfile?.choiceOfLaw ?? "",
    });
    setValue("choiceOfForum", businessProfile?.choiceOfForum ?? "Arbitration");
    setValue("disputeLocation", businessProfile?.disputeLocation ?? "");
    setValue(
      "enableFee",
      businessProfile?.enableFee
        ? businessProfile.enableFee.toString()
        : "false",
    );

    // Base prefill values
    setValue(
      "prefillBusinessName",
      businessProfile?.prefillBusinessName ?? false,
    );
    setValue("prefillOwnerName", businessProfile?.prefillOwnerName ?? false);
    setValue("prefillSignerName", businessProfile?.prefillSignerName ?? false);
    setValue(
      "prefillContactEmail",
      businessProfile?.prefillContactEmail ?? false,
    );
    setValue("prefillAddress", businessProfile?.prefillAddress ?? false);
    setValue("prefillWebsite", businessProfile?.prefillWebsite ?? false);
    setValue(
      "prefillChoiceOfLaw",
      businessProfile?.prefillChoiceOfLaw ?? false,
    );
    setValue(
      "prefillChoiceOfForum",
      businessProfile?.prefillChoiceOfForum ?? false,
    );
    setValue(
      "prefillDisputeLocation",
      businessProfile?.prefillDisputeLocation ?? false,
    );
    setValue("prefillEnableFee", businessProfile?.prefillEnableFee ?? false);
    setValue(
      "disclaimersIncluded",
      (businessProfile?.disclaimersIncluded as string[]) ?? [],
    );
    setValue(
      "disclaimerLegal",
      businessProfile?.disclaimerLegal ?? disclaimerDefaults.disclaimerLegal,
    );
    setValue(
      "disclaimerMedical",
      businessProfile?.disclaimerMedical ??
        disclaimerDefaults.disclaimerMedical,
    );
    setValue(
      "disclaimerFitness",
      businessProfile?.disclaimerFitness ??
        disclaimerDefaults.disclaimerFitness,
    );
    setValue(
      "disclaimerFinancial",
      businessProfile?.disclaimerFinancial ??
        disclaimerDefaults.disclaimerFinancial,
    );
    setValue(
      "disclaimerTax",
      businessProfile?.disclaimerTax ?? disclaimerDefaults.disclaimerTax,
    );
  }, [businessProfile, setValue, loading]);

  const onSubmit: SubmitHandler<BusinessProfileFormValues> = async (
    submitData,
  ) => {
    if (!submitData.state) return;
    //Make on the fly adjustments to the data
    const buisnussRecord = {
      ...submitData,
      state: submitData.state.value,
      choiceOfLaw: submitData.choiceOfLaw.value,
      enableFee: submitData.enableFee === "true",
    } as BusinessProfile;

    //Turn loading on
    setSaving(true);

    //Send the data to the server
    const response = await fetch("/api/user/business", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buisnussRecord),
    });

    //Check the response
    if (response.status === 200) {
      //Set the state back to normal
      setSaving(false);
      setSaved(true);

      //Scroll to the top of the page with 200ms animation
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      //Update the user meta provider
      setUserMeta({
        ...userMeta,
        businessProfile: buisnussRecord,
      });

      if (onComplete) {
        onComplete();
      }
    }
  };

  if (loading) {
    return <Loading />;
  }

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const onSubmitFunc = handleSubmit(onSubmit); // gets the function returned by handleSubmit
    void onSubmitFunc(event); // pass the event to the returned function
  }

  function DisclaimerOptions() {
    const currentOptions =
      data.disclaimersIncluded !== undefined ? data.disclaimersIncluded : [];
    return (
      <div className="grid grid-cols-1 items-start gap-3 md:grid-cols-2">
        {Object.entries(disclaimers).map(([key, value]) => (
          <label
            key={key}
            className="flex cursor-pointer items-baseline gap-2 leading-5"
          >
            <input
              type="checkbox"
              className="min-h-[20px] min-w-[20px]"
              value={key}
              checked={currentOptions.includes(key) ? true : false}
              onChange={(e) => {
                if (e.target.checked) {
                  setValue("disclaimersIncluded", [...currentOptions, key]);
                } else {
                  setValue(
                    "disclaimersIncluded",
                    currentOptions.filter((v) => v !== key),
                  );
                }
              }}
            />
            {value}
          </label>
        ))}
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={submitHandler}
        ref={formref}
        className="flex flex-col gap-10"
      >
        {saved && (
          <div className="saved-message border-[#AFE1AF]-200 mb-2 border bg-[#AFE1AF] p-2 px-5 text-center text-xs font-semibold tracking-widest text-white">
            Document Presets Saved
          </div>
        )}

        <div className="section-intro">
          <h2 className="mb-2">Document Presets</h2>
          <div className="text-sm">
            <p>{`In this section of your profile, you can provide Plainly Legal™ with information that you want to pre-populate your legal documents going forward. You don’t have to fill in any of this information, but this section can simplify the process of creating legal documents. If you provide information here, we’ll skip the questions that would normally collect this information when you create individual documents.`}</p>
            <p>{`NOTE: Because anything you fill in here will result in us skipping questions when you create documents, only fill in information that you want to be the same for every document you create.`}</p>
            <p>
              <Link
                target="_blank"
                href="https://help.plainlylegal.com/how-do-i-set-up-my-document-prefills"
              >
                How do I set up my document presets?
              </Link>
            </p>
          </div>
        </div>

        <hr />

        <div className="prefills flex flex-col gap-10">
          <div id="basic-business-info" className="flex flex-col gap-7">
            <div className="intro">
              <h4 className="mb-2">Basic Business Information</h4>
              <p>{`Let's start with some basic information about your business. In this section, you can fill in information so you don't have to tell us your “company name” for every document you create or fill in your address over and over again.`}</p>
            </div>
            <div className="fields-container grid gap-5">
              {/* Business Name Row */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* col */}
                <div className="col-span-full grid gap-2">
                  <div className="label flex flex-nowrap items-center justify-between gap-2">
                    <label
                      className="flex flex-1 items-center font-semibold"
                      htmlFor="businessName"
                    >
                      Company Name
                      {data.prefillBusinessName && (
                        <sup className="text-sm text-red">*</sup>
                      )}
                      <Popup version="Company Name">
                        {popupText.companyName}
                      </Popup>
                    </label>

                    <div className="flex flex-nowrap items-center gap-2">
                      <span className="font-semibold">
                        {data.prefillBusinessName
                          ? "Use Preset"
                          : "Ask Every Time"}
                      </span>
                      <Switch
                        checked={data.prefillBusinessName}
                        onCheckedChange={(checked) => {
                          setValue("prefillBusinessName", checked);
                        }}
                      />
                    </div>
                  </div>
                  <input
                    className={cn(
                      "col-span-full grid gap-2",
                      !data.prefillBusinessName &&
                        "pointer-events-none opacity-20",
                    )}
                    type="text"
                    id="businessName"
                    defaultValue={data ? data.businessName : ""}
                    {...register("businessName", {
                      required: data.prefillBusinessName,
                    })}
                  />
                  {errors.businessName && (
                    <span className="text-[14px] text-sm text-red">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              {/* Signer Name Row */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* col */}
                <div className="col-span-full grid gap-2">
                  <div className="label flex flex-nowrap items-center justify-between gap-2">
                    <label
                      className="flex flex-1 items-center font-semibold"
                      htmlFor="signerName"
                    >
                      Signer Name
                      {data.prefillSignerName && (
                        <sup className="text-sm text-red">*</sup>
                      )}
                      <Popup version="Business Name">
                        {popupText.signerName}
                      </Popup>
                    </label>

                    <div className="flex flex-nowrap items-center gap-2">
                      <span className="font-semibold">
                        {data.prefillSignerName
                          ? "Use Preset"
                          : "Ask Every Time"}
                      </span>
                      <Switch
                        checked={data.prefillSignerName}
                        onCheckedChange={(checked) => {
                          setValue("prefillSignerName", checked);
                        }}
                      />
                    </div>
                  </div>
                  <input
                    className={cn(
                      "col-span-full grid gap-2",
                      !data.prefillSignerName &&
                        "pointer-events-none opacity-20",
                    )}
                    type="text"
                    id="signerName"
                    defaultValue={data ? data.signerName : ""}
                    {...register("signerName", {
                      required: data.prefillSignerName,
                    })}
                  />
                  {errors.signerName && (
                    <span className="text-[14px] text-sm text-red">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              {/* Contact Email Address Row */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {/* col */}
                <div className="col-span-full grid gap-2">
                  <div className="label flex flex-nowrap items-center justify-between gap-2">
                    <label
                      className="flex flex-1 items-center font-semibold"
                      htmlFor="contactEmail"
                    >
                      Contact Email Address
                      {data.prefillContactEmail && (
                        <sup className="text-sm text-red">*</sup>
                      )}
                      <Popup version="Contact Email Address">
                        {popupText.contactEmail}
                      </Popup>
                    </label>

                    <div className="flex flex-nowrap items-center gap-2">
                      <span className="font-semibold">
                        {data.prefillContactEmail
                          ? "Use Preset"
                          : "Ask Every Time"}
                      </span>
                      <Switch
                        checked={data.prefillContactEmail}
                        onCheckedChange={(checked) => {
                          setValue("prefillContactEmail", checked);
                        }}
                      />
                    </div>
                  </div>
                  <input
                    className={cn(
                      "col-span-full grid gap-2",
                      !data.prefillContactEmail &&
                        "pointer-events-none opacity-20",
                    )}
                    type="text"
                    id="contactEmail"
                    defaultValue={data ? data.contactEmail : ""}
                    {...register("contactEmail", {
                      required: data.prefillContactEmail,
                    })}
                  />
                  {errors.contactEmail && (
                    <span className="text-[14px] text-sm text-red">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              {/* Business Address */}
              <div className="grouped-fields grid gap-2">
                <div className="grid gap-4">
                  <div className="label flex flex-nowrap items-center justify-between gap-2">
                    <label className="flex flex-1 items-center font-semibold">
                      Business Address
                      {data.prefillAddress && (
                        <sup className="text-sm text-red">*</sup>
                      )}
                      <Popup version="Business Address">
                        {popupText.businessAddress}
                      </Popup>
                    </label>
                    <div className="flex flex-nowrap items-center gap-2">
                      <span className="font-semibold">
                        {data.prefillAddress ? "Use Preset" : "Ask Every Time"}
                      </span>
                      <Switch
                        checked={data.prefillAddress}
                        onCheckedChange={(checked) => {
                          setValue("prefillAddress", checked);
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* Row */}
                <div
                  className={cn(
                    "grid grid-cols-1 gap-4 lg:grid-cols-2",
                    !data.prefillAddress && "pointer-events-none opacity-20",
                  )}
                >
                  {/* col */}
                  <div className="grid gap-2">
                    <label htmlFor="addressOne">
                      Address One
                      <sup className="text-sm text-red">*</sup>
                    </label>
                    <input
                      type="text"
                      id="addressOne"
                      value={data ? data.addressOne : ""}
                      {...register("addressOne", {
                        required: data.prefillAddress,
                      })}
                    />
                    {errors.addressOne && (
                      <span className="text-[14px] text-sm text-red">
                        This field is required
                      </span>
                    )}
                  </div>
                  {/* col */}
                  <div className="grid gap-2">
                    <label htmlFor="addressTwo">Address Two</label>
                    <input
                      type="text"
                      id="addressTwo"
                      value={data ? data.addressTwo : ""}
                      {...register("addressTwo")}
                    />
                  </div>
                </div>
                <div
                  className={cn(
                    "grid grid-cols-1 gap-4 lg:grid-cols-3",
                    !data.prefillAddress && "pointer-events-none opacity-20",
                  )}
                >
                  <div className="grid gap-2">
                    <label htmlFor="city">
                      City
                      <sup className="text-sm text-red">*</sup>
                    </label>
                    <input
                      type="text"
                      id="city"
                      value={data ? data.city : ""}
                      {...register("city", { required: data.prefillAddress })}
                    />
                    {errors.city && (
                      <span className="text-[14px] text-sm text-red">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="state">
                      State/Province
                      <sup className="text-sm text-red">*</sup>
                    </label>
                    <Controller
                      control={control}
                      name="state"
                      render={({ field: { ref, ...field } }) => (
                        //remove ref from field
                        <Select
                          {...field}
                          ref={ref}
                          options={stateOptions}
                          defaultValue={data ? data.state : ""}
                          isClearable={false}
                          classNamePrefix="react-select"
                          required={data.prefillAddress}
                          onInputChange={(inputValue) => {
                            setStateOptions(
                              matchSorter(defaultStateOptions, inputValue, {
                                keys: ["label"],
                              }),
                            );
                          }}
                          onChange={(value) => {
                            if (value === null) return;
                            if (typeof value === "string") {
                              // handle the case where value is a string
                              field.onChange({ value, label: value });
                            } else {
                              // assuming 'value' is { value: string, label: string }
                              field.onChange(value);
                            }
                          }}
                        />
                      )}
                    />
                    {errors.state && (
                      <span className="text-[14px] text-sm text-red">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="zip">
                      ZIP/Postal code
                      <sup className="text-sm text-red">*</sup>
                    </label>
                    <input
                      type="text"
                      id="zip"
                      value={data ? data.zip : ""}
                      {...register("zip", { required: data.prefillAddress })}
                    />
                    {errors.zip && (
                      <span className="text-[14px] text-sm text-red">
                        This field is required
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div id="dispute-resolution" className="flex flex-col gap-7">
            <div className="intro">
              <h4 className="mb-2">Dispute Resolution</h4>
              <p>{`Now, let’s make some decisions about how you want disputes resolved. Hopefully, you’ll never find yourself in a dispute, but we include dispute resolution clauses in a lot of the legal documents you create.`}</p>
            </div>
            <div className="fields-container grid gap-5">
              {/* Choice of Law Column */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="col-span-full grid gap-2">
                  <div className="label flex flex-nowrap items-center justify-between gap-2">
                    <label
                      className="flex items-center font-semibold"
                      htmlFor="choiceOfLaw"
                    >
                      Choice of Law
                      {data.prefillChoiceOfLaw && (
                        <sup className="text-sm text-red">*</sup>
                      )}
                      <Popup version="Choice of Law">
                        {popupText.choiceOfLaw}
                      </Popup>
                    </label>
                    <div className="flex flex-nowrap items-center gap-2">
                      <span className="font-semibold">
                        {data.prefillChoiceOfLaw
                          ? "Use Preset"
                          : "Ask Every Time"}
                      </span>
                      <Switch
                        checked={data.prefillChoiceOfLaw}
                        onCheckedChange={(checked) => {
                          setValue("prefillChoiceOfLaw", checked);
                        }}
                      />
                    </div>
                  </div>
                  <Controller
                    control={control}
                    name="choiceOfLaw"
                    render={({ field: { ref, ...field } }) => (
                      <Select
                        {...field}
                        ref={ref}
                        name="choiceOfLaw"
                        id="choiceOfLaw"
                        value={data ? data.choiceOfLaw : ""}
                        options={stateLawOptions}
                        defaultValue={data.choiceOfLaw}
                        isClearable={false}
                        classNamePrefix="react-select"
                        required={data.prefillChoiceOfLaw}
                        className={
                          !data.prefillChoiceOfLaw
                            ? "pointer-events-none opacity-20"
                            : ""
                        }
                        onInputChange={(inputValue) => {
                          setStateLawOptions(
                            matchSorter(defaultStateOptions, inputValue, {
                              keys: ["label"],
                            }),
                          );
                        }}
                        onChange={(value) => {
                          if (value === null) return;
                          if (typeof value === "string") {
                            // handle the case where value is a string
                            field.onChange({ value, label: value });
                          } else {
                            // assuming 'value' is { value: string, label: string }
                            field.onChange(value);
                          }
                        }}
                      />
                    )}
                  />
                  {errors.choiceOfLaw && (
                    <span className="text-[14px] text-sm text-red">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              {/* Arbitration vs. Court Proceeding Column */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="gap-2grid col-span-full grid gap-2">
                  <div className="label flex flex-nowrap items-center justify-between gap-2">
                    <label
                      className="flex items-center font-semibold"
                      htmlFor="choiceOfForum"
                    >
                      Arbitration vs. Court Proceeding
                      {data.prefillChoiceOfForum && (
                        <sup className="text-sm text-red">*</sup>
                      )}
                      <Popup version="Arbitration vs. Court Proceeding">
                        {popupText.arbitrationVsCourt}
                      </Popup>
                    </label>
                    <div className="flex flex-nowrap items-center gap-2">
                      <span className="font-semibold">
                        {data.prefillChoiceOfForum
                          ? "Use Preset"
                          : "Ask Every Time"}
                      </span>
                      <Switch
                        checked={data.prefillChoiceOfForum}
                        onCheckedChange={(checked) => {
                          setValue("prefillChoiceOfForum", checked);
                        }}
                      />
                    </div>
                  </div>
                  <select
                    className={cn(
                      "h-[2.5rem] w-full rounded-[0.375rem] border border-[#dddcdc] pl-2 text-[0.875rem] hover:cursor-pointer",
                      !data.prefillChoiceOfForum
                        ? "pointer-events-none opacity-20"
                        : "",
                    )}
                    id="choiceOfForum"
                    {...register("choiceOfForum", {
                      required: data.prefillChoiceOfForum,
                    })}
                  >
                    <option value="Arbitration">Arbitration</option>
                    <option value="Court">Court</option>
                  </select>
                  {errors.choiceOfForum && (
                    <span className="text-[14px] text-sm text-red">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              {/* Where should disputes be resolved */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="gap-2grid col-span-full grid gap-2">
                  <div className="label flex flex-nowrap items-center justify-between gap-2">
                    <label
                      className="flex items-center font-semibold"
                      htmlFor="disputeLocation"
                    >
                      Where should disputes be resolved?
                      {data.prefillDisputeLocation && (
                        <sup className="text-sm text-red">*</sup>
                      )}
                      <Popup version="Where should disputes be resolved?">
                        {popupText.disputeLocation}{" "}
                      </Popup>
                    </label>
                    <div className="flex flex-nowrap items-center gap-2">
                      <span className="font-semibold">
                        {data.prefillDisputeLocation
                          ? "Use Preset"
                          : "Ask Every Time"}
                      </span>
                      <Switch
                        checked={data.prefillDisputeLocation}
                        onCheckedChange={(checked) => {
                          setValue("prefillDisputeLocation", checked);
                        }}
                      />
                    </div>
                  </div>
                  <input
                    className={cn(
                      "col-span-full grid gap-2",
                      !data.prefillDisputeLocation &&
                        "pointer-events-none opacity-20",
                    )}
                    type="text"
                    id="disputeLocation"
                    value={data ? data.disputeLocation : ""}
                    {...register("disputeLocation", {
                      required: data.prefillDisputeLocation,
                    })}
                  />
                  {errors.disputeLocation && (
                    <span className="text-[14px] text-sm text-red">
                      This field is required
                    </span>
                  )}
                </div>
              </div>

              {/* Enable Fee Shifting */}
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                <div className="gap-2grid col-span-full grid gap-2">
                  <div className="label flex flex-nowrap items-center justify-between gap-2">
                    <label
                      className="flex items-center font-semibold"
                      htmlFor="enableFee"
                    >
                      Enable Fee Shifting
                      {data.prefillEnableFee && (
                        <sup className="text-sm text-red">*</sup>
                      )}
                      <Popup version="Enable Fee Shifting">
                        {popupText.feeShifting}
                      </Popup>
                    </label>
                    <div className="flex flex-nowrap items-center gap-2">
                      <span className="font-semibold">
                        {data.prefillEnableFee
                          ? "Use Preset"
                          : "Ask Every Time"}
                      </span>
                      <Switch
                        checked={data.prefillEnableFee}
                        onCheckedChange={(checked) => {
                          setValue("prefillEnableFee", checked);
                        }}
                      />
                    </div>
                  </div>

                  <select
                    className={cn(
                      "h-[2.5rem] w-full rounded-[0.375rem] border border-[#dddcdc] pl-2 text-[0.875rem] hover:cursor-pointer",
                      !data.prefillEnableFee
                        ? "pointer-events-none opacity-20"
                        : "",
                    )}
                    id="enableFee"
                    {...register("enableFee", {
                      required: data.prefillEnableFee,
                    })}
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>

                  {errors.enableFee && (
                    <span className="text-[14px] text-sm text-red">
                      This field is required
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div id="disclaimers" className="flex flex-col gap-7">
            <div className="intro">
              <h4 className="mb-2">Disclaimers</h4>
              <p>{`Many of our agreements often include general disclaimers. For
            example, our online course agreement includes a disclaimer making it
            clear that the student must take personal responsibility for their
            results. For some business owners, it makes sense to include more
            specific disclaimers. For example, a lawyer selling a course or
            templates might want to include a disclaimer making clear that the
            course/template is not legal advice and is not a substitute for
            legal advice.`}</p>
              <p>{`We’ve created this section so you can opt to include more specific
            disclaimers in your contracts. If you select any of the options
            below, we’ll include the relevant disclaimer in most of the
            documents you create.`}</p>
            </div>
            <div className="fields-container grid gap-5">
              {/* Disclaimer Options */}
              <DisclaimerOptions />

              <Disclaimers
                data={data}
                control={control}
                setValue={setValue}
              />
            </div>
          </div>
        </div>

        {!saving && (
          <button className="" type="submit">
            {submitText ?? "Save"}
          </button>
        )}
        {saving && (
          <button className="mt-5 opacity-50" type="submit" disabled>
            Saving...
          </button>
        )}
      </form>
    </>
  );
};

export default BusinessQuestions;
