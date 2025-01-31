import { useNavigate } from "react-router-dom";
import { useGetReviews } from "../../../Api/get/getReviewsMovies";
import LoadingSpinner from "../../Utility/Loading/Loading";

import { motion } from "framer-motion";
import ActionButton from "../../Utility/ActionButton";
import { useMovieDetailsStore } from "../../Utility/Zustand/useMovieDetailsStore";

const Reviews = () => {
  const { reviews } = useGetReviews();
  const navigate = useNavigate();
  const { setMovieId, openModal } = useMovieDetailsStore();
  const handleUsernameClick = (username: string) => {
    navigate(`/profile/${username}`);
  };

  const handleMovieClick = (movieId: string) => {
    setMovieId(movieId);
    openModal();
  };

  return (
    <div className="px-3 mt-5">
      {reviews.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <div className="row" style={{ marginTop: "10rem" }}>
          <div className="d-flex justify-content-between   p-3">
            <h1 className=" h-100 ">Movie Reviews</h1>
            <ActionButton label="New Review" />
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
                  style={{ minWidth: "15rem", height: "20rem" }}
                />
              </div>

              <div className="d-flex flex-column justify-content-between w-100">
                <h5 className="fs-3 fw-semibold">{review.movie_title}</h5>
                <p
                  className="fs-5 text-truncate"
                  style={{ maxWidth: "100%", whiteSpace: "normal" }}
                >
                  {review.review}
                </p>

                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="fs-5 fw-semibold fs-4">
                      <strong className="fw-semibold fs-4">Rating:</strong>{" "}
                      {review.rating}/5
                    </p>
                    <footer className=" fs-5 fw-semibold ">
                      <strong
                        className="fw-bolder"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleUsernameClick(review.username);
                        }}
                      >
                        <div className="d-flex align-items-center hover">
                          {review.profile_picture ? (
                            <img
                              src={review.profile_picture}
                              alt="Profile"
                              className="rounded-circle me-2"
                              style={{ width: "3rem", height: "3rem" }}
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
                </div>
              </div>

              <section
                id="mobileBtnReviews"
                className="d-flex align-items-end justify-content-end w-100 mobileBtnReviews"
              >
                <ActionButton label="Movie Details" />
              </section>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
