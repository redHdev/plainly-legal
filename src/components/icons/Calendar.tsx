import * as React from "react";
import type { SVGProps } from "react";
const SvgCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
    <path d="M7.6 47.5h32.8c3.4 0 6.2-2.8 6.2-6.2V10.2c0-3.4-2.8-6.2-6.2-6.2h-2.5V2.2c0-1-.8-1.7-1.7-1.7-1 0-1.7.8-1.7 1.7V4H13.6V2.2c0-1-.8-1.7-1.7-1.7s-1.7.8-1.7 1.7V4H7.6c-3.4 0-6.2 2.8-6.2 6.2v31.1c0 3.4 2.8 6.2 6.2 6.2zM4.9 10.2c0-1.5 1.2-2.8 2.8-2.8h2.5v1.7c0 1 .8 1.7 1.7 1.7s1.7-.8 1.7-1.7V7.5h20.9v1.7c0 1 .8 1.7 1.7 1.7 1 0 1.7-.8 1.7-1.7V7.5h2.5c1.5 0 2.8 1.2 2.8 2.8v5.1H4.9zm0 8.6h38.3v22.5c0 1.5-1.2 2.8-2.8 2.8H7.6c-1.5 0-2.8-1.2-2.8-2.8V18.8z" />
  </svg>
);
export default SvgCalendar;
