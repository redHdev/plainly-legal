import type { UserTermsOfServiceAcceptance, TermsOfService } from "@prisma/client";

export interface KeyedUserMeta {
  [key: string]: string | boolean | number | UserTermsOfServiceAcceptance[];
}

export default KeyedUserMeta;
  export interface FullUserTermsOfServiceAcceptance extends UserTermsOfServiceAcceptance {
    termsOfService: TermsOfService[];
  }
  
export interface saveTOSInput {
  termsOfServiceId: string;
  version: number;
  acceptedAt: Date;
}
