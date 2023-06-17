import React from "react";

interface Props {
  onClick?: () => void;
  text?: string;
  classes?: string;
}

const NextButton: React.FC<Props> = ({
  text,
  onClick,
  classes = "", // Assign an empty string as the default value
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
      className={`${classes} back-button underline pb-2 cursor-pointer`}
      onClick={handleChange}
    >
      {text}
    </button>
  );
};

export default NextButton;
