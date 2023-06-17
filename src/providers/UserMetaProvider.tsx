'use client';
import React, { useEffect, useContext, createContext } from 'react';
import type { KeyedUserMeta } from "~/types/user";

interface UserMetaContextProps {
  userMeta: KeyedUserMeta | null;
  setUserMeta: React.Dispatch<React.SetStateAction<KeyedUserMeta | null>>;
}

interface UserMetaProviderProps {
  children: React.ReactNode;
}

const UserMetaContext = createContext<UserMetaContextProps | undefined>(undefined);

export const UserMetaProvider: React.FC<UserMetaProviderProps> = ({ children }) => {
  const [userMeta, setUserMeta] = React.useState<KeyedUserMeta | null>(null);

  //Run this function as an effect so it's not render blocking
  useEffect(() => {
    async function fetchData() {
      //Fetch data from /api/user
      const response = await fetch('/api/user');
      const userMeta = await response.json() as KeyedUserMeta;
      setUserMeta(userMeta);
    }
    void fetchData();
  }, []);

  return (
    <UserMetaContext.Provider value={{ userMeta, setUserMeta }}>
      {children}
    </UserMetaContext.Provider>
  );
};

export function useUserMeta() {
  const context = useContext(UserMetaContext);
  if (context === undefined) {
    throw new Error('useUserMeta must be used within a UserMetaProvider. Wrap the component tree in <UserMetaProvider> above everywhere you might use useUserMeta.');
  }
  return context;
}



