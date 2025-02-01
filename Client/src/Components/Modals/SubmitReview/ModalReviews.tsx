import React, { useState } from "react";
import ReactDOM from "react-dom";
import { usePostReview } from "../../../Api/post/postReviewsMovies";
import { useReviewsModalStore } from "./useReviewsModalStore";
import { useTheme } from "../../../Context/ThemeContext/ThemeContext";
import StarRating from "./StarRating";
import ActionButton from "../../Utility/ActionButton";

import SelectedMovie from "../ModalDisplayMovies/SelectedMovie";
import { useSelectedMovieModalStore } from "../ModalDisplayMovies/useSelectedMovieModalStore";

const ModalReviews = () => {
  const {
    openSelectedMovieModal,
    isSelectedMovieOpen,
    selectedMovieId,
    setSelectedMovieId,
  } = useSelectedMovieModalStore();
  console.log("isSelectedMovieOpen", isSelectedMovieOpen);
  const { closeReviewModal, isReviewModalOpen } = useReviewsModalStore();

  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const { handlePostReview } = usePostReview();
  const { theme } = useTheme();

  const handleReviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReview(e.target.value);
  };
  const hancleCloseModalReview = () => {
    closeReviewModal();
    setSelectedMovieId(null);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!review || rating < 1 || rating > 5) {
      alert("Please provide a valid review and rating.");
      return;
    }

    const response = await handlePostReview(review, rating);

    if (response) {
      hancleCloseModalReview();
      alert("Review added successfully!");
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
      onClick={hancleCloseModalReview}
    >
      <div
        className="modal-content modal-overlay d-flex justify-content-center align-items-center h-50 w-50 testing"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: theme === "dark" ? "#121212" : "#c7c7c7",
          color: theme === "dark" ? "white" : " #e0e0e0",
          zIndex: "999",
        }}
      >
        <h3 className="fw-bold mb-5">Submit your Review</h3>
        <form onSubmit={handleSubmit} className="w-100 h-100 ">
          <div className="w-100 d-flex">
            <div className="mb-3 d-flex  flex-column w-75 align-items-center ">
              <label htmlFor="review" className="form-label fs-3 fw-bold">
                Review:
              </label>
              <input
                type="text"
                id="review"
                className="form-control w-75 "
                style={{ minHeight: "15rem" }}
                value={review}
                onChange={handleReviewChange}
              />

              <StarRating rating={rating} setRating={setRating} />
            </div>
            <div className="d-flex flex-column align-items-center w-50 ">
              {selectedMovieId ? (
                <SelectedMovie selectedMovie={selectedMovieId} />
              ) : (
                <p className="fs-3 text-center fw-bold  mt-5">
                  No Movie Selected
                </p>
              )}

              <span>
                <ActionButton
                  label="Select Movie"
                  onClick={(e) => {
                    e.preventDefault();
                    openSelectedMovieModal();
                  }}
                />
              </span>
            </div>
          </div>
          <div
            className="  gap-3 d-flex flex-column  justify-content-end align-items-center"
            style={{ height: "30%" }}
          >
            {" "}
            <span>
              <ActionButton
                type="submit"
                style={{ width: "15rem" }}
                label="Submit Review"
              />
            </span>
            <span>
              <ActionButton
                onClick={hancleCloseModalReview}
                label="Close"
                style={{
                  background: " #dc3545",
                  border: "none",
                  width: "15rem",
                }}
              />
            </span>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("modal-Review")!
  );
};

export default ModalReviews;
