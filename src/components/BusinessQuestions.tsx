"use client";
import { type BusinessProfile } from "@prisma/client";

import React, { useState, useEffect } from "react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";

import { states } from "~/import/province";
import Select, { type StylesConfig } from "react-select";

import Loading from "~/app/loading";

import { Help } from "./icons";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/shadcdn/dialog";

interface Props {
  businessProfile : BusinessProfile[]
}

interface selectType {
  label : string;
  value : string;
}

interface DialogProps {
  version: string;
  help: string;
}

type BusinessProfileFormValues = {
  businessName: string;
  ownerName: string;
  signerName: string;
  addressOne: string;
  addressTwo: string;
  city: string;
  state: {value: string, label: string};
  zip: string;
  website: string;
  choiceOfLaw: {value: string, label: string};
  choiceOfForum: "Arbitration" | "Court";
  enableFee: string;
};

export const BusinessQuestions: React.FC<Props> = ({
  businessProfile,
}) => {

  const [data, setData] = useState<BusinessProfile>();

  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control
  } = useForm<BusinessProfileFormValues>();

  useEffect(() => {

    if(businessProfile.length !== 0){
      setData(businessProfile[0]);
      setValue("addressOne", businessProfile[0].addressOne);
      setValue("businessName", businessProfile[0].businessName);
      setValue("ownerName", businessProfile[0].ownerName);
      setValue("signerName", businessProfile[0].signerName);
      setValue("addressTwo", businessProfile[0].addressTwo);
      setValue("city", businessProfile[0].city);
      setValue("state", {value : businessProfile[0].state, label : businessProfile[0].state});
      setValue("zip", businessProfile[0].zip);
      setValue("website", businessProfile[0].website);
      setValue("choiceOfLaw", {value : businessProfile[0].choiceOfLaw, label : businessProfile[0].choiceOfLaw});
      setValue("choiceOfForum", businessProfile[0].choiceOfForum);
      setValue("enableFee", businessProfile[0].enableFee);
    }
  }, [businessProfile, setValue]);

  const onSubmit: SubmitHandler<BusinessProfileFormValues> = async () => {

    if(businessProfile.length === 0){
      try {
        setLoading(true);
        const response = await fetch("/api/current_user/business_profile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          setLoading(false);
          throw new Error("Request failed with status ");
        }
        
        // Handle successful response
        console.log("Business profile saved successfully!");
        setLoading(false);
      } catch (error) {
        // Handle any errors
        // NotificationManager.error('Save Error');
        console.error(error);
        setLoading(false);
      }
    }
    else{
      try {
        setLoading(true);
        const response = await fetch("/api/current_user/update_business", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({id : businessProfile[0].id, data : data}),
        });
  
        if (!response.ok) {
          setLoading(false);
          throw new Error("Request failed with status ");
        }
  
        // Handle successful response
        console.log("Business profile saved successfully!");
        // NotificationManager.success('Update Success');
        setLoading(false);
      } catch (error) {
        // Handle any errors
        // NotificationManager.error('Update Error');
        console.error(error);
        setLoading(false);
      }
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, name } = e.target;
   
    if(name === "state" || name === "choiceOfLaw") {
      setData((prevData) => ({
        ...prevData,
        [name]: (value as selectType).label
      }));
    }
    else{
      setData((prevData) => ({
        ...prevData,
        [id]: value,
      }));
    }
  };

  const onChangeEnableHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prevData) => ({
      ...prevData,
      enableFee : e.target.value === "true"
    }));
  }

  const stateOptions = states.map((state) => ({
    value: state,
    label: state,
  }));

  const customStyles: StylesConfig<selectType, false> = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #ccc",
      borderRadius: "4px",
      boxShadow: "none",
      fontSize: "0.875rem",
      padding: '0 6px',
      "&:hover": {
        border: "1px solid #aaa",
        cursor: "pointer"
      }
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "2.4rem",
      padding: '0 6px'
    }),
    input: (provided) => ({
      ...provided,
      padding: '0 6px'
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#f0f0f0" : "white",
      color: state.isSelected ? "#333" : "#555",
      fontSize: "0.875rem",
      "&:hover": {
        backgroundColor: "#f0f0f0",
        color: "#333",
        cursor: "pointer"
      }
    })
  };

  if(loading){
    return(<Loading />);
  }

  const Popup = (clause: DialogProps) => {
    return (
      <Dialog>
        <DialogTrigger className="clause-meaning flex flex-row items-center gap-1 ml-4 mt-2"><Help/></DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <div className="grid grid-cols-1 divide-y gap-2">
              <DialogTitle className="text-center text-[22px] font-bold">{clause.version}</DialogTitle>
              <div className="dialog-description pt-[40px] text-center">
                <p dangerouslySetInnerHTML={{ __html: clause.help ?? 'Sorry this clause does not have any explainer yet.'}}></p>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <>
      <div className="justify-start rounded-2xl border border-purple-50 p-6 shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 divide-y gap-4">
            <div className="m-1 mb-3">
              <div className="flex item-center mb-5">
                <label className="text-[24px] font-bold" htmlFor="businessName">Business Name</label>
                <Popup version = "Business Name" help = "If the business is a sole proprietorship without a formal name, this should be the business owner's name." />
              </div>
              <input
                type="text"
                id="businessName"
                defaultValue={data ? data.businessName : ""}
                {...register("businessName", { required: true, onChange: (e: React.ChangeEvent<HTMLInputElement>) => {onChangeHandler(e);} })}
              />
              {errors.businessName && <span className="text-red text-[14px]">This field is required</span>} 
            </div>
            <div className="m-1 pt-5 grid md:grid-cols-2 grid-cols-1 gap-4">
              <div className="mb-3">
                <div className="mb-5 flex">
                  <label className="text-[24px] font-bold" htmlFor="ownerName">Owner Name</label>
                  <Popup version = "Owner Name" help = "Business Owner" />
                </div>
                <input
                  type="text"
                  id="ownerName"
                  value={data ? data.ownerName : ""}
                  {...register("ownerName", { required: true, onChange: (e: React.ChangeEvent<HTMLInputElement>) => {onChangeHandler(e)} })}
                />
                {errors.ownerName && <span className="text-red text-[14px]">This field is required</span>}
              </div>
              <div>
                <div className="mb-5 flex">
                  <label className="text-[24px] font-bold" htmlFor="signerName">Signer Name</label>
                  <Popup version = "Signer Name" help = "Full Name of person who signs contracts on behalf of the business" />
                </div>
                <input
                  type="text"
                  id="signerName"
                  value={data ? data.signerName : ""}
                  {...register("signerName", { required: true, onChange: (e: React.ChangeEvent<HTMLInputElement>) => {onChangeHandler(e)} })}
                />
                {errors.signerName && <span className="text-red text-[14px]">This field is required</span>}
              </div>
            </div>
            <div className="m-1 pt-5">
              <div className="mb-5 flex">
                <label className="text-[24px] font-bold">Business Address</label>
                <Popup version = "Business Address" help = " Use your home address if you run your business out of your home" />
              </div>
              <div className="mb-5 grid md:grid-cols-2 grid-cols-1 gap-4">
                <div>
                  <div className="mb-2">
                    <label htmlFor="addressOne">Address One <span className="text-red">*</span></label>
                  </div>
                  <input
                    type="text"
                    id="addressOne"
                    value={data ? data.addressOne : ""}
                    {...register("addressOne", { required: true, onChange: (e: React.ChangeEvent<HTMLInputElement>) => {onChangeHandler(e)} })}
                  />
                  {errors.addressOne && <span className="text-red text-[14px]">This field is required</span>}
                </div>
                <div>
                  <div className="mb-2">
                    <label htmlFor="addressTwo">Address Two</label>
                  </div>
                  <input
                    type="text"
                    id="addressTwo"
                    value={data ? data.addressTwo : ""}
                    {...register("addressTwo",{onChange: (e: React.ChangeEvent<HTMLInputElement>) => {onChangeHandler(e)}})}
                  />
                </div>
              </div>  
              <div className="m-1 mb-3 grid md:grid-cols-3 grid-cols-1 gap-4">
                <div>
                  <div className="mb-2">
                    <label htmlFor="city">City <span className="text-red">*</span></label>
                  </div>
                  <input
                    type="text"
                    id="city"
                    value={data ? data.city : ""}
                    {...register("city", { required: true, onChange: (e: React.ChangeEvent<HTMLInputElement>) => {onChangeHandler(e)} })}
                  />
                  {errors.city && <span className="text-red text-[14px]">This field is required</span>}
                </div>
                <div>
                  <div className="mb-2">
                    <label htmlFor="state">State/Province <span className="text-red">*</span></label>
                  </div>
                  <Controller
                      control={control}
                      name="state"
                      id="state"
                      value={data ? data.state : ""}
                      render={({ field }) => (
                        <Select
                          {...field}
                          styles={customStyles}
                          options={stateOptions}
                          isClearable
                          classNamePrefix="react-select"
                        />
                      )}
                      {...register("state", { required: true, onChange: (e: React.ChangeEvent<HTMLInputElement>) => {onChangeHandler(e)} })}
                    />
                  {errors.state && (
                    <span className="text-red text-[14px]">This field is required</span>
                  )}
                </div>
                <div>
                  <div className="mb-2">
                    <label htmlFor="zip">ZIP/Postal code <span className="text-red">*</span></label>
                  </div>
                  <input
                    type="text"
                    id="zip"
                    value={data ? data.zip : ""}
                    {...register("zip", { required: true, onChange: (e: React.ChangeEvent<HTMLInputElement>) => {onChangeHandler(e)} })}
                  />
                  {errors.zip && <span className="text-red text-[14px]">This field is required</span>}
                </div>
              </div>
            </div>
            <div className="m-1 pt-5 mb-3 grid md:grid-cols-2 grid-cols-1 gap-4">
              <div>
                <div className="mb-3 flex">
                  <label className="text-[24px] font-bold" htmlFor="choiceOfLaw">Choice of Law</label>
                  <Popup version = "Choice of Law" help = " Choose a state whose laws will govern contracts generated in Plainly Legal™" />
                </div>
                  <Controller
                      control={control}
                      name="choiceOfLaw"
                      id="choiceOfLaw"
                      value={data ? data.choiceOfLaw : ""}
                      render={({ field }) => (
                        <Select
                          {...field}
                          styles={customStyles}
                          options={stateOptions}
                          isClearable
                          classNamePrefix="react-select"
                        />
                      )}
                      {...register("choiceOfLaw", { required: true, onChange: (e: React.ChangeEvent<HTMLInputElement>) => {onChangeHandler(e)} })}
                    />
                {errors.choiceOfLaw && <span className="text-red text-[14px]">This field is required</span>}
              </div>
              <div>
                <div className="mb-3 flex">
                  <label className="text-[24px] font-bold" htmlFor="choiceOfForum">Choice of Forum</label>
                  <Popup version = "Choice of Forum" help = "Arbitration vs Court -  <strong>Arbitration:Arbitration is where you hire a private person to help you decide the outcome of a dispute rather than going to court. Typically, arbitration is decided more quickly than going to court, so you end up paying less money on lawyers down the line. You still have to pay the arbiter, but it’s decidedly less expensive than lawyers. This also protects you against class action lawsuits (e.g., your students pool together to sue you collectively). <strong><em>This is Bobby’s preferred method of settling disputes.</em></strong><br><br><strong>Court:</strong> This is the option you’ll choose if you want the court to settle disputes. With this option, you’ll need to hire a lawyer to represent you. This generally costs more money than arbitration and takes a lot more time." />
                </div>
                <div>
                  <select className="w-full border border-[#dddcdc] h-[2.5rem] rounded-[0.375rem] hover:cursor-pointer text-[0.875rem]" id="choiceOfForum" {...register("choiceOfForum", { required: true, onChange: (e: React.ChangeEvent<HTMLInputElement>) => {onChangeHandler(e)} })}>
                    <option value="Arbitration">Arbitration</option>
                    <option value="Court">Court</option>
                  </select>
                </div>
                <div>
                  {errors.choiceOfForum && <span className="text-red text-[14px]">This field is required</span>}
                </div>
              </div>
            </div>
            <div className="m-1 pt-3 mb-3 grid md:grid-cols-2 grid-cols-1 gap-4">
              <div>
                <div className="mb-3 flex">
                  <label className="text-[24px] font-bold" htmlFor="website">Website</label>
                  <Popup version = "Choice of Forum" help = "Business Website" />
                </div>
                <input
                  type="text"
                  id="website"
                  value={data ? data.website : ""}
                  {...register("website", { required: true, onChange: (e: React.ChangeEvent<HTMLInputElement>) => {onChangeHandler(e)} })}
                />
                {errors.website && <span className="text-red text-[14px]">This field is required</span>}
              </div>
              <div>
                <div className="mb-5 flex">
                  <label className="text-[24px] font-bold" htmlFor="enableFee">Enable Fee Shifting</label>
                  <Popup version = "Choice of Forum" help = " A fee shifting provision is a provision in contracts that will require the losing party of a dispute to pay the winner's legal fees. " />
                </div>
                <div className="mt-3 grid grid-cols-3 ml-3">
                  <div className="flex item-center">
                    <input
                      className="mr-2 hover:cursor-pointer w-[20px] h-[20px]"
                      type="radio"
                      value = "true"
                      checked = {data?.enableFee}
                      {...register("enableFee", { required: true, onChange: (e: React.ChangeEvent<HTMLInputElement>) => {onChangeEnableHandler(e)} })}
                    />
                    <label className="hover:cursor-pointer">
                      Yes
                    </label>
                  </div>
                  <div className="flex item-center">
                    <input
                      className="mr-2 hover:cursor-pointer w-[20px] h-[20px]"
                      type="radio"
                      value="false"
                      checked = {!(data?.enableFee??true)}
                      {...register("enableFee", { required: true, onChange: (e: React.ChangeEvent<HTMLInputElement>) => {onChangeEnableHandler(e)} })}
                    />
                    <label className="hover:cursor-pointer">
                      No
                    </label>
                   </div>
                </div>
                {errors.enableFee && <span className="text-red text-[14px]">This field is required</span>}
              </div>
            </div>
          </div>
          <button className="mt-5" type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default BusinessQuestions;
