"use client";
import { motion as m } from "framer-motion";
import { Copy, Download, Checkmark, Reload } from "../icons";

import { type SavedAgreements } from "@prisma/client";
import { copyText } from "~/utils/copy";
import { useState, useCallback, useEffect } from "react";
import * as xssModule from "xss";
import { cn } from "~/utils/cn";
import { useRouter } from "next/navigation";

//Import and adjust XSS filtering to allow classnames on spans so we have page breaks
const xss = new xssModule.FilterXSS({
  whiteList: {
    ...xssModule.getDefaultWhiteList(),
    div: ["class"],
  },
  stripIgnoreTag: false,
});

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "~/components/ui/shadcn/dialog";

import { MoreDotsVertical } from "~/components/icons";
import RenameAgreement from "~/app/agreements/renameAgreement";
import DuplicateAgreement from "~/app/agreements/duplicateAgreement";
import DeleteAgreement from "~/app/agreements/deleteAgreement";
import EditAgreement from "~/app/agreements/editAgreement";
import Link from "next/link";

interface Props {
  agreement: SavedAgreements;
  onChange: (message: SavedAgreements) => void;
}

interface ClauseList {
  [x: string]: string;
}

type Status = "idle" | "copying" | "copying-html" | "downloading";
type Modal = "rename" | "duplicate" | "actions" | "edit" | "delete" | null;

