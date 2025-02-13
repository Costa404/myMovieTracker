// src/store/uListseChatStore.ts
import { create } from "zustand";

interface Chat {
  id: string;
  name: string;
}

interface ChatState {
  chats: Chat[];
  isChatListModalOpen: boolean;
  addChat: (chat: Chat) => void;
  setChats: (chats: Chat[]) => void;
  openChatListModal: () => void;
  closeChatListModal: () => void;
}

const loadChatsFromStorage = (): Chat[] => {
  const savedChats = localStorage.getItem("chats");
  return savedChats ? JSON.parse(savedChats) : [];
};
interface Message {
  text: string;
  sender: "user" | "bot";
}

interface ChatState {
  chats: Chat[];
  messages: Record<string, Message[]>;
  isChatListModalOpen: boolean;
  addChat: (chat: Chat) => void;
  setChats: (chats: Chat[]) => void;
  addMessageToChat: (chatId: string, message: Message) => void;
  openChatListModal: () => void;
  closeChatListModal: () => void;
}

export const useChatListStore = create<ChatState>((set) => ({
  chats: loadChatsFromStorage(),
  messages: {},
  isChatListModalOpen: false,
  addChat: (chat) => {
    set((state) => {
      const newChats = [...state.chats, chat];
      localStorage.setItem("chats", JSON.stringify(newChats));
      return { chats: newChats };
    });
  },
  setChats: (chats) => {
    localStorage.setItem("chats", JSON.stringify(chats));
    set({ chats });
  },
  addMessageToChat: (chatId: string, message: Message) => {
    set((state) => {
      const newMessages = {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), message],
      };
      return { messages: newMessages };
    });
  },
  openChatListModal: () => set({ isChatListModalOpen: true }),
  closeChatListModal: () => set({ isChatListModalOpen: false }),
}));
