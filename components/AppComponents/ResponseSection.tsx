"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useTextToSpeak } from "../../hooks";
import Image from "next/image";
import logo from "@/public/logo.png";
import { CopyButton, SpeakButton, PauseButton } from "./ui";

export default function ResponseSection({
  el,
  chunks,
}: {
  el: { isNew: boolean; chat_response: string };
  chunks: string;
}) {
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const { speak, stop, status } = useTextToSpeak(el.chat_response, {
    lang: "en-US",
    pitch: 2,
    rate: 1,
    volume: 1,
    voiceName: "hi-IN-Neural2-A",
  });

  const handleCopy = () => {
    if (textRef.current) {
      navigator.clipboard.writeText(textRef.current.textContent || "");
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeOut", delay: 0.1 },
        },
      }}
      className="py-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start gap-4">
          <div className="relative flex-shrink-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full blur opacity-20" />
            <Image
              src={logo}
              width={32}
              height={32}
              className="relative rounded-full ring-2 ring-offset-2 ring-blue-500/30 dark:ring-blue-500/40"
              alt="COS AI"
            />
          </div>

          <div className="flex-1 space-y-2">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                  COS AI
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <div className="flex items-center gap-0.5">
                <CopyButton onClick={handleCopy} />
                {status === "speaking" ? (
                  <PauseButton onClick={stop} />
                ) : (
                  <SpeakButton onClick={speak} />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="relative rounded-xl bg-white dark:bg-gray-800/50 p-4 dark:border-gray-800">
              <p
                ref={textRef}
                className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-200"
              >
                {!el.isNew ? el.chat_response : chunks}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
