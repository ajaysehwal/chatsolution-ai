import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useTextToSpeak } from "../../hooks";
import Image from "next/image";
import logo from "@/public/logo.png";
import {
  CopyButton,
  ShareButton,
  LikeButton,
  DislikeButton,
  SpeakButton,
  PauseButton,
} from "./ui";
import { CopyText } from "../../utils";
export default function ResponseSection({
  el,
  chunks,
}: {
  el: { isNew: boolean; chat_response: string };
  chunks: string;
}) {
  const textRef = useRef<HTMLTextAreaElement | null>(null);
  const { speak, stop, status } = useTextToSpeak(el.chat_response, {
    lang: "en-US",
    pitch: 2,
    rate: 1,
    volume: 1,
    voiceName: "hi-IN-Neural2-A",
  });

  const emptyClick = () => {
    return null;
  };

  return (
    <motion.li
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0, x: "1%" },
        visible: {
          opacity: 1,
          x: 0,
          transition: { duration: 1, ease: "easeInOut" },
        },
      }}
      className="max-w-4xl py-2 px-4 sm:px-6 lg:px-8 mx-auto flex gap-x-2 sm:gap-x-4"
    >
      {/* <svg
        
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="38" height="38" rx="6" fill="#2563EB" />
        <path
          d="M10 28V18.64C10 13.8683 14.0294 10 19 10C23.9706 10 28 13.8683 28 18.64C28 23.4117 23.9706 27.28 19 27.28H18.25"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          d="M13 28V18.7552C13 15.5104 15.6863 12.88 19 12.88C22.3137 12.88 25 15.5104 25 18.7552C25 22 22.3137 24.6304 19 24.6304H18.25"
          stroke="white"
          strokeWidth="1.5"
        />
        <ellipse cx="19" cy="18.6554" rx="3.75" ry="3.6" fill="white" />
      </svg> */}

      <Image
        src={logo}
        width="38"
        height="38"
        className="flex-shrink-0 w-[2.375rem] h-[2.375rem] rounded-full"
        alt="logo"
      />
      <div className="grow max-w-[90%] md:max-w-2xl w-full space-y-3">
        <div className="space-y-3">
          <p
            ref={textRef as React.RefObject<HTMLParagraphElement>}
            className="text-sm text-gray-800 dark:text-white"
          >
            {!el.isNew ? el.chat_response : chunks}
          </p>
        </div>
        <div>
          <div className="sm:flex sm:justify-between">
            <div>
              <div className="inline-flex border border-gray-200 rounded-full p-0.5 dark:border-gray-700">
                <LikeButton onClick={emptyClick} />
                <DislikeButton onClick={emptyClick} />
              </div>
              <CopyButton onClick={() => CopyText(textRef)} />
              <ShareButton onClick={emptyClick} />
            </div>

            <div className="mt-1 sm:mt-0">
              {status === "speaking" && (
                <>
                  <PauseButton onClick={stop} />
                </>
              )}
              {status !== "speaking" && <SpeakButton onClick={speak} />}
            </div>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
