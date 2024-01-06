import React from 'react'
import { Suspense } from "react";
import {SkeletonUI,Main} from "@/app/components";
import {createServerComponentClient} from "@supabase/auth-helpers-nextjs"
import {cookies} from "next/headers";
import { redirect } from "next/navigation";
export default async function ChatPage() {
  const cookieStore=cookies();
  const supabase=createServerComponentClient({cookies:()=>cookieStore});
  const {data:{user}}=await supabase.auth.getUser();
   if(!user){
   return redirect('/login');
   }
  return (
    <>
     <main className="min-h-screen h-[100vh] bg-[rgb(52,53,65)]">
      <Suspense fallback={<SkeletonUI />}>
         <Main />
      </Suspense>
    </main>
    </>
  )
}
