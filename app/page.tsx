"use client";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import {SkeletonUI,Main} from "./components";
import { AuthContext } from "./contexts";
import { useRouter } from "next/navigation";
import { generateCode } from "./libs";
export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const router=useRouter();
  const {AuthState}:any =React.useContext(AuthContext);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);
  if(!AuthState){
    return router.push('/login');
  }
  return (
    <main className="min-h-screen h-[100vh] bg-[rgb(52,53,65)]">
      <Suspense fallback={<SkeletonUI />}>
        {isLoading ? <SkeletonUI /> : <Main />}
      </Suspense>

    </main>
  );
}
