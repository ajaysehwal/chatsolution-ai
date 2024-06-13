"use client";
import React, { useEffect } from "react";
import { ManageCookies } from "../../services";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { useChatStore } from "../../zustand";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  const {
    chats,
    getChatHistory,
    deleteChat,
    deleteLoading,
    loading,
    setCurrentChatID,
    currentChatID,
  } = useChatStore();
  const params = useParams<{ token: string }>();
  const cookies = new ManageCookies();
  const [open, setOpen] = React.useState<boolean>(false);
  const [intialLoad, setintialLoad] = React.useState<boolean>(true);
  const user_id = cookies.getcookie("Secure_S_UID_");
  useEffect(() => {
    setintialLoad(false);
  }, []);
  useEffect(() => {
    getChatHistory(user_id);
  }, [getChatHistory, deleteChat]);

  return (
    <ul className="space-y-1.5 p-4">
      {intialLoad && <Loader />}
      {loading ? (
        <Loader />
      ) : (
        chats.map((el: any, index) => (
          <motion.li
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 1, ease: "easeInOut" },
            }}
            key={index}
            className={`flex items-center justify-between w-full rounded-md hover:bg-blue-200 hover:shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] py-2 px-3  ${
              el.chat_id === params.token
                ? "bg-blue-200 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px]"
                : ""
            }`}
          >
            <Link href={`/c/${el.chat_id}`} shallow={true}>
              <p className={`w-full h-[24px] overflow-hidden text-black`}>
                {el.chat_query}
              </p>
            </Link>
            <Dialog open={open}>
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
                    disabled={deleteLoading}
                    onClick={() => {
                      deleteChat(currentChatID);
                      setOpen(false);
                    }}
                    type="submit"
                    variant="destructive"
                  >
                    {deleteLoading ? (
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
            <DropdownMenu>
              <DropdownMenuTrigger>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 21 21"
                >
                  <g fill="currentColor" fillRule="evenodd">
                    <circle cx={10.5} cy={10.5} r={1}></circle>
                    <circle cx={10.5} cy={5.5} r={1}></circle>
                    <circle cx={10.5} cy={15.5} r={1}></circle>
                  </g>
                </svg>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href={`/c/${el.chat_id}`}>View</Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setOpen(true);
                    setCurrentChatID(el.chat_id);
                  }}
                  className="text-red-500"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.li>
        ))
      )}
    </ul>
  );
}
