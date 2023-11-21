import React from "react";
import { cn } from "~/utils/cn";
import { Revert } from "../icons";

interface Props {
  onClick?: () => void;
  text?: string;
  className?: string;
}

const BackButton: React.FC<Props> = ({
  text,
  onClick,
  className = "", // Assign an empty string as the default value
}: Props) => {
  if (!text) {
    text = "Back";
  }

  const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={cn(
        "back-button mb-5 flex h-full w-fit cursor-pointer items-center justify-center rounded border border-purple-100 bg-white px-8 py-2 text-center text-sm leading-5 transition-all duration-200 hover:border-light_purple-200 hover:bg-light_purple-50 peer-checked:border-[#C64236] peer-checked:bg-[#F88379] peer-checked:text-white lg:text-base",
        className,
      )}
      onClick={handleChange}
    >
      <Revert className="mr-2 h-3 w-3" />
      {text}
    </button>
  );
};

export default BackButton;
