import { useState, useEffect, useCallback } from "react";
import { useMovieDetailsStore } from "../../Components/Modals/ModalMovieDetails/useMovieDetailsStore";
import { RecommendedMovie } from "../../Components/Utility/Interface/geralInterfaces";

export const useGetRecommendMovies = () => {
  const { movieId } = useMovieDetailsStore();
  // console.log("movieId", movieId);

  const [recommendedMovies, setRecommendedMovies] = useState<
    RecommendedMovie[]
  >([]);
  const [loadingRecommendations, setLoadingRecommendations] =
    useState<boolean>(false);

  const fetchRecommendedMovies = useCallback(async () => {
    if (!movieId) return;

    console.log("Fetching recommendations for movieId:", movieId);

    setLoadingRecommendations(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/recommendMovies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie_id: movieId }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch recommended movies: ${response.statusText}`
        );
      }

      const data = await response.json();
      setRecommendedMovies(data.recommended_movies || []);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error fetching recommended movies:", error.message);
        throw error;
      } else {
        throw new Error("An unknown error occurred");
      }
    } finally {
      setLoadingRecommendations(false);
    }
  }, [movieId]);

  useEffect(() => {
    fetchRecommendedMovies();
  }, [fetchRecommendedMovies]);

  return { recommendedMovies, loadingRecommendations };
};
