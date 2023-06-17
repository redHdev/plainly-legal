import * as React from "react";
import type { SVGProps } from "react";
const SvgUpArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={512}
    height={512}
    viewBox="0 0 6.35 6.35"
    {...props}
  >
    <path d="M3.165 1.984a.265.265 0 0 0-.191.092L1.386 3.93a.265.265 0 1 0 .403.344l1.386-1.62 1.386 1.62a.265.265 0 1 0 .403-.344L3.376 2.076a.265.265 0 0 0-.21-.092z" />
  </svg>
);
export default SvgUpArrow;
