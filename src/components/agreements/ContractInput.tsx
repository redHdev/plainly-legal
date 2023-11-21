import React, { useEffect } from "react";
import { type ControllerRenderProps } from "react-hook-form";
import { type ClauseQuestions } from "@prisma/client";
import { useAnimate } from "framer-motion";

import InputGroup from "~/components/ui/rhf-contract-fields/input_group";
import NumberInput from "~/components/ui/rhf-contract-fields/number_input";
import PriceInput from "~/components/ui/rhf-contract-fields/price_input";
import PercentageInput from "~/components/ui/rhf-contract-fields/percentage_input";
import SelectInput from "~/components/ui/rhf-contract-fields/select_input";
import EmailInput from "~/components/ui/rhf-contract-fields/email_input";
import DateInput from "~/components/ui/rhf-contract-fields/date_input";
import WYSIWYGInput from "~/components/ui/rhf-contract-fields/wysiwyg_input";
import Button from "~/components/ui/Button";
import { type AgreementData } from "~/types/forms";
import { replaceAgreementText } from "~/utils/replaceText";
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
  question: ClauseQuestions;
  classes?: string;
  inputRef: React.RefObject<HTMLInputElement> | undefined;
  value?: string;
  onCompletion?: () => void;
  onBack?: () => void;
  hidden?: boolean;
  children?: React.ReactNode;
  isFirstSlide: boolean;
  isLastSlide: boolean;
  agreementData: AgreementData;
}

const ContractQuestion: React.FC<Props> = ({
  field,
  question,
  classes,
  value,
  onCompletion,
  onBack,
  hidden,
  children,
  isFirstSlide,
  agreementData,
  inputRef,
}: Props) => {
  const answerFormat: string = question.answerFormat;

  const [scope, animate] = useAnimate();
  const [isFulfilled, setIsFulfilled] = React.useState<boolean>(false);
  const [errorState, setErrorState] = React.useState<boolean>(false);
  const animationDelay = isFirstSlide ? 0 : 0.2;
  const animationDuration = isFirstSlide ? 0 : 0.2;

  //Animate between slides
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
  }, [animate, hidden, scope, animationDelay, animationDuration]);

  const handleEnterKeyPress = () => {
    console.log("enter has been pressed");
    if (isFulfilled && onCompletion) {
      onCompletion();
    }
    setErrorState(!isFulfilled);
  };

  return (
    <div
      className={`slide flex flex-col gap-2 ${
        classes ?? "col-span-1"
      } hidden opacity-0`}
      role="group"
      aria-labelledby={`${question.variable}-label`}
      ref={scope}
    >
      {children}

      <div className="label-container">
        <span
          id={`${question.variable}-label`}
          className=""
          dangerouslySetInnerHTML={{
            __html:
              //Replace agreement Text, when the current prompt is not hidden, turn this replace into strict mode, we NEED to have all the variables to ask the right question here.
              replaceAgreementText(
                question.prompt,
                agreementData,
                !hidden ? 1 : 2,
              ) ?? "",
          }}
        ></span>
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
                <DialogTitle>Explainer:</DialogTitle>
                <DialogDescription className="text-base">
                  {question.help}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {(answerFormat === "text" || answerFormat === "address") && (
        <InputGroup
          defaultValue={value ?? ""}
          onChange={field.onChange}
          placeholder={""}
          question={question}
          errorState={errorState}
          valid={(value) => {
            setIsFulfilled(value);
          }}
          enterPress={handleEnterKeyPress}
          inputRef={inputRef}
        ></InputGroup>
      )}

      {answerFormat === "integer" && (
        <NumberInput
          defaultValue={value ?? ""}
          onChange={field.onChange}
          placeholder={"12345"}
          question={question}
          errorState={errorState}
          valid={(value) => {
            setIsFulfilled(value);
          }}
          enterPress={handleEnterKeyPress}
          inputRef={inputRef}
        ></NumberInput>
      )}

      {answerFormat === "price" && (
        <PriceInput
          defaultValue={value ?? ""}
          onChange={field.onChange}
          placeholder={"$1,000"}
          question={question}
          errorState={errorState}
          valid={(value) => {
            setIsFulfilled(value);
          }}
          enterPress={handleEnterKeyPress}
          inputRef={inputRef}
        ></PriceInput>
      )}

      {answerFormat === "percentage" && (
        <PercentageInput
          defaultValue={value ?? ""}
          onChange={field.onChange}
          placeholder={"25%"}
          question={question}
          errorState={errorState}
          valid={(value) => {
            setIsFulfilled(value);
          }}
          enterPress={handleEnterKeyPress}
          inputRef={inputRef}
        ></PercentageInput>
      )}

      {answerFormat === "wysiwyg" && (
        <WYSIWYGInput
          defaultValue={value ?? ""}
          onChange={field.onChange}
          question={question}
          errorState={errorState}
          valid={(value) => {
            setIsFulfilled(value);
          }}
        ></WYSIWYGInput>
      )}

      {answerFormat === "select" && (
        <SelectInput
          defaultValue={value ?? ""}
          onChange={field.onChange}
          question={question}
          placeholder={"Select an option"}
          errorState={errorState}
          valid={(value) => {
            setIsFulfilled(value);
            onCompletion && onCompletion();
          }}
          inputRef={inputRef}
        ></SelectInput>
      )}

      {answerFormat === "email" && (
        <EmailInput
          defaultValue={value ?? ""}
          onChange={field.onChange}
          placeholder={"johndoe@example.com"}
          question={question}
          errorState={errorState}
          valid={(value) => {
            setIsFulfilled(value);
          }}
          enterPress={handleEnterKeyPress}
          inputRef={inputRef}
        ></EmailInput>
      )}

      {answerFormat === "date" && (
        <DateInput
          defaultValue={value ?? ""}
          onChange={field.onChange}
          placeholder={""}
          question={question}
          errorState={errorState}
          valid={(value) => {
            setIsFulfilled(value);
          }}
          inputRef={inputRef}
        ></DateInput>
      )}

      <div className="contract-input-navigation-buttons flex flex-row gap-2">
        {!isFirstSlide && (
          <Button
            text={"Back"}
            onClick={() => {
              if (onBack) {
                onBack();
              }
            }}
          />
        )}
        <Button
          text={"Next"}
          classes="border-[#C64236] bg-[#F88379] text-white"
          onClick={() => {
            if (isFulfilled && onCompletion) {
              onCompletion();
            }
            setErrorState(!isFulfilled);
          }}
        />
      </div>
    </div>
  );
};
ContractQuestion.displayName = "Emberly Input Group";

export default ContractQuestion;
