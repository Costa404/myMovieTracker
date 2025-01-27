import { useEffect, useState } from "react";

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
        const response = await fetch(
          "https://mymovietracker.vercel.app/api/movies"
        );
        const data: Movie[] = await response.json();

        console.log("data", data);

        // Filtrar popular  movies
        const popularMoviesArray = data.filter((movie) => movie.is_popular);
        setPopularMovies(popularMoviesArray);
        console.log(popularMovies);

        // Agrupar todos os movies por category
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
  // exportamos cada array individualemnte
  return { groupedMovies, popularMovies };
};
