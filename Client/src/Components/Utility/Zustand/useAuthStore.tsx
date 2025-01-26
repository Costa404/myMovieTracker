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
  loading: boolean; // Novo estado de carregamento
  setLoading: (loading: boolean) => void; // Função para setar o carregamento
};

export const useAuthStore = create<ModalState>((set) => ({
  isModalSignUp: false,
  isModalLogin: false,
  loading: false, // Estado de carregamento

  // Ações
  openModalSignup: () => {
    set({ isModalSignUp: true });
    document.body.style.overflow = "hidden"; // Bloqueia o scroll quando o modal abre
  },
  closeModalSignup: () => {
    set({ isModalSignUp: false });
    document.body.style.overflow = "auto"; // Restaura o scroll quando o modal fecha
  },
  openModalLogin: () => {
    set({ isModalLogin: true });
    document.body.style.overflow = "hidden"; // Bloqueia o scroll quando o modal abre
  },
  closeModalLogin: () => {
    set({ isModalLogin: false });
    document.body.style.overflow = "auto"; // Restaura o scroll quando o modal fecha
  },

  setLoading: (loading) => set({ loading }), // Função para alterar o estado de loading
}));
