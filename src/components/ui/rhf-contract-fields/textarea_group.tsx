import React from "react";
import { type ContractQuestions } from "@prisma/client";
import { type ControllerRenderProps } from "react-hook-form";

interface Props {
  field: ControllerRenderProps;
  question: ContractQuestions;
  classes?: string;
  value?: string;
  error?: string;
}

const TextareaGroup = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ field, question, classes, value, error }: Props, ref) => {
    return (
      <label
        role="group"
        aria-labelledby={`${question.variable}-label`}
        className={`input-container ${classes ?? "col-span-1"}`}
      >
        {/* {console.log(typeof control)} */}
        {question.text && (
          <span id={`${question.variable}-label`}>{question.text}</span>
        )}
        <textarea
          defaultValue={value ?? ""}
          onChange={field.onChange}
          placeholder={""}
          ref={ref}
          rows={8}
        />
        {error && (
          <span role="alert" className="text-red">
            {error}
          </span>
        )}
      </label>
    );
  }
);
TextareaGroup.displayName = "Emberly Textarea Group";

export default TextareaGroup;
