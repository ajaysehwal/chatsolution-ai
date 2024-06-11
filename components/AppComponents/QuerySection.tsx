"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "../../hooks/useUser";
import { motion } from "framer-motion";
export default function QuerySection({ query }: { query: string }) {
  const { metadata } = useUser();
  const { avatar_url }: { full_name: string; avatar_url: string } = metadata;
  return (
    <motion.li
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
      className="py-2 sm:py-4"
    >
      <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-2xl flex gap-x-2 sm:gap-x-4">
          <span className="flex-shrink-0 inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-gray-600">
            <span className="text-sm font-medium text-white leading-none">
              <Avatar className="bg-pink-600 text-white">
                <AvatarImage
                  width="20px"
                  height="20px"
                  src={avatar_url}
                  alt="@shadcn"
                />
                <AvatarFallback className="bg-pink-600 text-white">
                  You
                </AvatarFallback>
              </Avatar>
            </span>
          </span>

          <div className="grow mt-2 space-y-3">
            <p className="text-gray-800 dark:text-gray-800">{query}</p>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
