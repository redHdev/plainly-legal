import React from "react";
import { type ClauseQuestions } from "@prisma/client";
import { NumericFormat } from "react-number-format";

interface Props {
  defaultValue: string;
  question: ClauseQuestions;
  classes?: string;
  placeholder?: string;
  inputRef: React.Ref<HTMLInputElement> | undefined;
  value?: string;
  valid?: (value: boolean) => void;
  onChange?: (value: string) => void;
  errorState?: boolean;
  enterPress?: () => void;
}

const PercentageInput: React.FC<Props> = ({
  defaultValue,
  question,
  classes,
  placeholder,
  value,
  valid,
  inputRef,
  onChange,
  errorState,
  enterPress
}: Props) => {
  const [error, setError] = React.useState<string>("Please enter an input");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    //remove the % sign and commas
    const valueWithoutFormatting = value.replace(/[^0-9]/g, "");

    if (onChange) {
      onChange(value);
    }

    //Check if the question is answered with valid input
    const hasText = valueWithoutFormatting.length !== 0;
    setError(hasText ? "" : "Please enter a valid input");

    if (valid) {
      valid(hasText);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && enterPress) {
        enterPress();
    }
  };

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
        onKeyPress={handleKeyPress}
        placeholder={placeholder ?? ""}
        thousandSeparator={true}
        suffix={"%"}
        allowLeadingZeros={false}
        getInputRef={inputRef}
      />

      {/* Show the error if present */}
      {errorState && (
        <span role="alert" className="text-red">
          {error}
        </span>
      )}
    </label>
  );
};
PercentageInput.displayName = "Emberly Input Group";

export default PercentageInput;
