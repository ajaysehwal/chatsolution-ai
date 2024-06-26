"use client";
import { supabase } from "../app/libs/supabase";
import { useEffect, useState } from "react";
interface AuthInterface {
  access_token: string;
  expires_at: number;
  expires_in: number;
  provider_refresh_token: null;
  provider_token: null;
  refresh_token: string;
  token_type: string;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<boolean>(false);
  const [authload, setAuthLoad] = useState<boolean>(false);
  const [authdata, setAuthData] = useState<AuthInterface | {}>({});

  const readUserSession = async () => {
    setAuthLoad(true);
    try {
      const session = await supabase.auth.getSession();
      setAuthLoad(false);
      return session;
    } catch (error) {
      setAuthLoad(false);
      console.error("Error reading user session:", error);
      return null;
    }
  };

  const logOut = async () => {
    try {
      await supabase.auth.signOut({ scope: "local" });
      document.location.reload();
    } catch (error) {
      return JSON.stringify({ error });
    }
  };

  const getAuthState = async () => {
    setAuthLoad(true);
    const session = await readUserSession();
    setAuthLoad(false);
    if (session?.data.session) {
      setAuthData(session?.data.session);
      setAuthState(true);
    } else {
      setAuthState(false);
    }
  };

  useEffect(() => {
    getAuthState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { authState, authload, logOut, authdata };
};
