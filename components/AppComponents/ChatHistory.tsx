"use client";
import React, { useEffect } from "react";
import { ManageCookies } from "../../services";
import Link from "next/link";
import { Loader2, MessageSquare, MoreVertical, Trash2 } from "lucide-react";
import { useChatStore } from "../../zustand";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";

const Loader = () => {
  return (
    <div className="space-y-3 p-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex items-center gap-3 rounded-lg p-3 animate-pulse"
        >
          <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700" />
          <div className="flex-1">
            <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
          </div>
        </div>
      ))}
    </div>
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
  const [initialLoad, setInitialLoad] = React.useState<boolean>(true);
  const user_id = cookies.getcookie("Secure_S_UID_");

  useEffect(() => {
    setInitialLoad(false);
  }, []);

  useEffect(() => {
    getChatHistory(user_id);
  }, [getChatHistory, deleteChat, user_id]);

  if (initialLoad || loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-1">
      <AnimatePresence>
        {chats.map((chat: any) => (
          <motion.div
            key={chat.chat_id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`group relative flex items-center gap-3 rounded-lg p-3 text-sm transition-colors
              ${
                chat.chat_id === params.token
                  ? "bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100"
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
          >
            <MessageSquare className="h-5 w-5 flex-shrink-0 text-gray-500" />

            <Link
              href={`/c/${chat.chat_id}`}
              className="flex-1 truncate"
              shallow={true}
            >
              {chat.chat_query}
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100"
                >
                  <MoreVertical className="h-4 w-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem asChild>
                  <Link href={`/c/${chat.chat_id}`} className="cursor-pointer">
                    View chat
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    setOpen(true);
                    setCurrentChatID(chat.chat_id);
                  }}
                  className="text-red-600 dark:text-red-400"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete chat
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        ))}
      </AnimatePresence>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Chat</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this chat? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={deleteLoading}
              onClick={() => {
                deleteChat(currentChatID);
                setOpen(false);
              }}
            >
              {deleteLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
