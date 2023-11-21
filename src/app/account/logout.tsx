"use client";

import { useClerk } from "@clerk/clerk-react";
import { LogOut } from "~/components/icons";

export const SignOutButton = () => {
  const { signOut } = useClerk();

  const completeSignOut = async () => {
    await signOut();
    window.location.reload();
  }

  const clickHandler = () => {
    void completeSignOut();
  };

  return (
    <button
      className="ml-6 inline-flex items-center text-left text-lg"
      onClick={clickHandler}
    >
      <LogOut className="mr-2 h-5 w-5" />
      <span>Sign out</span>
    </button>
  );
};
