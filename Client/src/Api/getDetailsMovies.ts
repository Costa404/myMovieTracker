import { useEffect, useState } from "react";
import { useMovieDetailsStore } from "../Components/Utility/Zustand/useMovieDetailsStore";
import { apiFetch } from "./api";

type MovieDetails = {
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
};

export const useGetDetailsMovies = () => {
  const { movieId } = useMovieDetailsStore();

  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  useEffect(() => {
    if (movieId) {
      const getMovieDetails = async () => {
        const response = await apiFetch(`api/movies/${movieId}`, {
          isPublicRoute: true,
        });

        const data = await response.json();
        setMovieDetails(data);
      };

      getMovieDetails();
    }
  }, [movieId]);
  return { movieDetails };
};
