import { useEffect, useState } from "react";
import { apiFetch } from "../api";
import { Review } from "../../../Components/Utility/Interface/geralInterfaces";

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
