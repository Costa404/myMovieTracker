import { useState } from "react";
import { ApiErrorResponse } from "../../../Components/Utility/Interface/InterfaceError";
import { useMovieDetailsStore } from "../../../Components/Modals/ModalMovieDetails/useMovieDetailsStore";
import { apiFetch } from "../api";

export const useHandlePostWatchlist = () => {
  const { movieId } = useMovieDetailsStore();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const resetAddedWatchlist = () => setAdded(false);

  const handlePostWatchlist = async (): Promise<ApiErrorResponse | null> => {
    if (!movieId || added || loading) return null;

    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      await apiFetch("/api/watchlist", {
        method: "POST",
        isPublicRoute: false,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ movieId }),
      });

      setAdded(true);
      return null;
    } catch (error) {
      console.error("Error saving watchlist:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, added, handlePostWatchlist, resetAddedWatchlist };
};
