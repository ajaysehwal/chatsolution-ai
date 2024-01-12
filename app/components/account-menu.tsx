import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth, useUser } from "../hooks";
import { useState } from "react";
import { AvatarIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import Setting from "./setting";
const TextLoader = dynamic(() => import("./textLoader"), { ssr: false });
const SettingDialog = ({ open,setOpen }: { open: boolean,setOpen:React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[500px] w-[600px]  sm:max-h-[300px] lg:w-[700px] lg:h-[500px] bg-black text-white border-none">
        <DialogHeader>
          <DialogTitle>General Settings</DialogTitle>
        </DialogHeader>
        <Setting SettingDialog={setOpen}/>
        <DialogPrimitive.Close onClick={()=>setOpen(false)} className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
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
  const [open,setOpen]=useState<boolean>(false)
  return (
    <>
     <SettingDialog open={open} setOpen={setOpen}/>
      <Menubar className="bg-black border-none w-full">
        <MenubarMenu>
          <MenubarTrigger className="flex align-center items-center  gap-3 w-full">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 1, ease: "easeInOut" },
              }}
            >
              <Avatar className="bg-pink-600 text-white">
                <AvatarImage
                  width="20px"
                  height="20px"
                  src={avatar_url}
                  alt="@shadcn"
                />
                <AvatarFallback className="bg-pink-600 text-white">
                  <AvatarIcon className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
            </motion.div>

            <p className="text-[16px]">
              {!full_name ? <TextLoader /> : full_name}
            </p>
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={()=>setOpen(true)}>
            <GearIcon className="mr-2" />
                  Settings{" "}
             </MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={() => logOut()}>
              <ExitIcon className="mr-2" />
              Logout
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
