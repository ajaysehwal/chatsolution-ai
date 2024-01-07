"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { useUser } from "../hooks/useUser";
export default function UserMessage({ query }: { query: string }) {
  const { metadata } = useUser();
  const { full_name, avatar_url }: { full_name: string; avatar_url: string } =
    metadata || { full_name: "O", avatar_url: "loading.." };
  return (
    <>
      <div className="flex items-center justify-start align-middle text-gray-300 gap-3">
        <Avatar>
          <AvatarImage src={avatar_url} alt="@shadcn" />
          <AvatarFallback>
            {/* {!avatar_url?full_name[0]:<Loader2 className="h-4 w-4 animate-spin" />} */}
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
