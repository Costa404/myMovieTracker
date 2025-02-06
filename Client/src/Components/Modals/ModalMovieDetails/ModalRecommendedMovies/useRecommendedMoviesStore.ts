import { create } from "zustand";

interface ModalRecommendedMovieState {
  isModalRecommendedMovieOpen: boolean;

  openModalRecommendedMovie: () => void;
  closeModalRecommendedMovie: () => void;
}

export const useModalRecommendedMovieStore = create<ModalRecommendedMovieState>(
  (set) => ({
    isModalRecommendedMovieOpen: false,

    openModalRecommendedMovie: () => set({ isModalRecommendedMovieOpen: true }),
    closeModalRecommendedMovie: () =>
      set({ isModalRecommendedMovieOpen: false }),
  })
);
