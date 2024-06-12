"use client"
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AccountMenu } from "./AccountMenu";
import ChatHistory from "./ChatHistory";
import Link from "next/link";
const MobileSideBar = () => {
  return (
    <div className="duration-300 transform fixed top-0 start-0 bottom-0 z-[60] w-64 bg-gradient-to-r from-violet-200 to-blue-500 border-e border-blue-200 overflow-y-auto lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500 dark:bg-slate-900 dark:border-gray-700">
      <nav className="hs-accordion-group w-full h-full flex flex-col">
        <div className="flex items-center justify-between pt-4 pe-4 ps-7 pb-2 text-blue-700 font-bold">
          COS AI
        </div>

        <div className="h-full overflow-y-scroll">
          <ChatHistory />
        </div>

        <div className="mt-auto bg-gradient-to-r from-violet-200 to-blue-500">
          <AccountMenu />
        </div>
      </nav>
    </div>
  );
};
export default function MobileNav() {
  const MenuDrawer = () => {
    return (
      <Sheet>
        <SheetTrigger className="ps-3 sm:ps-6 sm:ms-6 sm:border-s sm:border-gray-300 dark:border-gray-700">
          <div className="w-9 h-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">
            <svg
              className="hs-collapse-open:hidden flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" x2="21" y1="6" y2="6" />
              <line x1="3" x2="21" y1="12" y2="12" />
              <line x1="3" x2="21" y1="18" y2="18" />
            </svg>
            <svg
              className="hs-collapse-open:block hidden flex-shrink-0 w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </div>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetDescription>
            <MobileSideBar />
          </SheetDescription>
        </SheetContent>
      </Sheet>
    );
  };
  return (
    <>
      <nav className="w-[95%] m-auto flex sm:flex md:flex lg:hidden left-0 right-0 fixed top-1 z-[999] rounded-[36px] bg-gray-100  justify-between items-center px-5">
        <div>
            <Link href="/" shallow={true}>
              <button className="flex gap-1 items-center px-4 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19 12.998h-6v6h-2v-6H5v-2h6v-6h2v6h6z"
                  ></path>
                </svg>
                New chat
              </button>
            </Link>
          </div>
        <div>
          <p className="font-bold bg-gradient-to-r from-slate-500 to-slate-800 bg-clip-text text-transparent">
            COS AI{" "}
          </p>
        </div>
        <div className="p-3">
          <MenuDrawer />
        </div>
      </nav>
    </>
  );
}
