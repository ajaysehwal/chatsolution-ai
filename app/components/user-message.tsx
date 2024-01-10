"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { useUser } from "../hooks/useUser";
import { AvatarIcon } from "@radix-ui/react-icons";
export default function UserMessage({ query }: { query: string }) {
  const { metadata } = useUser();
  const { avatar_url }: { full_name: string; avatar_url: string } = metadata;
  return (
    <>
      <div className="flex items-center justify-start align-middle text-gray-300 gap-3">
        <Avatar className="bg-orange-500 text-white">
          <AvatarImage
            width="20px"
            height="20px"
            src={avatar_url}
            alt="@shadcn"
          />
          <AvatarFallback className="bg-orange-500 text-white">
            <AvatarIcon className="w-8 h-8" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">You</h3>
          <p>{query}</p>
        </div>
      </div>
    </>
  );
}
