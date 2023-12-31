import React from "react";
import { cn } from "~/utils/cn";

interface Props {
  onClick?: () => void;
  text?: string;
  classes?: string;
  //allow children
  children?: React.ReactNode;
}

const Button: React.FC<Props> = ({
  text,
  onClick,
  classes = "", // Assign an empty string as the default value
  children,
}: Props) => {
  if (!text && !children) {
    text = "Continue";
  }

  const handleChange = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={cn("flex h-full w-full cursor-pointer items-center justify-center rounded border border-purple-100 bg-white p-2 text-center leading-5 transition-all duration-200 focus:border-[#C64236] focus:bg-[#F88379] focus:text-white", classes)}
      onClick={handleChange}
    >
      {text}
      {children}
    </button>
  );
};

export default Button;
