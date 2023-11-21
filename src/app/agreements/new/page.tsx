import { type Contracts } from "@prisma/client";
// import Link from "next/link";

import AgreementPicker from "./AgreementPicker";
import getAgreements from "~/data/agreements";
import { cn } from "~/utils/cn";
import Link from "next/link";

export const metadata = {
  title: "New Document - Plainly Legal",
  description: "Generate a new document.",
};

export default async function Page() {
  const contracts = (await getAgreements()) as Contracts[];

  if (contracts === null) {
    throw new Error("No Agreements Found. Please try again later.");
  }

  return (
    <>
      <section
        id="content"
        className={cn(
          "mt-10vh py-10",
          // "mb-24 flex-grow justify-center"
        )}
      >
        <div className="w-full max-w-xl px-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="col-span-full text-center">
              <h2 className="mb-0">Legal Doc Generator</h2>
            </div>

            {/* <hr className="w-20 justify-self-center border-light_purple-900" /> */}

            <div className="col-span-full text-center">
              {!!contracts && contracts.length > 0 ? (
                <AgreementPicker contracts={contracts} />
              ) : (
                <h4 className="">No contracts found</h4>
              )}
            </div>

            <div className="col-span-full mt-5">
              <div className="flex justify-center">
                <Link
                  href="https://help.plainlylegal.com/legal-doc-generator"
                  target="_blank"
                  className="capitalize text-gray-500 underline"
                >{`Not Sure? Click Here`}</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
