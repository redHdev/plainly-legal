import * as React from "react";
import type { SVGProps } from "react";
const SvgLock = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="512pt"
    height="512pt"
    viewBox="-64 0 512 512"
    {...props}
  >
    <path d="M336 512H48c-26.453 0-48-21.523-48-48V240c0-26.477 21.547-48 48-48h288c26.453 0 48 21.523 48 48v224c0 26.477-21.547 48-48 48zM48 224c-8.813 0-16 7.168-16 16v224c0 8.832 7.188 16 16 16h288c8.813 0 16-7.168 16-16V240c0-8.832-7.188-16-16-16zm0 0" />
    <path d="M304 224c-8.832 0-16-7.168-16-16v-80c0-52.93-43.07-96-96-96s-96 43.07-96 96v80c0 8.832-7.168 16-16 16s-16-7.168-16-16v-80C64 57.406 121.406 0 192 0s128 57.406 128 128v80c0 8.832-7.168 16-16 16zm0 0" />
  </svg>
);
export default SvgLock;
