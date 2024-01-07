"use client";
import React, { useState } from "react";
import MessageInput from "./message-input";
import UserMessage from "./user-message";
import { motion } from "framer-motion";
import { OPENAI, ManageChat } from "../services";
import { useRouter } from "next/navigation";
import { ManageCookies, generateCode } from "../libs";
import { useAuth, useUser } from "../hooks";
import { useParams } from "next/navigation";
interface ChatMessage {
  chat_message: string;
  chat_response: string;
}

export default function ChatSection() {
  const params = useParams<{ token: string }>();
  const [chatid, setChatid] = useState<string>(params.token);
  const [message, setmessage] = useState<string>("");
  const [result, setresult] = useState<string>("");
  const [chatdata, setchatdata] = useState<ChatMessage[]>([]);
  const useOpenAi = new OPENAI();
  const router = useRouter();
  const manageChat = new ManageChat();
  const cookies = new ManageCookies();
  const user_id = cookies.getcookie("_S_UID_");
  const { metadata, userData } = useUser();
  const { full_name } = metadata;
  const [chatload, setchatload] = useState<boolean>(false);
  const { email }: any = userData;
  const { authdata } = useAuth();
  const { access_token }: any = authdata;
  const handleMessageGenerate = async () => {
    try {
      const res = await useOpenAi.generateText(message);
      if (res.status) {
        setresult(res.result);
        
        if (params.token) {
          manageChat.storeChat({
            email: email,
            user_id: user_id,
            chat_id: chatid,
            chat_message: message,
            chat_response: res.result,
            access_token: access_token,
            name: full_name,
          });
          getChatData(user_id, chatid);
        } else {
          const newtoken = generateCode(10);
          manageChat.storeChat({
            email: email,
            user_id: user_id,
            chat_id: newtoken,
            chat_message: message,
            chat_response: res.result,
            access_token: access_token,
            name: full_name,
          });
          setChatid(newtoken);
          router.push(`/c/${newtoken}`, { scroll: false });
        }
      } else {
        throw new Error(JSON.stringify(res.result));
      }
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  };
  const getChatData = async (id: string | undefined, chatid: string) => {
    setchatload(true);
    try {
      const data: any = await manageChat.getchatHistory(id, chatid);
      console.log(data);
      if (data.length !== 0) {
        setchatdata((prevChatdata) => [...prevChatdata, ...data]);
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    } finally {
      setchatload(false);
    }
  };

  React.useEffect(() => {
    getChatData(user_id, chatid);
  }, []);
  console.log(chatdata);
  return (
    <>
      <div className="flex-1 bg-[rgb(55,55,58)] p-5 h-[100vh]">
        <div className="flex-1 bg-[rgb(55,55,58)] p-5 overflow-y-scroll overflow-x-auto h-[80vh]">
          {chatload
            ? "loading..."
            : chatdata?.map(
                (el: { chat_message: string; chat_response: string }, i) => (
                  <div key={i}>
                    <div className="w-[80%] m-auto bg-gray-500 p-5 rounded-lg mt-5">
                      <UserMessage query={el.chat_message} />
                    </div>
                    <motion.div
                      className="w-[80%] m-auto bg-gray-300 p-5 rounded-lg mt-5"
                      style={{
                        boxShadow:
                          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                      }}
                    >
                      {el.chat_response}
                    </motion.div>
                  </div>
                )
              )}

          <MessageInput
            message={message}
            handleMessageGenerate={handleMessageGenerate}
            setmessage={setmessage}
          />
        </div>
        ;
      </div>
    </>
  );
}
