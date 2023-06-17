import React from "react";
import { type ClauseQuestions } from "@prisma/client";
import { NumericFormat } from 'react-number-format';

interface Props {
  defaultValue: string;
  question: ClauseQuestions;
  classes?: string;
  placeholder?: string;
  value?: string;
  valid?: (value : boolean) => void;
  onChange?: (value: string) => void;
  errorState?: boolean;
}

const PriceInput: React.FC<Props> = ({
  defaultValue,
  onChange,
  valid,
  question,
  classes,
  value,
  errorState,
}: Props) => {
  const [ error, setError ] = React.useState<string>("Please enter an input");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    //remove the $ sign and commas
    const valueWithoutFormatting = value.replace(/[^0-9]/g, "");

    if(onChange){
      onChange(value);
    }

    //Check if the question is answered with valid input
    const hasText = valueWithoutFormatting.length !== 0 ;
    setError(hasText ? "" : "Please enter a valid input");

    //Check if the question is answered with valid input
    if (valid) {
      valid(hasText);
    }
  }
  return (
    <label
      role="group"
      aria-labelledby={`${question.variable}-label`}
      className={`input-container ${classes ?? "col-span-1"}`}
    >
      <NumericFormat
        name={question.variable}
        id={question.variable}
        defaultValue={value ?? defaultValue ?? ""}
        onChange={handleChange}
        placeholder={""}
        thousandSeparator={true}
        prefix={"$"}
        allowLeadingZeros={false}
      />

      {/* Show the error if present */}
      {errorState && (
        <span role="alert" className="text-red">
          {error}
        </span>
      )}

    </label>
  );
}
PriceInput.displayName = "Emberly Input Group";

export default PriceInput;