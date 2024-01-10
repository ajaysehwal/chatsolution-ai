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
import { useContext } from "react";
import { AppContext, AppContextProps } from "../contexts";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface ChatMessage {
  chat_message: string;
  chat_response: string;
}
export default function ChatSection() {
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const params = useParams<{ token: string }>();
  const { toast } = useToast();
  const { creatingChatEnv, setCreateChatEnv }: any =
    useContext<AppContextProps | null>(AppContext);
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
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  const handleMessageGenerate = async () => {
    setCreateChatEnv(true);
    try {
      const res = await useOpenAi.generateText(message);
      if (res.status) {
        setresult(res.result);

        const newUserMessage = {
          chat_message: message,
          chat_response: res.result,
        };
        setchatdata((prevChatData) => [...prevChatData, newUserMessage]);
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
          setCreateChatEnv(false);
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
    if (params.token) {
      setchatload(true);
      try {
        const data: any = await manageChat.getChatHistory(user_id, chatid);
        if (data.length === 0) {
          toast({
            variant: "destructive",
            title: "Unauthorized chat token",
            description: "There was a problem with your request.",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
          });
          setTimeout(() => {
            router.push("/", { scroll: true });
          }, 3000);
        } else {
          setchatdata(data);
          scrollToBottom();
        }
      } catch (error) {
        console.error("Error fetching chat data:", error);
      } finally {
        setchatload(false);
      }
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
      <Toaster />
      <div className="flex-1 bg-[rgb(55,55,58)] p-5 h-[100vh]">
        {params.token ? (
          <div
            ref={chatContainerRef}
            id="chatcontainer"
            className="flex-1 bg-[rgb(55,55,58)] p-5 overflow-y-scroll overflow-x-auto h-[80vh]"
          >
            {chatload ? (
              <div className="loader m-auto"></div>
            ) : (
              chatdata?.map(
                (el: { chat_message: string; chat_response: string }, i) => (
                  <div key={i}>
                    <div
                      data-aos="zoom-in-up"
                      className="w-[80%] m-auto bg-gray-500 p-5 rounded-lg mt-5"
                    >
                      <UserMessage query={el.chat_message} />
                    </div>
                    <motion.div
                      className="w-[80%] m-auto bg-gray-300 p-5 rounded-lg mt-5"
                      style={{
                        boxShadow:
                          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
                      }}
                    >
                      <p>{el.chat_response}</p>
                    </motion.div>
                  </div>
                )
              )
            )}
          </div>
        ) : (
          <HowcanIhelp />
        )}
        <MessageInput
          message={message}
          handleMessageGenerate={handleMessageGenerate}
          setmessage={setmessage}
        />
      </div>
    </>
  );
}

const HowcanIhelp = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1, ease: "easeInOut" } }}
      className="text-center mt-[20%]"
    >
      <svg
        className="m-auto"
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        fill="white"
        height="50"
        preserveAspectRatio="xMidYMid"
        viewBox="0 0 256 260"
      >
        <path d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z" />
      </svg>
      <p className="text-white text-[28px] font-semibold">
        How can I help you today?
      </p>
    </motion.div>
  );
};
