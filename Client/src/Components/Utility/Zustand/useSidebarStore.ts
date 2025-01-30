import { create } from "zustand";

type ModalState = {
  isOpenSidebar: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
};

export const useSidebarStore = create<ModalState>((set) => ({
  isOpenSidebar: false,
  toggleSidebar: () =>
    set((state) => {
      if (state.isOpenSidebar) {
        document.body.style.overflow = "";
      } else {
        document.body.style.overflow = "hidden";
      }

      return { isOpenSidebar: !state.isOpenSidebar };
    }),
  closeSidebar: () => {
    document.body.style.overflow = "";
    set({ isOpenSidebar: false });
  },
}));
