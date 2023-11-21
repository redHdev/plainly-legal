import type { UserTermsOfServiceAcceptance, TermsOfService, BusinessProfile, Subscription } from "@prisma/client";

export interface KeyedUserMeta {
  [key: string]: string | boolean | number | null | UserTermsOfServiceAcceptance[] | BusinessProfile | Subscription | string[];
}

export default KeyedUserMeta;
export interface FullUserTermsOfServiceAcceptance extends UserTermsOfServiceAcceptance {
  termsOfService: TermsOfService[];
}
