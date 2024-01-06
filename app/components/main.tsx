"use client";
import { useEffect, useState } from "react";
import ChatHistory from "./chat-history";
import MobileNav from "./mobile-nav";
import Sidebar from "./sidebar";
import ChatSection from "./chat-section";
import { SkeletonUI } from ".";
export async function Main() {
  const [loading, setloading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 1000);
  }, []);
  return (
    <>
      {loading ? (
        <SkeletonUI />
      ) : (
        <div>
          <MobileNav>
            <ChatHistory />
          </MobileNav>
          <div className="flex flex-col lg:flex-row h-[100vh]">
            <Sidebar />
            <ChatSection />
          </div>
        </div>
      )}
    </>
  );
}
