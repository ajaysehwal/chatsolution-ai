"use client";
import React, { Dispatch, SetStateAction, createContext, useState } from "react";
interface AuthProviderProps {
  children?: React.ReactNode;
}
export interface AuthContextProps {
  setCreateChatEnv?:Dispatch<SetStateAction<boolean>>;
  creatingChatEnv?:boolean;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  
  const [creatingChatEnv,setCreateChatEnv]=useState<boolean>(false);

  return (
    <AuthContext.Provider value={{creatingChatEnv,setCreateChatEnv}}>
      {children}
    </AuthContext.Provider>
  );
};
