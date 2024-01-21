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
      
      >
        {/* <div className="flex items-center justify-start align-middle text-gray-300 gap-3">
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
        </div> */}
           <li className="py-2 sm:py-4">
              <div className="max-w-4xl px-4 sm:px-6 lg:px-8 mx-auto">
                <div className="max-w-2xl flex gap-x-2 sm:gap-x-4">
                  <span className="flex-shrink-0 inline-flex items-center justify-center h-[2.375rem] w-[2.375rem] rounded-full bg-gray-600">
                    <span className="text-sm font-medium text-white leading-none">
                      AZ
                    </span>
                  </span>

                  <div className="grow mt-2 space-y-3">
                    <p className="text-gray-800 dark:text-gray-200">
                     {query}
                    </p>
                  </div>
                </div>
              </div>
            </li>
      </motion.div>
    </>
  );
}