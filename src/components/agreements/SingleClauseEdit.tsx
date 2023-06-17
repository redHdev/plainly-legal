'use client';

//Import Components
import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/shadcdn/dialog";

//Import Types
import type { AgreementData } from "~/types/forms";
import { type Clauses } from "@prisma/client";
import { replaceAgreementText } from "~/utils/replaceText";

//Import Icons
import { Edit, Help, Remove, Revert, Trash, Save } from "~/components/icons";

//Import styles
import "~/styles/clauseEditStyles.css";
import Button from "~/components/ui/Button";

interface Props {
  clause: Clauses;
  agreementData: AgreementData;
  isEditing? (state: boolean): void;
  onChange? (clauseId: string, clauseText: string | null | undefined): void;
}

export default function SingleClauseEdit({ clause, agreementData, isEditing, onChange }: Props) {

  //Check if the passed agreementdata edits have this clause text already
  const clauseEditedText = agreementData?.data_contract_edits?.[clause.id] ?? null;

  //Confirm that clauseEditedText is a string or null
  if (clauseEditedText && typeof clauseEditedText !== "string") throw new Error("There was an error loading the clause, please try again later.");

  //Setup States
  const [clauseText, setClauseText] = useState<string | null>( clauseEditedText ?? clause.text );
  const [isEdit, setEdit] = useState<boolean>(false);
  const editRef = useRef<HTMLDivElement>(null);
  const newText: string = replaceAgreementText( clauseText ?? "", agreementData, 3 );
  const isRemovedClause: boolean = clauseText === null;
  const isActive = isEdit;

  const updateClauseText = (text: string | null) => {
    setEditingState(false);

    //Check if the text and the clause text are the same, if so remove the clause from the edits
    setClauseText(text);

    //Check if the text and the clause text are the same, if so remove the clause from the edits
    const onChangeUpdate = (clause.text === text) ? undefined : text;

    //If there is an onChange function, call it
    if(onChange){
      onChange(clause.id, onChangeUpdate);
    }
  }

  const setEditingState = (state: boolean) => {
    setEdit(state);

    if(isEditing){
      isEditing(state);
    }
  }
  
  const discardChanges = () => {
    setEditingState(false);
  }

  const saveChanges = () => {
    const value = editRef.current?.innerHTML;

    //if the value is blank or undefined, throw an errro
    if(!value) throw new Error("There was an error saving the clause, please try again later.");

    updateClauseText(value);
  }


  const RemoveButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="clause-meaning flex flex-row items-center gap-1"><Remove/>Remove from agreement</DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Are you sure you want to remove this clause from the agreement?</DialogTitle>
            <div className="dialog-description">
              <div className="remove-description">{clause.deleteWarning}</div>
              <div className="flex flex-row justify-evenly pt-5 gap-3">
                <Button onClick={ () => updateClauseText(null) }>Yes, accept and remove</Button>
                <Button onClick={ () => { setIsOpen(false); } }>No, keep this clause</Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  const MeaningButton = () => {
    return (
      <Dialog>
        <DialogTrigger className="clause-meaning flex flex-row items-center gap-1"><Help/>What does this clause mean?</DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>{clause.version}</DialogTitle>
            <div className="dialog-description">
              {clause.help ?? 'Sorry this clause does not have any explainer yet.'}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  const RevertButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger className="clause-meaning flex flex-row items-center gap-1"><Revert/>Revert to generated version</DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Revert Clause</DialogTitle>
            <div className="dialog-description">
              <div className="revert-clause-header" >Are you sure you want to revert this clause to the generated version?</div>
              <div className="flex flex-row justify-evenly pt-5 gap-3">
                <Button onClick={ () => { updateClauseText(clause.text), setIsOpen(false) } }>Yes, revert</Button>
                <Button onClick={ () => { setIsOpen(false); } }>No, keep this clause</Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  const clauseToolbar = () => {
    return (
      <div className="main-clause-toolbar flex flex-row w-full justify-evenly gap-3">
        {clause.help && <MeaningButton />}
        <button onClick={() => setEditingState(true)} className="clause-edit flex flex-row items-center gap-1"><Edit/>Edit this clause</button>
        {clauseText !== clause.text && <RevertButton /> }
        <RemoveButton />
      </div>
    )
  }

  const clauseEditToolbar = () => {
    return (
      <div className="edit-clause-toolbar flex flex-row w-full justify-evenly">
        <button onClick={saveChanges} className="clause-meaning flex flex-row items-center gap-1"><Save/>Save Changes</button>
        <button onClick={discardChanges} className="clause-edit flex flex-row items-center gap-1"><Trash/>Discard Changes</button>
      </div>
    )
  }

  const clauseRecoverToolbar = () => {
    return (
      <div className="edit-clause-toolbar flex flex-row w-full justify-evenly">
        <button onClick={() => updateClauseText(clause.text)} className="clause-meaning flex flex-row items-center gap-1"><Revert/>Recover Clause</button>
      </div>
    )
  }

  const displayEdit = () => {
    return (
      <div ref={editRef} contentEditable="true" className="edit-clause-text outline-none" dangerouslySetInnerHTML={{ __html: newText ?? "" }}></div>
    )
  }

  const displayText = () => {
    //Otherwise, return the clause
    return (
      <div className="edit-clause-text" dangerouslySetInnerHTML={{ __html: newText ?? "" }}></div>
    )
  }

  

  //Setup the dynamic JSX elements
  let toolbar       = isEdit ? clauseEditToolbar() : clauseToolbar();
  let displayClause = isEdit ? displayEdit() : displayText();

  //Check if this is a clause that is deleted and could be recovered
  toolbar             = isRemovedClause ? clauseRecoverToolbar() : toolbar;
  const clauseClasses = isRemovedClause ? "removed-clause inline-flex flex-row w-full justify-between" : "flex-col";
  displayClause       = isRemovedClause ? <div className="edit-clause-text opacity-50 flex flex-row items-center gap-2"><Trash/><p>{clause.version} clause is removed from the agreement.</p></div> : displayClause;


  return (
    <div
      className={`${clauseClasses} preview-clause-single group duration-300 pt-2 pb-2 pr-6 pl-6 rounded-lg ${isActive ? 'border-gray-300 border-2 border-current mt-5 mb-5' : 'outline-none hover:border-gray-300 border-transparent border-2 hover:border-current'}`}
      key={clause.id}
    >

      {displayClause}

      {!isRemovedClause && <div className={`clause-spacer duration-300 ${isActive ? 'pt-5' : 'group-hover:pt-5'}`}></div> }

      <div className={`clause-toolbar duration-300 ${isActive ? '' : 'h-0 opacity-0 group-hover:opacity-100 group-hover:h-auto' }`}>
        {toolbar}
      </div>

      {!isRemovedClause && <div className={`clause-spacer duration-300 ${isActive ? 'pt-5' : 'group-hover:pt-5'}`}></div> }

    </div>
  );

}