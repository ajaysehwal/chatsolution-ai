"use client";
import React, { createContext, useEffect, useState } from "react";
import createSupabaseServerClient from "../libs/supabase";
import { useRouter } from "next/navigation";
import { ManageCookies } from "../libs";
interface AuthProviderProps {
  children?: React.ReactNode;
}
export interface AuthContextProps {
  logOut?: () => Promise<void>;
  message?: string;
  AuthState?: boolean;
  metauser?: object;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
export const AuthProvider: React.FC<AuthProviderProps> = async ({ children }) => {
  const supabase=await createSupabaseServerClient();
  const [metadata, setmetauser] = useState<AuthContextProps | null>({});
  const [session, setSession] = React.useState<any>();
  const [AuthState,setAuthState]=useState<boolean>(false);
  const router = useRouter();
  const cookies=new ManageCookies();
  const getUserMetaData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const maxAge = 100 * 365 * 24 * 60 * 60 
        document.cookie = `_SUPABASE_UID=${user?.id}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
        const meta = user.user_metadata;
        setmetauser(meta);
      } else {
        setmetauser({ message: "error in supabase data fetch.." });
      }
    } catch (error) {
      throw new Error(JSON.stringify({ GETTING_USER_AUTH_DATA_ERROR: error }));
    }
  };
  useEffect(() => {
    getUserMetaData();
  }, []);
  
  const logOut = async () => {
    try {
      await supabase.auth.signOut({ scope: "local" });
      router.push("/login", { scroll: false });
    } catch (error) {
      throw new Error(JSON.stringify({ logOutError: error }));
    }
  };
  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }) => setSession(session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) =>{
      if (_event === 'SIGNED_OUT') {
        cookies.deletecookie('my-access-token');
        cookies.deletecookie('my-refresh-token');
      } else if (_event === 'SIGNED_IN' || _event === 'TOKEN_REFRESHED') {
        cookies.setcookie('my-access-token',session?.access_token);
        cookies.setcookie('my-refresh-token',session?.refresh_token)
      }
      setSession(session)

    }
    
    );

    return () => subscription.unsubscribe();

    }, []);
    console.log("session------/",session);
   useEffect(()=>{
    if(!session){
      setAuthState(false)
    }else{
      setAuthState(true)
    }
   },[session])

  return (
    <AuthContext.Provider value={{ logOut,metadata,AuthState } as AuthContextProps}>
      {children}
    </AuthContext.Provider>
  );
};
