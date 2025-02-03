import { create } from "zustand";
import { Movie } from "../../Utility/Interface/geralInterfaces";

interface SearchMovieStore {
  searchTerm: string;
  searchResults: Movie[];
  setSearchTerm: (term: string) => void;
  setSearchResults: (results: Movie[]) => void;
}

export const useSearchMovieStore = create<SearchMovieStore>((set) => ({
  searchTerm: "",
  searchResults: [],
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSearchResults: (results) => set({ searchResults: results }),
}));
