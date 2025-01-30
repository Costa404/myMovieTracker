import { useNavigate } from "react-router-dom";
import { useGetReviews } from "../../../Api/get/getReviewsMovies";
import LoadingSpinner from "../../Utility/Loading/Loading";

import { motion } from "framer-motion";
import { useMovieDetailsStore } from "../../Utility/Zustand/useMovieDetailsStore";
import BtnNewReview from "../../Utility/BtnNewReview";

const Reviews = () => {
  const { reviews } = useGetReviews();
  const navigate = useNavigate();

  const handleUsernameClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  const { setMovieId, openModal, isModalOpen } = useMovieDetailsStore();
  console.log("Estado do modal:", isModalOpen);

  const handleMovieClick = (movieId: string) => {
    console.log("Clicou no filme:", movieId);
    setMovieId(movieId);
    openModal();
    console.log("Chamou openModal");
  };

  return (
    <div className=" px-3 mt-5">
      {reviews.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <div className="row" style={{ marginTop: "10rem" }}>
          <div className="d-flex  justify-content-between mb-3 align-items-center">
            <h1 className="text-center mb-4">Movie Reviews</h1>
            <BtnNewReview />
          </div>
          {reviews.map((review) => (
            <motion.div
              onClick={() => handleMovieClick(String(review.movie_id))}
              className="col-12 mb-4 d-flex flex-row border border-dark rounded-3 p-3 reviewCard hover"
              key={review.review_id}
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1.5 }}
            >
              <div className="me-3" style={{ width: "15rem", height: "20rem" }}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${review.movie_image}`}
                  alt={review.movie_title}
                  className="img-fluid w-100 h-100 object-fit-cover"
                  style={{ width: "15rem", height: "20rem" }}
                />
              </div>

              <div className="d-flex flex-column justify-content-between w-100">
                <h5 className="fs-3 fw-semibold">{review.movie_title}</h5>
                <p className="fs-5 text-truncate" style={{ maxWidth: "100%" }}>
                  {review.review}
                </p>

                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="fs-5">
                      <strong>Rating:</strong> {review.rating}/5
                    </p>
                    <footer className="blockquote-footer fs-5">
                      Reviewed by{" "}
                      <strong
                        className="fw-bolder"
                        onClick={() => handleUsernameClick(review.username)}
                      >
                        <div className="d-flex align-items-center hover">
                          {review.profile_picture ? (
                            <img
                              src={review.profile_picture}
                              alt="Profile"
                              className="rounded-circle me-2"
                              style={{ width: "30px", height: "30px" }}
                            />
                          ) : (
                            <div
                              style={{
                                width: "3rem",
                                height: "3rem",
                                borderRadius: "50%",
                                backgroundColor: "#ccc",
                                marginRight: "10px",
                              }}
                            />
                          )}
                          {review.username}
                        </div>
                      </strong>
                    </footer>
                  </div>
                  <button className="btn btn-primary px-4 fs-4 btnTransform fw-semibold">
                    Watchlist
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
