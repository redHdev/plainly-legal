"use client";

// Import Components
import React, { useEffect } from "react";
import { type SavedAgreements } from "@prisma/client";

import { actionArchiveSavedAgreement } from "~/data/server_actions";
import { useAction } from "next-safe-action/hook";

interface Props {
  agreementId: string;
  onCompletion?: (message: SavedAgreements) => void;
}

export const DeleteAgreement: React.FC<Props> = ({
  agreementId,
  onCompletion,
}) => {
  const { execute, result, status } = useAction(actionArchiveSavedAgreement);

  useEffect(() => {
    if (result?.data?.message) {
      onCompletion?.(result?.data?.message);
    }
  }, [result, onCompletion]);

  return (
    <button
      className="btn-primary w-auto whitespace-nowrap text-white"
      onClick={() =>
        void execute({
          agreementId: agreementId,
        })
      }
    >
      {status == "executing" ? "Deleting.." : "Delete"}
    </button>
  );
};
export default DeleteAgreement;
