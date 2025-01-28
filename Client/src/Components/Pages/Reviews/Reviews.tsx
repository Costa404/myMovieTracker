import { useGetReviews } from "../../../Api/getReviewsMovies";
import LoadingSpinner from "../../Utility/Loading/Loading";

const Reviews = () => {
  const { reviews } = useGetReviews();

  return (
    <div className="container mt-5">
      {reviews.length === 0 ? (
        <LoadingSpinner />
      ) : (
        <div className="row">
          <h1 className="text-center mb-4">Movie Reviews</h1>
          {reviews.map((review) => (
            <div
              className="col-12 col-md-6 col-lg-4 mb-4"
              key={review.review_id}
            >
              <div className="card movie-card movieCardReview">
                <img
                  src={`https://image.tmdb.org/t/p/w500${review.movie_image}`}
                  className="card-img-top"
                  alt={review.movie_title}
                  style={{ height: "300px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title fs-2 fw-semibold">
                    {review.movie_title}
                  </h5>
                  <p className="card-text fs-4">{review.review}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    {" "}
                    <div>
                      {" "}
                      <p className="card-text fs-5">
                        <strong className="">Rating:</strong> {review.rating}/5
                      </p>
                      <footer className="blockquote-footer fs-5">
                        Reviewed by{" "}
                        <strong className="fw-bolder">{review.username}</strong>
                      </footer>
                    </div>
                    <button className="btn h-75 btn-primary px-4 fs-5 ">
                      Watchlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reviews;
