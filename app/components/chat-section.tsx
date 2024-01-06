"use client";
import React, { useState } from "react";
import MessageInput from "./message-input";
import UserMessage from "./user-message";
import { motion } from "framer-motion";
import { OPENAI, ManageChat } from "../services";
import { useRouter } from "next/navigation";
import { generateCode } from "../libs";
import { useAuth, useUser } from "../hooks";
import { useParams } from "next/navigation";
export default function ChatSection() {
  const params = useParams<{ token: string }>();
  const [chatid, setChatid] = useState<string>(params.token);
  const [message, setmessage] = useState<string>("");
  const [result, setresult] = useState<string>("");
  const useOpenAi = new OPENAI();
  const router = useRouter();
  const manageChat = new ManageChat();
  const { metadata, userData } = useUser();
  const { full_name } = metadata;
  const { id, email }: any = userData;
  const { authdata } = useAuth();
  const { access_token }: any = authdata;
  const handleMessageGenerate = async()=> {
    try {
      const res = await useOpenAi.generateText(message);
      if (res.status) {
        setresult(res.result);
        if (params.token) {
          manageChat.storeChat({
            email: email,
            user_id: id,
            chat_id: chatid,
            chat_message: message,
            chat_response: res.result,
            access_token: access_token,
            name: full_name,
          });
        } else {
          const newtoken = generateCode(10);
          manageChat.storeChat({
            email: email,
            user_id: id,
            chat_id:newtoken,
            chat_message: message,
            chat_response: res.result,
            access_token: access_token,
            name: full_name,
          });
          setChatid(newtoken);
          router.push(`/c/${newtoken}`);
        }
      } else {
        throw new Error(JSON.stringify(res.result));
      }
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  };
  return (
    <>
      <div className="flex-1 bg-[rgb(52,53,65)] p-5 overflow-y-scroll overflow-x-auto h-[100vh]">
        <div className="w-[70%] m-auto bg-gray-500 p-5 rounded-lg">
          <UserMessage query={[message]} />
        </div>
        <motion.div className="w-[70%] m-auto bg-gray-500 p-5 rounded-lg">
          {result}
        </motion.div>
        <MessageInput
          message={message}
          handleMessageGenerate={handleMessageGenerate}
          setmessage={setmessage}
        />
      </div>
    </>
  );
}
