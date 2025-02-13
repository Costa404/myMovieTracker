import { create } from "zustand";

interface ChatBotState {
  isChatBotOpen: boolean;
  currentChatId: string | null;
  openChatBot: (chatId: string) => void;
  closeChatBot: () => void;
}

export const useChatBotStore = create<ChatBotState>((set) => ({
  isChatBotOpen: false,
  currentChatId: null,
  openChatBot: (chatId: string) => {
    set({ isChatBotOpen: true, currentChatId: chatId });
    document.body.style.overflow = "hidden";
  },
  closeChatBot: () => {
    set({ isChatBotOpen: false, currentChatId: null });
    document.body.style.overflow = "auto";
  },
}));
