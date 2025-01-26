import { ApiErrorResponse } from "../Components/Utility/Interface/InterfaceError";
import { useMovieDetailsStore } from "../Components/Utility/Zustand/useMovieDetailsStore";

export const useHandlePostWatchlist = () => {
  const { movieId } = useMovieDetailsStore();

  console.log("movieId", movieId);

  const handlePostWatchlist = async (): Promise<ApiErrorResponse | null> => {
    if (!movieId) {
      console.warn("No movie selected to add to watchlist.");
      return null;
    }

    console.log("Saving movie to watchlist:", movieId);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("http://localhost:3000/api/watchlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to add to watchlist. Status: ${response.status}`
        );
      }

      return (await response.json()) as ApiErrorResponse;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error saving watchlist:", error.message);
        throw error;
      } else {
        throw new Error("An unknown error occurred");
      }
    }
  };

  return { handlePostWatchlist };
};
