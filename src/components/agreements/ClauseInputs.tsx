"use client";
import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useLayoutEffect,
} from "react";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { motion as m } from "framer-motion";

import { createDynamicClauseSchema } from "~/types/forms";
import type { FullClauses, FullContracts } from "~/types/contracts";
import ContractInput from "./ContractInput";
import onPromise, { timeout } from "~/utils/helpers";
import type {
  completionData,
  liveFormData,
  AgreementData,
} from "~/types/forms";
import ShouldRenderField from "~/utils/conditionals";
import { type ClauseQuestions, type Clauses } from "@prisma/client";
import {
  replaceAgreementText,
  checkAndReplaceBraces,
} from "~/utils/replaceText";
import doStringMath from "~/utils/doStringMath";
import { cn } from "~/utils/cn";
import "~/styles/clauseInputStyles.css";
import { type InputJsonValueType } from "prisma/generated/zod";

interface Props {
  agreement: FullContracts;
  //contractQuestionAnswers is an object of strings
  agreementData: AgreementData;
  onCompletion?: (
    clauseAnswers: InputJsonValueType,
    clauses: Clauses[],
    calculations: InputJsonValueType,
  ) => void;
  agreementPrefills: liveFormData;
  prefillCompletion: completionData;
}

interface strippedClauseInputs {
  question: ClauseQuestions;
  clause: Clauses;
}

