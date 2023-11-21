"use client";

// Import Components
import React, { useEffect, useState } from "react";
import { type SavedAgreements } from "@prisma/client";
import { useAction } from "next-safe-action/hook";

import { actionDuplicateSavedAgreement } from "~/data/server_actions";
import { cn } from "~/utils/cn";

interface Props {
  agreementData: SavedAgreements;
  onCompletion?: (message: SavedAgreements) => void;
}

export const DuplicateAgreement: React.FC<Props> = ({
  agreementData,
  onCompletion,
}) => {
  const [input, setInput] = useState(
    agreementData.user_defined_name + " (copy)",
  );
  const { execute, result, status } = useAction(actionDuplicateSavedAgreement);

  useEffect(() => {
    if (result?.data?.status === "success") {
      onCompletion?.(result?.data?.message);
    }
  }, [result, onCompletion]);

  return (
    <div>
      <div
        className={cn(
          "flex flex-col gap-3 sm:flex-row",
          status == "executing" && "pointer-events-none opacity-50",
        )}
      >
        <input
          type={"text"}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow rounded-md border border-purple-100 p-2"
        />
        <button
          className="btn-primary w-auto whitespace-nowrap text-white"
          onClick={() =>
            void execute({
              agreementId: agreementData.id,
              new_name: input,
            })
          }
        >
          {status == "executing"
            ? "Duplicating Document"
            : "Duplicate Document"}
        </button>
      </div>
    </div>
  );
};
export default DuplicateAgreement;
