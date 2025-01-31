import { useMovieDetailsStore } from "../../../Modals/MovieDetails/useMovieDetailsStore";
import LoadingSpinner from "../../../Utility/Loading/Loading";
import { useGetMovies } from "../../../../Api/get/getMovies";
import DisplayMoviesScroll from "./DisplayMoviesScroll";
const MoviesByGenre = () => {
  const { groupedMovies } = useGetMovies();
  const { setMovieId, openModal } = useMovieDetailsStore();

  const handleMovieClick = (movieId: number) => {
    setMovieId(movieId);
    openModal();
  };

  if (Object.keys(groupedMovies).length === 0) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {Object.keys(groupedMovies).map((genre) => (
        <DisplayMoviesScroll
          key={genre}
          genre={Number(genre)}
          movies={groupedMovies[genre]}
          onMovieClick={handleMovieClick}
        />
      ))}
    </>
  );
};

export default MoviesByGenre;
