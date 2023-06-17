import Link from "next/link";
import React from "react";

interface Props {
  href: string;
  //allow children
  children?: React.ReactNode;
  //Allow any additional props to be passed through
  [x: string]: string | React.ReactNode | undefined;
}

const StyleizedLink: React.FC<Props> = ({
  href,
  children,
  ...props
}: Props) => {

  const addedClasses = typeof props.className === 'string' ? props.className : '';

  //Combine the classes if they passed className as a prop
  const classes = `flex gap-1 h-full w-full cursor-pointer items-center justify-center rounded border p-2 text-center leading-5 transition-all duration-200 text-white bg-[#F88379] text-white ${addedClasses}`;

  return (
    <Link
      {...props}
      className={classes}
      href={href}
    >
      {children}
    </Link>
  );
};

export default StyleizedLink;
