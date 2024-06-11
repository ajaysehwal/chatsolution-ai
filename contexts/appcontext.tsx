"use client";
import React, { Dispatch, SetStateAction, createContext, useState } from "react";
interface AppProviderProps {
  children?: React.ReactNode;
}
export interface AppContextProps {
  setCreateChatEnv?:Dispatch<SetStateAction<boolean>>;
  creatingChatEnv?:boolean;
}

export const AppContext = createContext<AppContextProps | null>(null);
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  
  const [creatingChatEnv,setCreateChatEnv]=useState<boolean>(false);

  return (
    <AppContext.Provider value={{creatingChatEnv,setCreateChatEnv}}>
      {children}
    </AppContext.Provider>
  );
};
