// import { create } from "zustand";

// type ModalState = {
//   movieId: number | null;
//   setMovieId: (id: number | null) => void;
//   isModalOpen: boolean;
//   openModal: () => void;
//   closeModal: () => void;
//   loading: boolean;
//   setLoading: (loading: boolean) => void;
//   clearMovie: () => void;
// };

// export const useMovieDetailsStore = create<ModalState>((set) => ({
//   movieId: null,
//   setMovieId: (id) => set({ movieId: id }),
//   isModalOpen: false,
//   openModal: () => {
//     set({ isModalOpen: true, loading: true });
//     document.body.style.overflow = "hidden";
//   },
//   closeModal: () => {
//     set({ isModalOpen: false, loading: false });
//     document.body.style.overflow = "auto";
//   },
//   loading: false,
//   setLoading: (loading) => set({ loading }),

//   clearMovie: () => set({ movieId: null }),
// }));
import { create } from "zustand";

interface MovieDetailState {
  movieId: number | null;

  setMovieId: (id: number | null) => void;

  isMovieDetailOpen: boolean;
  openMovieDetail: () => void;
  closeMovieDetail: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  clearMovie: () => void;
}
export const useMovieDetailsStore = create<MovieDetailState>((set) => ({
  movieId: null,
  setMovieId: (id) => set({ movieId: id }),

  isMovieDetailOpen: false,
  openMovieDetail: () => {
    set({ isMovieDetailOpen: true, loading: true });
    document.body.style.overflow = "hidden";
  },
  closeMovieDetail: () => {
    set({ isMovieDetailOpen: false, loading: false, movieId: null });
    document.body.style.overflow = "auto";
  },

  clearMovie: () => set({ movieId: null }),

  loading: false,
  setLoading: (loading) => set({ loading }),
}));
