import React, { useEffect } from "react";
import { type ControllerRenderProps } from "react-hook-form";
import InputGroup from "~/components/ui/rhf-contract-fields/input_group";
import NumberInput from "~/components/ui/rhf-contract-fields/number_input";
import PriceInput from "~/components/ui/rhf-contract-fields/price_input";
import EmailInput from "~/components/ui/rhf-contract-fields/email_input";
import DateInput from "~/components/ui/rhf-contract-fields/date_input";
import { type ClauseQuestions } from "@prisma/client";
import Button from "~/components/ui/Button";
import { useAnimate } from "framer-motion";
import { type AgreementData } from "~/types/forms";
import { replaceAgreementText } from "~/utils/replaceText";

interface Props {
  field: ControllerRenderProps;
  question: ClauseQuestions;
  classes?: string;
  ref: React.Ref<HTMLTextAreaElement | HTMLInputElement>;
  value?: string;
  onCompletion?: () => void;
  onBack?: () => void;
  hidden?: boolean;
  children?: React.ReactNode;
  isFirstSlide: boolean;
  isLastSlide: boolean;
  agreementData: AgreementData;
}

const ContractQuestion = React.forwardRef<
  HTMLInputElement,
  Props
>(
  (
    { field, question, classes, value, onCompletion, onBack, hidden, children, isFirstSlide, agreementData }: Props,
    ref
  ) => {
    const answerFormat: string = question.answerFormat

    const [scope, animate] = useAnimate();
    const [ isFulfilled, setIsFulfilled ] = React.useState<boolean>(false);
    const [ errorState, setErrorState ] = React.useState<boolean>(false);
    const animationDelay = isFirstSlide ? 0 : .2;
    const animationDuration = isFirstSlide ? 0 : .2;

    //Animate between slides
    useEffect(() => {
      if (hidden) {
        void animate(scope.current, {
          opacity: 0,
          transitionEnd: {
            display: "none",
          },
        },
        { duration: .2 },
        );
      } else {
        void animate(scope.current, {
          display: "flex",
          opacity: 1,
        },
        { delay: animationDelay, duration: animationDuration },
        );
      }
    }, [animate, hidden, scope, animationDelay, animationDuration]);

    return (
      <div
        className={`slide flex flex-col gap-2 ${classes ?? "col-span-1"} hidden opacity-0`}
        role="group"
        aria-labelledby={`${question.variable}-label`}
        ref={scope}
      >

        {children}

        <span id={`${question.variable}-label`} dangerouslySetInnerHTML={{ __html: replaceAgreementText( question.prompt, agreementData, 1 ) ?? "" }} ></span>

        { ( answerFormat === "text" || answerFormat === "address" ) && (
          <InputGroup
            defaultValue={value ?? ""}
            onChange={field.onChange}
            placeholder={""}
            question={question}
            errorState={errorState}
            valid={(value) => {
              setIsFulfilled(value);
            }}
            ref={ref}
          ></InputGroup>
        )}

        {answerFormat === "integer" && (
          <NumberInput
            defaultValue={value ?? ""}
            onChange={field.onChange}
            placeholder={""}
            question={question}
            errorState={errorState}
            valid={(value) => {
              setIsFulfilled(value);
            }}
            ref={ref}
          ></NumberInput>
        )}

        {answerFormat === "price" && (
          <PriceInput
            defaultValue={value ?? ""}
            onChange={field.onChange}
            placeholder={""}
            question={question}
            errorState={errorState}
            valid={(value) => {
              setIsFulfilled(value);
            }}
          ></PriceInput>
        )}

        {answerFormat === "email" && (
          <EmailInput
            defaultValue={value ?? ""}
            onChange={field.onChange}
            placeholder={""}
            question={question}
            errorState={errorState}
            valid={(value) => {
              setIsFulfilled(value);
            }}
            ref={ref}
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
            ref={ref}
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
            onClick={() => {
              if( isFulfilled && onCompletion ){
                onCompletion();
              }
              setErrorState(!isFulfilled);
            }}
          />
        </div>

      </div>
    );
  }
);
ContractQuestion.displayName = "Emberly Input Group";

export default ContractQuestion;
