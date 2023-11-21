"use client";
import React, { useRef, useState } from "react";
import { motion as m } from "framer-motion";

import type { FullContracts } from "~/types/contracts";
import type { liveFormData, AgreementData } from "~/types/forms";

//Import Icons
import SingleClauseEdit from "./SingleClauseEdit";

//Import dialog
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/shadcn/dialog";
import SecondaryButton from "../ui/SecondaryButton";
import RightArrow from "../icons/RightArrow";
import { cn } from "~/utils/cn";

interface Props {
  agreement: FullContracts;
  //contractQuestionAnswers is an object of strings
  agreementData: AgreementData;
  onCompletion?: () => void;
  onChange?: (clauseEdits: liveFormData) => void;
  isSaving?: boolean;
}

const EditClauses: React.FC<Props> = ({
  agreement,
  agreementData,
  onCompletion,
  onChange,
  isSaving,
}) => {
  //If there are no clauses, don't show the form
  const clauses = agreementData.data_clauses;
  if (!clauses || typeof clauses === undefined)
    throw new Error(
      "There was an error loading the clauses, please try again later.",
    );

  //Setup States
  const agreementPreviewRef = useRef<HTMLDivElement>(null);
  const [clauseEdits, setClauseEdits] = useState<liveFormData>(
    agreementData.data_contract_edits,
  );
  const [currentlyEditingClauses, setCurrentlyEditingClauses] = useState<
    string[]
  >([]);
  const [isFinalizing, setIsFinalizing] = useState<boolean>(false);

  //Build Live Agreement Data
  const liveAgreementData = {
    ...structuredClone(agreementData),
    data_contract_edits: { ...clauseEdits },
  };

  const handleClauseChange = (clauseId: string, clauseText: string) => {
    const newClauseEdits = {
      ...clauseEdits,
      [clauseId]: clauseText,
    };

    setClauseEdits(newClauseEdits);

    if (onChange) onChange(newClauseEdits);
  };

  const editingClause = (clauseId: string, value: boolean) => {
    if (value) {
      setCurrentlyEditingClauses([...currentlyEditingClauses, clauseId]);
    } else {
      setCurrentlyEditingClauses(
        currentlyEditingClauses.filter((id) => id !== clauseId),
      );
    }
  };

  const FinalizeAgreement = () => {
    setIsFinalizing(true);
    onCompletion && onCompletion();
  };

  const UnsavedChanges = () => {
    return (
      <Dialog>
        <DialogTrigger className="flex cursor-pointer items-center justify-center border-purple-100 bg-white p-2 text-center leading-5 opacity-50">
          Finalize Document
          <div className="pl-2">
            <RightArrow />
          </div>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Draft Changes</DialogTitle>
            <DialogDescription>
              You have draft changes, please save or discard them before
              finalizing the document.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  const FinalizeToolbar = ({ className }: { className?: string }) => {
    return (
      <div className={cn("clause-complete-toolbar", className)}>
        {isSaving && !isFinalizing ? (
          <SecondaryButton loading={true} loadingChildren="Autosaving" />
        ) : currentlyEditingClauses.length > 0 ? (
          <UnsavedChanges />
        ) : (
          <SecondaryButton
            onClick={FinalizeAgreement}
            loading={isFinalizing}
            loadingChildren="Finalizing Agreement"
            classes="whitespace-nowrap"
            text="Finalize Document"
          />
        )}
      </div>
    );
  };

  return (
    <m.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
      className="mx-auto grid gap-5 py-10"
    >
      <div className="flex flex-col gap-2.5 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="mb-0 text-2xl font-bold">{agreement.name}</h2>
          <p className="text-sm">
            {"Edit the below clauses seamlessly using our intuitive interface."}
          </p>
        </div>
        <FinalizeToolbar className="flex justify-center" />
      </div>
      <hr className="lg:hidden" />
      <div
        ref={agreementPreviewRef}
        className="preview-clauses lg:border-gray relative inset-0 h-full max-w-5xl bg-white text-sm lg:rounded lg:border lg:p-6 lg:shadow-lg"
        // style={{ paddingBottom: "50%" }}
      >
        {clauses.map((clause) => (
          <SingleClauseEdit
            key={clause.id}
            clause={clause}
            agreementData={liveAgreementData}
            isEditing={(value) => editingClause(clause.id, value)}
            onChange={handleClauseChange}
          />
        ))}
      </div>
      <hr className="lg:hidden" />
      <FinalizeToolbar className="flex justify-center" />
    </m.div>
  );
};

export default EditClauses;
