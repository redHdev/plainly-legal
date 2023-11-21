import * as React from "react";
import type { SVGProps } from "react";
const SvgClear = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    strokeLinejoin="round"
    strokeMiterlimit={2}
    clipRule="evenodd"
    viewBox="0 0 32 32"
    {...props}
  >
    <path d="M15 16.414V27a1 1 0 0 0 2 0v-8.586l9.349 9.35c.391.39 1.024.39 1.415 0 .39-.391.39-1.024 0-1.415L5.707 4.293a1 1 0 0 0-1.414 1.414zM25 4H10a1 1 0 0 0 0 2h5v5l2 2V6h7v2a1 1 0 0 0 2 0V5c0-.517-.394-.943-.897-.995l-.032-.003-.032-.001L25.006 4z" />
  </svg>
);
export default SvgClear;
