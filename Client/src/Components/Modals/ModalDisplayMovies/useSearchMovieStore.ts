import { create } from "zustand";

interface MovieStore {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const useSearchMovieStore = create<MovieStore>((set) => ({
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
}));
