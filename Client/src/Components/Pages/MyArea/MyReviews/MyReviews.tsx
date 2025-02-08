import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useGetReviews } from "../../../../Api/ApiNode/get/getReviewsMovies";
import { useCurrentUser } from "../../../../Context/useCurrentUserAuth";
import LoadingSpinner from "../../../Utility/Loading/Loading";
import { useWatchlistLogic } from "../Watchlist/useWatchlistLogic";
import { Review } from "../../../Utility/Interface/geralInterfaces";

const MyReviews = () => {
  const { reviews: fetchedReviews, loading } = useGetReviews();
  const { currentUser } = useCurrentUser();
  const { isUnauthorized } = useWatchlistLogic();

  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    if (fetchedReviews) {
      setReviews(fetchedReviews);
    }
  }, [fetchedReviews]);

  const currentUsername = currentUser?.username;
  console.log("currentUsername", currentUsername);
  const userReviews =
    reviews?.filter((item) => item.username === currentUsername) || [];

  if (loading) {
    return (
      <div className="d-flex justify-content-center min-vh-100">
        <LoadingSpinner />
      </div>
    );
  }
  console.log("isUnauthorized", isUnauthorized);
  if (isUnauthorized) {
    return (
      <p className="text-danger text-center min-vh-100 fs-4">
        You must be logged in to view your movie reviews.
      </p>
    );
  }

  return (
    <div className="container min-vh-100 ">
      {userReviews.length > 0 ? (
        <div className="row g-4">
          {userReviews.map((review) => (
            <div
              key={review?.review_id}
              className="col-12 col-sm-6 col-md-3 col-lg-2"
            >
              <motion.div
                className="card shadow h-100 border-0"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{ borderRadius: "1.5rem" }}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${review.movie_image}`}
                  alt={review.movie_title}
                  className="card-img-top img-fluid"
                  style={{
                    maxHeight: "25rem",
                    objectFit: "contain",
                    borderRadius: "1.5rem 1.5rem 0 0",
                  }}
                />
                <div className="card-body text-center p-3">
                  <h6 className="card-title text-truncate">
                    {review.movie_title}
                  </h6>
                  <p className="card-text text-muted">{review.review}</p>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="badge bg-primary fw-semibold fs-5">
                      {review.rating} / 5
                    </span>
                  </div>
                  <div className="mt-3 d-flex align-items-center justify-content-center">
                    <img
                      src={
                        review.profile_picture ||
                        "https://via.placeholder.com/50"
                      }
                      alt={`${review.username}'s profile`}
                      className="rounded-circle me-2"
                      style={{
                        width: "3rem",
                        height: "3rem",
                        objectFit: "cover",
                      }}
                    />
                    <span className="fw-bold">{review.username}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted fs-4">No reviews found.</p>
      )}
    </div>
  );
};

export default MyReviews;
