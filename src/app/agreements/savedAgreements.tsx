"use client";

import { type SavedAgreements } from "@prisma/client";
import Link from "next/link";
import { Plus } from "~/components/icons";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { formatDateUSA } from "~/utils/helpers";

interface Props {
  savedAgreementsData: SavedAgreements[];
}

const AgreementProgress = ({ record }: { record: SavedAgreements }) => {
  const data_questions = record.data_questions as object;
  const data_clause_answers = record.data_clause_answers as object;
  const data_contract_edits = record.data_contract_edits as object;

  const obj = {
    data_questions,
    data_clause_answers,
    data_contract_edits,
  };

  const total = Object.keys(obj).length;
  // determine how many of the above are not an empty object
  const completed = Object.values(obj).filter((item) => {
    if (Object.keys(item).length > 0) {
      return true;
    }
  }).length;
  const completedString = Math.round((completed / total) * 100);

  return (
    <div className="completed">
      <span className="percentage">{completedString}%</span>
      <span className="label">{` Completed`}</span>
    </div>
  );
};

export default function SavedAgreementsComp({ savedAgreementsData }: Props) {
  console.log(savedAgreementsData);

  const filterAgreements = (status = false) => {
    return savedAgreementsData.filter(
      (agreement) => agreement.completed === status
    );
  };
  const incompleteAgreements = filterAgreements(false);
  const completeAgreements = filterAgreements(true);

  const agreementsTemplate = (agreements: SavedAgreements[]) => {
    return agreements.length > 0 ? (
      incompleteAgreements.map((record) => (
        <Link
          className="agreement-table-single hover:agreements-preview-shadow relative flex flex-row overflow-hidden rounded-xl border border-purple-100 transition-all duration-300 [&_.agreement-data]:hover:max-w-[calc(100%-70px)] [&_.agreement-go]:hover:translate-x-0"
          key={record.id}
          href={`/agreements/${record.id}`}
        >
          <div className="agreement-data flex w-full max-w-full flex-row items-center gap-x-3 px-5 py-2.5 transition-all duration-300">
            <strong className="flex-grow capitalize">
              {record.user_defined_name ?? record.agreement.replaceAll("-", " ").toLowerCase()}
            </strong>
            <div className="h-full w-px bg-purple-100"></div>
            <AgreementProgress record={record} />
            <div className="h-full w-px bg-purple-100"></div>
            <span className="date">{formatDateUSA(record.createdAt)}</span>
          </div>
          <div className="agreement-go absolute right-0 top-0 flex h-full w-[70px] translate-x-full cursor-pointer items-center justify-center rounded-r-xl bg-light_purple-900 text-center text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300">
            <span className="px-5 py-1">Go</span>
          </div>
        </Link>
      ))
    ) : (
      <div className="flex flex-col items-center justify-center gap-y-3">
        <h3 className="mb-0">No agreements found.</h3>
        <Link
          href="/agreements/new"
          className="brand-btn inline-flex flex-row gap-3 fill-white text-white"
        >
          <Plus className="w-5" />
          <span>Create a New Agreement</span>
        </Link>
      </div>
    );
  };

  return (
    <Tabs defaultValue="incomplete" className="grid gap-6">
      <div className="flex flex-col items-center justify-between gap-x-8 gap-y-3 lg:flex-row">
        <h1 className="mb-0 inline-flex whitespace-nowrap">
          Agreements Generator
        </h1>
        <div className="inline-flex h-[2px] w-full flex-grow bg-light_purple-900"></div>
        <div className="inline-flex items-center gap-3">
          <TabsList className="w-full rounded-xl px-2 py-2 [&_button]:items-center [&_button]:justify-start [&_button]:rounded-lg [&_button]:px-2.5 [&_button]:py-1 [&_button]:text-sm [&_button]:font-semibold [&_button]:uppercase [&_button]:tracking-widest">
            <TabsTrigger
              value="incomplete"
              className="data-[state=active]:text-light_purple-900"
            >
              Incomplete
            </TabsTrigger>
            <TabsTrigger
              value="complete"
              className="data-[state=active]:text-light_purple-900"
            >
              Complete
            </TabsTrigger>
          </TabsList>
          <Link href="/agreements/new" className="leading-[0px]">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-light_purple-900 fill-white text-white">
              <Plus className="p-2" />
            </div>
          </Link>
        </div>
      </div>
      <div className="h-px w-full bg-purple-100"></div>
      <div className="mx-auto w-full max-w-screen-lg">
        <TabsContent value="incomplete" className="mt-0">
          <div className="agreements-table grid gap-3">
            {agreementsTemplate(incompleteAgreements)}
          </div>
        </TabsContent>
        <TabsContent value="complete" className="mt-0">
          <div className="agreements-table grid gap-3">
            {agreementsTemplate(completeAgreements)}
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
