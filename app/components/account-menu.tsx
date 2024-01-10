import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import React from "react";
import dynamic from 'next/dynamic'
import { ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth, useUser } from '../hooks';
import { Loader2 } from "lucide-react";
import {AvatarIcon} from "@radix-ui/react-icons"
const TextLoader = dynamic(() => import('./textLoader'), { ssr: false })
export const AccountMenu = () => {
 const {metadata}=useUser();
 const {full_name,avatar_url}=metadata;
 const {logOut}=useAuth()
  return (
    <Menubar className="bg-black border-none w-full">
      <MenubarMenu>
        <MenubarTrigger className="flex align-center items-center  gap-3 w-full">
          <Avatar className="bg-orange-500 text-white">
            <AvatarImage width="20px" height="20px" src={avatar_url} alt="@shadcn" />
            <AvatarFallback className="bg-orange-500 text-white">
                 <AvatarIcon className="w-8 h-8"/>
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
