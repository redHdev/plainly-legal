import * as React from "react";
import type { SVGProps } from "react";
const SvgDownArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={512}
    height={512}
    viewBox="0 0 6.35 6.35"
    {...props}
  >
    <path d="M1.577 1.984a.265.265 0 0 0-.192.44l1.586 1.853a.265.265 0 0 0 .403 0L4.96 2.424a.265.265 0 1 0-.402-.344L3.172 3.699l-1.386-1.62a.265.265 0 0 0-.21-.095z" />
  </svg>
);
export default SvgDownArrow;
