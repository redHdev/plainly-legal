import * as React from "react";
import type { SVGProps } from "react";
const SvgParagraph = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    viewBox="0 0 330 330"
    {...props}
  >
    <path d="M285 0H115C68.131 0 30 38.132 30 85.002 30 131.87 68.131 170 115 170h35v145c0 8.284 6.716 15 15 15s15-6.716 15-15V30h30v285c0 8.284 6.716 15 15 15s15-6.716 15-15V30h45c8.284 0 15-6.716 15-15s-6.716-15-15-15zM115 140c-30.327 0-55-24.672-55-54.998C60 54.674 84.673 30 115 30h35v110h-35z" />
  </svg>
);
export default SvgParagraph;
