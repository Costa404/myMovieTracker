import { create } from "zustand";

type PageStoreNavbar = {
  page: string;
  setPage: (page: string) => void;
};

export const usePageStoreNavbar = create<PageStoreNavbar>((set) => ({
  page: "Movies",
  setPage: (page) => set({ page }),
}));

type PageStoreMyArea = {
  page: string;
  setPage: (page: string) => void;
};

export const usePageStoreMyArea = create<PageStoreMyArea>((set) => ({
  page: "Watchlist",
  setPage: (page) => set({ page }),
}));
