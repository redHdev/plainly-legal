import React, { useEffect } from "react";
import { type FullContractQuestions } from "~/types/contracts";
import { type ControllerRenderProps } from "react-hook-form";
import SelectGroup from "~/components/ui/rhf-contract-fields/select_group";
import CheckboxGroup from "~/components/ui/rhf-contract-fields/checkbox_group";
import RadioGroup from "~/components/ui/rhf-contract-fields/radio_group";

import { useAnimate } from "framer-motion";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/shadcn/dialog";
import { cn } from "~/utils/cn";

interface Props {
  field: ControllerRenderProps;
  question: FullContractQuestions;
  classes?: string;
  ref: React.Ref<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>;
  value?: string;
  error?: string;
  onCompletion?: () => void;
  hidden?: boolean;
  children?: React.ReactNode;
  index: number;
}

const ContractQuestion = React.forwardRef<
  HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement,
  Props
>(
  (
    {
      field,
      question,
      classes,
      value,
      error,
      onCompletion,
      hidden,
      children,
      index,
    }: Props,
    ref,
  ) => {
    let inputType: string = question.inputType;

    const [scope, animate] = useAnimate();
    const animationDelay = index == 0 ? 0 : 0.2;
    const animationDuration = index == 0 ? 0 : 0.2;

    useEffect(() => {
      if (hidden) {
        void animate(
          scope.current,
          {
            opacity: 0,
            transitionEnd: {
              display: "none",
            },
          },
          { duration: 0.2 },
        );
      } else {
        void animate(
          scope.current,
          {
            display: "flex",
            opacity: 1,
          },
          { delay: animationDelay, duration: animationDuration },
        );
      }
    }, [animate, animationDelay, animationDuration, hidden, scope]);

    //If we have a select or boolean with only 2 options, we want to use radio buttons instead of a selector to make it easier to see
    if (question.inputType === "SELECT" || question.inputType === "BOOLEAN") {
      if (
        !question.inputOptions ||
        Object.entries(question.inputOptions).length <= 2
      ) {
        inputType = "RADIO";
      }
    }

    //Make sure that the boolean options are always yes/no
    if (question.inputType === "BOOLEAN") {
      question.inputOptions = {
        true: "Yes",
        false: "No",
      };
    }

    return (
      <div
        className={`slide hidden flex-col gap-3 opacity-0 ${
          classes ?? "col-span-1"
        }`}
        role="group"
        aria-labelledby={`${question.variable}-label`}
        ref={scope}
        slide-index={index}
      >
        {/* This is where the back button renders */}
        {children}
        <div
          className={cn(
            // "pl-shadow p-6",
            "relative flex flex-col items-center gap-5 rounded-2xl",
          )}
        >
          <div className="label-container w-full">
            <span id={`${question.variable}-label`} className="text-lg">
              {question.text}
            </span>
            {question.help && (
              <Dialog>
                <DialogTrigger
                  className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-purple-100 text-sm"
                  title="Help"
                >
                  ?
                </DialogTrigger>
                <DialogContent
                  className={cn(
                    "bg-white",
                    question.help.length > 400 ? "w-dialog-md" : "w-dialog-xs",
                  )}
                >
                  <DialogHeader>
                    <DialogTitle>Question Explained</DialogTitle>
                    <DialogDescription
                      className="text-base"
                      dangerouslySetInnerHTML={{ __html: question.help }}
                    />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {inputType === "SELECT" && (
            <SelectGroup
              defaultValue={value ?? ""}
              onChange={field.onChange}
              placeholder={""}
              ref={ref}
              question={question}
              onCompletion={onCompletion}
            ></SelectGroup>
          )}
          {inputType === "BOOLEAN" && (
            <SelectGroup
              defaultValue={value ?? ""}
              onChange={field.onChange}
              placeholder={""}
              ref={ref}
              question={question}
              onCompletion={onCompletion}
            ></SelectGroup>
          )}
          {inputType === "CHECKBOX" && (
            <CheckboxGroup
              defaultValue={value ?? ""}
              onChange={field.onChange}
              placeholder={""}
              ref={ref}
              question={question}
              onCompletion={onCompletion}
            ></CheckboxGroup>
          )}
          {inputType === "RADIO" && (
            <RadioGroup
              defaultValue={value ?? ""}
              onChange={field.onChange}
              placeholder={""}
              ref={ref}
              question={question}
              onCompletion={onCompletion}
            ></RadioGroup>
          )}

          {error && (
            <span role="alert" className="text-red">
              {error}
            </span>
          )}
        </div>
      </div>
    );
  },
);
ContractQuestion.displayName = "Emberly Input Group";

export default ContractQuestion;
