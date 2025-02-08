import { create } from "zustand";

interface MovieDetailState {
  movieId: number | null;
  movieName: string | null;
  isMovieDetailOpen: boolean;
  loading: boolean;

  setMovieId: (id: number | null) => void;
  setMovieName: (name: string | null) => void;
  openMovieDetail: () => void;
  closeMovieDetail: () => void;
  setLoading: (loading: boolean) => void;
  clearMovie: () => void;
}

export const useMovieDetailsStore = create<MovieDetailState>((set) => ({
  movieId: null,
  movieName: null,

  setMovieId: (id) => set({ movieId: id }),
  setMovieName: (name) => set({ movieName: name }),

  isMovieDetailOpen: false,
  openMovieDetail: () => {
    set({ isMovieDetailOpen: true, loading: true });
    // document.body.style.overflow = "hidden";
  },
  closeMovieDetail: () => {
    set({
      isMovieDetailOpen: false,
      loading: false,
      movieId: null,
      movieName: null,
    });
    document.body.style.overflow = "auto";
  },

  clearMovie: () => set({ movieId: null, movieName: null }),

  loading: false,
  setLoading: (loading) => set({ loading }),
}));
