import { create } from "zustand";

type ModalState = {
  movieId: number | null;
  setMovieId: (id: number | null) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  clearMovie: () => void;
};

export const useMovieDetailsStore = create<ModalState>((set) => ({
  movieId: null,
  setMovieId: (id) => set({ movieId: id }),
  isModalOpen: false,
  openModal: () => {
    set({ isModalOpen: true, loading: true });
    document.body.style.overflow = "hidden";
  },
  closeModal: () => {
    set({ isModalOpen: false, loading: false });
    document.body.style.overflow = "auto";
  },
  loading: false,
  setLoading: (loading) => set({ loading }),

  clearMovie: () => set({ movieId: null }),
}));
