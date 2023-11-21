"use client";

import { type Contracts } from "@prisma/client"; // Import Prisma client
import { useState } from "react";
// import { useRouter } from "next/navigation";
import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/shadcn/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/shadcn/popover";

import { Button } from "~/components/ui/shadcn/button";
import { cn } from "~/utils/cn";
import Link from "next/link";
import { useUserMeta, hasRole } from "~/UserMetaProvider";

// Start the magic here
interface contractsInterface {
  contracts: Contracts[];
}

export const AgreementPicker = ({ contracts }: contractsInterface) => {
  const [agreement, setAgreement] = useState<string | false>(false);
  const [open, setOpen] = useState(false);

  const contractsAtoZ = contracts.sort((a, b) => a.slug.localeCompare(b.slug));
  const { userMeta } = useUserMeta();

  return (
    <>
      {/* {console.log(contracts)} */}
      <div className="mb-5 text-xl">
        What type of agreement would you like to generate?
      </div>
      <div className="agreementpicker2 flex flex-col items-center justify-center gap-3 xs:flex-row">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {!!agreement
                ? contracts.find((contract) => contract.slug === agreement)
                    ?.name
                : "Choose an agreement"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0" align="start">
            <Command>
              <CommandInput
                placeholder="Search Agreements..."
                className="border-none !px-0 !shadow-none !outline-none !ring-0 !ring-offset-0"
              />
              <CommandEmpty>No agreement found.</CommandEmpty>
              <CommandGroup className="max-h-[40vh] overflow-auto">
                {contractsAtoZ.map((contract) => {
                  if (
                    contract.userRole &&
                    !hasRole(userMeta, contract.userRole)
                  )
                    return null;
                  return (
                    <CommandItem
                      key={contract.id}
                      onSelect={(currentValue) => {
                        currentValue !== agreement
                          ? setAgreement(contract.slug)
                          : null;
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          agreement === contract.slug
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {contract.name}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
        <Link
          className={cn(
            "btn btn-primary w-auto cursor-pointer",
            "bg-salmon",
            "hover:bg-salmon/90",
            !agreement && "pointer-events-none opacity-50",
          )}
          href={agreement ? `/agreements/new/${agreement}` : "#"}
          prefetch={false}
        >
          Generate
        </Link>
      </div>
    </>
  );
};

export default AgreementPicker;
