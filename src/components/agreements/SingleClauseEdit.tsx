"use client";

//Import Components
import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/shadcn/dialog";

//Import Types
import type { AgreementData } from "~/types/forms";
import { type Clauses } from "@prisma/client";
import { replaceAgreementText } from "~/utils/replaceText";

//Import Icons
import { Edit, Help, Remove, Revert, Trash, Save } from "~/components/icons";

//Import styles
import "~/styles/clauseEditStyles.css";
import Button from "~/components/ui/Button";
import { cn } from "~/utils/cn";

//Import the restricted clause list
import restrictedClauses from "./restrictedClauses.json";

//Import and adjust XSS filtering to allow classnames on spans so we have highlights
import * as xssModule from "xss";
import Tiptap from "../ui/Tiptap";
const xss = new xssModule.FilterXSS({
  whiteList: {
    ...xssModule.getDefaultWhiteList(),
    span: ["class"],
    div: ["class"],
  },
});

interface Props {
  clause: Clauses;
  agreementData: AgreementData;
  isEditing?(state: boolean): void;
  onChange?(clauseId: string, clauseText: string | null | undefined): void;
}

export default function SingleClauseEdit({
  clause,
  agreementData,
  isEditing,
  onChange,
}: Props) {
  //Check if the passed agreementdata edits have this clause text already
  const clauseEditedText = agreementData?.data_contract_edits?.[clause.id];

  //Confirm that clauseEditedText is a string or null
  if (clauseEditedText && typeof clauseEditedText !== "string")
    throw new Error(
      "There was an error loading the clause, please try again later.",
    );

  //Setup States
  const [clauseText, setClauseText] = useState<string | null>(
    clauseEditedText !== undefined ? clauseEditedText : clause.text,
  );
  const [isEdit, setEdit] = useState<boolean>(false);
  const newText: string = replaceAgreementText(
    clauseText ?? "",
    agreementData,
    3,
  );
  const draftClause = useRef<string>(newText);

  const isRemovedClause: boolean = clauseText === null;
  const isRestrictedClause = restrictedClauses.includes(clause.key);

  const localButtonStyles =
    "inline-flex flex-row items-center gap-1 rounded-full border border-purple-900 bg-transparent px-4 py-1.5 text-purple-900 [&_svg]:fill-purple-900 [&_svg]:w-4";

  const updateClauseText = (text: string | null) => {
    setEditingState(false);

    //Check if the text and the clause text are the same, if so remove the clause from the edits
    setClauseText(text);

    //Check if the text and the clause text are the same, if so remove the clause from the edits
    const onChangeUpdate = clause.text === text ? undefined : text;

    //If there is an onChange function, call it
    if (onChange) onChange(clause.id, onChangeUpdate);
  };

  const setEditingState = (state: boolean) => {
    setEdit(state);
    if (isEditing) isEditing(state);
  };

  const discardChanges = () => {
    setEditingState(false);
  };

  const saveChanges = () => {
    const value = draftClause.current;

    //if the value is blank or undefined, throw an errro
    if (!value)
      throw new Error(
        "There was an error saving the clause, please try again later.",
      );

    updateClauseText(value);
  };

  // Components below

  const RemoveButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger
          className={cn(
            localButtonStyles,
            "border-orange bg-orange text-white [&_svg]:fill-white",
          )}
        >
          <Remove className="h-3" />
          <span>Remove from agreement</span>
        </DialogTrigger>

        <DialogContent className="w-dialog-md bg-white">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to remove this clause from the agreement?
            </DialogTitle>
            <DialogDescription>
              <div className="remove-description">{clause.deleteWarning}</div>
              <div className="flex flex-row justify-evenly gap-3 pt-5">
                <Button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  No, keep this clause
                </Button>
                <Button onClick={() => updateClauseText(null)}>
                  Yes, accept and remove
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  const MeaningButton = () => {
    return (
      <Dialog>
        <DialogTrigger className="flex flex-row items-center gap-1">
          <Help className="w-4" />
          <span className="underline">What does this clause mean?</span>
        </DialogTrigger>
        <DialogContent className="w-dialog-sm bg-white">
          <DialogHeader>
            <DialogTitle>{clause.plainTextName}</DialogTitle>
            <DialogDescription
              dangerouslySetInnerHTML={{
                __html:
                  clause.help ??
                  "Sorry this clause does not have any explainer yet.",
              }}
            ></DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  const RevertButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className={localButtonStyles}>
          <Revert className="h-[14px]" />
          <span>Revert to generated version</span>
        </DialogTrigger>
        <DialogContent className="w-dialog-sm bg-white">
          <DialogHeader>
            <DialogTitle>Revert Clause</DialogTitle>
            <DialogDescription>
              <div className="revert-clause-header">
                Are you sure you want to revert this clause to the generated
                version?
              </div>
              <div className="flex flex-row justify-evenly gap-3 pt-5">
                <Button
                  onClick={() => {
                    updateClauseText(clause.text), setIsOpen(false);
                  }}
                >
                  Yes, revert
                </Button>
                <Button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  No, keep this clause
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  const ClauseToolbarDefault = () => {
    return (
      <>
        {/* Shows the Info / Meaning button */}
        {clause.help && <MeaningButton />}

        {/* Action Items */}
        <div
          className={cn(
            "flex flex-row flex-wrap justify-center gap-2.5",
            clause.help ? "flex-1 md:justify-end" : "md:justify-between",
          )}
        >
          <button
            onClick={() => setEditingState(true)}
            className={cn(localButtonStyles)}
          >
            <Edit />
            <span>Edit this clause</span>
          </button>
          {clauseText !== clause.text && <RevertButton />}
          <RemoveButton />
        </div>
      </>
    );
  };

  const ClauseToolbarEdit = () => {
    return (
      <div className="flex flex-row flex-wrap justify-center gap-2.5">
        <button
          onClick={discardChanges}
          className={cn(
            localButtonStyles,
            "border-orange bg-orange text-white [&_svg]:fill-white",
          )}
        >
          <Trash className="w-4" />
          <span>Discard Changes</span>
        </button>
        <button
          onClick={saveChanges}
          className={cn(
            localButtonStyles,
            "border-green bg-green text-white [&_svg]:fill-white",
          )}
        >
          <Save className="w-4" />
          <span>Save Changes</span>
        </button>
      </div>
    );
  };

  const ClauseToolbarRecover = () => {
    return (
      <button
        onClick={() => updateClauseText(clause.text)}
        className="clause-meaning flex flex-row items-center gap-1"
      >
        <Revert className="w-4" />
        <span className="whitespace-nowrap">Recover Clause</span>
      </button>
    );
  };

  // Toolbar
  const ClauseToolbar = () => {
    const toolbarId = isRemovedClause
      ? "recover-toolbar"
      : isEdit
      ? "editing-toolbar"
      : "default-toolbar";
    return (
      <div
        id={toolbarId}
        className="flex w-full flex-col items-center justify-evenly gap-2.5 md:flex-row"
      >
        {isRemovedClause ? (
          <ClauseToolbarRecover />
        ) : isEdit ? (
          <ClauseToolbarEdit />
        ) : (
          <ClauseToolbarDefault />
        )}
      </div>
    );
  };

  //Show the editor if the clause is being edited, otherwise show the text raw
  const TextAreaDisplay = () => {
    return (
      <>
        {isEdit ? (
          <Tiptap
            value={xss.process(newText) ?? ""}
            onChange={(value) => {
              draftClause.current = value;
            }}
            className={cn("edit-clause-text", isEdit && "outline-none")}
          />
        ) : (
          <div
            className="edit-clause-text"
            dangerouslySetInnerHTML={{ __html: xss.process(newText) ?? "" }}
          ></div>
        )}
      </>
    );
  };

  //If the clause is removed, show the removed clause warning, otherwise, we want to show the editor
  const DisplayClause = () => {
    return (
      <>
        {isRemovedClause ? (
          <div className="edit-clause-text flex flex-col items-center gap-2 text-center opacity-50 sm:flex-row sm:text-left">
            <Trash className="w-5" />
            <p className="">{`"${clause.plainTextName}" has been removed from the agreement.`}</p>
          </div>
        ) : (
          <TextAreaDisplay />
        )}
      </>
    );
  };

  // Setup the dynamic JSX elements
  // Setup the dynamic JSX elements

  return (
    <div
      key={clause.id}
      className={cn(
        "preview-clause-single group gap-2.5 overflow-hidden pb-3 pt-3 duration-400",
        // Co-Pilot: If the clause is removed, show these classes
        isRemovedClause
          ? "inline-flex min-h-[80px] w-full flex-col flex-wrap items-center justify-center sm:flex-row sm:justify-between"
          : "flex-col",
        // Co-Pilot: If the clause is being edited, show these classes
        isEdit
          ? "border-current border-gray-300 [&:not(:first-child)]:mt-5 [&:not(:first-child)]:border-t-2 [&:not(:last-child)]:mb-5 [&:not(:last-child)]:border-b-2"
          : "border-transparent outline-none hover:border-current hover:border-gray-300 [&:not(:first-child)]:border-t-2 [&:not(:last-child)]:border-b-2",
      )}
    >
      {/* The actual component */}
      <DisplayClause />

      {/* shows a spacer - would love to remove some day */}
      {!isRestrictedClause && !isRemovedClause && (
        <div
          className={cn(
            "clause-spacer duration-300",
            // Co-Pilot: If the clause is being edited, show these classes
            isEdit ? "pt-5" : "group-hover:pt-5",
          )}
        ></div>
      )}

      {/* Shows the toolbar with options to edit or delete the clause */}
      <div
        className={cn(
          "clause-actions duration-300",
          isRemovedClause && "!h-auto",
          !isEdit &&
            "h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 [&_button]:pointer-events-none group-hover:[&_button]:pointer-events-auto",
        )}
      >
        {!isRestrictedClause && <ClauseToolbar />}
      </div>

      {/* shows a spacer - would love to remove some day */}
      {!isRestrictedClause && !isRemovedClause && (
        <div
          className={cn(
            "clause-spacer duration-300",
            isEdit ? "pt-5" : "group-hover:pt-5",
          )}
        ></div>
      )}
    </div>
  );
}
