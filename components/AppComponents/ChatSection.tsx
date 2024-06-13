"use client";
import React, { useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import QuerySection from "./QuerySection";
import { GenerativeAI, ManageChat } from "../../services";
import { useRouter } from "next/navigation";
import { generateCode } from "../../app/libs";
import { UseScroller, useUser } from "../../hooks";
import { useParams } from "next/navigation";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { handleStoreData } from "../../utils";
import ResponseSection from "./ResponseSection";
import dynamic from "next/dynamic";
import { ManageCookies } from "../../services";
const CreatingEnvLoading = dynamic(() => import("./loaders/createEnv"), {
  ssr: false,
});
interface ChatMessage {
  chat_query: string;
  chat_response: string;
  isNew: boolean;
}

export default function ChatSection() {
  const params = useParams<{ token: string }>();
  const { toast } = useToast();
  const [chatid, setChatid] = useState<string>(params.token);
  const [message, setmessage] = useState<string>("");
  const [chatdata, setchatdata] = useState<ChatMessage[]>([]);
  const useGenerativeAI = new GenerativeAI();
  const { addChat } = useChatStore();
  const router = useRouter();
  const manageChat = new ManageChat();
  const cookies = new ManageCookies();
  const user_id = cookies.getcookie("Secure_S_UID_");
  const { metadata, userData } = useUser();
  const { full_name } = metadata;
  const [chatload, setchatload] = useState<boolean>(false);
  const [envload, setEnvLoad] = useState<boolean>(false);
  const { email }: any = userData;
  const [load, setload] = useState<boolean>(true);
  const [chunks, setchunk] = useState<string>("");
  const { handleScroll } = UseScroller();
  useEffect(() => {
    setload(false);
  }, []);
  const handleChunkData = (res: string) => {
    setchunk((prev) => prev + res);
  };
  const handleMessageGenerate = async () => {
    setEnvLoad(true);
    if (chunks !== "") {
      setchunk("");
    }
    const newUserMessage = {
      chat_query: message,
      chat_response: "",
      isNew: true,
    };
    setchatdata((prevChatData) => [
      ...prevChatData.map((msg) => ({ ...msg, isNew: false })),
      newUserMessage,
    ]);
    try {
      const res = await useGenerativeAI.generateText(message, handleChunkData);
      if (res.status) {
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
            chat_query: message,
            chat_response: res.result,
            name: full_name,
          };
          handleStoreData(chatData);
          handleScroll(document.body.scrollHeight);
          setmessage("");
          setEnvLoad(false);
        } else {
          const newtoken = generateCode(15);
          const newChatData = {
            email: email,
            user_id: user_id,
            chat_id: newtoken,
            chat_query: message,
            chat_response: res.result,
            name: full_name,
          };
          addChat({ user_id, chat_id, chat_query });
          handleStoreData(newChatData);
          setmessage("");
          setChatid(newtoken);
          setEnvLoad(false);
          router.push(`/c/${newtoken}`, { scroll: false });
        }
      } else {
        setEnvLoad(false);
        toast({
          variant: "destructive",
          title: "Open AI API Error",
          description: JSON.stringify(res.result),
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (err) {
      setEnvLoad(false);
      toast({
        variant: "destructive",
        title: "Open AI API Error",
        description: JSON.stringify(err),
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setEnvLoad(false);
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
    handleScroll(document.body.scrollHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatdata]);

  React.useEffect(() => {
    getChatData(user_id, chatid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatid, user_id]);
  return (
    <div>
      <Toaster />

      {params.token ? (
        <div>
          {load && (
            <>
              <ChatLoad />
              <ChatLoad />
            </>
          )}
          {chatload ? (
            <ChatLoad />
          ) : (
            chatdata?.map(
              (
                el: {
                  chat_query: string;
                  chat_response: string;
                  isNew: boolean;
                },
                i
              ) => (
                <ul key={i} className="mt-16 space-y-5">
                  <QuerySection query={el.chat_query} />
                  <ResponseSection el={el} chunks={chunks} />
                </ul>
              )
            )
          )}
        </div>
      ) : envload ? (
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
const ChatLoad = () => {
  return (
    <div className="flex animate-pulse m-auto w-[60%] mt-10 mb-10">
      <div className="flex-shrink-0">
        <span className="size-12 block bg-gray-200 rounded-full dark:bg-neutral-700"></span>
      </div>

      <div className="ms-4 mt-2 w-full">
        <p
          className="h-4 bg-gray-200 rounded-full dark:bg-neutral-700"
          style={{ width: "40%" }}
        ></p>

        <ul className="mt-5 space-y-3">
          <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
          <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
          <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
          <li className="w-full h-4 bg-gray-200 rounded-full dark:bg-neutral-700"></li>
        </ul>
      </div>
    </div>
  );
};
import { SparklesCore } from "../ui/sparkles";
import { useChatStore } from "@/zustand";

const HowcanIhelp = () => {
  const [load, setload] = useState<boolean>(true);
  useEffect(() => {
    setload(true);
  }, []);
  return (
    <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto text-center mt-[50%] lg:mt-[20%] md:mt-[30%] sm:mt-[40%]">
      <div className="w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
        <h1 className="md:text-3xl text-2xl lg:text-3xl font-bold text-center text-gray-800 relative z-20">
          Welcome to COS AI
        </h1>
        <p className="mt-3 text-gray-600 dark:text-gray-400">
          Your AI-powered copilot for the web
        </p>
        <div className="w-[30rem] h-40 absolute">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#0000FF"
          />
          <div className="absolute inset-0 w-full h-full bg-white [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
        </div>
      </div>
    </div>
  );
};
