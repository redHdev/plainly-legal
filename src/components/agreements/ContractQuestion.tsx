import React, { useEffect } from "react";
import { type FullContractQuestions } from "~/types/contracts";
import { type ControllerRenderProps } from "react-hook-form";
import SelectGroup from "~/components/ui/rhf-contract-fields/select_group";
import CheckboxGroup from "~/components/ui/rhf-contract-fields/checkbox_group";
import RadioGroup from "~/components/ui/rhf-contract-fields/radio_group";

import { useAnimate } from "framer-motion";

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
    ref
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
          { duration: 0.2 }
        );
      } else {
        void animate(
          scope.current,
          {
            display: "flex",
            opacity: 1,
          },
          { delay: animationDelay, duration: animationDuration }
        );
      }
    }, [animate, animationDelay, animationDuration, hidden, scope]);

    //If we have a select or boolean with only 2 options, we want to use radio buttons instead of a selector to make it easier to see
    if (question.inputType === "SELECT" || question.inputType === "BOOLEAN") {
      if (
        question.inputOptions &&
        Object.entries(question.inputOptions).length <= 2
      ) {
        inputType = "RADIO";
      }
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

        <div className="pl-shadow flex flex-col items-center gap-5 rounded-2xl p-6">
          <span
            id={`${question.variable}-label`}
            className="text-center text-lg"
          >
            {question.text}
          </span>

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
  }
);
ContractQuestion.displayName = "Emberly Input Group";

export default ContractQuestion;
