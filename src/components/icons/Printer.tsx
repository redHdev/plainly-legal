import * as React from "react";
import type { SVGProps } from "react";
const SvgPrinter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 512 512"
    {...props}
  >
    <path d="M452 159h-51V0H111v159H60c-33.084 0-60 26.916-60 60v162c0 33.084 26.916 60 60 60h51v71h290v-71h51c33.084 0 60-26.916 60-60V219c0-33.084-26.916-60-60-60zM151 40h210v119H151V40zm-40 361H60c-11.028 0-20-8.972-20-20v-42h71v62zm250 71H151V339h210v133zm111-91c0 11.028-8.972 20-20 20h-51v-62h71v42zm0-82H40v-80c0-11.028 8.972-20 20-20h392c11.028 0 20 8.972 20 20v80z" />
    <circle cx={421} cy={249} r={20} />
  </svg>
);
export default SvgPrinter;
