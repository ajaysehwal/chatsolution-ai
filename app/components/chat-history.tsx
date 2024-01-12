import React, { useEffect } from "react";
import { ManageChat } from "../services";
import { ManageCookies } from "../libs";
import Link from "next/link";
import { Loader2 } from "lucide-react";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const Loader = () => {
  return <div className="loader m-auto"></div>;
};
export default function ChatHistory() {
  const managechat = new ManageChat();
  const cookies = new ManageCookies();
  const [open, setOpen] = React.useState<boolean>(false);
  const [chats, setchats] = React.useState<any[]>([]);
  const [currentChatID, setCurrentChatID] = React.useState<string>("");
  const [load, setload] = React.useState<boolean>(false);
  const user_id = cookies.getcookie("Secure_S_UID_");
  const [deleteload, setdeleteload] = React.useState<boolean>(false);
  const getUserChats = async (user_id: string | undefined) => {
    setload(true);
    try {
      const res = await managechat.getChatHistoryTitles(user_id);
      if(res.length===0){
        setload(false);
      }
      setchats(res);
      setload(false);
    } catch (err) {
      setload(false);
      throw err;
    }
  };
  const deletechat = async (chat_id: string) => {
    setdeleteload(true);
    const res = await managechat.deletechat(chat_id);
    if (res.status) {
      getUserChats(user_id);
      setdeleteload(false);
      setOpen(false);
    } else {
      setdeleteload(false);
      throw new Error("Unable to delete user chat");
    }
  };
  useEffect(() => {
    getUserChats(user_id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user_id, chats.length]);
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
            <Dialog open={open}>
              <ContextMenu>
                <ContextMenuTrigger>
                  <Link href={`/c/${el.chat_id}`} shallow={true}>
                    <p className="w-[210px] h-[24px] overflow-hidden">
                      {el.chat_message}
                    </p>
                  </Link>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <ContextMenuItem>
                    <Link href={`/c/${el.chat_id}`}>View</Link>
                  </ContextMenuItem>
                  <DialogTrigger asChild>
                    <ContextMenuItem>
                      <span
                        className="text-red-500"
                        onClick={() => {
                          setOpen(true);
                          setCurrentChatID(el.chat_id);
                        }}
                      >
                        Delete
                      </span>
                    </ContextMenuItem>
                  </DialogTrigger>
                </ContextMenuContent>
              </ContextMenu>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you absolutely sure?</DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. Are you sure you want to
                    permanently delete this chat from our servers?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      onClick={() => setOpen(false)}
                      type="button"
                      variant="secondary"
                    >
                      cancel
                    </Button>
                  </DialogClose>
                  <Button
                    disabled={deleteload}
                    onClick={() => deletechat(currentChatID)}
                    type="submit"
                    variant="destructive"
                  >
                    {deleteload ? (
                      <div className="flex">
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Deleting
                      </div>
                    ) : (
                      "confirm"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        ))
      )}
    </div>
  );
}
