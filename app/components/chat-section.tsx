import React from "react";
import MessageInput from "./message-input";
import UserMessage from "./user-message";
import { useRouter } from 'next/navigation'
import {cookies} from "next/headers";
  
export default async function ChatSection() {
  
  return (
    <>
      <div className="flex-1 bg-[rgb(52,53,65)] p-5 overflow-y-scroll overflow-x-auto h-[100vh]">
        <div className="w-[70%] m-auto bg-gray-500 p-5 rounded-lg">
          <UserMessage query={["hfjdhjdf"]} />
        </div>
         <MessageInput />
      </div>
    </>
  );
}
