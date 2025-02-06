import { useEffect, useState } from "react";
import { apiFetch } from "../api";
import { Movie } from "../../../Components/Utility/Interface/geralInterfaces";

type GroupedMovies = {
  [genre: string]: Movie[];
};

export const useGetMovies = () => {
  const [groupedMovies, setGroupedMovies] = useState<GroupedMovies>({});
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true); //

  useEffect(() => {
    const getMovies = async () => {
      setLoading(true);
      try {
        const data: Movie[] = await apiFetch("/api/movies", {
          isPublicRoute: true,
        });

        const popularMoviesArray = data.filter((movie) => movie.is_popular);
        setPopularMovies(popularMoviesArray);

        const grouped: GroupedMovies = {};
        data.forEach((movie) => {
          movie.genre.forEach((genre) => {
            if (!grouped[genre]) {
              grouped[genre] = [];
            }
            grouped[genre].push(movie);
          });
        });

        //  troca a ordem de forma aleatória
        const shuffleArray = (array: Movie[]) => {
          for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
          }
        };

        Object.keys(grouped).forEach((genre) => {
          shuffleArray(grouped[genre]);
        });

        setAllMovies(data);
        setGroupedMovies(grouped);
      } catch (error) {
        console.error("Error when fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  return { groupedMovies, popularMovies, allMovies, loading };
};