const ClauseInputs: React.FC<Props> = ({
  agreement,
  agreementData,
  onCompletion,
  prefillCompletion,
  agreementPrefills,
}) => {
  const clauses = agreement.clauses;

  //Push the agreement variables into the agreement data so we can use agreement level variables to determine clause visibility
  const parsedVariables = agreement.variables as liveFormData;
  const contractQuestionAnswers = {
    ...agreementData.data_questions,
    ...parsedVariables,
    ...agreementPrefills,
  };

  //To start, we should map through the clauses to remove any clause questions that have key function=calculate
  //This is because we will not be able to calculate the value of the clause until all the questions are answered
  //We will add them back in later
  const calculateQuestions: ClauseQuestions[] = [];
  const clausesWithoutCalculate: FullClauses[] = [];
  clauses.map((clause) => {
    //Check if the clause should even be an option to show
    const filteredQuestions = clause.questions.filter(
      (question) => question.function !== "calculate",
    );

    //push the clause to the array of clauses without calculate fields
    clausesWithoutCalculate.push({ ...clause, questions: filteredQuestions });

    //push the calculate questions to the array of calculate questions
    const calculateQuestionsArray = clause.questions.filter(
      (question) => question.function === "calculate",
    );
    calculateQuestionsArray.map((question) => {
      calculateQuestions.push(question);
    });
  });

  // For each clause, remove the clause.questions that will already be answered in a previous question This is to prevent asking the same question twice.
  // however, we cannot just grab all unique questions, because we want to show the clause to the right of the question that answers it.
  // With this solution, we will just show the first instance of the question, and ignore the rest.

  // const fullClauseQuestions: strippedClauseInputs[] = [];
  const fullClauseQuestions = useMemo(() => {
    // ... Your existing initialization logic ...
    // ... Return the constructed array ...
    const constructedArray: strippedClauseInputs[] = [];
    return constructedArray;
  }, []);

  const activeClauses: Clauses[] = [];

  // for each clause, get the questions that are already answered
  clausesWithoutCalculate.map((clause) => {
    //Check if the clause should even be an option to show
    if (!ShouldRenderField(clause.clauseConditionals, contractQuestionAnswers))
      return false;

    // if the clause is not already in the list of active clauses, add it
    if (!activeClauses.some((record) => record.id === clause.id)) {
      activeClauses.push(clause);
    }

    //Order the questions in the clause based on which variable shows up in the clause text
    const sortedClauses = [...clause.questions].sort((a, b) => {
      const aIndex = clause.text.indexOf(a.variable);
      const bIndex = clause.text.indexOf(b.variable);
      if (aIndex < bIndex) {
        return -1;
      } else if (aIndex > bIndex) {
        return 1;
      } else {
        return 0;
      }
    });

    // for each question, check if it is already answered
    sortedClauses.map((question) => {
      // if the question id is already in the list of answered questions as a array key return false
      if (
        fullClauseQuestions.some((record) => record.question.id === question.id)
      )
        return false;

      // if the question is not already answered, add it to the list of answered questions and return true
      fullClauseQuestions.push({
        question,
        clause,
      });
      return true;
    });
  });

  const dynamicFormSchema = createDynamicClauseSchema();
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
  const agreementPreviewRef = useRef<HTMLDivElement>(null);
  const activeClauseRef = useRef<HTMLDivElement>(null);
  const [slideCompletion, setSlideCompletion] =
    useState<completionData>(prefillCompletion);
  const formData = watch();

  //Create live agreement data, which sofar is the agreement data, with the addition of live data from our inputs.
  const liveAgreementDataWNoCalculations = {
    ...structuredClone(agreementData),
    data_clause_answers: { ...formData },
  };

  //Construct live input calculations based on inputs
  const calculations = {
    ...fillCalculations(calculateQuestions, liveAgreementDataWNoCalculations),
  };

  //Fill calculations to the live agreement data, this will be used to show things like prices calculated from the inputs in real time.
  const liveAgreementData = {
    ...liveAgreementDataWNoCalculations,
    data_clause_calculations: calculations,
  };

  //This is because we need to calculate the value of some inputs, based on other inputs
  function fillCalculations(
    calculateQuestions: ClauseQuestions[],
    liveAgreementDataWNoCalculations: AgreementData,
  ) {
    const calculations = {} as liveFormData;
    calculateQuestions.map((question) => {
      calculations[question.variable] = checkAndReplaceBraces(
        doStringMath(
          replaceAgreementText(
            question.prompt,
            liveAgreementDataWNoCalculations,
            4,
            false,
            agreementPrefills,
          ),
        ),
      );
    });
    return calculations;
  }

  // Log errors if any
  if (Object.keys(errors).length > 0) console.log("Errors:", errors);
  // Update formResults state upon form submission
  const onSubmit: SubmitHandler<FormType> = () => {
    //remove any keys that don't have a value
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") delete formData[key];
    });

    if (onCompletion) {
      const onCompletionFormData = formData as liveFormData;
      onCompletion(
        { ...onCompletionFormData, ...agreementPrefills } as InputJsonValueType,
        activeClauses,
        calculations as InputJsonValueType,
      );
    }
  };

  let currentSlide = null as string | null;
  let currentClause = null as string | null;

  const inputRefs = useRef<React.RefObject<HTMLInputElement>[]>([]);
  useEffect(() => {
    inputRefs.current = fullClauseQuestions.map(
      (_, index) => inputRefs.current[index] ?? React.createRef(),
    );
  }, [fullClauseQuestions]);

  // Generate questions for each slide
  const clauseInputs = fullClauseQuestions.map((inputObject, index) => {
    const question = inputObject.question;
    const clause = inputObject.clause;

    // If no currentSlide set and question not in slideCompletion, set it as currentSlide
    if (!currentSlide && !slideCompletion[question.variable]) {
      currentSlide = question.id;
      currentClause = clause.id;
    }

    const focusFunc = () => {
      const timeoutId = setTimeout(() => {
        if (
          inputRefs &&
          inputRefs.current[index] &&
          inputRefs.current[index]?.current
        ) {
          const currentInput = inputRefs.current[index]?.current;
          if (currentInput) {
            currentInput.focus();
          }
        }
      }, 500);

      return () => clearTimeout(timeoutId);
    };

    focusFunc();

    return (
      <Controller
        key={question.id}
        name={question.variable}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <ContractInput
            field={field}
            agreementData={liveAgreementData}
            question={question}
            value=""
            hidden={currentSlide !== question.id}
            isFirstSlide={index === 0}
            isLastSlide={index === fullClauseQuestions.length - 1}
            inputRef={inputRefs.current[index]}
            onCompletion={() => {
              void timeout(400).then(() => {
                setSlideCompletion((prev) => ({
                  ...prev,
                  [question.variable]: true,
                }));
              });
            }}
            onBack={() => {
              let backCompleted = false;
              let currentIndex = index - 1;

              //Yep this is horrible. I'm sorry. I'll fix it later. I promise. Maybe
              while (!backCompleted) {
                //Skip any questions that are prefills
                let prefill = true;
                let previousQuestion = undefined;
                while (prefill) {
                  previousQuestion =
                    fullClauseQuestions[currentIndex]?.question?.variable;

                  if (previousQuestion == null) {
                    throw new Error("Could not return to previous question");
                  }

                  //Check if the previous question is a prefill question
                  if (agreementPrefills[previousQuestion] !== undefined) {
                    currentIndex = currentIndex - 1;
                    continue;
                  }

                  prefill = false;
                }

                //Confirm that the previous question is valid
                if (previousQuestion == null) {
                  throw new Error("Could not return to previous question");
                }

                //If the completion is undefined, this is a question that was unmounted due to a conditional, so we need to go back further
                if (slideCompletion[previousQuestion] === undefined) {
                  currentIndex = currentIndex - 1;
                  continue;
                }

                //We are here! go back to this question
                const newSlideCompletion = { ...slideCompletion };
                delete newSlideCompletion[previousQuestion];
                setSlideCompletion(newSlideCompletion);

                backCompleted = true;
              }
            }}
          ></ContractInput>
        )}
      />
    );
  });

  useEffect(() => {
    if (!currentSlide && formref.current) {
      formref.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );
    }
  }, [currentSlide]);

  //Anytime a new input is completed we want to scroll to the next input
  useLayoutEffect(() => {
    if (activeClauseRef.current === null) return;

    //Get the first element with the active clause class
    const activeClause = activeClauseRef.current.querySelector(
      ".active-input",
    ) as HTMLElement;

    //Scroll the active clause into view
    if (activeClause) {
      const { top } = activeClause.getBoundingClientRect();

      agreementPreviewRef.current?.scrollTo({
        top: top + agreementPreviewRef.current.scrollTop - 300,
        behavior: "smooth",
      });
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
        className="mx-auto grid w-full max-w-screen-2xl pt-10"
      >
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="order-1 mx-auto grid w-full max-w-xl pb-16 pt-10 lg:order-none lg:col-span-5 lg:pt-16">
            {clauseInputs}
          </div>

          <div
            ref={agreementPreviewRef}
            className={cn(
              "border-gray relative h-full overflow-hidden rounded border bg-white shadow-lg lg:col-span-7",
              // "pb-[90%]" // Will probably deprecate this
            )}
            // style={{ paddingBottom: "90%" }}
          >
            <div
              className={cn(
                "px-5 py-10 text-sm md:px-10",
                "max-h-[calc(100svh-6rem-200px)]",
                "lg:max-h-[calc(100svh-6rem-40px)]",
                // "absolute inset-0 "
              )}
            >
              <div className="mb-5 text-center text-2xl font-bold">
                {agreement.name}
              </div>
              {activeClauses.map((clause) => {
                let clauseText = clause.text ?? "";

                // Get the current question variable from the fullClauseQuestions
                const currentQuestionVar = fullClauseQuestions
                  .find(
                    (questionArray) =>
                      questionArray.question.id === currentSlide,
                  )
                  ?.question?.variable.trim();

                //find the variable in the text and replace it with a highlighted span with an underline
                if (
                  currentQuestionVar &&
                  typeof currentQuestionVar === "string"
                ) {
                  clauseText =
                    clause.text?.replace(
                      `{${currentQuestionVar}}`,
                      `<span class="active-input bg-[#FDD835]/30">{${currentQuestionVar}}</span>`,
                    ) ?? "";
                }

                const newText: string = replaceAgreementText(
                  clauseText,
                  liveAgreementData,
                  2,
                  true,
                  agreementPrefills,
                  [
                    "border-b-[1px]",
                    "border-light_purple-900",
                    "min-w-[75px]",
                  ],
                );

                return (
                  <div
                    className={cn(
                      "preview-clause leading-7",
                      currentClause !== clause.id
                        ? "blur-sm filter"
                        : "active-clause py-10",
                    )}
                    key={clause.id}
                    ref={
                      currentClause === clause.id ? activeClauseRef : undefined
                    }
                    dangerouslySetInnerHTML={{ __html: newText ?? "" }}
                  ></div>
                );
              })}
              <div className="pb-52"></div>
              <div className="pb-52"></div>
              <div className="pb-52"></div>
            </div>
          </div>
        </div>
      </m.form>
    </>
  );
};

export default ClauseInputs;
