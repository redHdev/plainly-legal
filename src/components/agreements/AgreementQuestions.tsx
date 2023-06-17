"use client";

import React, { useState, useRef, useEffect } from "react";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { motion as m } from "framer-motion";
import replaceText from '~/utils/replaceText';

import {
  createDynamicContractQuestionsSchema,
  type liveFormData,
} from "~/types/forms";
import type { FullContracts } from "~/types/contracts";
import ContractQuestion from "./ContractQuestion";
import onPromise, { timeout } from "~/utils/helpers";
import type { completionData } from "~/types/forms";
import ShouldRenderField from "~/data/conditional";
import BackButton from "~/components/ui/BackButton";

interface Props {
  agreement: FullContracts;
  onCompletion?: (data: liveFormData) => void;
}

export const AgreementQuestions: React.FC<Props> = ({
  agreement,
  onCompletion,
}) => {
  const contractQuestions = agreement.contractQuestions;
  const dynamicFormSchema =
    createDynamicContractQuestionsSchema(contractQuestions);

  type FormType = z.infer<typeof dynamicFormSchema>;

  const {
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormType>({
    resolver: zodResolver(dynamicFormSchema),
    shouldUnregister: true,
  });

  const formref = useRef<HTMLFormElement>(null);
  const [slideCompletion, setSlideCompletion] = useState<completionData>({});
  const formData = watch();

  // Log errors if any
  if (Object.keys(errors).length > 0) {
    console.log("Errors:", errors);
  }

  // Update formResults state upon form submission
  const onSubmit: SubmitHandler<FormType> = (data) => {
   
    //add agreement_title to the data
    data.agreement_title = replaceText(agreement.agreementTitle, data, 3, true);

    if (onCompletion) {
      onCompletion(data);
    }
    
  };

  let currentSlide: string | null = null;

  // Generate questions for each slide
  const slideQuestions = contractQuestions.map((question, index) => {
    // // Force index to start at 1 to make room for the hardcoded user_agreement_name field
    // index = index == 0 ? index + 1 : index;

    const shouldRender = question.conditionals
      ? ShouldRenderField(question.conditionals, formData)
      : true;

    // Handle question rendering based on conditional check
    if (!shouldRender) {
      if (slideCompletion[question.variable]) {
        const updatedSlideCompletion = { ...slideCompletion };
        delete updatedSlideCompletion[question.variable];
        setSlideCompletion(updatedSlideCompletion);
      }
      return null;
    }

    // If currentSlide is not set and question is not in slideCompletion, set as currentSlide
    if (!currentSlide && !slideCompletion[question.variable]) {
      currentSlide = question.id;
    }

    return (
      <Controller
        key={question.id}
        name={question.variable}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ContractQuestion
            field={field}
            question={question}
            onCompletion={async () => {
              await timeout(400);
              setSlideCompletion((prev) => ({
                ...prev,
                [question.variable]: true,
              }));
            }}
            value=""
            hidden={currentSlide !== question.id}
            index={index}
          >
            {index !== 0 && (
              <BackButton
                onClick={() => {
                  let backCompleted = false;
                  let currentIndex = index - 1;

                  while (!backCompleted) {
                    const previousQuestion =
                      contractQuestions[currentIndex]?.variable;

                    if (previousQuestion == null) {
                      throw new Error("Could not return to previous question");
                    }

                    if (slideCompletion[previousQuestion] === undefined) {
                      currentIndex = currentIndex - 1;
                      continue;
                    }

                    const newSlideCompletion = { ...slideCompletion };
                    delete newSlideCompletion[previousQuestion];
                    setSlideCompletion(newSlideCompletion);

                    backCompleted = true;
                  }
                }}
              />
            )}
          </ContractQuestion>
        )}
      />
    );
  });

  //Only run this function once to signify completion when the current slide changes
  useEffect(() => {
    if (!currentSlide && formref.current) {
      formref.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  }, [currentSlide]);

  // const userAgreementNameQuestion: FullContractQuestions = {
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
    <>
      <m.form
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
        {/* <Controller
          key={userAgreementNameQuestion.id}
          name={userAgreementNameQuestion.variable}
          control={control}
          defaultValue=""
          render={({ field }) => (
            <ContractQuestion
              field={field}
              question={userAgreementNameQuestion}
              onCompletion={async () => {
                await timeout(400);
                setSlideCompletion((prev) => ({
                  ...prev,
                  [userAgreementNameQuestion.variable]: true,
                }));
              }}
              value=""
              hidden={false}
              index={0}
            ></ContractQuestion>
            // <InputGroup />
          )}
        /> */}
        {slideQuestions}

        {/* <div className="flex justify-end">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Submit
          </button>
        </div> */}
      </m.form>
    </>
  );
};

export default AgreementQuestions;
