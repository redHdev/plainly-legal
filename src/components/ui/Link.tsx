import Link from "next/link";
import React from "react";

import { cn } from "~/utils/cn";

interface Props {
  href: string;
  //allow children
  children?: React.ReactNode;
  //Allow any additional props to be passed through
  [x: string]: string | React.ReactNode | undefined;
}

const StylizedLink: React.FC<Props> = ({ href, children, ...props }: Props) => {
  const addedClasses =
    typeof props.className === "string" ? props.className : "";

  return (
    <Link
      {...props}
      className={cn(
        "flex h-full w-full cursor-pointer items-center justify-center gap-1 whitespace-nowrap rounded border bg-[#F88379] p-2 text-center leading-5 text-white transition-all duration-200",
        addedClasses,
      )}
      href={href}
    >
      {children}
    </Link>
  );
};

export default StylizedLink;
