import type { TermsOfService } from "@prisma/client";

export interface KeyedOptions {
  [key: string]: string | boolean | number | TermsOfService
}

export default KeyedOptions;