import { ManageChat, ChatDataProps } from "../services";

export const handleStoreData = (data: ChatDataProps) => {
  const manageChat = new ManageChat();
  return manageChat.storeChat({
    email: data.email,
    user_id: data.user_id,
    chat_id: data.chat_id,
    chat_message: data.chat_message,
    chat_response: data.chat_response,
    access_token: data.access_token,
    name: data.name,
  });
};
