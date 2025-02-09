import { useEffect, useState } from "react";
import { useMovieDetailsStore } from "../../../Components/Modals/ModalMovieDetails/useMovieDetailsStore";
import { apiFetch } from "../api";

type MovieDetails = {
  movieId: number;
  title: string;
  poster_path: string;
  overview: string;
  release_date: string;
  fakeImdb: number;
};

export const useGetDetailsMovies = () => {
  const { movieId } = useMovieDetailsStore();
  // console.log("movieId", movieId);

  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (movieId) {
      const getMovieDetails = async () => {
        setLoading(true);
        const data = await apiFetch(`/api/movies/${movieId}`, {
          isPublicRoute: true,
        });
        setMovieDetails(data);
        setLoading(false);
      };

      getMovieDetails();
    }
  }, [movieId]);
  // console.log("movieDEtails", movieDetails);

  return { movieDetails, loading };
};
