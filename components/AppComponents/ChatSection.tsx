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
import { useChatStore } from "@/zustand";
import Image from "next/image";
import { Code, BookOpen, Sparkles, Zap, ArrowDown } from "lucide-react";

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
          addChat({ user_id: user_id, chat_id: newtoken, chat_query: message });
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
        <WelcomeScreen />
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

const WelcomeScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12">
      {/* Hero Section */}
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl" />
        </div>
      </div>

      {/* Welcome Text */}
      <div className="text-center space-y-4 relative z-10 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to COS AI
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Your intelligent coding companion. Ask me anything about development, debugging, or best practices.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 gap-6 mt-12 w-full max-w-3xl mx-auto">
        <FeatureCard
          icon={<Code className="w-6 h-6" />}
          title="Code Assistance"
          description="Get help with coding problems, debugging, and code reviews"
        />
        <FeatureCard
          icon={<BookOpen className="w-6 h-6" />}
          title="Learning Resources"
          description="Access documentation, tutorials, and best practices"
        />
        <FeatureCard
          icon={<Sparkles className="w-6 h-6" />}
          title="Smart Suggestions"
          description="Receive intelligent code suggestions and optimizations"
        />
        <FeatureCard
          icon={<Zap className="w-6 h-6" />}
          title="Quick Solutions"
          description="Get instant answers to your development questions"
        />
      </div>

      {/* Getting Started */}
      <div className="mt-12 text-center">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Start by typing your question below
        </p>
        <div className="flex items-center justify-center gap-2 text-blue-600 dark:text-blue-400">
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="group p-6 rounded-2xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-800/50 hover:shadow-lg transition-all duration-200">
      <div className="flex items-center gap-4">
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
