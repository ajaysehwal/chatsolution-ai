"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "../hooks/useUser";
import { AvatarIcon } from "@radix-ui/react-icons";
import {motion} from "framer-motion"
export default function QuerySection({ query }: { query: string }) {
  const { metadata } = useUser();
  const { avatar_url }: { full_name: string; avatar_url: string } = metadata;
  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: "100%" },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeInOut" },
          },
        }}
        className="w-[80%] m-auto bg-transparent p-5 rounded-lg mt-5"
      >
        <div className="flex items-center justify-start align-middle text-gray-300 gap-3">
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
          <div>
            <h3 className="font-semibold">You</h3>
            <p>{query}</p>
          </div>
        </div>
      </motion.div>
    </>
  );
}
