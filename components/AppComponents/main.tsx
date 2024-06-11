"use client";
import MobileNav from "./MobileNav";
import Sidebar from "./sidebar";
import ChatSection from "./ChatSection";
import Link from "next/link";
export async function Main() {
  return (
    <>
      <div className="relative h-screen w-full lg:ps-64 ">
        <div className="py-10 lg:py-14">
          <MobileNav />
          <Sidebar />
          <div className="hidden lg:flex md:flex fixed top-3 ml-3 justify-between items-center mb-3">
            <Link href="/" shallow={true}>
              <button className="flex gap-1 items-center px-6 py-2 rounded-full bg-gradient-to-b from-blue-500 to-blue-600 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.5em"
                  height="1.5em"
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
          <ChatSection />
        </div>
      </div>
    </>
  );
}
