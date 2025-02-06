import { useSelectedMovieModalStore } from "../../../Components/Modals/ModalDisplayMovies/useSelectedMovieModalStore";

import { ApiErrorResponse } from "../../../Components/Utility/Interface/InterfaceError";
import { apiFetch } from "../api";
export const usePostReview = () => {
  const { selectedMovieId } = useSelectedMovieModalStore();
  const handlePostReview = async (
    review: string,
    rating: number
  ): Promise<ApiErrorResponse | null> => {
    if (!selectedMovieId?.id) {
      console.warn("No movie selected to add to Review.");
      return null;
    }

    console.log("Saving review to Review:", selectedMovieId);

    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        console.warn("No authentication token found.");
        return null;
      }

      const response = await apiFetch("/api/postReviewsMovies", {
        method: "POST",
        isPublicRoute: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          movie_id: selectedMovieId.id,
          review,
          rating,
        }),
      });

      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error saving Review:", error.message);
        throw error;
      } else {
        console.error("An unknown error occurred during the review post.");
        throw new Error("An unknown error occurred");
      }
    }
  };

  return { handlePostReview };
};
