"use client";
import React, { useEffect } from "react";
import { ManageChat, ManageCookies } from "../../services";
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
import { motion } from "framer-motion";
import { useParams } from "next/navigation";

const Loader = () => {
  return (
    <>
      <div className="animate-pulse rounded-lg py-4 px-3 bg-gradient-to-r from-violet-300 to-blue-600 m-auto"></div>
      <div className="animate-pulse rounded-lg py-4 px-3 bg-gradient-to-r from-violet-300 to-blue-600 m-auto"></div>
      <div className="animate-pulse rounded-lg py-4 px-3 bg-gradient-to-r from-violet-300 to-blue-600 m-auto"></div>
    </>
  );
};
export default function ChatHistory() {
  const managechat = new ManageChat();
  const params = useParams<{ token: string }>();
  const cookies = new ManageCookies();
  const [open, setOpen] = React.useState<boolean>(false);
  const [chats, setchats] = React.useState<any[]>([]);
  const [currentChatID, setCurrentChatID] = React.useState<string>("");
  const [intialLoad, setintialLoad] = React.useState<boolean>(true);
  const [load, setload] = React.useState<boolean>(false);
  const user_id = cookies.getcookie("Secure_S_UID_");
  const [deleteload, setdeleteload] = React.useState<boolean>(false);
  useEffect(() => {
    setintialLoad(false);
  }, []);
  const getUserChats = async (user_id: string | undefined) => {
    const res = await managechat.getChatHistoryTitles(user_id, setload);
    if (res.length === 0) {
      setload(false);
    }
    setchats(res);
    setload(false);
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
    <ul className="space-y-1.5 p-4">
      {intialLoad && <Loader />}
      {load ? (
        <Loader />
      ) : (
        chats.map((el, index) => (
          <motion.li
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1, ease: "easeInOut" },
            }}
            key={index}
          >
            <div className={`flex items-center gap-x-3 py-2 px-3 text-sm text-slate-700 rounded-lg ${el.chat_id===params.token?'bg-blue-200 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]':''} hover:bg-blue-200 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`}>
              <Dialog open={open}>
                <ContextMenu>
                  <ContextMenuTrigger>
                    <Link href={`/c/${el.chat_id}`} shallow={true}>
                      <p
                        className={`w-[210px] h-[24px] overflow-hidden text-black`}
                      >
                        {el.chat_query}
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
          </motion.li>
        ))
      )}
    </ul>
  );
}
