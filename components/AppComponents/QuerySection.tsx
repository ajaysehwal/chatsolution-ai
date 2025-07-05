"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "../../hooks/useUser";
import { motion } from "framer-motion";

export default function QuerySection({ query }: { query: string }) {
  const { metadata } = useUser();
  const { avatar_url, full_name }: { full_name: string; avatar_url: string } =
    metadata;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        },
      }}
      className="py-6 first:pt-0"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start gap-4">
          <Avatar className="h-8 w-8 ring-2 ring-offset-2 ring-blue-500/20 dark:ring-blue-500/30">
            <AvatarImage src={avatar_url} alt={full_name || "User"} />
            <AvatarFallback className="bg-blue-600 text-white font-medium">
              {full_name ? full_name.charAt(0).toUpperCase() : "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {full_name || "You"}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>

            <div className="relative rounded-xl dark:bg-blue-900/20 p-2">
              <p className="text-[15px] leading-relaxed text-gray-800 dark:text-gray-200">
                {query}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
