import React from "react";
import { type ClauseQuestions } from "@prisma/client";
import * as xssModule from "xss";

//Create a whitelist with no tags or anything allowed
const options = {
  whiteList: {},
};
const xss = new xssModule.FilterXSS(options);

interface Props {
  defaultValue: string;
  question: ClauseQuestions;
  classes?: string;
  placeholder?: string;
  inputRef: React.RefObject<HTMLInputElement> | undefined;
  value?: string;
  valid?: (value: boolean) => void;
  onChange?: (value: string) => void;
  errorState?: boolean;
  enterPress?: () => void;
}

export const InputGroup: React.FC<Props> = ({
  defaultValue,
  onChange,
  valid,
  question,
  classes,
  value,
  inputRef,
  errorState,
  enterPress
}: Props) => {
  const [error, setError] = React.useState<string>("Please enter an input");

  function handleChange(value: string) {
    //Dont allow anything sketchy to be input but still allow all normal puncuation. no < or > or anything like that
    value = xss.process(value);

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
      <input
        type="text"
        id={question.variable}
        name={question.variable}
        defaultValue={value ?? defaultValue ?? ""}
        onChange={(e) => handleChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={""}
        ref={inputRef}
        autoFocus={true}
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
