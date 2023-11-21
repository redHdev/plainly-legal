"use client";

import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import type { SavedAgreements, Clauses } from "@prisma/client";
import { useAction } from "next-safe-action/hook";

import AgreementQuestions from "./AgreementQuestions";
import { type FullContracts } from "~/types/contracts";
import ClauseInputs from "./ClauseInputs";
import EditClauses from "./EditClauses";
import type { liveFormData, AgreementData } from "~/types/forms";
import { actionUpsertAgreement } from "~/data/server_actions";
import { AgreementName } from "./AgreementName";
import { materializeAgreement } from "./materializeAgreement";
import { cn } from "~/utils/cn";
import { useUserMeta } from "~/UserMetaProvider";

//Import global keys that are filled into all agreements
import { globalText } from "~/data/globalText";
import { type InputJsonValueType } from "prisma/generated/zod";

interface Props {
  agreement: FullContracts;
  userId: string;
  savedAgreement?: SavedAgreements;
  onComplete?: (agreement: SavedAgreements) => void;
}

// Set up state
export const AgreementGenerator = ({
  agreement,
  userId,
  savedAgreement,
  onComplete,
}: Props) => {
  // Set up Server Actions
  const { execute, result, status } = useAction(actionUpsertAgreement);

  // Get the user's prefills and completion preferences
  const { agreementPrefills, prefillCompletion } = useUserMeta();

  // Set up state
  const [agreementData, setAgreementData] = useState<AgreementData>({
    id: savedAgreement?.id ?? "",
    user_id: userId,
    user_defined_name: savedAgreement?.user_defined_name ?? "",
    agreement_variables: agreement.variables as liveFormData,
    data_questions: (savedAgreement?.data_questions as liveFormData) ?? {},
    data_clauses: (savedAgreement?.data_clauses as Clauses[]) ?? {},
    data_clause_answers:
      (savedAgreement?.data_clause_answers as liveFormData) ?? {},
    data_clause_calculations:
      (savedAgreement?.data_clause_calculations as liveFormData) ?? {},
    data_contract_edits:
      (savedAgreement?.data_contract_edits as liveFormData) ?? {},
    completed: savedAgreement?.completed ?? false,
    globalText: globalText,
  });

  //When we get a valid id, we should push the correct route to the window
  useEffect(() => {
    if (result?.data?.message?.id) {
      window.history.pushState(
        {},
        "",
        `/agreements/${result?.data?.message?.id}`,
      );
    }
  }, [result?.data?.message?.id]);

  // Updates state upon 'data' (variable) is updated - which is after we mutate data / talk to the database
  useEffect(() => {
    const id = result?.data?.message?.id;

    if (!id) return;

    setAgreementData((prevState) => ({
      ...prevState,
      id: id,
      user_defined_name: result?.data?.message?.user_defined_name as string,
      data_questions: result?.data?.message?.data_questions as liveFormData,
      data_clause_answers: result?.data?.message
        ?.data_clause_answers as liveFormData,
      data_clauses: result?.data?.message?.data_clauses as Clauses[],
      data_contract_edits: result?.data?.message
        ?.data_contract_edits as liveFormData,
      data_clause_calculations: result?.data?.message
        .data_clause_calculations as liveFormData,
    }));

    //Check if the agreement is completed
    if (result?.data?.message?.completed) {
      //If it is, call the onComplete function
      if (onComplete) onComplete(result.data.message);
    }
  }, [result, onComplete]);

  // Creates new row in the database after the <AgreementQuestions /> form is completed
  function namingDataHandler(name: string) {
    execute({
      user_id: userId,
      user_defined_name: name,
      agreement_variables: agreement.variables as InputJsonValueType,
      agreement: agreement.slug,
    });
  }

  // Creates new row in the database after the <AgreementQuestions /> form is completed
  function questionDataHandler(formData: InputJsonValueType) {
    if (!agreementData.id) throw new Error("Agreement Data ID is not defined");

    execute({
      id: agreementData.id,
      user_id: userId,
      user_defined_name: agreementData.user_defined_name,
      agreement: agreement.slug,
      data_questions: formData as InputJsonValueType,
    });
  }

  // Updates same row in the database after the <ClauseInputs /> form is completed
  function clauseInputDataHandler(
    clauseAnswers: InputJsonValueType,
    clauses: Clauses[],
    calculations: InputJsonValueType,
  ) {
    if (!agreementData.id) throw new Error("Agreement Data ID is not defined");
    execute({
      id: agreementData.id,
      user_id: userId,
      user_defined_name: agreementData.user_defined_name,
      agreement: agreement.slug,
      data_clause_answers: clauseAnswers as InputJsonValueType,
      data_clauses: clauses,
      data_clause_calculations: calculations as InputJsonValueType,
    });
  }

  // Creates new row in the database after the <AgreementQuestions /> form is completed
  function editClauseHandler(formData: liveFormData) {
    if (!agreementData.id) throw new Error("Agreement Data ID is not defined");

    //Remove Undefined Values
    Object.keys(formData).forEach((key) => {
      if (formData[key] === undefined) {
        delete formData[key];
      }
    });

    execute({
      id: agreementData.id,
      user_id: userId,
      user_defined_name: agreementData.user_defined_name,
      agreement: agreement.slug,
      data_contract_edits: formData as InputJsonValueType,
    });
  }

  // Complete the contract when the edits are complete
  function clauseEditsCompleteHandler() {
    if (!agreementData.id) throw new Error("Agreement Data ID is not defined");

    //Materialize the agreement
    const materializedAgreement = materializeAgreement(agreementData);

    //Save the agreement to the database
    execute({
      id: agreementData.id,
      user_id: userId,
      user_defined_name: agreementData.user_defined_name,
      agreement: agreement.slug,
      completedClauses: materializedAgreement.clauses,
      text: materializedAgreement.text,
      completed: true,
    });
  }

  // Check if the form steps are complete
  const formNamingcomplete = agreementData.user_defined_name != "";
  const questionsComplete =
    Object.keys(agreementData.data_questions).length > 0;
  const inputsComplete =
    Object.keys(agreementData.data_clause_answers).length > 0;
  const editsComplete = agreementData.completed === true;
  const contractComplete = questionsComplete && inputsComplete && editsComplete;

  //Get progress bar agreement generator label
  const stepLabel = inputsComplete
    ? "04"
    : questionsComplete
    ? "03"
    : formNamingcomplete
    ? "02"
    : "01";
  const maxWidthClass = inputsComplete
    ? "max-w-[75%]"
    : questionsComplete
    ? "max-w-[50%]"
    : formNamingcomplete
    ? "max-w-[25%]"
    : "max-w-0";

  //If there's no prefills or completion, return loading
  if (agreementPrefills === null || prefillCompletion === null) return null;

  return (
    <>
      <div className="flex w-full flex-grow flex-col px-3 md:px-6">
        {!formNamingcomplete && (
          <AgreementName
            onCompletion={(data) => {
              try {
                namingDataHandler(data);
              } catch (error) {
                console.log(error);
              }
            }}
          ></AgreementName>
        )}
        {formNamingcomplete && !questionsComplete && (
          <AgreementQuestions
            agreement={agreement}
            onCompletion={(data) => {
              try {
                questionDataHandler(data);
              } catch (error) {
                console.log(error);
              }
            }}
            agreementPrefills={agreementPrefills}
            prefillCompletion={prefillCompletion}
          ></AgreementQuestions>
        )}

        {questionsComplete && !inputsComplete && (
          <ClauseInputs
            agreement={agreement}
            agreementData={agreementData}
            onCompletion={(clauseAnswers, clauses, calculations) => {
              try {
                clauseInputDataHandler(clauseAnswers, clauses, calculations);
              } catch (error) {
                console.log(error);
              }
            }}
            agreementPrefills={agreementPrefills}
            prefillCompletion={prefillCompletion}
          ></ClauseInputs>
        )}

        {questionsComplete && inputsComplete && !editsComplete && (
          <EditClauses
            agreement={agreement}
            agreementData={agreementData}
            isSaving={status === "executing"}
            onChange={(editedClauses) => {
              try {
                editClauseHandler(editedClauses);
              } catch (error) {
                console.log(error);
              }
            }}
            onCompletion={() => {
              try {
                clauseEditsCompleteHandler();
              } catch (error) {
                console.log(error);
              }
            }}
          ></EditClauses>
        )}

        {contractComplete && (
          <m.div
            initial={{ opacity: 0, y: 100 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 0.75,
                duration: 0.4,
              },
            }}
            className="mx-auto w-full max-w-xl p-6"
          >
            <h4 className="text-center">Form Results:</h4>
            <pre>{JSON.stringify(agreementData, null, 2)}</pre>
          </m.div>
        )}
      </div>
      <m.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: 0.4,
          },
        }}
        id="progress"
        className="pl-shadow fixed bottom-0 left-0 flex w-full flex-col bg-purple-800"
      >
        <div className="progress-track h-1.5 w-full bg-purple-100">
          <div
            className={cn(
              "relative h-full w-full bg-light_purple-700 transition-all",
              "duration-700 before:absolute before:right-0 before:top-1/2 before:h-3 before:w-3 before:translate-x-1/2 before:translate-y-[-50%] before:transform before:rounded-full before:bg-light_purple-700",
              maxWidthClass,
            )}
          ></div>
        </div>
        <div className="flex flex-row items-center px-5 py-2 font-lato text-white sm:min-h-[80px] ">
          <div className="flex w-full flex-row-reverse gap-x-3 sm:flex-row">
            <div className="flex flex-col justify-center gap-x-1 gap-y-1.5 text-[18px] font-semibold leading-4 tracking-widest">
              <span>{stepLabel}</span>
              <hr />
              <span>{"04"}</span>
            </div>

            <div className="sep">
              <div className="h-full w-px bg-white" />
            </div>

            <div className="flex flex-grow flex-col gap-x-3 gap-y-1 sm:flex-row sm:items-center ">
              <div
                className={cn(
                  "flex flex-grow items-center sm:text-xl sm:leading-5",
                  !formNamingcomplete ? "italic opacity-80" : "",
                )}
              >
                {formNamingcomplete
                  ? agreementData.user_defined_name
                  : "New Document"}
              </div>
              <div className="flex flex-col sm:items-end sm:text-right">
                <div className="hidden text-xs tracking-widest sm:block">
                  {"DOCUMENT GENERATOR"}
                </div>
                <div className="text-sm font-bold tracking-wider sm:text-base">
                  {agreement.name}
                </div>
              </div>
            </div>
          </div>
        </div>
      </m.div>

      {/* Add's bottom padding to the footer */}
      <style>{`
        footer {
          padding-bottom: calc(80px + 3.5rem) !important;
        }
      `}</style>
    </>
  );
};

export default AgreementGenerator;
