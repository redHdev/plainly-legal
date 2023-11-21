import type { UseFormSetValue, Control } from "react-hook-form/dist/types/form";
import { type BusinessProfileFormValues } from "./BusinessQuestions";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Tiptap from "../ui/Tiptap";
import { Controller } from "react-hook-form";

import * as disclaimerDefaults from "~/data/disclaimers";

interface Props {
  name:
    | "disclaimerFinancial"
    | "disclaimerFitness"
    | "disclaimerLegal"
    | "disclaimerMedical"
    | "disclaimerTax";
  label: string;
  nonEditable: string;
  data: BusinessProfileFormValues;
  control?: Control<BusinessProfileFormValues>;
  setValue: UseFormSetValue<BusinessProfileFormValues>;
}

export const Disclaimer = ({
  name,
  label,
  nonEditable,
  data,
  control,
  setValue,
}: Props) => {

  function setDisclaimerData(html: string) {
    // Create a temporary div element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    // Find all paragraph elements in the tempDiv
    const paragraphs = tempDiv.querySelectorAll('p');

    paragraphs.forEach(p => {
        // Create a new span element
        const span = document.createElement('span');
        span.innerHTML = p.innerHTML;

        // Replace the paragraph with the span element
        p.parentNode?.replaceChild(span, p);
    });

    // Create a new span to wrap the entire content
    const wrapperSpan = document.createElement('span');
    wrapperSpan.className = 'wysiwyg-disclaimer';
    wrapperSpan.innerHTML = tempDiv.innerHTML;

    // Assuming setValue is a function that sets the value somewhere
    setValue(name, wrapperSpan.outerHTML);
}


  //Create a content editable div with "The Company" not editable, but the rest of the text is editable and can be changed by the user
  return (
    <>
      <div className="prefill-disclaimer inline-flex flex-col">
        <strong className="pb-2 text-lg">{label}</strong>
        <Controller
          name={name}
          control={control}
          render={() => (
            <Tiptap
              value={data[name]}
              resetToValue={disclaimerDefaults[name]}
              onChange={(value) => setDisclaimerData(value)}
              disabledMenuItems={["headings"]}
            >
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="non-editable absolute left-4 top-4 z-10 mr-1 cursor-not-allowed whitespace-nowrap bg-[#FDD835]/30">
                      {nonEditable}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    {/* <span>This designator will autofill and cannot be modified</span> */}
                    <div className="max-w-sm">{`We'll fill in the right designator for your business in each agreement, so you can't modify this piece. In editing other parts of this disclaimer, use "We", "Us", or "Our" to refer to your business.`}</div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Tiptap>
          )}
        />
      </div>
    </>
  );
};

export default Disclaimer;
