import { Input } from "@/components/ui/input";
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
interface PropsInterface {
  onSubmit: () => Promise<void>;
  setmessage: React.Dispatch<React.SetStateAction<string>>;
  message: string;
  load: boolean;
}
export default function MessageInput(props: PropsInterface) {
  const { onSubmit, setmessage, message, load } = props;
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await onSubmit();
  };
  return (
    <motion.div
      initial={{ x: 2, scale: 0 }}
      animate={{ scale: 1, x: 0 }}
      className="fixed w-[90%] lg:w-[80%] md:w-[85%] bottom-5 m-auto"
    >
      <form className="flex align-middle" onSubmit={handleSubmit}>
        <Input
          value={message}
          onChange={(e) => setmessage(e.target.value)}
          className="w-[90%] lg:w-[70%] md:w-[80%]  m-auto p-5 h-[55px] bg-[rgb(52,53,65)] text-white"
          style={{ border: "1px solid rgb(154,154,160)" }}
          placeholder="Message ChatGPT..."
          required={true}
        />
        <Button
          type="submit"
          className="absolute right-[9%] lg:right-[16%] md:right-[12%] mt-2"
        >
          {load ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <ArrowUpIcon />
          )}
        </Button>
      </form>
      <p className="text-center text-[12px] mt-1 text-[rgb(154,154,160)]">
        Our System can make mistakes. Consider checking important information.
      </p>
    </motion.div>
  );
}
