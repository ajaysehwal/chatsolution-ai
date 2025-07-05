"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Settings2, LogOut, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth, useUser } from "../../hooks";
import { useState } from "react";
import { motion } from "framer-motion";
import Setting from "./setting";

const TextLoader = dynamic(() => import("./loaders/textloader"), {
  ssr: false,
});

const SettingDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Settings</DialogTitle>
        </DialogHeader>
        <Setting SettingDialog={setOpen} />
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogContent>
    </Dialog>
  );
};

export const AccountMenu = () => {
  const { metadata } = useUser();
  const { full_name, avatar_url } = metadata;
  const { logOut } = useAuth();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <SettingDialog open={open} setOpen={setOpen} />
      <Menubar className="border-none bg-transparent p-0">
        <MenubarMenu>
          <MenubarTrigger className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-blue-500">
                <AvatarImage
                  src={avatar_url}
                  alt={full_name || "User avatar"}
                />
                <AvatarFallback className="bg-blue-500 text-white">
                  {full_name ? full_name.charAt(0).toUpperCase() : "U"}
                </AvatarFallback>
              </Avatar>
            </motion.div>
            <div className="flex flex-col items-start">
              {!full_name ? (
                <TextLoader />
              ) : (
                <>
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {full_name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Online
                  </p>
                </>
              )}
            </div>
          </MenubarTrigger>
          <MenubarContent className="min-w-[180px] bg-white dark:bg-gray-800">
            <MenubarItem
              onClick={() => setOpen(true)}
              className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer"
            >
              <Settings2 className="h-4 w-4" />
              Settings
            </MenubarItem>
            <MenubarSeparator className="my-1" />
            <MenubarItem
              onClick={() => logOut()}
              className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer text-red-600 dark:text-red-400"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
