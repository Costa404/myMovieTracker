import { useEffect, useState } from "react";
import { useMovieDetailsStore } from "../../Components/Utility/Zustand/useMovieDetailsStore";
import { apiFetch } from "../api";

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
        const data = await apiFetch(`/api/movies/${movieId}`, {
          isPublicRoute: true,
        });

        setMovieDetails(data);
      };

      getMovieDetails();
    }
  }, [movieId]);

  return { movieDetails };
};
