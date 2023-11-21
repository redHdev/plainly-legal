import React from "react";

import { Reload, RightArrow } from "../icons";

interface Props {
  onClick?: () => void;
  text?: string;
  classes?: string;
  //allow children
  children?: React.ReactNode;
  loading?: boolean;
  loadingChildren?: React.ReactNode;
}

const SecondaryButton: React.FC<Props> = ({
  text,
  onClick,
  classes = "", // Assign an empty string as the default value
  children,
  loading = false,
  loadingChildren = "Loading...",
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
      className={`${classes} ${loading ? 'opacity-50 pointer-events-none' : ''} flex cursor-pointer items-center justify-center border-purple-100 bg-white p-2 text-center leading-5`}
      onClick={handleChange}
    >

      {/* if loading, show plain text */}
      {!loading && text}

      {/* if loading, show loading children, else show children */}
      {!loading && children}
      {loading && loadingChildren}


      {/* If loading, show icon, otherwise show the right arrow */}
      <div className="pl-2" >
        {loading && <Reload className="h-5 animate-spin-fast" />}
        {!loading && <RightArrow />}
      </div>

    </button>
  );
};

export default SecondaryButton;
