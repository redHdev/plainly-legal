"use client";

import { type Contracts } from "@prisma/client"; // Import Prisma client
import { useState } from "react";
import Link from "next/link";

// import onPromise from "~/utils/helpers";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Start the magic here
interface contractsInterface {
  contracts: Contracts[];
}

export const AgreementPicker = ({ contracts }: contractsInterface) => {
  const [agreement, setAgreement] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setAgreement(value);
  };

  return (
    <>
      <div className="mb-5 text-xl">
        What type of agreement would you like to generate?
      </div>
      <div className="flex flex-col items-center justify-center gap-3 xs:flex-row">
        <Select onValueChange={handleChange}>
          <SelectTrigger className="flex-grow">
            <SelectValue placeholder="Choose an agreement" />
          </SelectTrigger>
          <SelectContent>
            {!!contracts &&
              contracts.map((contract) => (
                <SelectItem key={contract.key} value={contract.slug}>
                  {contract.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        {!!agreement ? (
          <button className="btn btn-primary w-auto">
            <Link href={`/agreements/new/${agreement}`}>Generate</Link>
          </button>
        ) : (
          <button className="btn btn-primary w-auto" disabled>
            Generate
          </button>
        )}
      </div>
    </>
  );
};

export default AgreementPicker;
