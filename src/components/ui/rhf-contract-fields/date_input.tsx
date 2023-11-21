"use client";
import React from "react";
import { type ClauseQuestions } from "@prisma/client";
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/utils/cn"
import { Button } from "~/components/ui/shadcn/button"
import { Calendar } from "~/components/ui/shadcn/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/shadcn/popover"


interface Props {
  defaultValue: string;
  question: ClauseQuestions;
  classes?: string;
  placeholder?: string;
  inputRef: React.Ref<HTMLInputElement> | React.RefObject<HTMLButtonElement> | undefined;
  value?: string;
  valid?: (value : boolean) => void;
  onChange?: (value: string) => void;
  errorState?: boolean;
}

const InputGroup: React.FC<Props> = ({
  onChange,
  valid,
  question,
  classes,
  value,
  inputRef,
  errorState,
}: Props) => {
  const [ error, setError ] = React.useState<string>("Please select a valid date");
  const [date, setDate] = React.useState<Date>()
  const [isOpen, setOpen] = React.useState(false)

  //Check if value is here at a default, if so, set that as the date
  React.useEffect(() => {
    if(value){
      setDate(new Date(value));
    }
  }, [value])

  function handleChange(value?: Date) {
    // Setting the common actions first
    setDate(value);
    setOpen(!value);
    setError(value ? "" : "Please select a valid date");
  
    // Conditionally executing based on whether we have a value (date) or not
    valid && valid(!!value);
  
    if (value && onChange) {
      onChange(format(value, "PPP"));
    }
  }
  
  return (
    <label
      role="group"
      aria-labelledby={`${question.variable}-label`}
      className={`input-container ${classes ?? "col-span-1"}`}
    >
      <Popover open={isOpen} onOpenChange={(value) => setOpen(value)}>
        <PopoverTrigger asChild ref={inputRef as React.RefObject<HTMLButtonElement>}>
          <Button
            variant={"outline"}
            className={cn(
              "min-w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
          <PopoverContent className="w-auto p-0 bg-white">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleChange}
              initialFocus
            />
          </PopoverContent>
      </Popover>

      {/* Show the error if present */}
      {errorState && (
        <span role="alert" className="text-red">
          {error}
        </span>
      )}

    </label>
  );
}
InputGroup.displayName = "Emberly Calender Group";

export default InputGroup;
