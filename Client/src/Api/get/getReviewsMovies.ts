import { useEffect, useState } from "react";
import { apiFetch } from "../api";

export interface Review {
  review_id: string;
  username: string;
  movie_id: number;
  movie_title: string;
  movie_image: string;
  review: string;
  rating: number;
  profile_picture: string;
}

export const useGetReviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data: Review[] = await apiFetch("/api/getReviewsMovies", {
          isPublicRoute: false,
        });

        setReviews(data);
        setLoading(false);
      } catch (error) {
        console.error("Error when fetching movies:", error);
        setLoading(false);
      }
    };

    getReviews();
  }, []);

  return { reviews, loading };
};
