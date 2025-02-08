import { useEffect, useState } from "react";

import { apiFetch } from "../api";
import { MovieReview } from "../../../Components/Utility/Interface/geralInterfaces";

export const useGetMovieReviews = (movieId: number) => {
  console.log("movieId", movieId);

  const [movieReviews, setMovieReviews] = useState<MovieReview[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (movieId) {
      const getMovieReviews = async () => {
        setLoading(true);
        const data = await apiFetch(`/api/movieReviews/${movieId}`, {
          isPublicRoute: true,
        });
        console.log("movieReviewsData", data);
        setMovieReviews(data);
        setLoading(false);
      };

      getMovieReviews();
    }
  }, [movieId]);

  return { movieReviews, loading };
};
