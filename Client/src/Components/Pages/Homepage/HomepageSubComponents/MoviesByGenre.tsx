import { useMovieDetailsStore } from "../../../Modals/ModalMovieDetails/useMovieDetailsStore";
import LoadingSpinner from "../../../Utility/Loading/Loading";
import { useGetMovies } from "../../../../Api/ApiNode/get/getMovies";
import DisplayMoviesScroll from "./DisplayMoviesScroll";
const MoviesByGenre = () => {
  const { groupedMovies } = useGetMovies();
  const { setMovieId, openMovieDetail } = useMovieDetailsStore();

  const handleMovieClick = (movieId: number) => {
    setMovieId(movieId);
    openMovieDetail();
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
