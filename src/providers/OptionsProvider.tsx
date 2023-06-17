'use client';
import React, { useEffect, useContext, createContext } from 'react';
import type { KeyedOptions } from "~/types/options";

interface OptionsContextProps {
  options: KeyedOptions | null;
  setOptions: React.Dispatch<React.SetStateAction<KeyedOptions | null>>;
}

interface OptionsProviderProps {
  children: React.ReactNode;
}

const OptionsContext = createContext<OptionsContextProps | undefined>(undefined);

export const OptionsProvider: React.FC<OptionsProviderProps> = ({ children }) => {
  const [options, setOptions] = React.useState<KeyedOptions | null>(null);

  //Run this function as an effect so it's not render blocking
  useEffect(() => {
    async function fetchData() {
      //Fetch data from /api/user
      const response = await fetch('/api/options');
      const userMeta = await response.json() as KeyedOptions;
      setOptions(userMeta);
    }
    void fetchData();
  }, []);

  return (
    <OptionsContext.Provider value={{ options, setOptions }}>
      {children}
    </OptionsContext.Provider>
  );
};

export function useOptions() {
  const context = useContext(OptionsContext);
  if (context === undefined) {
    throw new Error('useOptions must be used within a OptionsProvider. Wrap the component tree in <OptionsProvider> above everywhere you might use useOptions.');
  }
  return context;
}
