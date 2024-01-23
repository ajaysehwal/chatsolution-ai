"use client";
import React, { useState, useRef, useEffect } from "react";
import MessageInput from "./MessageInput";
import QuerySection from "./QuerySection";
import { motion } from "framer-motion";
import { OPENAI, ManageChat } from "../services";
import { useRouter } from "next/navigation";
import { ManageCookies, generateCode } from "../libs";
import { UseScroller, useAuth, useUser } from "../hooks";
import { useParams } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { handleStoreData } from "../utils";
import ResponseSection from "./ResponseSection";
import dynamic from "next/dynamic";
const CreatingEnvLoading=dynamic(()=>import('./loaders/createEnv'),{ssr:false})
interface ChatMessage {
  chat_message: string;
  chat_response: string;
  isNew: boolean;
}

export default function ChatSection() {
  const params = useParams<{ token: string }>();
  const { toast } = useToast();
  const [chatid, setChatid] = useState<string>(params.token);
  const [message, setmessage] = useState<string>("");
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
  const [load, setload] = useState<boolean>(false);
  const [creatingEnv, setcreatingEnv] = useState<boolean>(false);
  const [chunks, setchunk] = useState<string>("");
  const { handleScroll } = UseScroller();
  const ScrollDuration:number=1000;

  
  const handleChunkData = (res: string) => {
    setchunk((prev) => prev + res);
  };
  const handleMessageGenerate = async () => {
    if (chunks !== "") {
      setchunk("");
    }
    setload(true);
    setcreatingEnv(true);
    const newUserMessage = {
      chat_message: message,
      chat_response: "",
      isNew: true,
    };
    setchatdata((prevChatData) => [
      ...prevChatData.map((msg) => ({ ...msg, isNew: false })),
      newUserMessage,
    ]);
    try {
      const res = await useOpenAi.generateText(message, handleChunkData);
      if (res.status) {
        setload(false);
        if (params.token) {
          setchatdata((prevChatData) => {
            const updatedData = [...prevChatData];
            updatedData[updatedData.length - 1].chat_response = res.result;
            return updatedData;
          });
          const chatData = {
            email: email,
            user_id: user_id,
            chat_id: chatid,
            chat_message: message,
            chat_response: res.result,
            access_token: access_token,
            name: full_name,
          };
          handleStoreData(chatData);

          handleScroll(document.body.scrollHeight,ScrollDuration);
          setmessage("");
        } else {
          const newtoken = generateCode(15);
          const newChatData = {
            email: email,
            user_id: user_id,
            chat_id: newtoken,
            chat_message: message,
            chat_response: res.result,
            access_token: access_token,
            name: full_name,
          };
          handleStoreData(newChatData);
          handleScroll(document.body.scrollHeight,ScrollDuration);

          setmessage("");
          setChatid(newtoken);
          setcreatingEnv(false);
          router.push(`/c/${newtoken}`, { scroll: false });
        }
      } else {
        setcreatingEnv(false);

        throw new Error(JSON.stringify(res.result));
      }
    } catch (err) {
      setcreatingEnv(false);

      setload(false);
      throw new Error(JSON.stringify(err));
    } finally {
      setcreatingEnv(false);
      setload(false);
    }
  };
  const getChatData = async (user_id: string | undefined, chatid: string) => {
    if (params.token) {
      setchatload(true);
        const data: any = await manageChat.getChatHistory(user_id, chatid);
        setchatload(false);

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
          const updatedChats = data.map(
            (chats: { chat_message: string; chat_response: string }) => ({
              ...chats,
              isNew: false,
            })
          );
          setchatdata(updatedChats);
        }
    }
  };
  React.useEffect(() => {
    handleScroll(document.body.scrollHeight,ScrollDuration);
  }, [chatdata, handleScroll]);

  React.useEffect(() => {
    getChatData(user_id, chatid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatid, user_id]);
  return (
    <div>
      <Toaster />
      {params.token ? (
        <div>
          {chatload ? (
            <div className="loader m-auto"></div>
          ) : (
            chatdata?.map(
              (
                el: {
                  chat_message: string;
                  chat_response: string;
                  isNew: boolean;
                },
                i
              ) => (
                <ul key={i} className="mt-16 space-y-5">
                  <QuerySection query={el.chat_message} />
                  <ResponseSection el={el} chunks={chunks} />
                </ul>
              )
            )
          )}
        </div>
      ) : creatingEnv ? (
        <CreatingEnvLoading />
      ) : (
        <HowcanIhelp />
      )}
      <MessageInput
        load={load}
        message={message}
        onSubmit={handleMessageGenerate}
        setmessage={setmessage}
      />
    </div>
  );
}

const HowcanIhelp = () => {
  return (
    <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center mt-[50%] lg:mt-[20%] md:mt-[30%] sm:mt-[40%]">
      <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
        Welcome to CSOL AI
      </h1>
      <p className="mt-3 text-gray-600 dark:text-gray-400">
        Your AI-powered copilot for the web
      </p>
    </div>
  );
};