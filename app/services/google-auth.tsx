import React from "react";
import { supabase } from "../libs/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
export  const GoogleAuth=()=>{
  return (
      <div className="w-[70%] sm:w-[70%] md:w-[60%] lg:w-[70%]  m-auto">
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["google"]}
          onlyThirdPartyProviders
        />
      </div>
    );
  
}
