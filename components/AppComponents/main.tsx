"use client";
import ChatSection from "./ChatSection";

export function Main() {
  return (
    <main className="flex-1 min-h-screen bg-white dark:bg-gray-900">
      <div className="flex flex-col h-full relative">
        <div className="flex-1 overflow-y-auto">
          <div className="container max-w-4xl mx-auto px-4 py-6 md:px-6">
            <ChatSection />
          </div>
        </div>
      </div>
    </main>
  );
}
