import { Dialog, DialogContent, DialogClose, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/shadcn/dialog";
import { HelpCircleIcon } from "lucide-react";

interface DialogProps {
    version: string;
    children: React.ReactNode;
}

export const Popup = (contents: DialogProps) => {
    return (
      <>
        <Dialog>
          <DialogTrigger className="ml-2 inline-flex flex-row items-center gap-1">
            <HelpCircleIcon className="h-5 w-5 stroke-gray-400" />
          </DialogTrigger>
          <DialogContent className="w-dialog-sm bg-white">
            <DialogHeader>
              <DialogTitle className="text-center text-[22px] font-bold">
                {contents.version}
              </DialogTitle>
              <DialogDescription className="text-base">
                {contents.children ??
                  "We're sorry. It seems data for this description is missing. Please check back again later."}
              </DialogDescription>
            </DialogHeader>
            <DialogClose />
          </DialogContent>
        </Dialog>
      </>
    );
  };