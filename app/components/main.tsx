"use client";
import ChatHistory from "./ChatHistory";
import MobileNav from "./MobileNav";
import Sidebar from "./sidebar";
import ChatSection from "./ChatSection";

const MainComponent = () => {
  return (
    <div>
      <MobileNav>
        <ChatHistory />
      </MobileNav>
        <Sidebar />
        <ChatSection />
       
    </div>
  );
};
export async function Main() {
  return (
    <>
      <div className="relative h-screen w-full lg:ps-64">
      <div className="py-10 lg:py-14">
          <MainComponent /> 

         
        </div>
      </div>
    </>
  );
}
