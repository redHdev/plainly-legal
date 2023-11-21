"use client";
import React, { useEffect, useContext, createContext } from "react";
import type { KeyedUserMeta } from "~/types/user";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { type Subscription } from "@prisma/client";
import { type liveFormData } from "~/types/forms";
import { getPrefills, getPrefillCompletion } from "./utils/userPrefills";
import type { completionData } from "~/types/forms";

interface UserMetaContextProps {
  userMeta: KeyedUserMeta | null;
  setUserMeta: React.Dispatch<React.SetStateAction<KeyedUserMeta | null>>;
  refreshUserMeta: () => Promise<void>;
  agreementPrefills: liveFormData | null;
  prefillCompletion: completionData | null;
}

interface UserMetaProviderProps {
  children: React.ReactNode;
}

const UserMetaContext = createContext<UserMetaContextProps | undefined>(
  undefined,
);

export const UserMetaProvider: React.FC<UserMetaProviderProps> = ({
  children,
}) => {
  const [userMeta, setUserMeta] = React.useState<KeyedUserMeta | null>(null);
  const [agreementPrefills, setAgreementPrefills] =
    React.useState<liveFormData | null>(null);
  const [prefillCompletion, setprefillCompletion] =
    React.useState<completionData | null>(null);
  const { userId } = useAuth();

  const refreshUserMeta = async () => {
    try {
      const response = await fetch("/api/user");
      const refreshedUserMeta = (await response.json()) as KeyedUserMeta;
      setUserMeta(refreshedUserMeta);
      setAgreementPrefills(getPrefills(refreshedUserMeta));
      setprefillCompletion(getPrefillCompletion(refreshedUserMeta));
    } catch (error) {
      console.error("Error refreshing user meta:", error);
    }
  };

  //Only get the user meta if we have a valid clerk user ID
  useEffect(() => {
    if (!userId) {
      setUserMeta(null);
      return;
    }
    void refreshUserMeta();
  }, [userId]);

  return (
    <UserMetaContext.Provider
      value={{
        userMeta,
        setUserMeta,
        refreshUserMeta,
        agreementPrefills,
        prefillCompletion,
      }}
    >
      {children}
    </UserMetaContext.Provider>
  );
};

export function useUserMeta() {
  const context = useContext(UserMetaContext);
  if (context === undefined) {
    throw new Error(
      "useUserMeta must be used within a UserMetaProvider. Wrap the component tree in <UserMetaProvider> above everywhere you might use useUserMeta.",
    );
  }
  return context;
}

export function hasRole(
  userMeta: KeyedUserMeta | null,
  roles: string | string[],
) {
  //If we don't have a user meta, we can't have any roles, so return null
  if (!userMeta || !userMeta.userRoles) return null;

  //Confirm that the usermeta is an array of strings
  if (!Array.isArray(userMeta.userRoles)) {
    console.error(
      "User meta roles are not an array of strings:",
      userMeta.userRoles,
    );
    return null;
  }

  const userRoles = userMeta.userRoles as string[];

  //If it's an array of roles, check if they have any of the roles
  if (Array.isArray(roles)) {
    return roles.some((r) => userRoles.includes(r));
  }

  //Otherwise, check if they have the role
  return userRoles.includes(roles);
}

export function hasSubscription(userMeta: KeyedUserMeta | null) {
  //If we don't have a user meta, we can't have any roles, so return null
  if (!userMeta || !userMeta.subscription) return null;

  const subscription = userMeta?.subscription as Subscription | null;

  if (
    subscription &&
    subscription.status == "active" &&
    !subscription.cancelAtPeriodEnd
  ) {
    return true;
  }

  return null;
}

//Create a functional component called RoleGaurd that takes a role and does not show the children if the user does not have the role and shows a passed loader if the userMeta is not yet loaded
export const RoleGuard: React.FC<{
  roles: string | string[];
  loader?: React.ReactNode;
  children: React.ReactNode;
  redirectUrl?: string;
}> = ({ roles, loader, children, redirectUrl }) => {
  const { userMeta } = useUserMeta();

  //If we don't have a user meta, return the loader if it is requsted, otherwise return null
  if (userMeta === null) {
    return loader ?? null;
  }

  //If the user has the role, return the children
  if (roles.length === 0 || hasRole(userMeta, roles)) {
    return <>{children}</>;
  }

  //Redirect if we are supposed to
  if (redirectUrl) redirect(redirectUrl);

  return null;
};

//Create a functional component called SubscriptionGaurd that takes a subscription and does not show the children if the user does not have the subscription
export const SubscriptionGaurd: React.FC<{
  loader?: React.ReactNode;
  children: React.ReactNode;
  redirectUrl?: string;
}> = ({ loader, children, redirectUrl }) => {
  const { userMeta } = useUserMeta();

  //If we don't have a user meta, return the loader if it is requsted, otherwise return null
  if (userMeta === null) {
    return loader ?? null;
  }

  //If the user has the role, return the children
  if (hasSubscription(userMeta)) {
    return <>{children}</>;
  }

  //Redirect if we are supposed to
  if (redirectUrl) redirect(redirectUrl);

  return null;
};
