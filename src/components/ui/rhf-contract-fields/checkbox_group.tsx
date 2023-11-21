import React, { useEffect, useState } from "react";
import { type ContractQuestions } from "@prisma/client";
import NextButton from "~/components/ui/Button";
import { cn } from "~/utils/cn";

interface Props {
  defaultValue: string;
  onChange: (value: string[]) => void;
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

const CheckboxGroup: React.FC<Props> = ({
  // defaultValue,
  onChange,
  question,
  // placeholder,
  classes = "",
  onCompletion,
}: Props) => {
  if (!question.inputOptions) {
    // throw an error with the field name
    throw new Error(`No input options for ${question.variable}`);
  }

  // parse the question.inputOptions into an object
  const options = question.inputOptions as SelectGroupProps;

  if (!options) {
    throw new Error(`Options for ${question.variable} do not exist`);
  }

  // Select's don't use placeholder as an attribute/prop, so we have to use defaultValue instead
  // Will have to come back to this...
  const [checkedValues, setCheckedValues] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value;
    const isChecked = e.target.checked;

    setCheckedValues((prevValues) => {
      if (isChecked) {
        return [...prevValues, key];
      } else {
        return prevValues.filter((v) => v !== key);
      }
    });
  };

  useEffect(() => {
    onChange(checkedValues);
  }, [checkedValues, onChange]);

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 items-start gap-3 md:grid-cols-2",
          classes
        )}
      >
        {!!Object.entries(options) &&
          Object.entries(options).map(([key, value]) => (
            <label key={key} className="cursor-pointer flex items-baseline gap-2 leading-5">
              <input
                type="checkbox"
                className="min-w-[20px] min-h-[20px]"
                name={question.variable}
                value={key + "|" + value}
                // onBlur={onBlur}
                onChange={handleChange}
                checked={checkedValues.includes(key + "|" + value) ?? false}
              />
              {value}
            </label>
          ))}
      </div>
      <NextButton text={"Continue"} onClick={onCompletion}></NextButton>
    </>
  );
};

export default CheckboxGroup;
