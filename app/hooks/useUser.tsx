import { useState, useEffect } from "react";
import { supabase } from "../libs/supabase";
export const useUser = () => {
  const [metadata, setMetadata] = useState<any | {}>({});
  const [userData, setUserData] = useState({});
  const getUserMetaData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setTimeout(() => {
        if (user) {
          setUserData(user);
          setMetadata(user.user_metadata);
        } else {
          setMetadata({ message: "Error in Supabase data fetch.." });
        }
      }, 1000);
    } catch (error) {
      throw new Error(JSON.stringify({ GETTING_USER_AUTH_DATA_ERROR: error }));
    }
  };

  useEffect(() => {
    getUserMetaData();
  }, []);

  return { metadata, userData };
};
