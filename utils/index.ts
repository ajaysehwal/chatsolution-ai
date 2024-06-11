import { ManageChat, ChatDataProps } from "../services";
export const handleStoreData = (data: ChatDataProps) => {
  const manageChat = new ManageChat();
  return manageChat.storeChat({
    email: data.email,
    user_id: data.user_id,
    chat_id: data.chat_id,
    chat_query: data.chat_query,
    chat_response: data.chat_response,
  });
};

export const CopyText = (textRef:React.MutableRefObject<HTMLTextAreaElement | null>) => {
  try {
    if (textRef.current) {
      const range = document.createRange();
      range.selectNodeContents(textRef.current);

      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        document.execCommand("copy");
        selection.removeAllRanges();
      }
    }
  } catch (error) {
    throw new Error(
      "Unable to copy response please you can select text and press Clt + C"
    );
  }
};

