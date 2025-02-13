import { useMovieDetailsStore } from "../../../Modals/ModalMovieDetails/useMovieDetailsStore";
import LoadingSpinner from "../../../Utility/Loading/Loading";
import { useGetMovies } from "../../../../Api/ApiNode/get/getMovies";
import DisplayMoviesScroll from "./DisplayMoviesScroll";
import { useNavigate } from "react-router-dom";

const MoviesByGenre = () => {
  const { groupedMovies, loading } = useGetMovies();

  const { setMovieName, setMovieId, movieId, movieName } =
    useMovieDetailsStore();
  console.log("movieId", movieId);
  console.log("movieName", movieName);
  const navigate = useNavigate();
  const handleMovieClick = (movieName: string, movieId: number) => {
    console.log("Clicked movieId:", movieId);
    setMovieName(movieName);

    setMovieId(movieId);
    const movieSlug = movieName.replace(/\s+/g, "-").toLowerCase(); // Usando movieName diretamente

    navigate(`/movie/${movieSlug}`);
  };

  if (Object.keys(groupedMovies).length === 0) {
    return <LoadingSpinner />;
  }

  if (loading) {
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
