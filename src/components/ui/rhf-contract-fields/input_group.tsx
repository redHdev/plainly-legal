import React from "react";
import { type ClauseQuestions } from "@prisma/client";

interface Props {
  defaultValue: string;
  question: ClauseQuestions;
  classes?: string;
  placeholder?: string;
  ref: React.Ref<HTMLInputElement>;
  value?: string;
  valid?: (value: boolean) => void;
  onChange?: (value: string) => void;
  errorState?: boolean;
}

export const InputGroup: React.FC<Props> = ({
  defaultValue,
  onChange,
  valid,
  question,
  classes,
  value,
  ref,
  errorState,
}: Props) => {
  const [error, setError] = React.useState<string>("Please enter an input");

  function handleChange(value: string) {
    //Dont allow anything sketchy to be input
    value = value.replace(/[^a-zA-Z0-9 ]/g, "");

    //Push the change to the form
    if (onChange) {
      onChange(value);
    }

    //Check if the question is answered with valid input
    const hasText = value.length !== 0;
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
      <input
        type="text"
        id={question.variable}
        name={question.variable}
        defaultValue={value ?? defaultValue ?? ""}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={""}
        ref={ref}
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
InputGroup.displayName = "Emberly Input Group";

export default InputGroup;
