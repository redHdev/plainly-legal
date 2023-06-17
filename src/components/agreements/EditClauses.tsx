"use client";
import React, { useRef, useState } from "react";
import { motion as m } from "framer-motion";

import type { FullContracts } from "~/types/contracts";
import type {
  liveFormData,
  AgreementData,
} from "~/types/forms";

//Import Icons
import SingleClauseEdit from "./SingleClauseEdit";
import Button from "~/components/ui/Button";

//Import dialog
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/shadcdn/dialog";

interface Props {
  agreement: FullContracts;
  //contractQuestionAnswers is an object of strings
  agreementData: AgreementData;
  onCompletion?: () => void;
  onChange?: (clauseEdits: liveFormData) => void;
}

const EditClauses: React.FC<Props> = ({
  agreement,
  agreementData,
  onCompletion,
  onChange,
}) => {

    //If there are no clauses, don't show the form
  const clauses = agreementData.data_clauses;
  if ( !clauses || typeof clauses === undefined ) throw new Error("There was an error loading the clauses, please try again later.");

  //Setup States
  const agreementPreviewRef = useRef<HTMLDivElement>(null);
  const [ clauseEdits, setClauseEdits ] = useState<liveFormData>(agreementData.data_contract_edits);
  const [ currentlyEditingClauses, setCurrentlyEditingClauses ] = useState<string[]>([]);

  //Build Live Agreement Data
  const liveAgreementData = {
    ...structuredClone(agreementData),
    data_contract_edits: { ...clauseEdits },
  };

  const handleClauseChange = ( clauseId: string, clauseText: string ) => {
    const newClauseEdits = {
      ...clauseEdits,
      [clauseId]: clauseText,
    };

    setClauseEdits(newClauseEdits);

    if (onChange) {
      onChange(newClauseEdits);
    }
    
  };

  const editingClause = ( clauseId: string, value: boolean ) => {
    if ( value ) {
      setCurrentlyEditingClauses([
        ...currentlyEditingClauses,
        clauseId,
      ]);
    } else {
      setCurrentlyEditingClauses(
        currentlyEditingClauses.filter((id) => id !== clauseId)
      );
    }
  }

  const UnsavedChanges = () => {
    return (
      <Dialog >
        <DialogTrigger className="w-full flex h-full cursor-pointer items-center justify-center rounded border border-purple-100 bg-white p-2 text-center leading-5 transition-all duration-200 hover:bg-[#F88379] hover:text-white hover:bg-[#F88379] hover:text-white hover:border-[#C64236]">Finalize Agreement</DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Draft Changes</DialogTitle>
            You have draft changes, please save or discard them before finalizing the agreement.
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  //create a function to show a single clause
  const editClauses = clauses.map((clause) => {
    return ( <SingleClauseEdit key={clause.id} clause={clause} agreementData={liveAgreementData} isEditing={(value) => editingClause(clause.id, value)} onChange={handleClauseChange} /> );
  });

  let completeButton = <Button
    onClick={() => {
      console.log('Complete button clicked');
      onCompletion && onCompletion();
    }}
  >
    Finalize Agreement
  </Button>;
  if (currentlyEditingClauses.length > 0) {
    completeButton = <UnsavedChanges/>;
  }


  return (
    <m.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
      className="mx-auto grid w-"
    >
      <div className="clause-complete-toolbar">{completeButton}</div>
      <div
        ref={agreementPreviewRef}
        className="preview-clauses relative h-full border border-black bg-white shadow-lg inset-0 p-6 text-sm max-w-5xl"
        style={{ paddingBottom: "90%" }}
      >

        <div className="mb-4 pb-4 text-center text-2xl font-bold">
          {agreement.name}
        </div>

        {editClauses}
        
      </div>
    </m.div>
  );
};

export default EditClauses;
