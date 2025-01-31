import { create } from "zustand";

type PageStore = {
  page: string;
  setPage: (page: string) => void;
};

export const usePageStore = create<PageStore>((set) => ({
  page: "",
  setPage: (page) => set({ page }),
}));
