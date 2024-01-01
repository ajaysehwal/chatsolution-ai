import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import {motion} from "framer-motion"
import {OPENAI} from "../services";
export default function MessageInput() {
  const [message,setmessage]=useState('');
  const useOpenAi=new OPENAI();
  const handleMessageGenerate=async()=>{
    try{
      const res=await useOpenAi.generateText(message);
      console.log(res)
    }catch(err){
      console.log(err);
    }
  }
  const handleSubmit=async(e:any)=>{
    e.preventDefault();
   await handleMessageGenerate();
    setTimeout(()=>{
      setmessage('');
    },1000)
  }
  return (
    <motion.div initial={{x:2,scale:0}} animate={{scale:1,x:0}}  className="fixed w-[90%] lg:w-[80%] md:w-[85%] bottom-5 m-auto">
      <form className="flex align-middle" onSubmit={handleSubmit}>
        <Input
          value={message}
          onChange={(e)=>setmessage(e.target.value)}
          className="w-[90%] lg:w-[70%] md:w-[80%]  m-auto p-5 h-[55px] bg-[rgb(52,53,65)] text-white"
          style={{ border: "1px solid rgb(154,154,160)" }}
          placeholder="Message ChatGPT..."
        />
        <Button type="submit" className="absolute right-[9%] lg:right-[16%] md:right-[12%] mt-2">
          <ArrowUpIcon />
        </Button>
      </form>
      <p className="text-center text-[12px] mt-1 text-[rgb(154,154,160)]">
        Our System can make mistakes. Consider checking important information.
      </p>
    </motion.div>
  );
}
