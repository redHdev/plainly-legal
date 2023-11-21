import React from "react";
import { type ClauseQuestions } from "@prisma/client";
import * as xssModule from "xss";
import Tiptap from "~/components/ui/Tiptap";

//Create a whitelist with no tags or anything allowed
const xss = new xssModule.FilterXSS({
  whiteList: {
    ...xssModule.getDefaultWhiteList(),
    span: ["class"],
  },
  stripIgnoreTag: false,
});

interface Props {
  defaultValue: string;
  question: ClauseQuestions;
  classes?: string;
  placeholder?: string;
  value?: string;
  valid?: (value: boolean) => void;
  onChange?: (value: string) => void;
  errorState?: boolean;
}

export const WYSIWYGInput: React.FC<Props> = ({
  defaultValue,
  onChange,
  valid,
  question,
  classes,
  value,
  errorState,
}: Props) => {
  const [error, setError] = React.useState<string>("Please enter an input");

  function handleChange(value: string) {
    console.log('handle change', value);
    //Dont allow anything sketchy to be input but still allow all normal puncuation. no < or > or anything like that
    value = xss.process(value);
    console.log('handle change xss stripped', value);

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
    <div
      aria-labelledby={`${question.variable}-label`}
      className={`input-container ${classes ?? "col-span-1"}`}
    >

      <Tiptap onChange={handleChange} value={value ?? defaultValue}/>

      {/* <input
        type="text"
        id={question.variable}
        name={question.variable}
        defaultValue={value ?? defaultValue ?? ""}
        onChange={(e) => handleChange(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={""}
        ref={inputRef}
        autoFocus={true}
      /> */}

      {/* Show the error if present */}
      {errorState && (
        <span role="alert" className="text-red">
          {error}
        </span>
      )}
    </div>
  );
};
WYSIWYGInput.displayName = "WYSIWYGInput Input";

export default WYSIWYGInput;
