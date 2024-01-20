import { Suspense } from "react";
import {Main,SkeletonUI} from "./components";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs"
import {cookies} from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookieStore=cookies();
  const supabase=createServerComponentClient({cookies:()=>cookieStore});
  const {data:{user}}=await supabase.auth.getUser();
   if(!user){
   return redirect('/login');
   }
 return (
    <main className="min-h-screen h-[100vh] bg-[rgb(225,226,233)]">
      <Suspense fallback={<SkeletonUI />}>
         <Main />
      </Suspense>
    </main>
  );
}
