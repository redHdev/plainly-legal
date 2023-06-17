import React from "react";
import { type ContractQuestions } from "@prisma/client";

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

interface RadioGroupProps {
  [key: string]: string;
}

const RadioGroup: React.FC<Props> = ({
  onChange,
  question,
  classes,
  onCompletion,
}: Props) => {
  if (!question.inputOptions) {
    throw new Error(`No input options for ${question.variable}`);
  }

  const options = question.inputOptions as RadioGroupProps;

  if (!options) {
    throw new Error(`Options for ${question.variable} do not exist`);
  }

  if (Object.entries(options).length === 0) {
    options["true"] = "Yes";
    options["false"] = "No";
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`grid w-full grid-cols-2 gap-5 ${classes ? classes : ""}`}>
      {Object.entries(options).map(([key, value]) => (
        <div key={key} className="grid h-full w-full">
          <input
            type="radio"
            id={question.variable + "_" + key}
            name={question.variable}
            value={key + '|' + value}
            onChange={handleChange}
            onClick={() => {
              if (onCompletion) onCompletion();
            }}
            className="peer hidden"
          />
          <label
            className="flex h-full w-full cursor-pointer items-center justify-center rounded border border-purple-100 bg-white p-2 text-center leading-5 transition-all duration-200 hover:border-light_purple-200 hover:bg-light_purple-50 peer-checked:border-[#C64236] peer-checked:bg-[#F88379] peer-checked:text-white"
            // unusedColors="peer-checked:border-[#C64236] peer-checked:bg-[#F88379]"
            htmlFor={question.variable + "_" + key}
          >
            {value}
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioGroup;
