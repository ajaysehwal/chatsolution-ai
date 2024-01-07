import { supabase } from "../libs/supabase";

interface chatdataProps {
  email: string;
  user_id: string | undefined;
  chat_id: string;
  chat_message: string;
  chat_response: string;
  access_token: string;
  name: string;
}

export class ManageChat {
  constructor() {}

  async storeChat(chatdata: chatdataProps) {
    const {
      email,
      user_id,
      chat_id,
      chat_message,
      chat_response,
      access_token,
      name,
    } = chatdata;
    try {
      await supabase.from("chathistory").insert([
        {
          email,
          user_id,
          chat_id,
          chat_message,
          chat_response,
          access_token,
          name,
        },
      ]);
      await this.getchatHistory(user_id, chat_id);
    } catch (err) {
      throw new Error(JSON.stringify(err));
    }
  }

  async getchatHistory(user_id: string | undefined, chat_id: string) {
    console.log(user_id, chat_id);
    if (user_id == undefined) {
      throw new Error("user_id is not defined");
    } else {
      try {
        const { data, error } = await supabase
          .from("chathistory")
          .select("chat_message,chat_response,id,user_id")
          .eq("user_id", user_id)
          .eq("chat_id", chat_id);
        console.log(data);
        return data;
      } catch (error) {
        console.error("Error fetching chat history:", error);
        throw new Error("unable to get user chat data");
      }
    }
  }
}
