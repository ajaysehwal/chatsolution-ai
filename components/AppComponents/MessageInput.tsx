"use client";
import React from "react";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useSpeechRecognition } from "../../hooks";
import { SparklesCore } from "../ui/sparkles";
import { PlaceholdersAndVanishInput } from "../ui/placeholders-and-vanish-input";

interface PropsInterface {
  onSubmit: () => Promise<void>;
  setmessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  load: boolean;
}
export default function MessageInput(props: PropsInterface) {
  const { onSubmit, setmessage, message, load } = props;
  const { startListening, transcript } = useSpeechRecognition();
  const placeholders = [
    "What's the first rule of Fight Club?",
    "Write code about usage of blockchain",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setmessage(e.target.value);
  };
  return (
    <footer className="max-w-4xl mx-auto sticky bottom-0 z-10 p-3 sm:py-6">
          <PlaceholdersAndVanishInput
            placeholders={placeholders}
            onChange={handleChange}
            onSubmit={onSubmit}
            message={message}
            transcript={transcript}
          />
    </footer>
  );
}