const DisplayAgreement: React.FC<Props> = ({ agreement, onChange }) => {
  const [agreementState, setAgreementState] =
    useState<SavedAgreements>(agreement);
  const [status, setStatus] = useState<Status>("idle");
  const [modal, setModal] = useState<Modal>(null);

  const router = useRouter();

  // Set the window title to the name of the user agreement so the pdf will have the same name when downloaded
  useEffect(() => {
    document.title = agreementState.user_defined_name + " - Plainly Legal";
  }, [agreementState.user_defined_name]);

  // Convert updateStateOnCompletion to a useCallback
  const updateAgreementState = useCallback((newData: SavedAgreements) => {
    setAgreementState(newData);
    setModal(null);
  }, []);

  //After the user edits the agreement, navigate to the edit page
  const afterEditAgreement = useCallback(
    (newData: SavedAgreements) => {
      onChange(newData);
    },
    [onChange],
  );

  // Navigate to the new agreement after it's been duplicated
  const afterDuplicateAgreement = useCallback(
    (newAgreement: SavedAgreements) => {
      router.push(`/agreements/${newAgreement.id}`);
    },
    [router],
  );

  // Convert updateStateOnCompletion to a useCallback
  const deleteAgreementCompletion = useCallback(() => {
    router.push("/agreements/");
  }, [router]);

  const fullText = agreementState.text ?? "";

  //If there is no agreement clauses don't show the text
  const clauses = agreementState.completedClauses as ClauseList;
  if (!Array.isArray(clauses))
    throw new Error(
      "There was an error loading the clauses, please try again later.",
    );

  //create a function to show a single clause
  const DisplayClauses = () => {
    const clauseMarkup = clauses.map((clause: string, index) => (
      <div
        key={index}
        className={`static-clause static-clause-${index} block`}
        dangerouslySetInnerHTML={{ __html: xss.process(clause) }}
      ></div>
    ));
    return clauseMarkup;
  };

  //Because we want buttons to show different status after the user interacts
  const triggerStatus = (status: Status, duration = 1500) => {
    setStatus(status);
    setTimeout(() => {
      setStatus("idle");
    }, duration);
  };

  //Because we want the button to download the text as a pdf
  const downloadPdf = () => {
    triggerStatus("downloading", 1000);

    //trigger print dialog to pdf after 1500ms
    setTimeout(() => {
      window.print();
    }, 1100);
  };

  //Because we want the button to copy the text to the clipboard
  const copy = () => {
    triggerStatus("copying");
    copyText(fullText);
  };

  const copyHtml = () => {
    triggerStatus("copying-html");
    copyText(fullText, "html");
  };

  const CopyButton = () => {
    return (
      <button onClick={copy} className="toolbar-button flex items-center gap-2">
        {status == "copying" ? (
          <>
            <Checkmark className="h-4 fill-orange" />
            <span>Text Copied</span>
          </>
        ) : (
          <>
            <Copy className="h-4 fill-orange" />
            <span>Copy Text</span>
          </>
        )}
      </button>
    );
  };

  const DownloadButton = () => {
    return (
      <button
        onClick={downloadPdf}
        className="toolbar-button flex items-center gap-2"
      >
        {status == "downloading" ? (
          <>
            <Reload className="h-4 animate-spin-fast fill-orange" />
            <span>Saving PDF...</span>
          </>
        ) : (
          <>
            <Download className="h-4 fill-orange" />
            <span>Save As PDF</span>
          </>
        )}
      </button>
    );
  };

  const AgreementActionsModal = () => {
    return (
      <>
        <DropdownMenu open={modal === "actions"}>
          <DropdownMenuTrigger
            onClick={() => setModal(modal === "actions" ? null : "actions")}
            className={cn(
              // base
              "group inline-flex aspect-square h-8 items-center justify-center rounded-full border border-orange p-1.5 outline-none transition-all duration-300 ease-out",
              "[&_svg]:fill-orange",
              // hover
              "hover:shadow-md",
              // state open
              "data-[state=open]:scale-100 data-[state=open]:border-orange data-[state=open]:shadow-lg [&_svg]:data-[state=open]:rotate-90 [&_svg]:data-[state=open]:fill-orange",
            )}
          >
            <MoreDotsVertical className="w-full fill-orange transition-all duration-300 ease-out group-hover:fill-orange" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="bg-white text-center"
            align="end"
            onInteractOutside={() => setModal(null)}
            onEscapeKeyDown={() => setModal(null)}
          >
            <DropdownMenuItem
              className="cursor-pointer justify-center"
              onSelect={() => copyHtml()}
            >
              {status == "copying-html" ? "HTML Copied" : "Copy HTML"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer justify-center"
              onClick={() => setModal("rename")}
            >
              Rename
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer justify-center"
              onClick={() => setModal("edit")}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer justify-center"
              onClick={() => setModal("duplicate")}
            >
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setModal("delete")}>
              <span className="w-full cursor-pointer rounded-full bg-red px-2 py-1 text-center text-white">
                Delete
              </span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Rename Agreement Modal */}
        <Dialog open={modal === "rename"}>
          <DialogContent
            className="w-dialog-sm bg-white"
            onInteractOutside={() => setModal(null)}
          >
            <DialogHeader>
              <DialogTitle>Rename Document</DialogTitle>
              <DialogDescription>
                <RenameAgreement
                  agreementData={agreementState}
                  onCompletion={updateAgreementState}
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* Edit agreement */}
        <Dialog open={modal === "edit"}>
          <DialogContent
            className="w-dialog-sm bg-white"
            onInteractOutside={() => setModal(null)}
          >
            <DialogHeader>
              <DialogTitle>Edit {agreement.user_defined_name}</DialogTitle>
              <DialogDescription>
                <div className="edit-description pb-5">
                  Are you sure you want to return this document to the clause
                  edit stage?
                </div>
                <EditAgreement
                  agreementData={agreementState}
                  onCancel={() => setModal(null)}
                  onCompletion={(newAgreement) =>
                    afterEditAgreement(newAgreement)
                  }
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* Duplicate agreement */}
        <Dialog open={modal === "duplicate"}>
          <DialogContent
            className="w-dialog-sm bg-white"
            onInteractOutside={() => setModal(null)}
          >
            <DialogHeader>
              <DialogTitle>Name your new document</DialogTitle>
              <DialogDescription>
                <DuplicateAgreement
                  agreementData={agreementState}
                  onCompletion={(newAgreement) =>
                    afterDuplicateAgreement(newAgreement)
                  }
                />
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>

        {/* Delete Agreement Modal */}
        <Dialog open={modal === "delete"}>
          <DialogContent
            className="w-dialog-sm bg-white"
            onInteractOutside={() => setModal(null)}
          >
            <DialogHeader>
              <DialogTitle>Delete Agreement?</DialogTitle>
              <DialogDescription>
                {`Are your sure you'd like to delete this agreement?`}
                <div className="mt-5 flex flex-row justify-end gap-3">
                  <button
                    className="flex cursor-pointer items-center justify-center border-purple-100 bg-white p-2 text-center leading-5"
                    onClick={() => setModal(null)}
                  >
                    Cancel
                  </button>
                  <DeleteAgreement
                    agreementId={agreementState.id}
                    onCompletion={deleteAgreementCompletion}
                  />
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    );
  };

  const Toolbar = () => (
    <div className="fixed bottom-0 left-0 z-40 flex w-[100vw] flex-row justify-evenly gap-6 border-t-2 border-t-gray-200 bg-white p-6 md:relative md:z-0 md:w-auto md:justify-normal md:border-t-0 md:p-0">
      <DownloadButton />
      <CopyButton />
      <AgreementActionsModal />
    </div>
  );

  return (
    <m.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.4 } }}
      className="clause-overview mx-auto grid gap-6 px-6 py-10 print:block"
    >
      <div className="preview-clauses-header flex flex-col gap-3 print:hidden md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-0.5 print:block">
          <Link
            href="/agreements"
            className="text-purple-500 underline"
            prefetch={false}
          >
            Back to All Documents
          </Link>
          <h2 className="mb-0 text-2xl font-bold">
            {agreementState.user_defined_name}
          </h2>
        </div>
        <Toolbar />
      </div>

      <div
        className={cn(
          "md:border-gray relative inset-0 block h-full max-w-5xl bg-white pb-20 text-sm md:rounded-lg md:border md:px-6 md:pt-6 md:shadow-lg [&_*]:mb-6",
        )}
      >
        <h2 className="print-only">{agreementState.user_defined_name}</h2>
        <DisplayClauses />
      </div>
    </m.div>
  );
};

export default DisplayAgreement;
