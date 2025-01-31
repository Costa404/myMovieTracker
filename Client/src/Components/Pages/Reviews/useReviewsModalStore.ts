import { create } from "zustand";

interface ReviewsModal {
  isReviewModalOpen: boolean;
  openReviewModal: () => void;
  closeReviewModal: () => void;
}

export const useReviewsModalStore = create<ReviewsModal>((set) => ({
  isReviewModalOpen: false,
  openReviewModal: () => set({ isReviewModalOpen: true }),
  closeReviewModal: () => set({ isReviewModalOpen: false }),
}));
