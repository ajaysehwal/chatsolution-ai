import React from "react";
import ChatHistory from "./ChatHistory";
import { AccountMenu } from "./AccountMenu";
import Image from "next/image";
import logo from "@/public/logo.png";
export default function Sidebar() {
  return (
    <>
      <div
        id="application-sidebar"
        className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[10] w-64 bg-gradient-to-r from-violet-200 to-blue-500 border-e border-red-200 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-yellow-200 [&::-webkit-scrollbar-thumb]:bg-yellow-300 dark:[&::-webkit-scrollbar-track]:bg-yellow-400 dark:[&::-webkit-scrollbar-thumb]:bg-teal-500 dark:bg-orange-900 dark:border-gray-700"
      >
        <nav
          className="hs-accordion-group w-full h-full flex flex-col"
          data-hs-accordion-always-open
        >
          <div className="flex gap-4 items-center justify-center pt-4 pb-2 font-bold">
            <Image
              src={logo}
              width="41"
              height="41"
              className="flex-shrink-0 w-[2.575rem] h-[2.575rem] rounded-full"
              alt="logo"
            />
            <p className="text-2xl bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text text-transparent">
              COS AI
            </p>
          </div>

          <div className="h-full overflow-y-scroll">
            <ChatHistory  />
          </div>

          <div className="mt-auto bg-gradient-to-r from-violet-200 to-blue-500">
            <AccountMenu />
          </div>
        </nav>
      </div>
    </>
  );
}
