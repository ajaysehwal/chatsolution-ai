import { supabase } from "../libs/supabase";

interface chatdataProps {
  email: string;
  user_id: string;
  chat_id: string;
  chat_message: string;
  chat_response: string;
  access_token: string;
  name:string;
}

export class ManageChat {
  constructor() {}

  async storeChat(chatdata:chatdataProps) {
    const {
      email,
      user_id,
      chat_id,
      chat_message,
      chat_response,
      access_token,
      name,
    } = chatdata;
    const { data, error } = await supabase.from("chathistory").insert([{
      email,
      user_id,
      chat_id,
      chat_message,
      chat_response,
      access_token,
      name
    }]);
    console.log(data, error);
  }

  // Implement the logic to retrieve chat history based on the provided length.
  async getchatHistory(length: number) {
    try {
      const { data, error } = await supabase.from("chathistory").select("*").limit(length);
      console.log(data, error);
      return data;
    } catch (error) {
      console.error("Error fetching chat history:", error);
      throw error;
    }
  }
}
