import React from "react";
import { useGetMovieReviews } from "../../../../Api/ApiNode/get/getMovieReviews";
import MovieReview from "./MovieReview";
import LoadingSpinner from "../../../Utility/Loading/Loading";

const MovieReviews: React.FC<{ movieId: number }> = ({ movieId }) => {
  const { movieReviews, loading } = useGetMovieReviews(movieId);

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (!movieReviews || movieReviews.length === 0) {
    return (
      <div className="p-5 m-5 fs-4 fw-semibold">No reviews available.</div>
    );
  }

  return (
    <div>
      <h1 className="text-center fw-bold p-5">Reviews</h1>
      {movieReviews.map((review) => (
        <MovieReview
          key={`${review.movie_id}-${Math.random()}`}
          review={review}
        />
      ))}
    </div>
  );
};

export default MovieReviews;
