"use client";

// Import Node Modules
import { useState, useCallback } from "react";
import { type SavedAgreements } from "@prisma/client";
import Link from "next/link";

// Import local components
import { cn } from "~/utils/cn";
import { Calendar, MoreDotsVertical, Plus } from "~/components/icons";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { formatDateUSA, formatDateUSASimple } from "~/utils/helpers";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  // DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/shadcn/popover";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "~/components/ui/shadcn/dialog";

import RenameAgreement from "./renameAgreement";
import DeleteAgreement from "./deleteAgreement";
import DuplicateAgreement from "./duplicateAgreement";

const AgreementProgress = ({ record }: { record: SavedAgreements }) => {
  const data_questions =
    Object.keys(record.data_questions as object).length > 0;
  const data_clause_answers =
    Object.keys(record.data_clause_answers as object).length > 0;
  const completed = record.completed;

  //  This is the ideal progress but the data is only saved after the data_questions are finished so it will always show 50 and never show 25%

  const phasesCompleted = completed
    ? 4
    : data_clause_answers
    ? 3
    : data_questions
    ? 2
    : 1;

  const progressDots = () => {
    const elements = [];
    for (let i = 0; i < 4; i++) {
      elements.push(
        <div
          key={i}
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            phasesCompleted == 4
              ? "bg-[#66BB6A]"
              : phasesCompleted > i
              ? "bg-light_purple-900"
              : "bg-gray-200",
          )}
        ></div>,
      );
    }
    return elements;
  };

  return (
    <div className="completed self-center header:text-right">
      <Popover>
        <PopoverTrigger className="dots-track relative min-h-[25px]">
          <div className="z-10 flex flex-row flex-nowrap items-center justify-between gap-2">
            {progressDots()}
          </div>
          <div className="absolute left-1/2 top-1/2 -z-[1] h-[3px] w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-200">
            <div
              className={cn(
                "h-full w-full rounded-full bg-light_purple-900",
                phasesCompleted == 4 && "bg-[#66BB6A]",
              )}
              style={{ maxWidth: `${((phasesCompleted - 1) / 3) * 100}%` }}
            ></div>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto rounded-full bg-white px-4 py-1.5 text-sm">
          <span className="percentage">{(phasesCompleted / 4) * 100}%</span>
          <span className="label">{` Complete`}</span>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default function SavedAgreementsComp({
  savedAgreementsData,
}: {
  savedAgreementsData: SavedAgreements[];
}) {
  // Setup state here for the agreements
  const [agreementsState, setAgreementsState] = useState(savedAgreementsData);
  const [renameModalStatus, setRenameModalStatus] = useState<string | null>(
    null,
  );
  const [duplicateModalStatus, setDuplicateModalStatus] = useState<
    string | null
  >(null);
  const [deleteModalStatus, setDeleteModalStatus] = useState<string | null>(
    null,
  );

  // Convert updateStateOnCompletion to a useCallback
  const updateAgreementState = useCallback((newData: SavedAgreements) => {
    setAgreementsState((prevAgreementsState) => {
      const exists = prevAgreementsState.some(
        (agreement) => agreement.id === newData.id,
      );

      if (exists) {
        return prevAgreementsState.map((agreement) =>
          agreement.id === newData.id ? newData : agreement,
        );
      } else {
        return [newData, ...prevAgreementsState];
      }
    });

    setRenameModalStatus(null);
    setDuplicateModalStatus(null);
  }, []);

  // Convert updateStateOnCompletion to a useCallback
  const deleteAgreementFromState = useCallback((newData: SavedAgreements) => {
    setAgreementsState((prevAgreementsState) =>
      prevAgreementsState.filter((agreement) => agreement.id !== newData.id),
    );
    setDeleteModalStatus(null);
  }, []);

  // Filter agreements based on status
  const filterAgreements = (status = false) => {
    return agreementsState.filter(
      (agreement) => agreement.completed === status,
    );
  };
  const incompleteAgreements = filterAgreements(false);
  const completeAgreements = filterAgreements(true);

  const AgreementsTemplate = ({
    agreements,
  }: {
    agreements: SavedAgreements[];
  }) => {
    return agreements.length > 0 ? (
      <>
        <div className="agreements-table grid w-full gap-3">
          {agreements.map((record) => (
            <div className="flex w-full" key={record.id}>
              <div className="agreement-table-single hover:agreements-preview-shadow relative flex w-full flex-col overflow-hidden rounded-xl border border-purple-100 transition-all duration-300 header:flex-row">
                {/* Start - Table Row */}
                <div className="agreement-data flex w-full max-w-full flex-col gap-x-3 gap-y-1.5 px-5 py-2 transition-all duration-300 header:flex-row header:items-center">
                  <Link
                    className="flex-grow "
                    href={`/agreements/${record.id}`}
                  >
                    <div className="text-xs capitalize italic text-purple-500">
                      {record.agreement.replaceAll("-", " ").toLowerCase()}
                    </div>
                    <div className="font-bold capitalize">
                      {record.user_defined_name}
                    </div>
                  </Link>

                  <div className="hidden h-6 w-px bg-purple-100 header:flex" />

                  <div className="flex flex-row gap-x-3 sm:whitespace-nowrap sm:[&_*]:whitespace-nowrap">
                    <AgreementProgress record={record} />
                    <div>
                      <div className="h-6 w-px bg-purple-100" />
                    </div>
                    <Popover>
                      <PopoverTrigger className="flex flex-row flex-nowrap items-center gap-2 border-b border-light_purple-400 text-[15px]">
                        <Calendar className="h-4 text-purple-900" />
                        <span>{formatDateUSASimple(record.createdAt)}</span>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto rounded-full bg-white px-4 py-1.5 text-sm">
                        {formatDateUSA(record.createdAt)}
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="hidden h-6 w-px bg-purple-100 header:flex" />

                  <div className="mt-2 flex items-center gap-1.5 header:mt-0">
                    <Link
                      className={cn(
                        "min-w-[105px] flex-grow rounded-full px-5 py-2 text-center text-sm font-semibold uppercase leading-4 tracking-widest text-white transition-all duration-300 header:flex-auto",
                        record.completed
                          ? "bg-[#66BB6A] hover:bg-[#81C784]"
                          : "bg-light_purple-900 hover:bg-light_purple-700",
                      )}
                      href={`/agreements/${record.id}`}
                    >
                      {record.completed ? "View" : "Resume"}
                    </Link>
                    <div className="flex justify-center header:items-center">
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          className={cn(
                            // base
                            "group inline-flex aspect-square h-8 items-center justify-center rounded-full border border-light_purple-900 p-1.5 outline-none transition-all duration-300 ease-out",
                            "[&_svg]:fill-light_purple-900",
                            // hover
                            "hover:shadow-md",
                            // state open
                            "data-[state=open]:scale-100 data-[state=open]:border-light_purple-400 data-[state=open]:shadow-lg [&_svg]:data-[state=open]:rotate-90 [&_svg]:data-[state=open]:fill-light_purple-900",
                          )}
                        >
                          <MoreDotsVertical className="w-full fill-purple-900 transition-all duration-300 ease-out group-hover:fill-light_purple-900" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          className="bg-white text-center"
                          align="end"
                        >
                          <DropdownMenuItem
                            className="cursor-pointer justify-center"
                            onClick={() => setRenameModalStatus(record.id)}
                          >
                            Rename
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer justify-center"
                            onClick={() => setDuplicateModalStatus(record.id)}
                          >
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => setDeleteModalStatus(record.id)}
                            className="cursor-pointer justify-center"
                          >
                            <span className="w-full rounded-full bg-red px-2 py-1 text-center text-white">
                              Delete
                            </span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      {/* Rename Agreement Modal */}
                      <Dialog open={renameModalStatus === record.id}>
                        <DialogContent
                          className="w-dialog-sm bg-white"
                          onInteractOutside={() =>
                            setDuplicateModalStatus(null)
                          }
                        >
                          <DialogHeader>
                            <DialogTitle>Rename Agreement</DialogTitle>
                            <DialogDescription>
                              <RenameAgreement
                                agreementData={record}
                                onCompletion={updateAgreementState}
                              />
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={duplicateModalStatus === record.id}>
                        <DialogContent
                          className="w-dialog-sm bg-white"
                          onInteractOutside={() => setRenameModalStatus(null)}
                        >
                          <DialogHeader>
                            <DialogTitle>Name your new document</DialogTitle>
                            <DialogDescription>
                              <DuplicateAgreement
                                agreementData={record}
                                onCompletion={updateAgreementState}
                              />
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>

                      {/* Delete Agreement Modal */}
                      <Dialog open={deleteModalStatus === record.id}>
                        <DialogContent
                          className="w-dialog-sm bg-white"
                          onInteractOutside={() => setDeleteModalStatus(null)}
                        >
                          <DialogHeader>
                            <DialogTitle>Delete Agreement?</DialogTitle>
                            <DialogDescription>
                              {`Are your sure you'd like to delete the agreement "${record.user_defined_name}"?`}
                              <div className="mt-5 flex flex-row justify-end gap-3">
                                <button
                                  className="btn-primary w-auto"
                                  onClick={() => setDeleteModalStatus(null)}
                                >
                                  Cancel
                                </button>
                                <DeleteAgreement
                                  agreementId={record.id}
                                  onCompletion={deleteAgreementFromState}
                                />
                              </div>
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </div>
                {/* End - Table Row */}
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/agreements/new"
          className="brand-btn -order-1 inline-flex flex-row gap-2 bg-light_purple-900 fill-white text-white header:hidden lg:order-[unset]"
          prefetch={false}
        >
          <Plus className="w-4" />
          <span>New Document</span>
        </Link>
      </>
    ) : (
      <div className="flex w-full max-w-lg flex-col items-center justify-center gap-y-3">
        <div className="w-full rounded-lg border border-purple-100 px-5 py-3 text-center">
          <h5 className="mb-0 uppercase tracking-widest">
            No agreements found
          </h5>
        </div>
        <Link
          href="/agreements/new"
          className="brand-btn inline-flex flex-row gap-2 bg-light_purple-900 fill-white text-white"
          prefetch={false}
        >
          <Plus className="w-4" />
          <span>New Document</span>
        </Link>
      </div>
    );
  };

  return (
    <Tabs defaultValue="all" className="grid gap-6">
      <div className="flex flex-col items-center justify-between gap-x-6 gap-y-3 header:flex-row">
        <h1 className="mb-0 inline-flex whitespace-nowrap text-3xl lg:text-4xl">
          Legal Doc Generator
        </h1>
        <div className="inline-flex h-[2px] w-full flex-grow bg-light_purple-900"></div>
        <div className="inline-flex w-full items-center gap-3">
          <TabsList className="w-full rounded-xl px-2 py-2 [&_button]:items-center [&_button]:justify-start [&_button]:rounded-lg [&_button]:px-2.5 [&_button]:py-1 [&_button]:text-sm [&_button]:font-semibold [&_button]:uppercase [&_button]:tracking-widest">
            <TabsTrigger
              value="all"
              className="w-full !justify-center data-[state=active]:text-light_purple-900"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="incomplete"
              className="w-full !justify-center data-[state=active]:text-light_purple-900"
            >
              Incomplete
            </TabsTrigger>
            <TabsTrigger
              value="complete"
              className="w-full !justify-center data-[state=active]:text-light_purple-900"
            >
              Complete
            </TabsTrigger>
          </TabsList>
          <Link
            href="/agreements/new"
            className="brand-btn hidden flex-row gap-2 whitespace-nowrap bg-light_purple-900 fill-white px-3 text-white header:inline-flex"
            prefetch={false}
          >
            <Plus className="w-4" />
            <span>New Document</span>
          </Link>
        </div>
      </div>
      <div className="h-px w-full bg-purple-100"></div>
      <div className="mx-auto w-full max-w-screen-lg">
        <TabsContent value="all" className="mt-0 items-center gap-6">
          <AgreementsTemplate agreements={agreementsState} />
        </TabsContent>
        <TabsContent value="incomplete" className="mt-0 items-center gap-6">
          <AgreementsTemplate agreements={incompleteAgreements} />
        </TabsContent>
        <TabsContent value="complete" className="mt-0 items-center gap-6">
          <AgreementsTemplate agreements={completeAgreements} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
