import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Loader2 } from "lucide-react"

import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic'
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useContext } from "react";
import {AuthContext,AuthContextProps} from "../contexts";
import { useUser } from '../hooks';
const TextLoader = dynamic(() => import('./textLoader'), { ssr: false })
export const AccountMenu = () => {
 const { logOut }:any=useContext<AuthContextProps | null>(AuthContext)
 const {avatar_url,full_name}=useUser();
  return (
    <Menubar className="bg-black border-none w-full">
      <MenubarMenu>
        <MenubarTrigger className="flex align-center items-center  gap-3 w-full">
          <Avatar className="bg-orange-500 text-white">
            <AvatarImage width="20px" height="20px" src={avatar_url} alt="@shadcn" />
            <AvatarFallback className="bg-orange-500 text-white">
              {/* {!avatar_url?full_name[0]:<Loader2 className="h-4 w-4 animate-spin" />} */}
             
            </AvatarFallback>
          </Avatar>
          <p className="text-[16px]">{!full_name?<TextLoader/>:full_name}</p>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem></MenubarItem>
          <MenubarItem>
            <GearIcon className="mr-2" />
            Settings
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem onClick={()=>logOut()}>
            <ExitIcon className="mr-2" />
            Logout
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
