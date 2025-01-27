import { useEffect, useState } from "react";
import { apiFetch } from "./api";

interface Movie {
  id: string;
  title: string;
  poster_path: string;
  genre: string[];
  is_popular: boolean;
}

type GroupedMovies = {
  [genre: string]: Movie[];
};

export const useGetMovies = () => {
  const [groupedMovies, setGroupedMovies] = useState<GroupedMovies>({});
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data: Movie[] = await apiFetch("/api/movies", {
          isPublicRoute: true,
        });

        console.log("data", data);

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

        setGroupedMovies(grouped);
      } catch (error) {
        console.error("Error when fetching movies:", error);
      }
    };

    getMovies();
  }, []);

  return { groupedMovies, popularMovies };
};
