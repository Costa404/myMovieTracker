import React, { useState } from "react";
import ReactDOM from "react-dom";
import { usePostReview } from "../../../Api/post/postReview";
import { useReviewsModalStore } from "../../Utility/Zustand/useReviewsModalStore";
import { useTheme } from "../../../Context/ThemeContext/ThemeContext";
import StarRating from "./StarRating";

const ModalReviews = () => {
  const { closeReviewModal, isReviewModalOpen } = useReviewsModalStore();
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const { handlePostReview } = usePostReview();
  const { theme } = useTheme();

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!review || rating < 1 || rating > 5) {
      alert("Please provide a valid review and rating.");
      return;
    }

    const response = await handlePostReview();

    if (response) {
      alert("Review added successfully!");
      closeReviewModal();
    } else {
      alert("Failed to add review.");
    }
  };

  if (!isReviewModalOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className="modal-overlay d-flex justify-content-center align-items-center"
      onClick={closeReviewModal}
    >
      <div
        className="modal-content modal-overlay d-flex justify-content-center align-items-center h-50 w-50 testing"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: theme === "dark" ? "#121212" : "#c7c7c7",
          color: theme === "dark" ? "#333333" : " #e0e0e0",
          zIndex: "999",
        }}
      >
        <h3>Submit your Review</h3>
        <form onSubmit={handleSubmit} className="w-100 h-100">
          <div className="mb-3">
            <label htmlFor="review" className="form-label">
              Review:
            </label>
            <input
              type="text"
              id="review"
              className="form-control w-50 h-50"
              style={{ minHeight: "15rem" }}
              value={review}
              onChange={handleReviewChange}
            />
          </div>

          <StarRating rating={rating} setRating={setRating} />

          <button type="submit" className="btn btn-primary">
            Submit Review
          </button>
        </form>
        <button className="btn btn-secondary" onClick={closeReviewModal}>
          Close
        </button>
      </div>
    </div>,
    document.getElementById("modal-Review")!
  );
};

export default ModalReviews;
