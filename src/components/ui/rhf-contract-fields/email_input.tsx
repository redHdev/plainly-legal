import React from "react";
import { type ClauseQuestions } from "@prisma/client";

interface Props {
  defaultValue: string;
  question: ClauseQuestions;
  classes?: string;
  placeholder?: string;
  ref: React.Ref<HTMLInputElement>;
  value?: string;
  valid?: (value : boolean) => void;
  onChange?: (value: string) => void;
  errorState?: boolean;
}

const InputGroup: React.FC<Props> = ({
  defaultValue,
  onChange,
  valid,
  question,
  classes,
  value,
  ref,
  errorState,
}: Props) => {
  const [ error, setError ] = React.useState<string>("Please enter an email address");

  function handleChange(value: string){

    //Dont allow anything sketchy to be input except for normal email chars
    value = value.replace(/[^a-zA-Z0-9@._-]/g, "");

    //Push the change to the form
    if(onChange){
      onChange(value);
    }

    //Check if the question has a @ char and a . after the @
    const isValid = (str: string) => /@.*\./.test(str);
    //Check if the question is answered with valid input and push the valid state up
    if (valid) {
      valid( isValid(value) );
    }

    //Check if the question is answered with valid input
    if( value.length === 0 ) {
      setError("Please enter an email address");
      return;
    }

    //Check if the question has a @ char and a . after the @
    if( !isValid(value) ) {
      setError("Please enter a valid email address");
      return;
    }

    //Clear errors since we have a valid input
    setError("");
  }

  return (
    <label
      role="group"
      aria-labelledby={`${question.variable}-label`}
      className={`input-container ${classes ?? "col-span-1"}`}
    >
      <input
        type="text"
        name={question.variable}
        id={question.variable}
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
}
InputGroup.displayName = "Emberly Input Group";

export default InputGroup;