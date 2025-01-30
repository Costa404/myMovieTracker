import { useGetWatchlist } from "../../../../Api/get/getWatchlist";
import { useState, useEffect } from "react";
import { Movie } from "../../../Utility/Interface/geralInterfaces";

export const useIsMovieInWatchlist = (movieId: number) => {
  const [isInWatchlist, setIsInWatchlist] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { handleGetWatchlist } = useGetWatchlist();

  const checkIfMovieInWatchlist = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await handleGetWatchlist();

      if (Array.isArray(response) && response.length > 0) {
        const movieFound = response.some(
          (movie: Movie) => movie.id === movieId
        );
        setIsInWatchlist(movieFound);
      } else {
        setIsInWatchlist(false);
      }
    } catch (error) {
      console.error("Erro ao verificar se o filme está na watchlist", error);
      setError("Erro ao verificar se o filme está na watchlist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkIfMovieInWatchlist();
  }, [movieId]);

  return { isInWatchlist, loading, error };
};
