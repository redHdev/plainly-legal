"use client";

import React, { useState, useRef, useEffect } from "react";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { motion as m } from "framer-motion";
import replaceText from "~/utils/replaceText";

import {
  createDynamicContractQuestionsSchema,
  type liveFormData,
} from "~/types/forms";
import type { FullContracts } from "~/types/contracts";
import ContractQuestion from "./ContractQuestion";
import onPromise, { timeout } from "~/utils/helpers";
import type { completionData } from "~/types/forms";
import ShouldRenderField from "~/utils/conditionals";
import BackButton from "~/components/ui/BackButton";
import { type InputJsonValueType } from "prisma/generated/zod";

interface Props {
  agreement: FullContracts;
  onCompletion?: (data: InputJsonValueType) => void;
  prefillCompletion: completionData;
  agreementPrefills: liveFormData;
}

export const AgreementQuestions: React.FC<Props> = ({
  agreement,
  onCompletion,
  prefillCompletion,
  agreementPrefills,
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
  const [slideCompletion, setSlideCompletion] =
    useState<completionData>(prefillCompletion);
  const formData = watch();

  //Push the agreement variables into the agreement data so we can use agreement level variables to determine clause visibility
  const parsedVariables = agreement.variables as liveFormData;
  const formDataFull = {
    ...formData,
    ...parsedVariables,
    ...agreementPrefills,
  } as liveFormData; //Full form data is the current answered questions, plus any other global variables in the agreement or global scope

  // Log errors if any
  if (Object.keys(errors).length > 0) {
    console.log("Errors:", errors);
  }

  // Update formResults state upon form submission
  const onSubmit: SubmitHandler<FormType> = (data) => {
    //add agreement_title to the data
    data.agreement_title = replaceText(
      agreement.agreementTitle,
      data,
      3,
      false,
    );
    if (onCompletion) {
      onCompletion(data);
    }
  };

  //We want to show the questions in the right order because the database relationals will not link them in the order they are input. reOrder the questions to the same order they are in in the contractQuestionOrder array
  const contractQuestionsOrder = agreement.contractQuestionOrder as number[];
  const orderedQuestions = contractQuestionsOrder
    .map((orderKey) =>
      contractQuestions.find((clause) => clause.key === orderKey),
    ) // map orderBy keys to their clauses
    .filter(Boolean) // remove any undefined items, just in case a key in orderBy doesn't have a corresponding clause
    .concat(
      contractQuestions.filter(
        (clause) => !contractQuestionsOrder.includes(clause.key),
      ),
    ); // append any clauses not in orderBy to the end

  //Create a variable to hold the current slide
  let currentSlide: string | null = null;

  // Generate questions for each slide
  const slideQuestions = orderedQuestions.map((question, index) => {
    if (!question) throw new Error("Question was expected but not found");

    //If we should not render the slide, return null
    const shouldRender = question.conditionals
      ? ShouldRenderField(question.conditionals, formDataFull)
      : true;
    if (!shouldRender) return null;

    // If currentSlide is not set and question is not in slideCompletion, set as currentSlide
    if (!currentSlide && !slideCompletion[question.variable])
      currentSlide = question.id;

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
            onCompletion={() => {
              void timeout(400).then(() => {
                setSlideCompletion((prev) => ({
                  ...prev,
                  [question.variable]: true,
                }));
              });
            }}
            value=""
            hidden={currentSlide !== question.id}
            index={index}
          >
            {index !== 0 && (
              <BackButton
                className="rounded-none border-none bg-transparent p-0 underline hover:bg-transparent"
                onClick={() => {
                  let backCompleted = false;
                  let currentIndex = index - 1;

                  while (!backCompleted) {
                    const previousQuestion =
                      orderedQuestions[currentIndex]?.variable;

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
        new Event("submit", { cancelable: true, bubbles: true }),
      );
    }
  }, [currentSlide]);

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
        className="mx-auto grid w-full max-w-xl gap-8 py-14"
      >
        {slideQuestions}
      </m.form>
    </>
  );
};

export default AgreementQuestions;
