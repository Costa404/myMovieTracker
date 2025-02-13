import { create } from "zustand";

interface ModalStore {
  isMovieGraphModalOpen: boolean;
  openMovieGraphModal: () => void;
  closeMovieGraphModal: () => void;
}

export const useMovieGraphModalStore = create<ModalStore>((set) => ({
  isMovieGraphModalOpen: false,
  openMovieGraphModal: () => {
    set({ isMovieGraphModalOpen: true });
    document.body.style.overflow = "hidden";
  },
  closeMovieGraphModal: () => {
    set({ isMovieGraphModalOpen: false });
    document.body.style.overflow = "auto";
  },
}));
