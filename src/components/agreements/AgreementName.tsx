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
    formState: { errors, isSubmitting },
  } = useForm<FormType>({
    resolver: zodResolver(userAgreementNameSchema),
    shouldUnregister: true,
  });

  const formref = useRef<HTMLFormElement>(null);
  // const [slideCompletion, setSlideCompletion] = useState<completionData>({});

  // Log errors if any
  if (Object.keys(errors).length > 0) console.log("Errors:", errors);

  // Update formResults state upon form submission
  const onSubmit: SubmitHandler<FormType> = (data) => {
    if (onCompletion) onCompletion(data.users_agreement_name);
  };

  // const userAgreementNameQuestion = {
  //   id: "users_agreement_name",
  //   key: 1234567890, // dummy key
  //   group: "default_fields",
  //   variable: "users_agreement_name",
  //   text: "What would you like to name this agreemet?",
  //   help: "This is the name of the agreement",
  //   inputType: "RADIO",
  //   inputOptions: [],
  //   conditionals: [],
  // };

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
      className="mx-auto grid w-full max-w-xl gap-8"
    >
      <div
        className={`col-span-1 flex-col gap-3`}
        role="group"
        aria-labelledby="users_agreement_name-label"
      >
        <div className="pl-shadow flex flex-col items-center gap-5 rounded-2xl p-6">
          <span
            id={`users_agreement_name-label`}
            className="text-center text-lg"
          >
            What would you like to name your agreement?
          </span>
          <label
            role="group"
            aria-labelledby="users_agreement_name-label"
            className="relative w-full"
          >
            <input
              type="text"
              {...register("users_agreement_name")}
              placeholder={""}
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
      <input type="submit" className="cursor-pointer" value={"Continue"} disabled={isSubmitting} />
    </m.form>
  );
};
