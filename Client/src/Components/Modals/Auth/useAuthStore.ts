import { create } from "zustand";

type ModalState = {
  // ====================
  // Auth
  // ====================
  isModalSignUp: boolean;
  openModalSignup: () => void;
  closeModalSignup: () => void;
  isModalLogin: boolean;
  openModalLogin: () => void;
  closeModalLogin: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<ModalState>((set) => ({
  isModalSignUp: false,
  isModalLogin: false,
  loading: false,

  // Ações
  openModalSignup: () => {
    set({ isModalSignUp: true });
    document.body.style.overflow = "hidden";
  },
  closeModalSignup: () => {
    set({ isModalSignUp: false });
    document.body.style.overflow = "auto";
  },
  openModalLogin: () => {
    set({ isModalLogin: true });
    document.body.style.overflow = "hidden";
  },
  closeModalLogin: () => {
    set({ isModalLogin: false });
    document.body.style.overflow = "auto";
  },

  setLoading: (loading) => set({ loading }),
}));
