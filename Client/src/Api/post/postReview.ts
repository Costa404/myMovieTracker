import { ApiErrorResponse } from "../../Components/Utility/Interface/InterfaceError";
import { useMovieDetailsStore } from "../../Components/Utility/Zustand/useMovieDetailsStore";
import { apiFetch } from "../api";

export const usePostReview = () => {
  const { movieId } = useMovieDetailsStore();

  console.log("movieId", movieId);

  const handlePostReview = async (): Promise<ApiErrorResponse | null> => {
    if (!movieId) {
      console.warn("No movie selected to add to Review.");
      return null;
    }

    console.log("Saving review to Review:", movieId);

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
        body: JSON.stringify({ movieId }),
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
