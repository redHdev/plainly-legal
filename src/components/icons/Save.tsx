import * as React from "react";
import type { SVGProps } from "react";
const SvgSave = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={15}
    height={17}
    fill="none"
    {...props}
  >
    <path
      fill="#000"
      d="m14.855 3.564-3-3.4A.472.472 0 0 0 11.5 0h-10C.672 0 0 .761 0 1.7v13.6c0 .939.672 1.7 1.5 1.7h12c.828 0 1.5-.761 1.5-1.7V3.967a.608.608 0 0 0-.145-.403ZM9.5 1.134v3.4h-4v-3.4h4Zm-6 14.733V11.9c0-.313.224-.567.5-.567h7c.276 0 .5.254.5.567v3.967h-8ZM14 15.3c0 .313-.224.567-.5.567h-1V11.9c0-.939-.672-1.7-1.5-1.7H4c-.828 0-1.5.761-1.5 1.7v3.967h-1c-.276 0-.5-.254-.5-.567V1.7c0-.313.224-.567.5-.567h3v3.4c0 .626.448 1.134 1 1.134h4c.552 0 1-.508 1-1.134v-3.4h.795L14 4.2V15.3Z"
    />
  </svg>
);
export default SvgSave;
