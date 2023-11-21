"use client";

// Import Components
import React, { useEffect } from "react";
import { type SavedAgreements } from "@prisma/client";
import { useAction } from "next-safe-action/hook";

import { actionEditSavedAgreement } from "~/data/server_actions";
import { cn } from "~/utils/cn";

interface Props {
  agreementData: SavedAgreements;
  onCancel?: () => void;
  onCompletion?: (message: SavedAgreements) => void;
}

export const EditAgreement: React.FC<Props> = ({
  agreementData,
  onCancel,
  onCompletion,
}) => {
  const { execute, result, status } = useAction(actionEditSavedAgreement);

  useEffect(() => {
    if (result?.data?.status === "success") {
      onCompletion?.(result?.data?.message);
    }
  }, [result, onCompletion]);

  return (
    <div>
      <div
        className={cn(
          "flex flex-col justify-end gap-3 sm:flex-row",
          status == "executing" && "pointer-events-none opacity-50",
        )}
      >
        <button
          className="flex cursor-pointer items-center justify-center border-purple-100 bg-white p-2 text-center leading-5"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="btn-primary w-auto whitespace-nowrap text-white"
          onClick={() =>
            void execute({
              agreementId: agreementData.id,
            })
          }
        >
          {status == "executing" ? "Loading Document Editor" : "Edit Document"}
        </button>
      </div>
    </div>
  );
};
export default EditAgreement;
