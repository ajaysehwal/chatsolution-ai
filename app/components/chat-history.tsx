import React, { useEffect } from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ManageChat } from "../services";
import { ManageCookies } from "../libs";
import Link from "next/link";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const ChatMenuContent = () => {
  return (
    <ContextMenuContent>
      <ContextMenuItem>Profile</ContextMenuItem>
      <ContextMenuItem>Billing</ContextMenuItem>
      <ContextMenuItem>Team</ContextMenuItem>
      <ContextMenuItem>Subscription</ContextMenuItem>
    </ContextMenuContent>
  );
};
const Loader = () => {
  return <div className="loader m-auto"></div>;
};
export default function ChatHistory() {
  const managechat = new ManageChat();
  const cookies = new ManageCookies();
  const [chats, setchats] = React.useState<any[]>([]);
  const [load, setload] = React.useState<boolean>(false);
  const user_id = cookies.getcookie("Secure_S_UID_");
  const getUserChats = async (user_id: string | undefined) => {
    setload(true);
    try {
      const res = await managechat.getChatHistoryTitles(user_id);
      setchats(res);
      setload(false);
    } catch (err) {
      setload(false);
      throw err;
    }
  };
  useEffect(() => {
    getUserChats(user_id);
  }, []);

  return (
    <div className="flex flex-col gap-1 w-full h-[80vh] overflow-y-scroll mt-[10px] items-start pl-2">
      {load ? (
        <Loader />
      ) : (
        chats.map((el, index) => (
          <div
            key={index}
            className="p-2 flex justify-between text-gray-200 align-center w-full h-[50px] hover:bg-[rgb(32,33,35)] rounded-lg"
            style={{
              cursor: "pointer",
              boxShadow: "5px 0 15px rgba(0, 0, 0, 0.3)",
            }}
          >
            <Link href={`/c/${el.chat_id}`} shallow={true}>
              <ContextMenu>
                <ContextMenuTrigger>
                  <p className="w-[210px] h-[24px] overflow-hidden">
                    {el.chat_message}
                  </p>
                </ContextMenuTrigger>
                <ChatMenuContent />
              </ContextMenu>
            </Link>
            {/* {visible[index] && <ChatMenu />} */}
          </div>
        ))
      )}
    </div>
  );
}
