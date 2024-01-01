import React, { useContext } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { useUser } from '../hooks/useUser';
export default function UserMessage({ query }: { query: Array<string> }) {
 const {avatar_url,full_name}= useUser();
  return (
    <>
      {query.map((el, index) => (
        <div
          key={index}
          className="flex items-center justify-start align-middle text-gray-300 gap-3"
        >
          <Avatar>
            <AvatarImage src={avatar_url} alt="@shadcn" />
            <AvatarFallback>
            {/* {!avatar_url?full_name[0]:<Loader2 className="h-4 w-4 animate-spin" />} */}

            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">You</h3>
            <p>{el}</p>
          </div>
        </div>
      ))}
    </>
  );
}
