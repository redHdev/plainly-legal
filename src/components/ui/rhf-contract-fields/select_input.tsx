import React from "react";
import { type ClauseQuestions } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  defaultValue: string;
  question: ClauseQuestions;
  classes?: string;
  placeholder?: string;
  inputRef: React.Ref<HTMLInputElement> | React.RefObject<HTMLButtonElement> | undefined;
  value?: string;
  valid?: (value: boolean) => void;
  onChange?: (value: string) => void;
  errorState?: boolean;
}

//Create an interface for the props of a select group that will be incoming {"opt_1":"Website Design Agreement","opt_2":"Website Development Agreement"}
interface SelectGroupProps {
  [key: string]: string;
}


const SelectInput: React.FC<Props> = ({
  defaultValue,
  question,
  classes,
  placeholder,
  value,
  valid,
  inputRef,
  onChange,
  errorState,
}: Props) => {
  const [error, setError] = React.useState<string>("Please select an option");

  if (!question.answerOptions) {
    // throw an error with the field name
    throw new Error(`No input options for ${question.variable}`);
  }

  // parse the question.inputOptions into an object
  const options = question.answerOptions as SelectGroupProps;

  if (!options) {
    throw new Error(`Options for ${question.variable} do not exist or are invalid`);
  }

  function handleChange(value: string) {

    if (onChange) {
      onChange(value);
    }

    //Check if the question is answered with valid input
    const hasText = value.length !== 0;
    setError(hasText ? "" : "Please enter a valid input");

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

      <Select onValueChange={(value) => handleChange(value)} value={value ?? defaultValue == "" ? undefined : defaultValue} >
        <SelectTrigger className={classes} ref={inputRef as React.RefObject<HTMLButtonElement>}>
          <SelectValue
            placeholder={placeholder != "" ? placeholder : "Select an option"}
          />
        </SelectTrigger>
        <SelectContent>
          {!!Object.entries(options) &&
            Object.entries(options).map(([key, value]) => (
              <SelectItem key={key} value={value} >
                {value}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>


      {/* Show the error if present */}
      {errorState && (
        <span role="alert" className="text-red">
          {error}
        </span>
      )}
    </label>
  );
};
SelectInput.displayName = "Emberly Input Group";

export default SelectInput;
