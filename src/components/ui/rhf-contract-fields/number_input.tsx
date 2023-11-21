import React from "react";
import { type ClauseQuestions } from "@prisma/client";

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

const NumberInput: React.FC<Props> = ({
  defaultValue,
  question,
  classes,
  placeholder,
  inputRef,
  value,
  valid,
  onChange,
  errorState,
  enterPress
}: Props) => {
  const [error, setError] = React.useState<string>("Please enter an input");

  function handleChange(value: string) {

    //Dont allow anything sketchy to be input but a number
    const newValue = value.replace(/[^0-9]/g, "");

    // Update the value in the parent component
    if (onChange) {
      onChange(newValue);
    }

    //Check if the question is answered with valid input
    const isValid = value.length !== 0 && value.length == newValue.length;
    setError(isValid ? "" : "Please enter a valid input");

    //Check if the question is answered with valid input
    if (valid) {
      valid(isValid);
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && enterPress) {
        enterPress();
    }

    if(e.key === "-" || e.key === "e") {
      e.preventDefault();
    }
  };

  return (
    <label
      role="group"
      aria-labelledby={`${question.variable}-label`}
      className={`input-container ${classes ?? "col-span-1"}`}
    >
      <input
        type="number"
        min="0"
        name={question.variable}
        id={question.variable}
        defaultValue={value ?? defaultValue ?? ""}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder={placeholder ?? ""}
        ref={inputRef}
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
NumberInput.displayName = "Emberly Input Group";

export default NumberInput;
