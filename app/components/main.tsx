"use client";
import ChatHistory from "./chat-history";
import MobileNav from "./mobile-nav";
import Sidebar from "./sidebar";
import ChatSection from "./chat-section";
const MainComponent = () => {
  return (
    <div>
      <MobileNav>
        <ChatHistory />
      </MobileNav>
      <div className="flex flex-col lg:flex-row h-[100vh]">
        <Sidebar />
        <ChatSection />
      </div>
    </div>
  );
};
export async function Main() {
  return (
    <>
      <MainComponent />
    </>
  );
}
