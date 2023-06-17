"use client";
import React, { useState, useRef, useEffect } from "react";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { motion as m } from "framer-motion";

import { createDynamicClauseSchema } from "~/types/forms";
import type { FullContracts } from "~/types/contracts";
import ContractInput from "./ContractInput";
import onPromise, { timeout } from "~/utils/helpers";
import type {
  completionData,
  liveFormData,
  AgreementData,
} from "~/types/forms";
import ShouldRenderField from "~/data/conditional";
import { type ClauseQuestions, type Clauses } from "@prisma/client";
import { replaceAgreementText } from "~/utils/replaceText";

interface Props {
  agreement: FullContracts;
  //contractQuestionAnswers is an object of strings
  agreementData: AgreementData;
  onCompletion?: (clauseAnswers: liveFormData, clauses: Clauses[] ) => void;
}

interface strippedClauseInputs {
  question: ClauseQuestions;
  clause: Clauses;
}
[];

const ClauseInputs: React.FC<Props> = ({
  agreement,
  agreementData,
  onCompletion,
}) => {
  const clauses = agreement.clauses;
  const contractQuestionAnswers = agreementData.data_questions;

  // For each clause, remove the clause.questions that will already be answered in a previous question This is to prevent asking the same question twice.
  // however, we cannot just grab all unique questions, because we want to show the clause to the right of the question that answers it.
  // With this solution, we will just show the first instance of the question, and ignore the rest.
  const fullClauseQuestions: strippedClauseInputs[] = [];
  const activeClauses: Clauses[] = [];

  // for each clause, get the questions that are already answered
  clauses.map((clause) => {
    //Check if the clause should even be an option to show
    if (
      !ShouldRenderField(clause.clauseConditionals, contractQuestionAnswers)
    ) {
      return false;
    }

    // if the clause is not already in the list of active clauses, add it
    if (!activeClauses[clause.key]) {
      //push to the array of active clauses not as the key
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
      // if the question key is already in the list of answered questions as a array key return false
      if (fullClauseQuestions[question.key]) return false;
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
  const [slideCompletion, setSlideCompletion] = useState<completionData>({});
  const formData = watch();
  const liveAgreementData = {
    ...structuredClone(agreementData),
    data_clause_answers: { ...formData },
  };

  // Log errors if any
  if (Object.keys(errors).length > 0) console.log("Errors:", errors);

  // Update formResults state upon form submission
  const onSubmit: SubmitHandler<FormType> = () => {
    //remove any keys that don't have a value
    Object.keys(formData).forEach((key) => {
      if (formData[key] === "") delete formData[key];
    });

    if (onCompletion) {
      onCompletion(formData, activeClauses );
    }
  };

  let currentSlide = null as string | null;
  let currentClause = null as string | null;

  // Generate questions for each slide
  const clauseInputs = fullClauseQuestions.map((inputObject, index) => {
    const question = inputObject.question;
    const clause = inputObject.clause;

    // If no currentSlide set and question not in slideCompletion, set it as currentSlide
    if (!currentSlide && !slideCompletion[question.variable]) {
      currentSlide = question.id;
      currentClause = clause.id;
    }

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
            onCompletion={async () => {
              await timeout(400);
              setSlideCompletion((prev) => ({
                ...prev,
                [question.variable]: true,
              }));
            }}
            onBack={() => {
              let backCompleted = false;
              let currentIndex = index - 1;

              while (!backCompleted) {
                const previousQuestion =
                  fullClauseQuestions[currentIndex]?.question?.variable;

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
          ></ContractInput>
        )}
      />
    );
  });

  useEffect(() => {
    if (!currentSlide && formref.current) {
      formref.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
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
        className="mx-auto grid w-full"
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="mx-auto grid w-full max-w-xl pt-16">
            {clauseInputs}
          </div>

          <div
            ref={agreementPreviewRef}
            className="pointer-events-none relative h-full overflow-hidden border border-black bg-white p-4 shadow-lg"
            style={{ paddingBottom: "90%" }}
          >
            <div className="absolute inset-0 p-10 text-sm">
              <div className="mb-4 pb-4 text-center text-2xl font-bold">
                {agreement.name}
              </div>
              {activeClauses.map((clause) => {
                const ref =
                  currentClause === clause.id
                    ? (element: HTMLElement | null) => {
                        if (element) {
                          const scrollOffset = element.offsetTop;

                          agreementPreviewRef.current?.scrollTo({
                            top: scrollOffset - 100,
                            behavior: "smooth",
                          });
                        }
                      }
                    : null;

                let clauseText = clause.text ?? "";

                // Get the current question variable from the fullClauseQuestions
                const currentQuestionVar = fullClauseQuestions
                  .find(
                    (questionArray) =>
                      questionArray.question.id === currentSlide
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
                      `<span class="underline bg-yellow">{${currentQuestionVar}}</span>`
                    ) ?? "";
                }

                const newText: string = replaceAgreementText(
                  clauseText,
                  liveAgreementData,
                );

                return (
                  <div
                    ref={ref}
                    className={
                      currentClause !== clause.id
                        ? "preview-clause blur-sm filter"
                        : "preview-clause active-clause pb-10 pt-10"
                    }
                    key={clause.id}
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
