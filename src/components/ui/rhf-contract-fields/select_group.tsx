import React from "react";
import { type ContractQuestions } from "@prisma/client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  defaultValue: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ref: React.Ref<HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement>;
  question: ContractQuestions;
  classes?: string;
  value?: string;
  error?: string;
  onCompletion?: () => void;
}

//Create an interface for the props of a select group that will be incoming {"opt_1":"Website Design Agreement","opt_2":"Website Development Agreement"}
interface SelectGroupProps {
  [key: string]: string;
}

const SelectGroup: React.FC<Props> = ({
  // defaultValue,
  onChange,
  question,
  placeholder,
  classes,
  onCompletion,
}: Props) => {
  if (!question.inputOptions) {
    // throw an error with the field name
    throw new Error(`No input options for ${question.variable}`);
    return <></>;
  }

  // parse the question.inputOptions into an object
  const options = question.inputOptions as SelectGroupProps;

  if (!options) {
    throw new Error(`Options for ${question.variable} do not exist`);
    return <></>;
  }

  // Select's don't use placeholder as an attribute/prop, so we have to use defaultValue instead
  // Will have to come back to this...

  const handleChange = (value: string) => {
    onChange(value);
    if (onCompletion) {
      onCompletion();
    }
  };

  return (
    <>
      <Select onValueChange={(value) => handleChange(value)}>
        <SelectTrigger className={classes}>
          <SelectValue
            placeholder={placeholder != "" ? placeholder : "Select an option"}
          />
        </SelectTrigger>
        <SelectContent>
          {!!Object.entries(options) &&
            Object.entries(options).map(([key, value]) => (
              <SelectItem key={key} value={key + '|' + value}>
                {value}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectGroup;
