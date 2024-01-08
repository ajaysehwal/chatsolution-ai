"use client";
import React, { useState, useRef } from "react";
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
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const params = useParams<{ token: string }>();
  const [chatid, setChatid] = useState<string>(params.token);
  const [message, setmessage] = useState<string>("");
  const [result, setresult] = useState<string>("");
  const [chatdata, setchatdata] = useState<ChatMessage[]>([]);
  const useOpenAi = new OPENAI();
  const router = useRouter();
  const manageChat = new ManageChat();
  const cookies = new ManageCookies();
  const user_id = cookies.getcookie("Secure_S_UID_");
  const { metadata, userData } = useUser();
  const { full_name } = metadata;
  const [chatload, setchatload] = useState<boolean>(false);
  const { email }: any = userData;
  const { authdata } = useAuth();
  const { access_token }: any = authdata;
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const handleMessageGenerate = async () => {
     scrollToBottom();
      try {
       scrollToBottom();

      const res = await useOpenAi.generateText(message);
      if (res.status) {
        setresult(res.result);
        scrollToBottom();

        const newUserMessage = {
          chat_message: message,
          chat_response: res.result,
        };
        setchatdata(prevChatData => [...prevChatData, newUserMessage]);
        scrollToBottom();
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
          scrollToBottom();
          setmessage("");
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
          scrollToBottom();
          setmessage("");
          setChatid(newtoken);
          router.push(`/c/${newtoken}`, { scroll: false });
        }
      } else {
        throw new Error(JSON.stringify(res.result));
      }
    } catch (err) {
      console.log(err);
      throw new Error(JSON.stringify(err));
    }
  };
  const getChatData = async (user_id: string | undefined, chatid: string) => {
    setchatload(true);
    try {
      const data: any = await manageChat.getChatHistory(user_id, chatid);
      if (data.length !== 0) {
        setchatdata(data);
        scrollToBottom();
      } else {
        setchatdata([
          {
            chat_message: "Ask me anything",
            chat_response: "How may i help you sir",
          },
        ]);
      }
    } catch (error) {
      console.error("Error fetching chat data:", error);
    } finally {
      setchatload(false);
    }
  };
  React.useEffect(() => {
    scrollToBottom();
  }, [chatdata]);
  React.useEffect(() => {
    getChatData(user_id, chatid);
  }, []);
  return (
    <>
      <div className="flex-1 bg-[rgb(55,55,58)] p-5 h-[100vh]">
        <div
          ref={chatContainerRef}
          id="chatcontainer"
          className="flex-1 bg-[rgb(55,55,58)] p-5 overflow-y-scroll overflow-x-auto h-[80vh]"
        >
          {chatload
            ?(<div className="loader m-auto"></div>)
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
                      <p>
                      {el.chat_response}
                      </p>
                    
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
        
      </div>
    </>
  );
}
