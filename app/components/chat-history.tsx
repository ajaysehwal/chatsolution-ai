import React from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
const ChatMenu = () => {
  return (
    <Menubar className="fixed left-[13%] bg-[rgb(32,33,35)] border-none w-[20px] h-[24px]">
      <MenubarMenu>
        <MenubarTrigger className="bg-[rgb(32,33,35)]">
          <DotsHorizontalIcon width="15px" height="15px" />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>New Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Share</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Print</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};
export default function ChatHistory() {
  const chatMessages = [
    "What is your name jwekdjkjdsdskjew",
    "Another chat message...",
    "How are you doing today?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Do you have any plans for the weekend?",
    "This is another interesting chat message.",
    "What is your name jwekdjkjdsdskjew",
    "Another chat message...",
    "How are you doing today?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Do you have any plans for the weekend?",
    "This is another interesting chat message.",
    "This is another interesting chat message.",
    "What is your name jwekdjkjdsdskjew",
    "Another chat message...",
    "How are you doing today?",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Do you have any plans for the weekend?",
    "This is another interesting chat message",
  ];

  const [visible, setvisible] = React.useState(
    Array(chatMessages.length).fill(false)
  );

  const handleMouseEnter = (index: number, value: boolean) => {
    const newVisible = [...visible];
    newVisible[index] = value;
    setvisible(newVisible);
  };

  return (
    <div
      className="flex flex-col gap-1 w-full h-[80vh] overflow-y-scroll mt-[10px] items-start pl-2"
    >
      {chatMessages.map((message, index) => (
        <div
          key={index}
          onMouseEnter={() => handleMouseEnter(index, true)}
          onMouseLeave={() => handleMouseEnter(index, false)}
          className="p-2 flex justify-between text-gray-200 align-center w-full h-[50px] hover:bg-[rgb(32,33,35)] rounded-lg"
          style={{ cursor: "pointer" }}
        >
          <p className="w-[200px] h-[24px] overflow-hidden">{message}</p>
          {/* {visible[index] && <ChatMenu />} */}
        </div>
      ))}
    </div>
  );
}
