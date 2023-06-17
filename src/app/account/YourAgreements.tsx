"use client";

import { type SavedAgreements } from "@prisma/client";
import { useEffect, useState } from "react";
import { type NextRequest } from "next/server";
import useSWR from "swr";

export const YourAgreements = () => {
  const [savedAgreementData, setsavedAgreementData] = useState<
    SavedAgreements[]
  >([]);

  useEffect(() => {
    const yourAgreementsFetched = async () => {
      const usersSavedAgreements = (await fetch(
        "/api/current_user/saved_agreements"
      ).then((res) => res.json())) as SavedAgreements[];
      setsavedAgreementData(usersSavedAgreements);
    };
    void yourAgreementsFetched();
  }, []);

  return (
    <div className="flex min-h-[400px] flex-col rounded-2xl border border-purple-50 p-6 shadow-lg">
      <div className="slide-header">
        <h3>Your Agreements</h3>
      </div>
      <div className="slide-body">
        <span>Agreements show here</span>
        {savedAgreementData && (
          <pre>{JSON.stringify(savedAgreementData, null, 2)}</pre>
        )}
      </div>
    </div>
  );
};

export const YourAgreementsSWR = () => {
  const { data, isLoading } = useSWR<SavedAgreements[]>(
    "/api/current_user/saved_agreements",
    (url: NextRequest) => fetch(url).then((res) => res.json())
  );

  if (isLoading) {
    return <div className="">loading...</div>;
  }

  return (
    <div className="flex min-h-[400px] flex-col rounded-2xl border border-purple-50 p-6 shadow-lg">
      <div className="slide-header">
        <h3>Your Agreements</h3>
      </div>
      <div className="slide-body">
        <span>Agreements show here</span>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  );
};

export default YourAgreements;
