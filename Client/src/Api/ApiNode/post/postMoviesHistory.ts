import { useState } from "react";
import { ApiErrorResponse } from "../../../Components/Utility/Interface/InterfaceError";
import { useMovieDetailsStore } from "../../../Components/Modals/ModalMovieDetails/useMovieDetailsStore";
import { apiFetch } from "../api";

export const useHandlePostMoviesHistory = () => {
  const { movieId } = useMovieDetailsStore();
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const handlePostMoviesHistory =
    async (): Promise<ApiErrorResponse | null> => {
      if (!movieId || added || loading) return null;

      setLoading(true);

      try {
        const token = localStorage.getItem("authToken");
        await apiFetch("/api/postMoviesHistory", {
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
        console.error("Error saving moviesHistory:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    };

  return { loading, added, handlePostMoviesHistory };
};
