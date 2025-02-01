import { create } from "zustand";

interface ReviewsModal {
  isReviewModalOpen: boolean;
  openReviewModal: () => void;
  closeReviewModal: () => void;
}

export const useReviewsModalStore = create<ReviewsModal>((set) => ({
  isReviewModalOpen: false,
  openReviewModal: () => {
    set({ isReviewModalOpen: true });
    document.body.style.overflow = "hidden";
  },
  closeReviewModal: () => {
    set({ isReviewModalOpen: false });
    document.body.style.overflow = "auto";
  },
}));
