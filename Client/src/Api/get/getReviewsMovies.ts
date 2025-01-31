import { useEffect, useState } from "react";
import { apiFetch } from "../api";

interface Review {
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

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data: Review[] = await apiFetch("/api/postReviewsMovies", {
          isPublicRoute: false,
        });

        console.log("data", data);

        setReviews(data);
      } catch (error) {
        console.error("Error when fetching movies:", error);
      }
    };

    getReviews();
  }, []);

  return { reviews };
};
