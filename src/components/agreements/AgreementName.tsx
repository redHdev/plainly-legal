"use client";

import React, { useRef } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion as m } from "framer-motion";

// import { type liveFormData } from "~/types/forms";
import onPromise from "~/utils/helpers";

interface Props {
  onCompletion?: (data: string) => void;
}

export const AgreementName: React.FC<Props> = ({ onCompletion }) => {
  const userAgreementNameSchema = z.object({
    users_agreement_name: z.string().min(4, "Must be at least 4 characters"),
  });

  type FormType = z.infer<typeof userAgreementNameSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(userAgreementNameSchema),
    shouldUnregister: true,
  });

  const formref = useRef<HTMLFormElement>(null);
  const [disabled, setDisabled] = React.useState<boolean>(false);

  // Log errors if any
  if (Object.keys(errors).length > 0) console.log("Errors:", errors);

  // Update formResults state upon form submission
  const onSubmit: SubmitHandler<FormType> = (data) => {
    //Disable the button so it's not pressed twice
    setDisabled(true);

    // Run the onCompletion callback if it exists
    if (onCompletion) onCompletion(data.users_agreement_name);
  };

  return (
    <m.form
      key={"users_agreement_name"}
      initial={{ opacity: 0, y: 100 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.4,
        },
      }}
      ref={formref}
      onSubmit={onPromise({ promise: handleSubmit(onSubmit) })}
      className="mx-auto grid w-full max-w-xl gap-8 py-14"
    >
      <div
        className={`col-span-1 flex-col gap-3`}
        role="group"
        aria-labelledby="users_agreement_name-label"
      >
        <div className="flex flex-col items-center gap-5">
          <h4 id={`users_agreement_name-label`} className="mb-0 text-center">
            {`Let's give this agreement a file name`}
          </h4>
          <label
            role="group"
            aria-labelledby="users_agreement_name-label"
            className="relative w-full"
          >
            <input
              type="text"
              {...register("users_agreement_name")}
              placeholder={
                "Agreement for John Doe - Winter " + new Date().getFullYear()
              }
            />

            {/* Show the error if present */}
            {errors.users_agreement_name && (
              <m.span
                initial={{
                  opacity: 0,
                  y: 0,
                }}
                animate={{
                  opacity: 1,
                  y: "100%",
                  transition: {
                    duration: 0.25,
                    ease: "easeOut",
                  },
                }}
                exit={{ opacity: 0 }}
                role="alert"
                className="absolute -bottom-0.5 left-0 block w-full text-center text-sm text-red"
              >
                {errors.users_agreement_name?.message}
              </m.span>
            )}
          </label>
        </div>
      </div>
      <input
        type="submit"
        className="cursor-pointer"
        value={"Continue"}
        disabled={disabled}
      />
    </m.form>
  );
};
