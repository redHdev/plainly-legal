import * as React from "react";
import type { SVGProps } from "react";
const SvgRightArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={9}
    height={14}
    fill="none"
    {...props}
  >
    <path
      fill="#F88379"
      d="M7.818 6.462 2.137 1.051a.711.711 0 0 0-.494-.194.711.711 0 0 0-.494.194l-.418.398a.644.644 0 0 0 0 .941L5.5 6.934l-4.776 4.55a.645.645 0 0 0 0 .94l.419.398a.711.711 0 0 0 .494.195.711.711 0 0 0 .493-.195l5.687-5.416a.646.646 0 0 0 0-.944Z"
    />
  </svg>
);
export default SvgRightArrow;
