import * as React from "react";
import type { SVGProps } from "react";
const SvgStrikethrough = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={512}
    height={512}
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    clipRule="evenodd"
    viewBox="0 0 32 32"
    {...props}
  >
    <path d="M17 26v-7h-2v7h-1a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2zM5 17h22a1 1 0 0 0 0-2H5a1 1 0 0 0 0 2zM15 6v7h2V6h4v1a1 1 0 0 0 2 0V5a1 1 0 0 0-1-1H10a1 1 0 0 0-1 1v2a1 1 0 0 0 2 0V6z" />
  </svg>
);
export default SvgStrikethrough;
