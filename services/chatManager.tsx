import { supabase } from "../app/libs/supabase";
import React from "react";
export interface ChatDataProps {
  email: string;
  user_id: string | undefined;
  chat_id: string;
  chat_query: string;
  chat_response: string;
}

export class ManageChat {
  private static readonly CHAT_HISTORY_TABLE = "chathistory";

  private handleSupabaseError(error: any, customMessage: string) {
    console.error(`${customMessage}: ${JSON.stringify(error)}`);
    throw new Error(
      `Supabase Error - ${customMessage}: Unable to process the request.`
    );
  }

  private async executeSupabaseQuery(query: any, errorMessage: string) {
    const { data, error } = await query;

    if (error) {
      this.handleSupabaseError(error, errorMessage);
    }

    return data;
  }

  private checkUserId(user_id: string | undefined, errorMessage: string) {
    if (user_id === undefined) {
      throw new Error(errorMessage);
    }
  }

  private async insertChatData(chatData: ChatDataProps) {
    console.log(chatData);
    const query = supabase
      .from(ManageChat.CHAT_HISTORY_TABLE)
      .insert([chatData]);
    return await this.executeSupabaseQuery(query, "Error inserting chat data");
  }

  private async selectChatHistory(
    user_id: string | undefined,
    chat_id: string
  ) {
    const query = supabase
      .from(ManageChat.CHAT_HISTORY_TABLE)
      .select("chat_query,chat_response,id,user_id")
      .eq("user_id", user_id)
      .eq("chat_id", chat_id);

    return await this.executeSupabaseQuery(
      query,
      "Error fetching chat history"
    );
  }

  async storeChat(chatData: ChatDataProps) {
    const { user_id, chat_id } = chatData;

    try {
      await Promise.all([
        this.insertChatData(chatData),
        this.getChatHistory(user_id, chat_id),
      ]);
    } catch (err) {
      throw err;
    }
  }

  async getChatHistory(user_id: string | undefined, chat_id: string) {
    this.checkUserId(user_id, "user_id is not defined");

    try {
      const data = await this.selectChatHistory(user_id, chat_id);
      return data;
    } catch (error) {
      throw new Error("Unable to get user chat data");
    }
  }

  async getChatHistoryTitles(
    user_id: string | undefined,
    fetchload: React.Dispatch<React.SetStateAction<boolean>>
  ) {

    this.checkUserId(user_id, "user_id is not defined");
    fetchload(true);
    try {
      const query = supabase
        .from(ManageChat.CHAT_HISTORY_TABLE)
        .select("chat_query,user_id,chat_id")
        .eq("user_id", user_id);

      const data = await this.executeSupabaseQuery(
        query,
        "Error fetching chat history titles"
      );

      const FirstChatsChatMessage: any = data?.reduce(
        (
          unique: {
            has: (arg0: any) => any;
            set: (arg0: any, arg1: any) => void;
          },
          current: { user_id: string | undefined; chat_id: any }
        ) => {
          if (current.user_id === user_id && !unique.has(current.chat_id)) {
            unique.set(current.chat_id, current);
          }
          return unique;
        },
        new Map()
      );

      const result = Array.from(FirstChatsChatMessage.values());
      fetchload(false);
      return result;
    } catch (error) {
      fetchload(false);

      throw new Error("Unable to get user chat data");
    }
  }
  async deletechat(chat_id: string) {
    try {
      const query = supabase
        .from("chathistory")
        .delete()
        .eq("chat_id", chat_id);
      await this.executeSupabaseQuery(query, "Error in delete user chat");
      return { status: true, response: "User chat delete successfully" };
    } catch (err) {
      return { status: false, response: "unable to delete user chat" };
    }
  }
  async deleteallchat(user_id: string | undefined) {
    this.checkUserId(user_id, "user_id is not defined");

    try {
      const query = supabase
        .from("chathistory")
        .delete()
        .eq("user_id", user_id);
      await this.executeSupabaseQuery(
        query,
        "Error in deleting all table of chats"
      );
      return { status: true, response: "All data delete successfully" };
    } catch (err) {
      return { status: false, response: "unable to delete chat data" };
    }
  }
}
