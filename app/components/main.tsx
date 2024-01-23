"use client";
import MobileNav from "./MobileNav";
import Sidebar from "./sidebar";
import ChatSection from "./ChatSection";
export async function Main() {
 return (
    <>
     <div className="relative h-screen w-full lg:ps-64">
          <div className="py-10 lg:py-14">
            <MobileNav />
            <Sidebar />
            <ChatSection />
          </div>
        </div>
      
    </>
  );
}
