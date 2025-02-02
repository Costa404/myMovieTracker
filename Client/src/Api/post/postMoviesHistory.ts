import { ApiErrorResponse } from "../../Components/Utility/Interface/InterfaceError";
import { useMovieDetailsStore } from "../../Components/Modals/MovieDetails/useMovieDetailsStore";
import { apiFetch } from "../api";

export const useHandlePostMoviesHistory = () => {
  const { movieId } = useMovieDetailsStore();

  console.log("movieId", movieId);

  const handlePostMoviesHistory =
    async (): Promise<ApiErrorResponse | null> => {
      if (!movieId) {
        console.warn("No movie selected to add to moviesHistory.");
        return null;
      }

      console.log("Saving movie to moviesHistory:", movieId);

      try {
        const token = localStorage.getItem("authToken");
        const response = await apiFetch("/api/postMoviesHistory", {
          method: "POST",
          isPublicRoute: false,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ movieId }),
        });

        return response;
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Error saving moviesHistory:", error.message);
          throw error;
        } else {
          throw new Error("An unknown error occurred");
        }
      }
    };

  return { handlePostMoviesHistory };
};
