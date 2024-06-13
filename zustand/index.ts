import { ManageChat } from "@/services";
import { create } from "zustand";

type Chat = {
  chat_id: string;
  chat_query: string;
  user_id: string | undefined;
};

type ChatState = {
  chats: Chat[];
  loading: boolean;
  deleteLoading: boolean;
  currentChatID: string;
  setCurrentChatID: (chatId: string) => void;
  getChatHistory: (userId: string | undefined) => Promise<void>;
  deleteChat: (chatId: string) => Promise<void>;
  addChat: (chat: Chat) => void;
};

const managechat = new ManageChat();

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  loading: true,
  deleteLoading: false,
  currentChatID: "",

  setCurrentChatID: (chatId) => set({ currentChatID: chatId }),
  getChatHistory: async (userId) => {
    set({ loading: true });
    try {
      const res: any = await managechat.getChatHistoryTitles(userId);
      set({ chats: res });
    } catch (error) {
      console.error("Failed to fetch chat history:", error);
    } finally {
      set({ loading: false });
    }
  },

  deleteChat: async (chatId) => {
    set({ deleteLoading: true });
    const res = await managechat.deletechat(chatId);
    if (res.status) {
      set((state) => ({
        chats: state.chats.filter((chat) => chat.chat_id !== chatId),
      }));
      set({ deleteLoading: false });
    } else {
      set({ deleteLoading: false });
      throw new Error(res.response);
    }
  },

  addChat: (chat) => {
    set((state) => ({
      chats: [...state.chats, chat],
    }));
  },
}));
