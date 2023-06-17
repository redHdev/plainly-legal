"use client";

import { useEffect, useState } from "react";
import { motion as m } from "framer-motion";
import { useZact } from "zact/client";
// import { Prisma } from "@prisma/client";

import AgreementQuestions from "./AgreementQuestions";
import { type FullContracts } from "~/types/contracts";
import ClauseInputs from "./ClauseInputs";
import EditClauses from "./EditClauses";
import type { liveFormData, AgreementData } from "~/types/forms";
import { zactUpsertAgreement } from "~/app/agreements/new/[agreement]/server_actions";
import type { SavedAgreements, Clauses } from "@prisma/client";
import { AgreementName } from "./AgreementName";

interface Props {
  agreement: FullContracts;
  userId: string;
  savedAgreement?: SavedAgreements;
}

// Set up state
export const AgreementGenerator = ({
  agreement,
  userId,
  savedAgreement,
}: Props) => {
  // Set up Zact
  const { mutate, data, error } = useZact(zactUpsertAgreement);

  // Set up state
  const [agreementData, setAgreementData] = useState<AgreementData>({
    id: savedAgreement?.id ?? "",
    user_defined_name: savedAgreement?.user_defined_name ?? "",
    user_id: userId,
    agreement_variables: agreement.variables as liveFormData,
    data_questions: (savedAgreement?.data_questions as liveFormData) ?? {},
    data_clauses: (savedAgreement?.data_clauses as Clauses[]) ?? {},
    data_clause_answers: (savedAgreement?.data_clause_answers as liveFormData) ?? {},
    data_contract_edits: (savedAgreement?.data_contract_edits as liveFormData) ?? {},
    completed: savedAgreement?.completed ?? false,
  });

  // Updates state upon 'data' (variable) is updated - which is after we mutate data / talk to the database
  useEffect(() => {
    const id = data?.message?.id;
    const dataQuestions: liveFormData = data?.message?.data_questions as liveFormData;
    const dataClauseAnswers: liveFormData = data?.message?.data_clause_answers as liveFormData;
    const dataClauses: Clauses[] = data?.message?.data_clauses as Clauses[];

    if (!id) return;

    setAgreementData((prevState) => ({
      ...prevState,
      id: id,
      data_questions: dataQuestions,
      data_clause_answers: dataClauseAnswers,
      data_clauses: dataClauses,
    }));
  }, [data, error]);

  // Creates new row in the database after the <AgreementQuestions /> form is completed
  async function questionDataHandler(formData: liveFormData) {
    await mutate({
      user_id: userId,
      user_defined_name: agreementData.user_defined_name,
      agreement_variables: agreement.variables,
      agreement: agreement.slug,
      data_questions: formData,
    });
  }

  // Updates same row in the database after the <ClauseInputs /> form is completed
  async function clauseInputDataHandler(clauseAnswers: liveFormData, clauses: Clauses[] ) {
    if(! agreementData.id) throw new Error('Agreement Data ID is not defined');
    await mutate({
      id: agreementData.id,
      user_id: userId,
      agreement_variables: agreement.variables,
      agreement: agreement.slug,
      data_clause_answers: clauseAnswers,
      data_clauses: clauses,
    });
  }

  // Creates new row in the database after the <AgreementQuestions /> form is completed
  async function editClauseHandler(formData: liveFormData) {
    if(! agreementData.id) throw new Error('Agreement Data ID is not defined');

    //Remove Undefined Values
    Object.keys(formData).forEach((key) => {
      if (formData[key] === undefined) {
        delete formData[key];
      }
    });

    await mutate({
      id: agreementData.id,
      data_contract_edits: formData,
    });
  }

  // Complete the contract when the edits are complete
  function clauseEditsCompleteHandler() {
    console.log('clause edits complete');

  }

  // Check if the form steps are complete
  const formNamingcomplete = agreementData.user_defined_name != "";
  const questionsComplete  = Object.keys(agreementData.data_questions).length > 0;
  const inputsComplete     = Object.keys(agreementData.data_clause_answers).length > 0;
  const editsComplete      = agreementData.completed === true;
  const contractComplete   = questionsComplete && inputsComplete && editsComplete;

  return (
    <>
      <div className="flex w-full flex-grow flex-col px-6 py-10">
        {!formNamingcomplete && (
          <AgreementName
            onCompletion={(data) =>
              setAgreementData((prevState) => ({
                ...prevState,
                user_defined_name: data,
              }))
            }
          ></AgreementName>
        )}
        {formNamingcomplete && !questionsComplete && (
          <AgreementQuestions
            agreement={agreement}
            onCompletion={(data) => questionDataHandler(data)}
          ></AgreementQuestions>
        )}

        {questionsComplete && !inputsComplete && (
          <ClauseInputs
            agreement={agreement}
            agreementData={agreementData}
            onCompletion={(clauseAnswers, clauses) => clauseInputDataHandler(clauseAnswers, clauses)}
          ></ClauseInputs>
        )}

        {questionsComplete && inputsComplete && !editsComplete && (
          <EditClauses
            agreement={agreement}
            agreementData={agreementData}
            onChange={(editedClauses) => editClauseHandler(editedClauses)}
            onCompletion={clauseEditsCompleteHandler}
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
        className="fixed bottom-0 left-0 flex min-h-[80px] w-full items-center justify-center bg-purple-800 p-6 text-center text-white"
      >
        <span className="">progress bar will show here</span>
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
