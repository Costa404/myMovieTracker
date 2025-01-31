import { create } from "zustand";
import { Movie } from "../../Utility/Interface/geralInterfaces";

interface MovieStore {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const useSearchMovieStore = create<MovieStore>((set) => ({
  searchTerm: "",
  setSearchTerm: (term) => set({ searchTerm: term }),
}));

interface SelectedMovieModal {
  isSelectedMovieOpen: boolean;
  selectedMovieId: Movie | null;
  openSelectedMovieModal: () => void;
  closeSelectedMovieModal: () => void;
  setSelectedMovieId: (movie: Movie | null) => void;
}

export const useSelectedMovieModalStore = create<SelectedMovieModal>((set) => ({
  isSelectedMovieOpen: false,
  selectedMovieId: null,
  openSelectedMovieModal: () => set({ isSelectedMovieOpen: true }),
  closeSelectedMovieModal: () => set({ isSelectedMovieOpen: false }),
  setSelectedMovieId: (movie: Movie | null) => set({ selectedMovieId: movie }),
}));
