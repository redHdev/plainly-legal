import Link from "next/link";
import { type Contracts } from "@prisma/client";

import AgreementPicker from "./agreement_picker";
import getAgreements from "~/data/agreements";

export default async function Page() {
  const contracts = (await getAgreements()) as Contracts[];

  if (contracts === null) {
    throw new Error("No Agreements Found. Please try again later.");
  }

  return (
    <>
      <section id="content" className="mt-10vh pt-0">
        <div className="w-full max-w-xl p-6">
          <div className="grid grid-cols-1 gap-10">
            <div className="col-span-full text-center">
              <h2 className="mb-0">Agreement Generator</h2>
            </div>

            <div className="col-span-full text-center">
              {!!contracts && contracts.length > 0 ? (
                <AgreementPicker contracts={contracts} />
              ) : (
                <h4 className="">No contracts found</h4>
              )}
            </div>

            <div className="col-span-full">
              <div className="flex justify-center">
                <button className="btn btn-primary w-auto border border-purple-100 bg-transparent normal-case text-purple-600 hover:border-purple-900 hover:bg-purple-900 hover:text-white">
                  <Link href="/help">Still not sure?</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
